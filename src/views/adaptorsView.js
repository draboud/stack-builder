import View from "./View";
import {
  GENERATE_MARKUP,
  STACK_MAX,
  STACK_MAX_FOR_OPTS,
  COMP_HEIGHTS,
  COMP_IMG,
} from "../config";
import optionsView from "./optionsView";
import heightsView from "./heightsView";
import statsView from "./statsView";

const ctrlBtns = document.querySelector(".control_buttons_div");
let scalingResult;

class AdaptorsView extends View {
  _newHeight;

  //Add handler to adapt button
  _addHandlerAdapt = function (handler) {
    ctrlBtns.addEventListener("click", function (e) {
      const clicked = e.target.closest(".adapt_button");
      if (!clicked) return;
      handler();
    });
  };

  _addHandlerPDF = function (handler) {
    ctrlBtns.addEventListener("click", function (e) {
      const clicked = e.target.closest(".pdf_button");
      if (!clicked) return;
      handler();
    });
  };

  //_________________________________________________________________________
  //Add adaptors to stack
  _autoAdapt = function () {
    this._retarget();
    let numOfOpts = 0;
    let extArrayBore = [];
    let extArrayPress = [];
    this._allAdaptors.forEach(function (el) {
      el.parentNode.removeChild(el);
    });

    this._allOptsText.forEach(function (el) {
      // let intArray = "";
      if (el.classList.contains("hide") || el.classList.contains("second"))
        return;

      const onlyBore = el.innerHTML.split('"')[0];
      numOfOpts += 1;
      extArrayBore.push(onlyBore);

      const onlyPressArr = el.innerHTML.split(";");
      const onlyPress = onlyPressArr[onlyPressArr.length - 2];
      extArrayPress.push(onlyPress);
    });
    for (let i = 0; i < numOfOpts - 1; i++) {
      //Check for bore
      if (
        extArrayBore[i] !== extArrayBore[i + 1] &&
        !extArrayBore[i].includes("options") &&
        !extArrayBore[i + 1].includes("options")
      ) {
        const adapterHtml = `
      <div class="adapt-div">
        <div class="height-div">
          <div class="height-text">${COMP_HEIGHTS.adaptor}"</div>
        </div>
        <img class="img" src=${COMP_IMG.adaptor}>
        <div class="adaptor-div">
          <div class="adaptor-text">${extArrayBore[i + 1]}"&nbsp;X&nbsp;${
          extArrayBore[i]
        }"&nbsp;DSA</div>
        </div>
      </div>`;
        this._allComps[i].insertAdjacentHTML("afterend", adapterHtml);
      }
      //Check for pressure
      if (
        extArrayPress[i] !== extArrayPress[i + 1] &&
        !extArrayBore[i].includes("options") &&
        !extArrayBore[i + 1].includes("options")
      ) {
        const adapterHtml = `
      <div class="adapt-div">
        <div class="height-div">
          <div class="height-text">${COMP_HEIGHTS.adaptor}"</div>
        </div>
        <img class="img" src=${COMP_IMG.adaptor}>
        <div class="adaptor-div">
          <div class="adaptor-text">${extArrayPress[i + 1]}&nbsp;X&nbsp;${
          extArrayPress[i]
        }PSI&nbsp;DSA</div>
        </div>
      </div>`;
        this._allComps[i].insertAdjacentHTML("afterend", adapterHtml);
      }
    }
  };
  //____________________________________________________________________
  //Adjust height of stack after certain threshold value, in order to fit on a4 pdf
  _scaleStack = function () {
    let stackHeight = 0;
    let newHeight;
    let factor;
    let result;
    this._retarget();
    stackHeight = statsView._liveHeightTotal();
    this._allComps.forEach((el) => el.classList.remove("active"));
    this._leftArray.forEach((el) => el.classList.remove("active"));
    this._rightArray.forEach((el) => el.classList.remove("active"));

    //use visHeight to check height of stack on screen in px
    const visHeight = $(document.querySelector(".comp-wrapper")).height();

    if (visHeight > STACK_MAX) {
      factor = (visHeight - STACK_MAX) / visHeight;
      result = (100 - factor * 100) / 100;
      if (result > 0.766) result = 0.766;
    } else result = 0.766;

    this._allComps.forEach(function (el) {
      el.style.width = $(el).width() * result + "px";
    });

    this._allSpacers.forEach(function (el) {
      el.style.height = $(el).height() * result + "px";
    });

    this._allHydSpacers.forEach(function (el) {
      el.style.height = $(el).height() * result + "px";
    });

    this._allAdaptors.forEach(function (el) {
      el.style.width = $(el).width() * result + "px";
    });
    //hide blank side blocks for PDF output
    this._leftArray.forEach(function (el) {
      el.style.width = $(el).width() * result + "px";
      if (el.querySelector(".img_side").src.includes("blank"))
        el.classList.add("hide");
    });

    this._rightArray.forEach(function (el) {
      el.style.width = $(el).width() * result + "px";
      if (el.querySelector(".img_side").src.includes("blank"))
        el.classList.add("hide");
    });

    //______________________________________________________________________

    if (stackHeight > STACK_MAX_FOR_OPTS) {
      this._allSpacers.forEach(function (el) {
        el.style.height = "0px";
      });
    }
    scalingResult = result;
    newHeight = stackHeight;
    return newHeight;
  };

  //____________________________________________________________________
  //Undo scaling and reapply 'active' to top comp for continual editing
  _descaling = function () {
    this._allComps.forEach(function (el) {
      el.style.width = $(el).width() / scalingResult + "px";
    });

    this._allSpacers.forEach(function (el) {
      el.style.height = $(el).height() / scalingResult + "px";
    });

    this._allHydSpacers.forEach(function (el) {
      el.style.height = $(el).height() / scalingResult + "px";
    });

    this._allAdaptors.forEach(function (el) {
      el.style.width = $(el).width() / scalingResult + "px";
    });

    //unhide black side comp blocks to ensure editing is fully back
    this._leftArray.forEach(function (el) {
      el.style.width = $(el).width() / scalingResult + "px";
      if (el.querySelector(".img_side").src.includes("blank"))
        el.classList.remove("hide");
    });

    this._rightArray.forEach(function (el) {
      el.style.width = $(el).width() / scalingResult + "px";
      if (el.querySelector(".img_side").src.includes("blank"))
        el.classList.remove("hide");
    });

    this._allSpacers.forEach(function (el) {
      el.style.height = "20px";
    });

    this._allComps[0].classList.add("active");
  };
}

export default new AdaptorsView();
