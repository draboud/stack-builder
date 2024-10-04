import View from "./View";

const ctrlBtns = document.querySelector(".control_buttons_div");

class AdaptorsView extends View {
  //Add handler to adapt button
  _addHandlerAdapt = function (handler) {
    ctrlBtns.addEventListener("click", function (e) {
      const clicked = e.target.closest(".adapt_button");
      if (!clicked) return;
      handler();
    });
  };
  //_________________________________________________________________________
  //Add adaptors to stack
  _autoAdapt = function () {
    this._retarget();
    let newLengthArray = [];
    let extArray = [];
    this._allAdaptors.forEach(function (el) {
      el.remove();
    });
    this._allOptsText.forEach(function (el) {
      let intArray = "";
      if (el.classList.contains("hide") || el.classList.contains("second")) {
        return;
      }
      newLengthArray.push(el);
      intArray += el.innerHTML;
      extArray.push(intArray);
    });
    for (let i = 0; i < newLengthArray.length - 1; i++) {
      if (extArray[i] !== extArray[i + 1]) {
        const adapterHtml = `
          <div class= "adapter_block">
            <div class= "option_letter top">${extArray[i]}</div>
            <div class=option_letter bottom">${extArray[i + 1]}</div>
          </div>`;
        this._allComps[i].insertAdjacentHTML("afterend", adapterHtml);
      }
    }
  };
}

export default new AdaptorsView();
