import stackView from "./views/stackView.js";
import heightsView from "./views/heightsView.js";
import stackBtnsView from "./views/stackBtnsView.js";
import { setIds, setIdsSides } from "./helpers.js";
import optionsView from "./views/optionsView.js";
import adaptorsView from "./views/adaptorsView.js";
import notesView from "./views/notesView.js";
import pdfView from "./views/pdfView.js";
import statsView from "./views/statsView.js";

console.log("adapt-config Nov 3, 2024");

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
      adaptorsView._addHandlerAdaptors(controlAdapt);
      stackView._arrangeCrossLetters();
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
      adaptorsView._autoAdapt();
      adaptorsView._addHandlerAdaptors(controlAdapt);
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
  heightsView._heightModal.classList.remove("hide");
  document.querySelector(".height_input").focus();
  notesView._modalBlockout.classList.remove("hide");
};
//____________________________________________________________________
controlHeightModal = function () {
  heightsView._clearAndCloseHeight();
  notesView._modalBlockout.classList.add("hide");
  statsView._liveHeightTotal();
};
//____________________________________________________________________
controlOptions = function (clicked) {
  optionsView._retarget();
  if (clicked.classList.contains("second")) optionsView._secondOptsFlag = true;
  if (stackView._compFlag === "single" || stackView._compFlag === "double") {
    optionsView._typeOpts.classList.remove("hide");
    // optionsView._rangeOpts.classList.remove("hide");
  }
  optionsView._labelText.innerHTML =
    stackView._compFlag.charAt(0).toUpperCase() + stackView._compFlag.slice(1);

  optionsView._optsModal.classList.remove("hide");
  notesView._modalBlockout.classList.remove("hide");
};
//____________________________________________________________________
controlOptsModal = function (clicked) {
  optionsView._setOptsText(clicked);
  adaptorsView._autoAdapt();
  adaptorsView._addHandlerAdaptors(controlAdapt);
  statsView._liveHeightTotal();
};
//____________________________________________________________________
controlModalBtn = function () {
  optionsView._closeModal();
};
//____________________________________________________________________
controlLabelInput = function (labelValue) {
  optionsView._labelFinalValue = optionsView._formatInputs(labelValue);
  optionsView._labelText.innerHTML = labelValue;
  document
    .querySelector(".label_column")
    .querySelector(".opt_div.custom")
    .firstElementChild.classList.add("selected");
};
//____________________________________________________________________
controlBoreInput = function (boreValue) {
  optionsView._boreFinalValue = optionsView._formatInputs(boreValue, "bore");

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
  optionsView._typeFinalValue = optionsView._formatInputs(typeValue, "type");
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
  optionsView._rangeFinalValue = optionsView._formatInputs(rangeValue, "range");
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
  optionsView._pressFinalValue = optionsView._formatInputs(
    pressValue,
    "pressure"
  );
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
controlAdapt = function (clicked) {
  adaptorsView._clickedAdaptor = clicked;
  optionsView._adaptMiniMenu.classList.toggle("hide");
  controlShowBlackout();
};
//____________________________________________________________________
controlScaleStack = function () {
  adaptorsView._newHeight = adaptorsView._scaleStack();
};
//____________________________________________________________________
controlNotesBtn = function () {
  notesView._modalBlockout.classList.remove("hide");
  notesView._notesForm.classList.remove("hide");
  document.querySelector(".job_title_input").focus();
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
  controlHideModals();
};
//____________________________________________________________________
controlPDF = function () {
  optionsView.optOutput;
  adaptorsView._newHeight = adaptorsView._scaleStack();
  pdfView._convertToPDF(adaptorsView._newHeight);
  setTimeout(() => {
    adaptorsView._descaling();
  }, 1);
};

//____________________________________________________________________
controlToggleCrossMiniMenu = function () {
  optionsView._crossMiniMenu.classList.toggle("hide");
  controlShowBlackout();
};
//____________________________________________________________________
controlToggleAdaptMiniMenu = function () {
  optionsView._adaptMiniMenu.classList.toggle("hide");
  controlHideBlackout();
};
//____________________________________________________________________
controlCrossMiniItem = function (miniItem) {
  miniItem.classList[1] === "height"
    ? controlHeight()
    : controlOptions(miniItem);
  this.controlToggleCrossMiniMenu();
};
//____________________________________________________________________
controlAdaptMiniItem = function (miniItem) {
  adaptorsView._configAdaptor(miniItem.classList[1]);
  this.controlToggleAdaptMiniMenu();
};
//____________________________________________________________________
controlShowBlackout = function () {
  notesView._modalBlockout.classList.remove("hide");
};
//____________________________________________________________________
controlHideBlackout = function () {
  notesView._modalBlockout.classList.add("hide");
};
//____________________________________________________________________
controlHideModals = function () {
  controlHideBlackout();
  notesView._notesForm.classList.add("hide");
  heightsView._clearAndCloseHeight();
  optionsView._closeModal();
  optionsView._crossMiniMenu.classList.add("hide");
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
  optionsView._addHandlerLabelForm(controlLabelInput);
  optionsView._addHandlerBoreForm(controlBoreInput);
  optionsView._addHandlerTypeForm(controlTypeInput);
  optionsView._addHandlerRangeForm(controlRangeInput);
  optionsView._addHandlerPressForm(controlPressInput);
  // adaptorsView._addHandlerAdaptors(controlAdapt);
  adaptorsView._addHandlerPDF(controlPDF);
  notesView._addHandlerNotesBtn(controlNotesBtn);
  notesView._addHandlerNotesCloseBtn(controlNotesCloseBtn);
  notesView._addHandlerSaveBtn(controlNotes);
  notesView._addHandlerModalBlockout(controlModalBlockout);
  optionsView._addHandlerCrossMiniItem(controlCrossMiniItem);
  optionsView._addHandlerAdaptMiniItem(controlAdaptMiniItem);
};
init();

//TEST AREA....................................................
const testBtn = document.querySelector(".test_button");
const testText = document.querySelector(".opts-text-test");
const activeDiv = document.querySelector(".comp-div.active");
const compText = activeDiv.querySelector(".opts-text");

//.............................................................
testBtn.addEventListener("click", function () {
  // adaptorsView._addHandlerAdaptors();
});
//.............................................................
