import View from "./View";

const form = document.querySelector(".form");
const notesBtn = document.querySelector(".notes_button");

class NotesView extends View {
  _notesForm = document.querySelector(".form_row");
  _jobTitle;
  _notes;
  _testTitle;

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
}
export default new NotesView();
