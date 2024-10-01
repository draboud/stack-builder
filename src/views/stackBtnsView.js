import View from "./View";
import { COMP_CLASSES } from "../config";

const [compSpl, compMan, compHyd] = Array.from([
  ...document.querySelectorAll(".comp_button.cr"),
]);

class StackBtnsView extends View {
  //_____________________________________________________________________
  //Turn on/off cross buttons
  toggleCrossBtns() {
    compSpl.classList.toggle("on");
    compMan.classList.toggle("on");
    compHyd.classList.toggle("on");
  }
  //_____________________________________________________________________
  //Side component events for cross
  assignSideClicks = function (side) {
    const activeCrossDiv = this._compWrapper.querySelector(
      ".comp-div.active.cross"
    );
    const sideDiv = activeCrossDiv.querySelector(`.side_${side}_div`);

    sideDiv.addEventListener("click", (e) => {
      const clicked = e.target.closest(`.${side}_comp`);
      if (!clicked) return;

      this._allSideComps = [
        ...this._compWrapper.querySelectorAll(".left_comp"),
        ...this._compWrapper.querySelectorAll(".right_comp"),
      ];
      this._allSideComps.forEach(function (el) {
        el.classList.remove("active");
      });
      clicked.classList.add("active");
      this._sideFlag = `${side}`;
      //   //turn on cross comp buttons
      //   compSpl.classList.add("on");
      //   compMan.classList.add("on");
      //   compHyd.classList.add("on");
      this.toggleCrossBtns;
    });
  };
}

export default new StackBtnsView();
