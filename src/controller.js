import stackView from "./views/stackView.js";
import heightsView from "./views/heightsView.js";
import stackBtnsView from "./views/stackBtnsView.js";
import { setIdsContinual, setIdsSides } from "./helpers.js";
import optionsView from "./views/optionsView.js";
import adaptorsView from "./views/adaptorsView.js";
import notesView from "./views/notesView.js";
import pdfView from "./views/pdfView.js";
import statsView from "./views/statsView.js";
import * as model from "./model.js";

console.log("objs-to-modal2 Nov 29, 2024");

//____________________________________________________________________
const controlStackBtns = function (arrayEl) {
  stackView._retarget();
  let firstCompFlag = false;
  const compVal = arrayEl.attributes.class.nodeValue.split(" ")[1];
  stackView._compFlag = compVal;
  switch (compVal) {
    case "plus":
      stackView._addComp();
      setIdsContinual();
      break;
    case "minus":
      //don't delete opts of base comp:
      if (stackView._activeComp.id != "c-1") {
        model.removeOptsObject(stackView._activeComp.id, firstCompFlag);
      }

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
      model.removeOptsObject(stackView._activeComp.id, firstCompFlag);
      model.removeOptsObject(stackView._activeComp.id + "B", firstCompFlag);
      // optionsView._reviseBtn.classList.add("hide");
      stackView._configComp(compVal);
      adaptorsView._autoAdapt();
      adaptorsView._addHandlerAdaptors(controlAdapt);
  }
  if (stackView._sideActiveFlag === false) {
    stackBtnsView.toggleCrossBtns("remove");
  }
  // setIds(); //ensures ids keep counting up, rather than resetting
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
  // debugger;
  optionsView._retarget();
  if (clicked.classList.contains("second")) optionsView._secondOptsFlag = true;
  if (stackView._compFlag === "single" || stackView._compFlag === "double") {
    optionsView._typeOpts.classList.remove("hide");
  }
  optionsView._labelText.innerHTML =
    stackView._compFlag.charAt(0).toUpperCase() + stackView._compFlag.slice(1);
  //......................................................
  //if matching id and not a double second
  if (
    model.state.find((el) => el.id === stackView._activeComp.id) &&
    !optionsView._secondOptsFlag
  ) {
    optionsView._getOptsObj(
      model.state.find((el) => el.id === stackView._activeComp.id)
    );
    optionsView._reviseBtn.classList.remove("hide");
    //if matching id but is a double second
  } else if (
    model.state.find((el) => el.id === stackView._activeComp.id + "B") &&
    optionsView._secondOptsFlag
  ) {
    if (model.state.find((el) => el.id === stackView._activeComp.id + "B")) {
      optionsView._getOptsObj(
        model.state.find((el) => el.id === stackView._activeComp.id + "B")
      );
    }
    optionsView._reviseBtn.classList.remove("hide");
  } else optionsView._reviseBtn.classList.add("hide");
  //......................................................
  optionsView._optsModal.classList.remove("hide");
  notesView._modalBlockout.classList.remove("hide");

  //if 'VBA' is held from options obj, open up range column
  const typeVBA = optionsView._allTypeOptsText.find(
    (el) => el.innerHTML === "VBA"
  );
  if (typeVBA.classList.contains("held"))
    optionsView._rangeOpts.classList.remove("hide");

  stackView._clickedComp = clicked;
};
//____________________________________________________________________
controlOptsModal = function (clicked) {
  optionsView._setOptsText(clicked);
  if (optionsView._finishedSettingOpts) {
    controlModalBtn();
  }
};
//____________________________________________________________________
controlModalBtn = function () {
  model.removeOptsObject(optionsView.extractObj.id);
  // model.removeOptsObject(stackView._activeComp.id + "B", firstCompFlag);
  model.state.push(optionsView.extractObj);
  optionsView.extractObj = {};
  optionsView._closeModal();
  optionsView._reviseBtn.classList.add("hide");
  adaptorsView._autoAdapt();
  adaptorsView._addHandlerAdaptors(controlAdapt);
  statsView._liveHeightTotal();
};
//____________________________________________________________________
controlLabelInput = function (labelValue) {
  // optionsView._labelFinalValue = optionsView._formatInputs(labelValue);
  // optionsView._finalValue.label = optionsView._formatInputs(labelValue);
  optionsView._finalValue.label = labelValue;

  optionsView._labelText.innerHTML = labelValue;
  document
    .querySelector(".label_column")
    .querySelector(".opt_div.custom")
    .firstElementChild.classList.add("selected");

  document
    .querySelector(".label_column")
    .querySelector(".opt_div.custom")
    .click();
};
//____________________________________________________________________
controlBoreInput = function (boreValue) {
  // optionsView._boreFinalValue = optionsView._formatInputs(boreValue, "bore");
  optionsView._finalValue.bore = optionsView._formatInputs(boreValue, "bore");

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
  // optionsView._typeFinalValue = optionsView._formatInputs(typeValue, "type");
  optionsView._finalValue.type = optionsView._formatInputs(typeValue, "type");

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
  // optionsView._rangeFinalValue = optionsView._formatInputs(rangeValue, "range");
  optionsView._finalValue.range = optionsView._formatInputs(
    rangeValue,
    "range"
  );

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
  // optionsView._pressFinalValue = optionsView._formatInputs(
  //   pressValue,
  //   "pressure"
  // );
  optionsView._finalValue.press = optionsView._formatInputs(
    pressValue,
    "press"
  );

  document
    .querySelector(".modal_column.press")
    .querySelector(".opt_div.custom")
    .firstElementChild.classList.add("selected");
  //register 'click' on custom option
  document
    .querySelector(".modal_column.press")
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
  optionsView.optOutput; //?
  stackView._fadeOutEmptyDivs();
  adaptorsView._newHeight = adaptorsView._scaleStack();
  pdfView._convertToPDF(adaptorsView._newHeight);
  setTimeout(() => {
    adaptorsView._descaling();
  }, 1);
  setTimeout(() => {
    stackView._fadeInEmptyDivs();
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
  optionsView._adaptMiniMenu.classList.add("hide");
};
//____________________________________________________________________
controlReviseBtn = function () {
  // optionsView._reviseOpts(optionsView._compFlag);
  optionsView._reviseOpts(model.state);
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
  optionsView._addHandlerReviseBtn(controlReviseBtn);
};
init();

//TEST AREA....................................................
const testBtn = document.querySelector(".test_button");
// let myObj = {};
testBtn.addEventListener("click", function () {
  // myObj.flag = false;
  // if (myObj.flag) {
  //   console.log("true");
  // } else console.log("false");
  console.log("model.state: ", model.state);
});
//.............................................................
