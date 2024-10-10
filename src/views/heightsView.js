import { COMP_HEIGHTS } from "../config.js";
import View from "./View.js";

class HeightsView extends View {
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
