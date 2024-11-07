import stackView from "./stackView";
import notesView from "./notesView";
import View from "./View";
// import adaptorsView from "./adaptorsView";
let extractObj = {};
let currentColumn;
let newText;

class OptionsView extends View {
  _optsModal = document.querySelector(".options_modal");
  _typeOpts = document.querySelector(".modal_column.type");
  _rangeOpts = document.querySelector(".modal_column.range");
  _labelForm = document.querySelector(".labelForm");
  _labelText = document.querySelector(".label_opt_text");
  _boreForm = document.querySelector(".boreForm");
  _typeForm = document.querySelector(".typeForm");
  _rangeForm = document.querySelector(".rangeForm");
  _pressForm = document.querySelector(".pressForm");
  _labelInput = document.querySelector(".label_input");
  _boreInput = document.querySelector(".bore_input");
  _typeInput = document.querySelector(".type_input");
  _rangeInput = document.querySelector(".range_input");
  _pressInput = document.querySelector(".press_input");

  _crossMiniMenu = document.querySelector(".cross_mini_menu");
  _crossMiniItems = document.querySelectorAll(".cross-mini-item");
  _adaptMiniMenu = document.querySelector(".adapt_mini_menu");
  _adaptMiniItems = document.querySelectorAll(".adapt-mini-item");

  _customDiv = document.querySelector(".opt_div.custom");

  _labelFinalValue;
  _boreFinalValue;
  _typeFinalValue;
  _rangeFinalValue;
  _pressFinalValue;

  _secondOptsFlag;

