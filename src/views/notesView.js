import View from "./View";

const form = document.querySelector(".form");

class NotesView extends View {
  _jobTitle;
  _notes;
  _testTitle;
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