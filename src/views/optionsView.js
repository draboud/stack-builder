import stackView from "./stackView";
import View from "./View";

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

  _customDiv = document.querySelector(".modal_div.custom");

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
      const clicked = e.target.closest(".modal_div");
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
    let arrUse = [this._allBoreOptsText, this._allPressOptsText];
    const arrExtra = [this._allTypeOptsText, this._allRangeOptsText];
    let selectFlag;

    if (stackView._compFlag === "single" || stackView._compFlag === "double") {
      arrUse = arrUse.slice(0, 1).concat(arrExtra, arrUse.slice(1));
    }
    const textChild = clicked.firstElementChild;
    textChild.classList.add("selected");

    if (
      arrUse.every((el) => el.find((el2) => el2.classList.contains("selected")))
    ) {
      arrUse.forEach(
        (el) =>
          (optOutput +=
            el.find((el2) => el2.classList.contains("selected")).innerHTML +
            "|")
      );
      optOutput = optOutput.split("|");

      // if (this._boreInput.value) optOutput[0] = this._boreInput.value;
      // if (this._typeInput.value) optOutput[1] = this._typeInput.value;
      // if (this._rangeInput.value) optOutput[2] = this._rangeInput.value;
      // if (this._pressInput.value) optOutput[3] = this._pressInput.value;

      if (this._boreFinalValue) optOutput[0] = this._boreFinalValue;
      if (this._typeFinalValue) optOutput[1] = this._typeFinalValue;
      if (this._rangeFinalValue) optOutput[2] = this._rangeFinalValue;
      if (this._pressFinalValue) optOutput[3] = this._pressFinalValue;

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
      console.log("");
      this._resetOptions();
      this._closeModal();
    }
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
    this._secondOptsFlag = false;
  }
}

export default new OptionsView();
