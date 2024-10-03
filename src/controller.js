import { COMP_CLASSES, COMP_IMG } from "./config";
import * as model from "./model.js";
import View from "./Views/View.js";
import stackView from "./views/stackView.js";
import heightsView from "./views/heightsView.js";
import stackBtnsView from "./Views/stackBtnsView.js";
import { setIds, setIdsSides } from "./helpers.js";

console.log("CONTROLLER - Oct 3, 2024");
// console.log(COMP_IMG.annular);

const controlStackBtns = function (arrayEl) {
  const compVal = arrayEl.attributes.class.nodeValue.split(" ")[1];
  // debugger;
  //Adding component and setting ids
  if (compVal === "plus") {
    stackView.addComp();
  }
  //Removing component and setting ids
  if (compVal === "minus") {
    stackView.delComp();
  }
  if (compVal === "cr") {
    console.log("new cross btn");
  }

  //Configuring component
  if (compVal != "plus" && compVal != "minus" && compVal != "cr") {
    stackView.configureComp(compVal);
  }
  if (stackView._sideActiveFlag === false) {
    stackBtnsView.toggleCrossBtns("remove");
  }
  setIds();
  setIdsSides();
  stackView.addHandlerHandO();
  heightsView.addCompHeight(compVal);
};

controlCrossPlusMinus = function (sign) {
  sign === "plus"
    ? stackView.addSideComp(stackView._sideFlag)
    : stackView.removeSideComp(stackView._sideFlag);
  setIdsSides();
};

controlCompClick = function (clicked) {
  stackView._retarget();
  stackView._allComps.forEach((el) => el.classList.remove("active"));
  // if (
  //   !clicked.querySelector(".left_comp.active") &&
  //   !clicked.querySelector(".right_comp.active")
  // ) {
  stackView._activeSideComp?.classList.remove("active");
  stackBtnsView.toggleCrossBtns("remove");
  // } else stackBtnsView.toggleCrossBtns("add");
  clicked.classList.add("active");
};

// controlHandO = function (HeightorOpt) {
//   HeightorOpt === "height"
//     ? stackView._heightDiv.classList.toggle("highlight")
//     : stackView._optsDiv.classList.toggle("highlight");

//   // stackView._heightDiv.cl
//   //   console.log(highlight);
// };

const init = function () {
  stackBtnsView.addHandlerStackBtns(controlStackBtns);
  stackBtnsView.addHandlerCrossPlusMinus(controlCrossPlusMinus);
  stackView.addHandlerCompClick(controlCompClick);
  //   stackView.addHandlerHandO(controlHandO);
};

init();
