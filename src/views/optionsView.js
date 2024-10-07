import stackView from "./stackView";
import View from "./View";

class OptionsView extends View {
  _optsModal = document.querySelector(".options_modal");
  _optsModalGates = document.querySelector(".options_modal.gates");
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
  _addHandlerOptsModalGates(handler) {
    this._optsModalGates.addEventListener("click", function (e) {
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
  _addHandlerModalGatesBtn(handler) {
    this._optsModalGates.addEventListener("click", function (e) {
      const clicked = e.target.closest(".modal_close_button");
      if (!clicked) return;
      handler();
    });
  }
  //_________________________________________________________________________
  _setOptsText(clicked) {
    this._retarget();
    const textChild = clicked.firstElementChild;
    let optOutput = "";

    textChild.classList.add("selected");
    switch (stackView._compFlag) {
      case "single":
      case "double":
        if (
          this._allBoreOptsText.find((el) =>
            el.classList.contains("selected")
          ) &&
          this._allTypeOptsText.find((el) =>
            el.classList.contains("selected")
          ) &&
          this._allRangeOptsText.find((el) =>
            el.classList.contains("selected")
          ) &&
          this._allPressOptsText.find((el) => el.classList.contains("selected"))
        ) {
          optOutput +=
            this._allBoreOptsText.find((el) =>
              el.classList.contains("selected")
            ).innerHTML + "__";
          optOutput += this._activeComp.classList[1] + "__";
          optOutput +=
            this._allTypeOptsText.find((el) =>
              el.classList.contains("selected")
            ).innerHTML + "\n";
          optOutput +=
            this._allRangeOptsText.find((el) =>
              el.classList.contains("selected")
            ).innerHTML + "\n";
          optOutput += this._allPressOptsText.find((el) =>
            el.classList.contains("selected")
          ).innerHTML;

          this._allOptsModalGatesText.forEach((el) =>
            el.classList.remove("selected")
          );

          this._activeOptsDiv.querySelector(
            this._secondOptsFlag ? ".opts-text.second" : ".opts-text"
          ).innerHTML = optOutput;
          this._optsModalGates.classList.add("hide");
          this._secondOptsFlag = false;
        }
        break;
      default:
        if (
          this._allBoreOptsText.find((el) =>
            el.classList.contains("selected")
          ) &&
          this._allPressOptsText.find((el) => el.classList.contains("selected"))
        ) {
          optOutput +=
            this._allBoreOptsText.find((el) =>
              el.classList.contains("selected")
            ).innerHTML + "__";
          optOutput += this._activeComp.classList[1] + "__";
          optOutput += this._allPressOptsText.find((el) =>
            el.classList.contains("selected")
          ).innerHTML;

          console.log("compFlag: ", this._compFlag);

          this._allOptsModalText.forEach((el) =>
            el.classList.remove("selected")
          );

          this._activeOptsDiv.querySelector(
            this._secondOptsFlag ? ".opts-text.second" : ".opts-text"
          ).innerHTML = optOutput;
          this._optsModal.classList.add("hide");
          this._secondOptsFlag = false;
        }
    }
  }
  //_________________________________________________________________________
  _closeModal() {
    this._optsModal.classList.add("hide");
  }
  //_________________________________________________________________________
  _closeModalGates() {
    this._optsModalGates.classList.add("hide");
  }
}

export default new OptionsView();
