// Import Internal Dependencies
import { createDOMElement } from "../../common/utils";

// TODO: migrate this to ./i18n ?
const ki18nTranslaction = {
  french: {
    showMore: "voir plus",
    showLess: "voir moins"
  },
  english: {
    showMore: "show more",
    showLess: "show less"
  }
};

export function createExpandableSpan(
  hideItemsLength,
  onclick = () => void 0
) {
  const detectedLang = document.getElementById("lang").dataset.lang;
  const lang = detectedLang in ki18nTranslaction ? detectedLang : "english";

  const span = createDOMElement("span", {
    classList: ["expandable"],
    attributes: { "data-value": "closed" },
    childs: [
      createDOMElement("i", { className: "icon-plus-squared-alt" }),
      createDOMElement("p", { text: ki18nTranslaction[lang].showMore })
    ]
  });
  span.addEventListener("click", function itemListClickAction() {
    const isClosed = this.getAttribute("data-value") === "closed";
    {
      const innerI = this.querySelector("i");
      innerI.classList.remove(isClosed ? "icon-plus-squared-alt" : "icon-minus-squared-alt");
      innerI.classList.add(isClosed ? "icon-minus-squared-alt" : "icon-plus-squared-alt");
    }

    this.querySelector("p").textContent = isClosed ?
      ki18nTranslaction[lang].showLess : ki18nTranslaction[lang].showMore;
    this.setAttribute("data-value", isClosed ? "opened" : "closed");

    for (let id = 0; id < this.parentNode.childNodes.length; id++) {
      const node = this.parentNode.childNodes[id];
      if (node !== this) {
        if (isClosed) {
          node.classList.remove("hidden");
        }
        else if (id >= hideItemsLength) {
          node.classList.add("hidden");
        }
      }
    }
    onclick(this);
  });

  return span;
}
