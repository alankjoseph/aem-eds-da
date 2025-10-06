export default function decorate(block) {

  // Collect all <p> inside the block
  const paragraphs = block.querySelectorAll("p");

  // Create new structure
  const highlightBlock = document.createElement("div");
  highlightBlock.className = "article-header__highlight-block";

  const cmpHighlight = document.createElement("div");
  cmpHighlight.className = "cmp-highlight";

  const ul = document.createElement("ul");
  ul.className = "cmp-highlight__ul";

  paragraphs.forEach((p) => {
    const li = document.createElement("li");
    li.className = "cmp-highlight__li";

    const newP = document.createElement("p");
    newP.className = "cmp-highlight_p";
    newP.innerHTML = p.innerHTML; // keep text & inline markup

    li.appendChild(newP);
    ul.appendChild(li);
  });

  cmpHighlight.appendChild(ul);
  highlightBlock.appendChild(cmpHighlight);

  // Replace the old block with the new highlight block
  block.parentElement.parentElement.replaceWith(highlightBlock);
}
