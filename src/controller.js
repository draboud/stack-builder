import { COMP_CLASSES, COMP_IMG } from "./config";
import * as model from "./model.js";
import View from "./Views/View.js";
import stackView from "./views/stackView.js";
import heightsView from "./views/heightsView.js";
import stackBtnsView from "./Views/stackBtnsView.js";
import { setIds, setIdsSides } from "./helpers.js";

console.log("CONTROLLER - Oct 3, 2024");

const controlStackBtns = function (arrayEl) {
  stackView._retarget();
  const compVal = arrayEl.attributes.class.nodeValue.split(" ")[1];

  switch (compVal) {
    case "plus":
      stackView._addComp();
      break;
    case "minus":
      stackView._delComp();
      break;
    case "spl":
    case "man":
    case "hyd":
      if (stackView._activeSideComp) {
        console.log("active side!");
        stackView._configCrossComp(compVal);
      }
      break;
    default:
      stackView._configComp(compVal);
  }

  if (stackView._sideActiveFlag === false) {
    stackBtnsView.toggleCrossBtns("remove");
  }
  setIds();
  setIdsSides();
  stackView._addHandlerHandO();
  heightsView._addCompHeight(compVal);
};

controlCrossPlusMinus = function (sign) {
  stackView._retarget();
  if (stackView._activeSideComp) {
    sign === "plus"
      ? stackView._addSideComp(stackView._sideFlag)
      : stackView._delSideComp(stackView._sideFlag);
    setIdsSides();
  }
};

controlCompClick = function (clicked) {
  stackView._retarget();
  stackView._allComps.forEach((el) => el.classList.remove("active"));

  stackView._activeSideComp?.classList.remove("active");
  stackBtnsView.toggleCrossBtns("remove");
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
  stackBtnsView._addHandlerStackBtns(controlStackBtns);
  stackBtnsView._addHandlerCrossPlusMinus(controlCrossPlusMinus);
  stackView._addHandlerCompClick(controlCompClick);
  //   stackView.addHandlerHandO(controlHandO);
};

init();
