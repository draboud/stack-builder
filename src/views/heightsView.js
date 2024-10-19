import { COMP_HEIGHTS } from "../config.js";
import stackView from "./stackView.js";
import View from "./View.js";

class HeightsView extends View {
  _heightModal = document.querySelector(".height_modal");
  _heightForm = document.querySelector(".heightForm");
  //_________________________________________________________________________
  //Height clicks assigned to height text
  _addHandlerHeight(handler) {
    this._retarget();
    this._allHeightDivs.forEach((el) =>
      addEventListener("click", function (e) {
        const clicked = e.target.closest(".height-div");
        if (!clicked) return;
        handler();
      })
    );
  }
  //_________________________________________________________________________
  //Height modal
  _addHandlerHeightModal(handler) {
    this._retarget();
    this._heightForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const heightInput = document.querySelector(".height_input");
      if (isNaN(heightInput.value)) {
        console.log("Enter a number value");
        heightInput.value = "";
        return;
      }
      stackView._activeComp.querySelector(".height-text").innerHTML =
        heightInput.value + '"';
      heightInput.value = "";
      handler();
    });

    this._heightModal.addEventListener("click", function (e) {
      const clicked = e.target.closest(".modal_close_button");
      if (!clicked) return;
      handler();
    });
  }
  //_________________________________________________________________________
  //Assign component heights
  _addCompHeight(compVal) {
    if (
      compVal != "spl" &&
      compVal != "man" &&
      compVal != "hyd" &&
      compVal != "plus" &&
      compVal != "minus"
    ) {
      this._retarget();
      this._activeComp = document.querySelector(".comp-div.active");
      this._activeComp.querySelector(".height-text").innerHTML =
        COMP_HEIGHTS[compVal] + '"';
    }
  }
}

export default new HeightsView();
