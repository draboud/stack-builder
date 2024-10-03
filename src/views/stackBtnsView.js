import View from "./View";
import { COMP_CLASSES } from "../config";

const [compSpl, compMan, compHyd] = Array.from([
  ...document.querySelectorAll(".comp_button.cr"),
]);

class StackBtnsView extends View {
  addHandlerStackBtns(handler) {
    //Select main comp type
    const compButtonsDiv = document.querySelector(".vert_buttons_div");
    compButtonsDiv.addEventListener("click", function (e) {
      const clickedComp = e.target.closest(".comp_button");
      const clickedCompCross = e.target.closest(".comp_button_cr");
      const clickedAdd = e.target.closest(".comp_button_plus");
      const clickedMinus = e.target.closest(".comp_button_minus");

      const clickedArray = [
        clickedComp,
        clickedCompCross,
        clickedAdd,
        clickedMinus,
      ];
      handler(...clickedArray.filter((el) => el != null));
    });
  }
  //______________________________________________________________________
  //Side plus and minus clicks
  addHandlerCrossPlusMinus(handler) {
    const plusMinusWrapper = document.querySelector(".plus_minus_wrapper");
    plusMinusWrapper.addEventListener("click", function (e) {
      const clicked = e.target.closest(".side_effect");
      if (!clicked) return;
      e.stopPropagation();

      clicked.classList.contains("plus") ? handler("plus") : handler("minus");
    });
  }
  //_____________________________________________________________________
  //Turn on/off cross buttons
  toggleCrossBtns(addOrRemove) {
    addOrRemove === "add"
      ? [compSpl, compMan, compHyd].forEach((el) => el.classList.add("on"))
      : [compSpl, compMan, compHyd].forEach((el) => el.classList.remove("on"));
  }
}

export default new StackBtnsView();
