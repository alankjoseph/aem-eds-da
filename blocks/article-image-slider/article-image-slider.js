export default function decorate(block) {
  if (!block) return;

  const blocks = block.querySelectorAll(".article-image-slider.block > div");

  // --- outer container ---
  const componentSlot = document.createElement("div");
  componentSlot.className = "article-body__component-slot";

  const slider = document.createElement("div");
  slider.className = "article-slider";

  // --- section title ---
  const firstBlock = blocks[0];
  const link = firstBlock.querySelector("a");
  if (link) {
    const sectionTitle = document.createElement("div");
    sectionTitle.className = "cmp-section-title-block";

    sectionTitle.innerHTML = `
      <h3 class="cmp-section-title">
        <a href="${link.href}" title="${link.title || ""}">${link.textContent.trim()}</a>
      </h3>
    `;
    slider.appendChild(sectionTitle);
  }

  // --- article slider block ---
  const cmpArticleSlider = document.createElement("div");
  cmpArticleSlider.className = "cmp-article-slider";

  const large = document.createElement("div");
  large.className = "cmp-article-slider__large";

  const thumbs = document.createElement("div");
  thumbs.className = "cmp-article-slider__thumb";

  // --- process each slide (skip first block since it's the title) ---
  blocks.forEach((block, i) => {
    if (i === 0) return;

    const picture = block.querySelector("picture");
    const caption = block.querySelector("p")?.textContent.trim() || "";

    if (picture) {
      // large item
      const largeItem = document.createElement("div");
      largeItem.className = "cmp-article-slider__large-item";
      largeItem.innerHTML = `
        <div class="cmp-story-figure">
          <figure class="cmp-story-figure__in">
            <div class="cmp-story-figure__image">
              <div class="cmp-story-figure__web-image"></div>
            </div>
            <figcaption class="cmp-story-figure__caption">${caption}</figcaption>
          </figure>
        </div>
      `;
      // insert original picture into web-image
      largeItem.querySelector(".cmp-story-figure__web-image").appendChild(picture.cloneNode(true));
      large.appendChild(largeItem);

      // thumb item (also use picture tag)
      const thumbItem = document.createElement("div");
      thumbItem.className = "cmp-article-slider__thumb-item";
      thumbItem.innerHTML = `
        <div class="cmp-story-figure">
          <figure class="cmp-story-figure__in">
            <div class="cmp-story-figure__image">
              <div class="cmp-story-figure__web-image"></div>
            </div>
          </figure>
        </div>
      `;
      thumbItem.querySelector(".cmp-story-figure__web-image").appendChild(picture.cloneNode(true));
      thumbs.appendChild(thumbItem);
    }
  });

  cmpArticleSlider.appendChild(large);
  cmpArticleSlider.appendChild(thumbs);
  slider.appendChild(cmpArticleSlider);
  componentSlot.appendChild(slider);

  // --- replace old block ---
  block.replaceWith(componentSlot);
  articlePhotoGallery()
}

