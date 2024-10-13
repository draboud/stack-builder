import View from "./View";

const form = document.querySelector(".form");
const notesBtn = document.querySelector(".notes_button");

class NotesView extends View {
  _notesForm = document.querySelector(".notes_form");
  _jobTitle;
  _notes;
  _testTitle;
  _modalBlockout = document.querySelector(".modal_blockout");

  _addHandlerNotesBtn = function (handler) {
    notesBtn.addEventListener("click", function (e) {
      const clicked = e.target.closest(".notes_button");
      if (!clicked) return;
      handler();
    });
  };
  //___________________________________________________________________________
  _addHandlerNotes = function (handler) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const jobTitleInput = document.querySelector(".job_title_input").value;
      const notesInput = document.querySelector(".custom_notes_input").value;
      handler(jobTitleInput, notesInput);
    });
  };
  //_________________________________________________________________________
  _addHandlerModalBlockout(handler) {
    // this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._modalBlockout.addEventListener("click", function () {
      handler();
    });
  }
}
export default new NotesView();
