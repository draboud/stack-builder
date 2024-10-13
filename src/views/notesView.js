import View from "./View";

const form = document.querySelector(".form");
const notesBtn = document.querySelector(".notes_button");
const saveBtn = document.querySelector(".save_button");

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
  _addHandlerSaveBtn = function (handler) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    saveBtn.addEventListener("click", function (e) {
      const clicked = e.target.closest(".save_button");
      if (!clicked) return;
      const jobTitleInput = document.querySelector(".job_title_input").value;
      const notesInput = document.querySelector(".custom_notes_input").value;
      handler(jobTitleInput, notesInput);
    });
  };
  //_________________________________________________________________________
  _addHandlerModalBlockout(handler) {
    this._modalBlockout.addEventListener("click", function () {
      handler();
    });
  }
}
export default new NotesView();
