import statsView from "./statsView";
import View from "./View";

const form = document.querySelector(".form");
const notesBtn = document.querySelector(".notes_button");
const saveBtn = document.querySelector(".save_button");
const notesCloseBtn = document.querySelector(".notes_close_button");

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
    saveBtn.addEventListener("click", function (e) {
      const clicked = e.target.closest(".save_button");
      if (!clicked) return;
      const jobTitleInput = document.querySelector(".job_title_input").value;
      let notesInput = document.querySelector(".custom_notes_input").value;
      if (notesInput) notesInput += "\n";
      const jobDisplay = (document.querySelector(".job-title-text").innerHTML =
        "Job Title: " + jobTitleInput);

      handler(jobTitleInput, notesInput);
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      saveBtn.click();
    });
  };
  //___________________________________________________________________________
  _addHandlerNotesCloseBtn = function (handler) {
    notesCloseBtn.addEventListener("click", function (e) {
      const clicked = e.target.closest(".notes_close_button");
      if (!clicked) return;
      handler();
    });
  };
  //___________________________________________________________________________

  _addHandlerModalBlockout(handler) {
    this._modalBlockout.addEventListener("click", function () {
      handler();
    });
  }
}
export default new NotesView();
