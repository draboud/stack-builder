import { COMP_HEIGHTS } from "../config.js";
import View from "./View.js";

class HeightsView extends View {
  //_________________________________________________________________________
  //Assign component heights
  addCompHeight = function (compFlag) {
    this._activeComp = document.querySelector(".comp-div.active");
    this._activeComp.querySelector(".height-text").innerHTML =
      COMP_HEIGHTS[compFlag] + '"';
  };
}

export default new HeightsView();
