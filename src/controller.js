import { COMP_CLASSES } from "./config";
import * as model from "./model.js";
import View from "./views/View.js";
import stackView from "./views/stackView.js";
import heightsView from "./views/heightsView.js";
import stackBtnsView from "./views/stackBtnsView.js";

const controlAdjustStack = function (arrayEl) {
  const compVal = arrayEl.attributes.class.nodeValue.split(" ")[1];

  //Adding component and setting ids
  if (compVal === "plus") {
    stackView.addComponent();
  }

  //Removing component and setting ids
  else if (compVal === "minus") {
    stackView.removeComponent();
  } else if (compVal === "cr") {
    console.log("new cross btn");
  }
  //Configuring component
  else {
    stackView.addCompImg(compVal);

    if (compVal === "cross") {
      stackBtnsView.assignSideClicks("left");
      stackBtnsView.assignSideClicks("right");
    }
  }
  stackView.setIds();
  if (stackView._sideActiveFlag === false) {
    stackBtnsView.toggleCrossBtns();
  }

  stackView.setIdsSides();
  stackView.addHandlerHandO();
  heightsView.addCompHeight(compVal);
};

controlAdjustCross = function (sign) {
  sign === "plus"
    ? stackView.addSideComp(stackView._sideFlag)
    : stackView.removeSideComp(stackView._sideFlag);
  stackView.setIdsSides();
};

controlCompSelect = function (clicked, sideActive = true) {
  stackView._allCompDivs = stackView._compWrapper.querySelectorAll(".comp-div");
  stackView._activeSideComp = [
    ...stackView._compWrapper.querySelectorAll(".left_comp.active"),
    ...stackView._compWrapper.querySelectorAll(".right_comp.active"),
  ];
  stackView._allCompDivs.forEach(function (el) {
    el.classList.remove("active");
  });
  clicked.classList.add("active");
  if (sideActive) {
    stackView._activeSideComp.forEach(function (el) {
      el.classList.remove("active");
      //turn on cross comp buttons
      stackBtnsView.toggleCrossBtns();
    });
  }
};

// controlHandO = function (HeightorOpt) {
//   HeightorOpt === "height"
//     ? stackView._heightDiv.classList.toggle("highlight")
//     : stackView._optsDiv.classList.toggle("highlight");

//   // stackView._heightDiv.cl
//   //   console.log(highlight);
// };

const init = function () {
  stackView.addHandlerAdjustBlocks(controlAdjustStack);
  stackView.addHandlerAdjustCross(controlAdjustCross);
  stackView.addHandlerCompSelect(controlCompSelect);
  //   stackView.addHandlerHandO(controlHandO);
};

init();