  //Option clicks assigned to opts text
  _addHandlerOptions(handler) {
    this._retarget();
    this._allOptsDivs.forEach((el) =>
      addEventListener("click", function (e) {
        const clicked = e.target.closest(".opts-text");
        if (!clicked) return;
        handler(clicked);
      })
    );
  }
  //_________________________________________________________________________
  _addHandlerOptsModal(handler) {
    this._optsModal.addEventListener("click", function (e) {
      const clicked = e.target.closest(".opt_div");
      if (!clicked) return;
      handler(clicked);
    });
  }
  //_________________________________________________________________________
  _addHandlerModalBtn(handler) {
    this._optsModal.addEventListener("click", function (e) {
      const clicked = e.target.closest(".modal_close_button");
      if (!clicked) return;
      handler();
    });
  }
  //_________________________________________________________________________
  _addHandlerLabelForm(handler) {
    this._labelForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const labelInputValue = document.querySelector(".label_input").value;
      handler(labelInputValue);
    });
  }
  //_________________________________________________________________________
  _addHandlerBoreForm(handler) {
    this._boreForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const boreInputValue = document.querySelector(".bore_input").value;
      handler(boreInputValue);
    });
  }
  //_________________________________________________________________________
  _addHandlerTypeForm(handler) {
    this._typeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const typeInputValue = document.querySelector(".type_input").value;
      handler(typeInputValue);
    });
  }
  //_________________________________________________________________________
  _addHandlerRangeForm(handler) {
    this._rangeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const rangeInputValue = document.querySelector(".range_input").value;
      handler(rangeInputValue);
    });
  }
  //_________________________________________________________________________
  _addHandlerPressForm(handler) {
    this._pressForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const pressInputValue = document.querySelector(".press_input").value;
      handler(pressInputValue);
    });
  }
  //_________________________________________________________________________
  _setOptsText(clicked) {
    // let currentColumn;
    // let newText;
    //..........................................................................

    this._retarget();
    let optOutput = "";
    const arrExtra = [this._allTypeOptsText, this._allRangeOptsText];
    let arrUse = [this._allBoreOptsText, this._allPressOptsText];
    let selectedText = "";

    if (stackView._compFlag === "single" || stackView._compFlag === "double") {
      // arrUse = arrUse.slice(1, 1).concat(arrExtra, arrUse.slice(2));
      arrUse = arrUse.slice(0, 1).concat(arrExtra, arrUse.slice(1));
    }
    const textChild = clicked.firstElementChild;
    this._setActiveOpt(textChild);
    if (
      arrUse.every((el) => el.find((el2) => el2.classList.contains("selected")))
    ) {
      extractObj = {};

      arrUse.forEach(function (el) {
        selectedText = el.find((el2) => el2.classList.contains("selected"));
        //create a spaceholder in array to store user entered value
        selectedText.innerHTML === "Custom:"
          ? (optOutput += "&nbsp;" + "|")
          : (optOutput += selectedText.innerHTML + "|");

        //........................................................................
        //this sectioned-off code extracts data for options object (save opts)
        currentColumn = selectedText
          .closest(".modal_column")
          .className.split(" ")[1];
        newText = selectedText.innerHTML.split("_")[0];

        if (newText === "Custom:") {
          newText = document.querySelector(`.${currentColumn}_input`).value;
        }

        extractObj[currentColumn] = newText;
      });
      if (this._labelFinalValue) {
        extractObj.label = this._labelFinalValue;
      } else
        extractObj.label = document.querySelector(".label_opt_text").innerHTML;
      extractObj.id = this._activeComp.id;
      console.log("extractObj: ", extractObj);

      //........................................................................

      optOutput = optOutput.split("|");

      if (this._boreFinalValue) optOutput[0] = this._boreFinalValue;
      if (this._typeFinalValue) optOutput[1] = this._typeFinalValue;

      if (this._rangeFinalValue) {
        if (this._rangeFinalValue === "none") optOutput[2] = "DISCARD";
        else optOutput[2] = this._rangeFinalValue.replaceAll("-", "&#8209;");
      }
      if (this._pressFinalValue) {
        this._typeOpts.classList.contains("hide")
          ? (optOutput[1] = this._pressFinalValue)
          : (optOutput[3] = this._pressFinalValue);
      }
      //removes range element from array if range is empty
      if (optOutput[2] === "DISCARD") optOutput.splice(2, 1);
      optOutput.splice(-1, 1);
      if (this._labelFinalValue) {
        optOutput = optOutput
          .slice(0, 1)
          .concat(this._labelFinalValue, optOutput.slice(1));
      } else {
        optOutput = optOutput
          .slice(0, 1)
          .concat(
            stackView._compFlag.charAt(0).toUpperCase() +
              stackView._compFlag.slice(1),
            optOutput.slice(1)
          );
      }
      optOutput = optOutput.toString();
      optOutput = optOutput.replaceAll(",", "&nbsp;");
      optOutput = optOutput.replaceAll("&#8209;", "-");
      this._allOptsModalText.forEach((el) => el.classList.remove("selected"));

      this._activeOptsDiv.querySelector(
        this._secondOptsFlag ? ".opts-text.second" : ".opts-text"
      ).innerHTML = this._formatInputs(optOutput);

      this._formatInputs(optOutput);
      this._resetOptions();
      this._closeModal();
    }
  }
  //_________________________________________________________________________
  _setActiveOpt(selectedText) {
    const allColumnOpts = [
      ...selectedText.closest(".modal_column").querySelectorAll(".opt_div"),
    ];
    allColumnOpts.forEach((el) =>
      el.firstElementChild.classList.remove("selected")
    );
    selectedText.classList.add("selected");

    //if selecting a default from list, clear potential input from custom entry
    if (!selectedText.closest(".opt_div").classList.contains("custom")) {
      selectedText
        .closest(".modal_column")
        .querySelector(`.${selectedText.className.split("_")[0]}_input`).value =
        "";
    }

    //flyout range option if VBA is selected
    if (
      selectedText.closest(".modal_column").classList.contains("type") &&
      selectedText.innerHTML === "VBA"
    ) {
      this._rangeOpts.classList.remove("hide");
      this._rangeOpts
        .querySelector(".opt_div.custom")
        .firstElementChild.classList.remove("selected");
    } else if (
      selectedText.closest(".modal_column").classList.contains("type") &&
      selectedText.innerHTML != "VBA"
    ) {
      this._rangeOpts.classList.add("hide");
      this._rangeFinalValue = "none";
      // this._rangeOpts.querySelector(".opt_div.custom").click();

      this._rangeOpts
        .querySelector(".opt_div.custom")
        .firstElementChild.classList.add("selected");
    }
  }
  //_________________________________________________________________________
  _formatInputs(inputStr, type) {
    let finalOutStr;

    finalOutStr =
      inputStr.charAt(0).toUpperCase() +
      inputStr.slice(1).replaceAll(" ", "&nbsp;").replaceAll("-", "&#8209;");

    //..............................................................
    if (inputStr.length > 55) {
      let stringToArr = inputStr.split("&nbsp;");
      let arrStrings = [];
      let lineCharTally = 0;
      let lineBreakArr = [];

      for (let i = 0; i < stringToArr.length - 1; i++) {
        stringToArr[i] += " ";
      }
      arrStrings = [...stringToArr];

      stringToArr.forEach(function (el, ind) {
        lineCharTally += el.length;
        if (lineCharTally >= 55) {
          let shiftToAvoidNum = 1;
          while (
            !isNaN(
              Number(
                stringToArr[ind - shiftToAvoidNum].charAt(
                  stringToArr[ind - shiftToAvoidNum].length - 2
                )
              )
            )
          ) {
            shiftToAvoidNum += 1;
          }
          lineBreakArr.push(ind - shiftToAvoidNum);

          lineCharTally = el.length;
        }
      });

      lineBreakArr.forEach(function (el) {
        arrStrings[el] = stringToArr[el].slice(0, -1);
        arrStrings[el] += "\n";
      });
      finalOutStr = arrStrings.join("").replaceAll(" ", "&nbsp;");
    }

    //..............................................................
    // Type checks
    if (type === "bore") {
      finalOutStr += '"';
      return finalOutStr;
    }
    if (type === "range") {
      const inputStrSplit = finalOutStr.split("&#8209;");
      let addInch = [];

      inputStrSplit.forEach(function (el) {
        addInch.push((el += '"'));
      });
      finalOutStr = addInch.join("-");

      return finalOutStr;
    }
    if (type === "pressure") {
      finalOutStr += "&nbsp;PSI";
      return finalOutStr;
    }

    //..............................................................
    return finalOutStr;
  }
  //_________________________________________________________________________

  _resetOptions() {
    this._labelFinalValue = "";
    this._boreFinalValue = "";
    this._typeFinalValue = "";
    this._rangeFinalValue = "";
    this._pressFinalValue = "";
    this._labelInput.value = "";
    this._boreInput.value = "";
    this._typeInput.value = "";
    this._rangeInput.value = "";
    this._pressInput.value = "";

    this._typeOpts.classList.add("hide");
    this._rangeOpts.classList.add("hide");
    this._secondOptsFlag = false;
  }
  //_________________________________________________________________________
  _closeModal() {
    this._optsModal.classList.add("hide");
    notesView._modalBlockout.classList.add("hide");
    const allOpts = [...document.querySelectorAll(".opt_div")];
    allOpts.forEach((el) => el.firstElementChild.classList.remove("selected"));
    this._secondOptsFlag = false;
  }
  //____________________________________________________________________
  //Click event for cross note letter as alternative entry to height/options menus
  _addHandlerCrossNoteBtn = function () {
    this._retarget();
    const crossNoteBtn = this._activeComp.querySelector(".cross_note_div");

    crossNoteBtn.addEventListener("click", function (e) {
      const clicked = e.target.closest(".cross_note_div");
      if (!clicked) return;

      controlToggleCrossMiniMenu();
    });
  };
  //____________________________________________________________________
  _addHandlerCrossMiniItem = function (handler) {
    this._crossMiniItems.forEach((el) =>
      el.addEventListener("click", function (e) {
        const clicked = e.target.closest(".cross-mini-item");
        if (!clicked) return;
        handler(clicked);
      })
    );
  };
  //____________________________________________________________________
  _addHandlerAdaptMiniItem = function (handler) {
    this._adaptMiniItems.forEach((el) =>
      el.addEventListener("click", function (e) {
        const clicked = e.target.closest(".adapt-mini-item");
        if (!clicked) return;
        handler(clicked);
      })
    );
  };
  //____________________________________________________________________
}

export default new OptionsView();
