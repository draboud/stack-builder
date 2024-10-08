import stackView from "./stackView";
import View from "./View";

class OptionsView extends View {
  _optsModal = document.querySelector(".options_modal");
  _typeOpts = document.querySelector(".modal_column.type");
  _rangeOpts = document.querySelector(".modal_column.range");

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
      // this._optsModal.classList.add("hide");
      this._resetOptions();
      this._closeModal();
      // this._typeOpts.classList.add("hide");
      // this._rangeOpts.classList.add("hide");
      // this._secondOptsFlag = false;
    }
  }
  //_________________________________________________________________________
  _resetOptions() {
    this._typeOpts.classList.add("hide");
    this._rangeOpts.classList.add("hide");
    this._secondOptsFlag = false;
  }
  //_________________________________________________________________________

  _closeModal() {
    // this._typeOpts.classList.add("hide");
    // this._rangeOpts.classList.add("hide");
    this._optsModal.classList.add("hide");
    this._secondOptsFlag = false;
  }
}

export default new OptionsView();
