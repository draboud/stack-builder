import stackView from "./stackView";
import notesView from "./notesView";
import View from "./View";

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

  // _labelFinalValue;
  // _boreFinalValue;
  // _typeFinalValue;
  // _rangeFinalValue;
  // _pressFinalValue;

  _finalValue = {};

  _secondOptsFlag;
  _rangeOpenFlag = false;
  _finishedSettingOpts;

  extractObj = {};

  _reviseBtn = document.querySelector(".revise_button");

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
  _addHandlerReviseBtn(handler) {
    this._reviseBtn.addEventListener("click", function (e) {
      const clicked = e.target.closest(".revise_button");
      if (!clicked) return;
      handler();
    });
  }
  //_________________________________________________________________________
  _setOptsText(clicked) {
    this._finishedSettingOpts = false;
    //..........................................................................
    this._retarget();
    let optOutput = "";
    const arrExtra = [this._allTypeOptsText, this._allRangeOptsText];
    let arrUse = [this._allBoreOptsText, this._allPressOptsText];
    let selectedText = "";

    if (stackView._compFlag === "single" || stackView._compFlag === "double") {
      arrUse = arrUse.slice(0, 1).concat(arrExtra, arrUse.slice(1));
    }
    const textChild = clicked.firstElementChild;
    this._setActiveOpt(textChild);
    if (
      arrUse.every((el) => el.find((el2) => el2.classList.contains("selected")))
    ) {
      // this.extractObj = {};

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
        this.extractObj[currentColumn] = newText;
      }, this);
      if (this._finalValue.label) {
        this.extractObj.label = this._finalValue.label.replaceAll(
          "&nbsp;",
          " "
        );
        //........................................................................
        this.extractObj.labelFlag = true;
      } else {
        this.extractObj.label =
          document.querySelector(".label_opt_text").innerHTML;
        this.extractObj.labelFlag = false;
      }
      //........................................................................

      this._secondOptsFlag
        ? (this.extractObj.id = this._activeComp.id + "B")
        : (this.extractObj.id = this._activeComp.id);
      //........................................................................

      optOutput = optOutput.split("|");
      // if (this._boreFinalValue) optOutput[0] = this._boreFinalValue;
      if (this._finalValue.bore) optOutput[0] = this._finalValue.bore;

      // if (this._typeFinalValue) optOutput[1] = this._typeFinalValue;
      if (this._finalValue.type) optOutput[1] = this._finalValue.type;

      if (this._finalValue.range) {
        if (this._finalValue.range === "none") optOutput[2] = "DISCARD";
        else optOutput[2] = this._finalValue.range.replaceAll("-", "&#8209;");
      }
      if (this._finalValue.press) {
        this._typeOpts.classList.contains("hide")
          ? (optOutput[1] = this._finalValue.press)
          : (optOutput[3] = this._finalValue.press);
      }
      //removes range element from array if range is empty
      if (optOutput[2] === "DISCARD") optOutput.splice(2, 1);
      optOutput.splice(-1, 1);
      if (this._finalValue.label) {
        optOutput = optOutput
          .slice(0, 1)
          .concat(this._finalValue.label, optOutput.slice(1));
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
      // this._closeModal();
      this._finishedSettingOpts = true;
    }
  }
  //_________________________________________________________________________
  _setActiveOpt(selectedText) {
    if (selectedText.className.includes("label")) {
      document
        .querySelector(".label_column")
        .querySelector(".opt_div.custom")
        .querySelector(".label_opt_text")
        .classList.remove("held");
      return;
    } else {
      const allColumnOpts = [
        ...selectedText.closest(".modal_column").querySelectorAll(".opt_div"),
      ];
      allColumnOpts.forEach(function (el) {
        el.firstElementChild.classList.remove("selected");
        el.firstElementChild.classList.remove("held");
      });
    }

    selectedText.classList.add("selected");
    if (selectedText.closest(".modal_column").classList.contains("range")) {
      this._rangeOpenFlag = true;
      // this._finalValue.range = "";
    }

    //if selecting a default from list, clear potential input from custom entry
    if (!selectedText.closest(".opt_div").classList.contains("custom")) {
      const columnInput = document.querySelector(
        `.${selectedText.className.split("_")[0]}_input`
      );
      columnInput.value = "";
      columnInput.placeholder = `${columnInput.className.split("_")[0]}`;
    }

    //flyout range option if VBA is selected
    if (
      selectedText.closest(".modal_column").classList.contains("type") &&
      selectedText.innerHTML === "VBA" &&
      !this._rangeOpenFlag
    ) {
      this._rangeOpts.classList.remove("hide");
      //.................................................
      this._allRangeOptsText.forEach((el) => el.classList.remove("selected"));
      this._rangeOpenFlag = true;
      //.................................................

      //only if no custom range is entered, remove 'selected' class
      // if (!this._finalValue.range || this._finalValue.range === "none") {
      //   this._rangeOpts
      //     .querySelector(".opt_div.custom")
      //     .firstElementChild.classList.remove("selected", "held");
      //   this._finalValue.range = "";
      // }
      if (!stateObj.range) {
        this._rangeOpts
          .querySelector(".opt_div.custom")
          .firstElementChild.classList.remove("selected", "held");
        this._finalValue.range = "";
      }
    } else if (
      selectedText.closest(".modal_column").classList.contains("type") &&
      selectedText.innerHTML != "VBA"
    ) {
      this._rangeOpts.classList.add("hide");
      this._finalValue.range = "none";
      this._rangeOpenFlag = false;

      this._allRangeOptsText.forEach((el) =>
        el.classList.remove("held", "selected")
      );
      this._rangeInput.value = "";

      this._rangeOpts
        .querySelector(".opt_div.custom")
        .firstElementChild.classList.add("selected");
    }
  }
  //_________________________________________________________________________
  _formatInputs(inputStr, type) {
    let finalOutStr;

    finalOutStr =
      // inputStr.charAt(0).toUpperCase() +
      // inputStr.slice(1).replaceAll(" ", "&nbsp;").replaceAll("-", "&#8209;");
      inputStr.replaceAll(" ", "&nbsp;").replaceAll("-", "&#8209;");

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
    if (type === "press") {
      finalOutStr += "&nbsp;PSI";
      return finalOutStr;
    }

    //..............................................................
    return finalOutStr;
  }
  //_________________________________________________________________________

  _resetOptions() {
    // this._labelFinalValue = "";
    this._finalValue.label = "";

    // this._boreFinalValue = "";
    this._finalValue.bore = "";
    // this._typeFinalValue = "";
    this._finalValue.type = "";
    // this._rangeFinalValue = "";
    this._finalValue.range = "";
    // this._pressFinalValue = "";
    this._finalValue.press = "";

    this._labelInput.value = "";
    this._boreInput.value = "";
    this._typeInput.value = "";
    this._rangeInput.value = "";
    this._pressInput.value = "";

    this._typeOpts.classList.add("hide");
    this._rangeOpts.classList.add("hide");
    this._secondOptsFlag = false;
    this._rangeOpenFlag = false;

    const allOpts = [...document.querySelectorAll(".opt_div")];
    allOpts.forEach(function (el) {
      el.firstElementChild.classList.remove("selected", "held");
    });
  }
  //_________________________________________________________________________
  _closeModal() {
    this._optsModal.classList.add("hide");
    notesView._modalBlockout.classList.add("hide");
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
  _getOptsObj = function (stateObj) {
    //remove all previous 'held' classes in the modal
    [
      this._allBoreOptsText,
      this._allTypeOptsText,
      this._allRangeOptsText,
      this._allPressOptsText,
    ].forEach((el) => el.forEach((el2) => el2.classList.remove("held")));
    if (stateObj.labelFlag) {
      document
        .querySelector(".label_column")
        .querySelector(".opt_div.custom")
        .firstElementChild.classList.add("held");
      document.querySelector(".label_input").value = stateObj.label;
      document.querySelector(".label_opt_text").innerHTML = stateObj.label;
    }
    //if menu item matches, highlight it. If not, highlight 'Custom:'
    //Highlight matching Bore..................................................
    if (this._allBoreOptsText.find((el) => el.innerHTML === stateObj.bore)) {
      this._allBoreOptsText
        .find((el) => el.innerHTML === stateObj.bore)
        .classList.add("held");
      document.querySelector(".bore_input").placeholder = "bore";
    } else {
      document
        .querySelector(".modal_column.bore")
        .querySelector(".opt_div.custom")
        .firstElementChild.classList.add("held");
      document.querySelector(".bore_input").value = stateObj.bore;
    }
    //Highlight matching Type.................................................
    if (this._allTypeOptsText.find((el) => el.innerHTML === stateObj.type)) {
      this._allTypeOptsText
        .find((el) => el.innerHTML === stateObj.type)
        .classList.add("held");
      document.querySelector(".type_input").placeholder = "type";
    } else {
      document
        .querySelector(".modal_column.type")
        .querySelector(".opt_div.custom")
        .firstElementChild.classList.add("held");
      document.querySelector(".type_input").value = stateObj.type;
    }
    //Highlight matching Range.................................................
    if (this._allRangeOptsText.find((el) => el.innerHTML === stateObj.range)) {
      this._allRangeOptsText
        .find((el) => el.innerHTML === stateObj.range)
        .classList.add("held");
      document.querySelector(".range_input").placeholder = "range";
    } else {
      document
        .querySelector(".modal_column.range")
        .querySelector(".opt_div.custom")
        .firstElementChild.classList.add("held");
      document.querySelector(".range_input").value = stateObj.range;
    }
    //Highlight matching Press.................................................
    if (this._allPressOptsText.find((el) => el.innerHTML === stateObj.press)) {
      this._allPressOptsText
        .find((el) => el.innerHTML === stateObj.press)
        .classList.add("held");
      document.querySelector(".press_input").placeholder = "press";
    } else {
      document
        .querySelector(".modal_column.press")
        .querySelector(".opt_div.custom")
        .firstElementChild.classList.add("held");
      document.querySelector(".press_input").value = stateObj.press;
    }
  };
  //____________________________________________________________________
  _reviseOpts = function (stateObj) {
    const currentItem = stateObj.find((el) => el.id === this._activeComp.id);
    if (
      document
        .querySelector(".label_column")
        .querySelector(".opt_div.custom")
        .querySelector(".label_opt_text")
        .classList.contains("held")
    ) {
      this._finalValue.label = this._formatInputs(currentItem.label, "label");
      document.querySelector(".label_input").value = currentItem.label;
      document
        .querySelector(".label_column")
        .querySelector(".opt_div.custom")
        .click();
    }
    this._allOptsModalText.forEach(function (el) {
      let column = el.className.split("_")[0];
      // debugger;
      if (
        el.classList.contains("held") &&
        !el.closest(".modal_column").classList.contains("hide") &&
        el.innerHTML != "Custom:"
      ) {
        el.closest(".opt_div").click();
      }
      if (
        el.classList.contains("held") &&
        !el.closest(".modal_column").classList.contains("hide") &&
        el.innerHTML === "Custom:"
      ) {
        //...............................................................
        this._finalValue[column] = this._formatInputs(
          currentItem[column],
          `${column}`
        );
        document.querySelector(`.${column}_input`).value = currentItem[column];
        el.closest(".opt_div.custom").click();
      }
    }, this);

    //____________________________________________________________________
  };
  _holdCustomValue() {
    console.log("bore");
  }
}
export default new OptionsView();
