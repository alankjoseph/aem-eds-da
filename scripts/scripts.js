import {
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  toClassName,
  getMetadata,
} from './aem.js';

const TEMPLATE_LIST = ['article']

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * @typedef Template
 * @property {function} [loadLazy] If provided, will be called in the lazy phase. Expects a
 *  single argument: the document's <main> HTMLElement.
 * @property {function} [loadEager] If provided, will be called in the eager phase. Expects a single
 *  argument: the document's <main> HTMLElement.
 * @property {function} [loadDelayed] If provided, will be called in the delayed phase. Expects a
 *  single argument: the document's <main> HTMLElement.
 */

/**
 * @type {Template}
 */
let universalTemplate;
/**
 * @type {Template}
 */
let template;

/**
 * Invokes a template's eager method, if specified.
 * @param {Template} [toLoad] Template whose eager method should be invoked.
 * @param {HTMLElement} main The document's main element.
 */
async function loadEagerTemplate(toLoad, main) {
  if (toLoad && toLoad.loadEager) {
    await toLoad.loadEager(main);
  }
}

/**
 * Invokes a template's lazy method, if specified.
 * @param {Template} [toLoad] Template whose lazy method should be invoked.
 * @param {HTMLElement} main The document's main element.
 */
async function loadLazyTemplate(toLoad, main) {
  if (toLoad) {
    if (toLoad.loadLazy) {
      await toLoad.loadLazy(main);
    }
  }
}

/**
 * Invokes a template's delayed method, if specified.
 * @param {Template} [toLoad] Template whose delayed method should be invoked.
 * @param {HTMLElement} main The document's main element.
 */
async function loadDelayedTemplate(toLoad, main) {
  if (toLoad && toLoad.loadDelayed) {
    await toLoad.loadDelayed(main);
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    await decorateTemplates(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      // loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);
  await loadLazyTemplate(template, main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));
loadCSS(`${window.hlx.codeBasePath}/styles/styles.css`);
  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  // loadFonts();
}

async function decorateTemplates(main) {
  try {
    // Load the universal template for every page
    // universalTemplate = await loadTemplate('universal', main);

    const templateName = toClassName(getMetadata('template'));
    const templates = TEMPLATE_LIST;
    if (templates.includes(templateName)) {
      template = await loadTemplate(templateName, main);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('template loading failed', error);
  }
}

async function loadTemplate(templateName, main) {
  const cssLoaded = loadCSS(
    `${window.hlx.codeBasePath}/templates/${templateName}/${templateName}-build.css`,
  );
  let module;
  const decorateComplete = new Promise((resolve) => {
    (async () => {
      module = await import(
        `../templates/${templateName}/${templateName}-build.js`
      );
      await loadEagerTemplate(module, main);
      resolve();
    })();
  });
  await Promise.all([cssLoaded, decorateComplete]);
  return module;
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 0);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
