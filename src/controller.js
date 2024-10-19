import stackView from "./views/stackView.js";
import heightsView from "./views/heightsView.js";
import stackBtnsView from "./views/stackBtnsView.js";
import { setIds, setIdsSides } from "./helpers.js";
import optionsView from "./views/optionsView.js";
import adaptorsView from "./views/adaptorsView.js";
import notesView from "./views/notesView.js";
import pdfView from "./views/pdfView.js";
import statsView from "./views/statsView.js";

console.log("Cross-Notes - Oct 19, 2024");

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
      adaptorsView._autoAdapt();
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
  statsView._liveHeightTotal();
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
  // heightsView._retarget();
  // heightsView._allHeightDivs.forEach((el) => el.classList.remove("highlight"));
  // heightsView._activeHeightDiv.classList.add("highlight");
  heightsView._heightModal.classList.remove("hide");
  document.querySelector(".height_input").focus();
};
//____________________________________________________________________
controlHeightModal = function () {
  heightsView._heightModal.classList.add("hide");
  statsView._liveHeightTotal();
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
controlBoreInput = function (boreValue) {
  optionsView._boreFinalValue = boreValue + '"';
  document
    .querySelector(".modal_column.bore")
    .querySelector(".opt_div.custom")
    .firstElementChild.classList.add("selected");
  //register 'click' on custom option
  document
    .querySelector(".modal_column.bore")
    .querySelector(".opt_div.custom")
    .click();
};
//____________________________________________________________________
controlTypeInput = function (typeValue) {
  console.log("custom type set");
  optionsView._typeFinalValue = typeValue;
  document
    .querySelector(".modal_column.type")
    .querySelector(".opt_div.custom")
    .firstElementChild.classList.add("selected");
  //register 'click' on custom option
  document
    .querySelector(".modal_column.type")
    .querySelector(".opt_div.custom")
    .click();
};
//____________________________________________________________________
controlRangeInput = function (rangeValue) {
  optionsView._rangeFinalValue = rangeValue + '"';
  document
    .querySelector(".modal_column.range")
    .querySelector(".opt_div.custom")
    .firstElementChild.classList.add("selected");
  //register 'click' on custom option
  document
    .querySelector(".modal_column.range")
    .querySelector(".opt_div.custom")
    .click();
};
//____________________________________________________________________
controlPressInput = function (pressValue) {
  optionsView._pressFinalValue = pressValue + "&nbsp;PSI";
  document
    .querySelector(".modal_column.pressure")
    .querySelector(".opt_div.custom")
    .firstElementChild.classList.add("selected");
  //register 'click' on custom option
  document
    .querySelector(".modal_column.pressure")
    .querySelector(".opt_div.custom")
    .click();
};
//____________________________________________________________________
controlAdapt = function () {
  adaptorsView._autoAdapt();
  statsView._liveHeightTotal();
};
//____________________________________________________________________
controlScaleStack = function () {
  adaptorsView._newHeight = adaptorsView._scaleStack();
};
//____________________________________________________________________
controlNotesBtn = function () {
  notesView._modalBlockout.classList.remove("hide");
  notesView._notesForm.classList.remove("hide");
};
//____________________________________________________________________
controlNotes = function (title, notes) {
  notesView._jobTitle = title;
  notesView._notes = notes;
  notesView._notesForm.classList.add("hide");
  notesView._modalBlockout.classList.add("hide");
};
//____________________________________________________________________
controlNotesCloseBtn = function () {
  notesView._notesForm.classList.add("hide");
  notesView._modalBlockout.classList.add("hide");
};
//____________________________________________________________________
controlModalBlockout = function (modal) {
  notesView._modalBlockout.classList.add("hide");
  notesView._notesForm.classList.add("hide");
};
//____________________________________________________________________

controlPDF = function () {
  adaptorsView._newHeight = adaptorsView._scaleStack();
  pdfView._convertToPDF(adaptorsView._newHeight);
  setTimeout(() => {
    adaptorsView._descaling();
  }, 1);
};
//____________________________________________________________________

const init = function () {
  statsView._setDate();
  stackBtnsView._addHandlerStackBtns(controlStackBtns);
  stackBtnsView._addHandlerCrossPlusMinus(controlCrossPlusMinus);
  stackView._addHandlerCompClick(controlCompClick);
  heightsView._addHandlerHeight(controlHeight);
  heightsView._addHandlerHeightModal(controlHeightModal);
  optionsView._addHandlerOptions(controlOptions);
  optionsView._addHandlerModalBtn(controlModalBtn);
  optionsView._addHandlerOptsModal(controlOptsModal);
  optionsView._addHandlerBoreForm(controlBoreInput);
  optionsView._addHandlerTypeForm(controlTypeInput);
  optionsView._addHandlerRangeForm(controlRangeInput);
  optionsView._addHandlerPressForm(controlPressInput);
  adaptorsView._addHandlerAdapt(controlAdapt);
  adaptorsView._addHandlerScaleStack(controlScaleStack);
  adaptorsView._addHandlerPDF(controlPDF);
  notesView._addHandlerNotesBtn(controlNotesBtn);
  // notesView._addHandlerNotes(controlNotes);
  notesView._addHandlerNotesCloseBtn(controlNotesCloseBtn);
  notesView._addHandlerSaveBtn(controlNotes);
  notesView._addHandlerModalBlockout(controlModalBlockout);
};
init();

//TEST AREA....................................................
//.............................................................
