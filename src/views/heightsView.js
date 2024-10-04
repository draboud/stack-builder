import { COMP_HEIGHTS } from "../config.js";
import View from "./View.js";
class HeightsView extends View {
  //_________________________________________________________________________
  //Assign component heights
  _addCompHeight = function (compVal) {
    if (compVal != "spl" && compVal != "man" && compVal != "hyd") {
      this._retarget();
      this._activeComp = document.querySelector(".comp-div.active");
      this._activeComp.querySelector(".height-text").innerHTML =
        COMP_HEIGHTS[compVal] + '"';
    }
  };
  //_________________________________________________________________________
  // //Assign height and options events
  // assignHandOClicks = function () {
  //   const heightDiv = this._activeComp.querySelector(".height-div");
  //   const optsDiv = this._activeComp.querySelector(".opts-div");

  //   heightDiv.addEventListener("mouseenter", function (e) {
  //     const hoverIn = e.target.closest(".height-div");
  //     if (!hoverIn) return;
  //     hoverIn.classList.add("highlight");
  //   });
  //   heightDiv.addEventListener("mouseout", function (e) {
  //     const hoverOut = e.target.closest(".height-div");
  //     if (!hoverOut) return;
  //     hoverOut.classList.remove("highlight");
  //   });

  //   optsDiv.addEventListener("click", function (e) {
  //     const clicked = e.target.closest(".opts-text");
  //     if (!clicked) return;
  //     clicked.classList.add("highlight");
  //   });

  //   optsDiv.addEventListener("click", function (e) {
  //     const clicked = e.target.closest(".opts-text");
  //     if (!clicked) return;
  //     optionsModal.classList.remove("hide");
  //   });
  // };
}

export default new HeightsView();
