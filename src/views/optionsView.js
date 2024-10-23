import stackView from "./stackView";
import notesView from "./notesView";
import View from "./View";
// import adaptorsView from "./adaptorsView";

class OptionsView extends View {
  _optsModal = document.querySelector(".options_modal");
  _typeOpts = document.querySelector(".modal_column.type");
  _rangeOpts = document.querySelector(".modal_column.range");
  _boreForm = document.querySelector(".boreForm");
  _typeForm = document.querySelector(".typeForm");
  _rangeForm = document.querySelector(".rangeForm");
  _pressForm = document.querySelector(".pressForm");
  _boreInput = document.querySelector(".bore_input");
  _typeInput = document.querySelector(".type_input");
  _rangeInput = document.querySelector(".range_input");
  _pressInput = document.querySelector(".press_input");

  _crossMiniMenu = document.querySelector(".cross_mini_menu");
  _crossMiniItems = document.querySelectorAll(".cross-mini-item");

  _customDiv = document.querySelector(".opt_div.custom");

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
      arrUse.forEach(function (el) {
        selectedText = el.find((el2) => el2.classList.contains("selected"));
        selectedText.innerHTML === "Custom:"
          ? (optOutput += "&nbsp;" + "|")
          : (optOutput += selectedText.innerHTML + "|");
      });

      optOutput = optOutput.split("|");

      if (this._boreFinalValue) optOutput[0] = this._boreFinalValue;
      if (this._typeFinalValue) optOutput[1] = this._typeFinalValue;
      if (this._rangeFinalValue)
        optOutput[2] = this._rangeFinalValue.replaceAll("-", "&#8209;");
      if (this._pressFinalValue) {
        this._typeOpts.classList.contains("hide")
          ? (optOutput[1] = this._pressFinalValue)
          : (optOutput[3] = this._pressFinalValue);
      }

      optOutput.splice(-1, 1);

      optOutput = optOutput
        .slice(0, 1)
        .concat(
          stackView._compFlag.charAt(0).toUpperCase() +
            stackView._compFlag.slice(1),
          optOutput.slice(1)
        );
      optOutput = optOutput.toString();
      optOutput = optOutput.replaceAll(",", "&nbsp;");
      this._allOptsModalText.forEach((el) => el.classList.remove("selected"));

      this._activeOptsDiv.querySelector(
        this._secondOptsFlag ? ".opts-text.second" : ".opts-text"
      ).innerHTML = optOutput;

      this._resetOptions();
      this._closeModal();
      // adaptorsView._autoAdapt();
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
  }
  //_________________________________________________________________________
  _resetOptions() {
    this._boreFinalValue = "";
    this._typeFinalValue = "";
    this._rangeFinalValue = "";
    this._pressFinalValue = "";
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
}

export default new OptionsView();
