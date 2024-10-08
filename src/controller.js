import stackView from "./views/stackView.js";
import heightsView from "./views/heightsView.js";
import stackBtnsView from "./views/stackBtnsView.js";
import { setIds, setIdsSides } from "./helpers.js";
import optionsView from "./views/optionsView.js";
import adaptorsView from "./views/adaptorsView.js";
import notesView from "./views/notesView.js";
import pdfView from "./views/pdfView.js";

console.log("MVC2 - Oct 8, 2024");
//____________________________________________________________________
const controlStackBtns = function (arrayEl) {
  stackView._retarget();
  const compVal = arrayEl.attributes.class.nodeValue.split(" ")[1];
  stackView._compFlag = compVal;
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
  heightsView._addCompHeight(compVal);
};
//____________________________________________________________________
controlCrossPlusMinus = function (sign) {
  stackView._retarget();
  if (stackView._activeSideComp) {
    sign === "plus"
      ? stackView._addSideComp(stackView._sideFlag)
      : stackView._delSideComp(stackView._sideFlag);
    setIdsSides();
  }
};
//____________________________________________________________________
controlCompClick = function (clicked) {
  stackView._retarget();
  stackView._allComps.forEach((el) => el.classList.remove("active"));
  stackView._activeSideComp?.classList.remove("active");
  stackBtnsView.toggleCrossBtns("remove");
  heightsView._allHeightDivs.forEach((el) => el.classList.remove("highlight"));
  optionsView._resetOptions();
  clicked.classList.add("active");
  stackView._retarget();
};
//____________________________________________________________________
controlHeight = function () {
  heightsView._retarget();
  heightsView._allHeightDivs.forEach((el) => el.classList.remove("highlight"));
  heightsView._activeHeightDiv.classList.add("highlight");
};
//____________________________________________________________________
controlOptions = function (clicked) {
  optionsView._retarget();
  if (clicked.classList.contains("second")) optionsView._secondOptsFlag = true;
  if (stackView._compFlag === "single" || stackView._compFlag === "double") {
    optionsView._typeOpts.classList.remove("hide");
    optionsView._rangeOpts.classList.remove("hide");
  }
  optionsView._optsModal.classList.remove("hide");
};
//____________________________________________________________________
controlOptsModal = function (clicked) {
  optionsView._setOptsText(clicked);
};
//____________________________________________________________________
controlModalBtn = function () {
  optionsView._closeModal();
};
//____________________________________________________________________
controlAdapt = function () {
  adaptorsView._autoAdapt();
};
//____________________________________________________________________
controlScaleStack = function () {
  adaptorsView._newHeight = adaptorsView._scaleStack();
};
//____________________________________________________________________
controlNotes = function (title, notes) {
  notesView._jobTitle = title;
  notesView._notes = notes;
};
//____________________________________________________________________

controlPDF = function () {
  adaptorsView._newHeight = adaptorsView._scaleStack();
  pdfView._convertToPDF(adaptorsView._newHeight);
};
//____________________________________________________________________

const init = function () {
  stackBtnsView._addHandlerStackBtns(controlStackBtns);
  stackBtnsView._addHandlerCrossPlusMinus(controlCrossPlusMinus);
  stackView._addHandlerCompClick(controlCompClick);
  heightsView._addHandlerHeight(controlHeight);
  optionsView._addHandlerOptions(controlOptions);
  optionsView._addHandlerModalBtn(controlModalBtn);
  optionsView._addHandlerOptsModal(controlOptsModal);
  adaptorsView._addHandlerAdapt(controlAdapt);
  adaptorsView._addHandlerScaleStack(controlScaleStack);
  adaptorsView._addHandlerPDF(controlPDF);
  notesView._addHandlerNotes(controlNotes);
};
init();
