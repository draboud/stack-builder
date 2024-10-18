import View from "./View";
import {
  GENERATE_MARKUP,
  STACK_MAX,
  STACK_MAX_FOR_OPTS,
  COMP_HEIGHTS,
  COMP_IMG,
} from "../config";
import optionsView from "./optionsView";

const ctrlBtns = document.querySelector(".control_buttons_div");

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
  _addHandlerScaleStack = function (handler) {
    ctrlBtns.addEventListener("click", function (e) {
      const clicked = e.target.closest(".view_button");
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
    let extArray = [];
    this._allAdaptors.forEach(function (el) {
      el.parentNode.removeChild(el);
    });

    this._allOptsText.forEach(function (el) {
      let intArray = "";
      if (el.classList.contains("hide") || el.classList.contains("second"))
        return;

      const onlyBore = el.innerHTML.split('"')[0];
      numOfOpts += 1;
      extArray.push(onlyBore);
    });
    for (let i = 0; i < numOfOpts - 1; i++) {
      if (extArray[i] !== extArray[i + 1]) {
        const adapterHtml = `
      <div class="adapt-div">
        <div class="height-div">
          <div class="height-text">${COMP_HEIGHTS.adaptor}"</div>
        </div>
        <img class="img" src=${COMP_IMG.adaptor}>
        <div class="adaptor-div">
          <div class="adaptor-text">${extArray[i + 1]}"&nbsp;X&nbsp;${
          extArray[i]
        }"&nbsp;DSA</div>
        </div>
      </div>`;
        this._allComps[i].insertAdjacentHTML("afterend", adapterHtml);
      }
    }
  };
  //____________________________________________________________________
  //Adjust height of stack after certain threshold value, in order to fit on a4 pdf
  _scaleStack = function () {
    this._retarget();
    this._allComps.forEach((el) => el.classList.remove("active"));
    this._leftArray.forEach((el) => el.classList.remove("active"));
    this._rightArray.forEach((el) => el.classList.remove("active"));

    let stackHeight = 0;
    let newHeight;
    let factor;
    let result;

    this._allHeightText.forEach(function (el) {
      stackHeight += parseFloat(el.innerHTML.slice(0, -1));
    });

    if (stackHeight > STACK_MAX) {
      factor = (stackHeight - STACK_MAX) / stackHeight;
      result = (100 - factor * 100) / 100;
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

    this._leftArray.forEach(function (el) {
      el.style.width = $(el).width() * result + "px";
    });

    this._rightArray.forEach(function (el) {
      el.style.width = $(el).width() * result + "px";
    });

    //______________________________________________________________________

    if (stackHeight > STACK_MAX_FOR_OPTS) {
      this._allSpacers.forEach(function (el) {
        el.style.height = "0px";
      });
    }

    newHeight = stackHeight;
    return newHeight;
  };
}

export default new AdaptorsView();
