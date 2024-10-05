import View from "./View";

class OptionsView extends View {
  _optsModal = document.querySelector(".options_modal");
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
    this._optsModal;
    addEventListener("click", function (e) {
      const clicked = e.target.closest(".modal_div_text");
      if (!clicked) return;
      handler(clicked);
    });
  }
  //_________________________________________________________________________
}

export default new OptionsView();
