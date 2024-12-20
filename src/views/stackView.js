import View from "./View";
import { COMP_CLASSES, COMP_IMG, GENERATE_MARKUP, LETTERS } from "../config";
import stackBtnsView from "./stackBtnsView";
import { cleanCross } from "../helpers";
import heightsView from "./heightsView";
import optionsView from "./optionsView";

const stackHeight = document.querySelector(".stack-height-text");

class StackView extends View {
  _finalCrossNotes = "";
  // allCrossNotes = [];

  //Clicks for stack components
  _addHandlerCompClick(handler) {
    //Main comps clicks
    this._compWrapper.addEventListener("click", function (e) {
      const clicked = e.target.closest(".comp-div");
      if (!clicked) return;
      handler(clicked);
    });
  }
  //____________________________________________________________________

  //Add stack comp
  _addComp() {
    const htmlComp = GENERATE_MARKUP("compBlock");
    this._retarget();
    this._activeComp.insertAdjacentHTML("beforebegin", htmlComp);
    this._retarget();
    this._allComps.forEach(function (el) {
      el.classList.remove("active");
      if (el.id === "new") el.classList.add("active");
    });
    this._activeSideComp?.classList.remove("active");
    stackBtnsView.toggleCrossBtns("remove");
  }
  //____________________________________________________________________
  //Delete stack comp
  _delComp = function () {
    this._retarget();
    if (this._activeComp.id !== "c-1") {
      this._activeComp.parentNode.removeChild(this._activeComp);
    } else {
      console.log("you cannot remove this one!");
      return;
    }
    if (this._activeComp.classList.contains("cross")) {
      this._activeSideComp?.classList.remove("active");
    }
    //keep looking down comp-wrapper to make first non DSA active
    this._compWrapper.firstElementChild.classList.contains("adapt-div")
      ? this._compWrapper.firstElementChild.nextElementSibling.classList.add(
          "active"
        )
      : this._compWrapper.firstElementChild.classList.add("active");

    if (
      this._compWrapper.firstElementChild.nextElementSibling?.classList.contains(
        "adapt-div"
      )
    ) {
      this._compWrapper.firstElementChild.nextElementSibling.classList.remove(
        "active"
      );
      this._compWrapper.firstElementChild.nextElementSibling.nextElementSibling.classList.add(
        "active"
      );
    }

    stackBtnsView.toggleCrossBtns("remove");
  };
  //____________________________________________________________________
  //Add stack comp
  _configComp = function (compFlag) {
    this._retarget();
    let compImg;
    heightsView._activeHeightDiv.classList.remove("highlight"); //reset heights
    [".opts-text", ".opts-text.second"].forEach(
      (el) => (this._activeOptsDiv.querySelector(el).innerHTML = "options")
    ); //reset options

    //if this active block was previously a cross, clear all added sides
    if (this._activeComp.classList.contains("cross")) cleanCross();

    const heightDiv = this._activeComp.querySelector(".height-div");
    const imageEl = this._activeComp.querySelector(".img");
    const optsDiv = this._activeComp.querySelector(".opts-div");

    imageEl.parentNode.removeChild(imageEl); //just change src instead?

    compImg = COMP_IMG[compFlag];
    const htmlImg = `<img class= img src=${compImg}>`;

    heightDiv.insertAdjacentHTML("afterend", htmlImg);

    imageEl.classList.remove("hide");

    optsDiv.querySelector(".opts-text.second").classList.add("hide");
    optsDiv.querySelector(".opts-spacer").classList.add("hide");

    this._activeComp.querySelector(".side_left_div").classList.add("hide");
    this._activeComp.querySelector(".side_right_div").classList.add("hide");
    this._activeComp.querySelector(".height-div").classList.remove("hide");
    this._activeComp.querySelector(".opts-div").classList.remove("hide");

    COMP_CLASSES.forEach((el) => {
      el === compFlag
        ? this._activeComp.classList.add(compFlag)
        : this._activeComp.classList.remove(el); //don't need?
    });

    this._compSpecialCases(compFlag);
  };
  //____________________________________________________________________
  //Check for special cases: 'double' or 'cross' and apply treatments
  _compSpecialCases = function (compFlag) {
    if (compFlag != "double" && compFlag != "cross") return;
    const optsDiv = this._activeComp.querySelector(".opts-div");

    if (compFlag === "double") {
      optsDiv.querySelector(".opts-text.hide")?.classList.remove("hide");
      optsDiv.querySelector(".opts-spacer.hide")?.classList.remove("hide");
    }

    if (compFlag === "cross") {
      this._activeComp.querySelector(".side_left_div").classList.remove("hide");
      this._activeComp
        .querySelector(".side_right_div")
        .classList.remove("hide");
      ["left", "right"].forEach((el) => this._assignSideClicks(el));
    }
  };
  //____________________________________________________________________
  //Side component events for cross
  _assignSideClicks = function (side) {
    const sideDiv = this._compWrapper
      .querySelector(".comp-div.active.cross")
      .querySelector(`.side_${side}_div`);

    sideDiv.addEventListener("click", (e) => {
      const clicked = e.target.closest(`.${side}_comp`);
      if (!clicked) return;
      e.stopPropagation();
      this._retarget();
      this._allSideComps.forEach(function (el) {
        el.classList.remove("active");
      });
      clicked.classList.add("active");
      this._allComps.forEach((el) => el.classList.remove("active"));
      clicked.closest(".comp-div").classList.add("active");
      this._sideFlag = side;
      stackBtnsView.toggleCrossBtns("add");
    });
  };
  //_______________________________________________________________________
  //Add cross side comp
  _addSideComp = function (flag) {
    this._sideFlag = flag;
    const htmlSide = GENERATE_MARKUP("compSideBlock");
    const targetActiveComp = this._compWrapper.querySelector(
      //***retarget()?
      ".comp-div.cross.active"
    );
    this._retarget();
    this._allSideComps.forEach(function (el) {
      el.classList.remove("active");
    });
    const sideSelect =
      flag === "left"
        ? targetActiveComp.firstElementChild
        : targetActiveComp.lastElementChild;
    const beforeOrAfter = flag === "left" ? "afterbegin" : "beforeend";
    sideSelect.insertAdjacentHTML(beforeOrAfter, htmlSide);

    this._checkCrossLimit();
  };
  //_______________________________________________________________________
  //Remove cross side comp
  _delSideComp = function (flag) {
    const activeSideComp = this._compWrapper.querySelector(
      //***retarget()?
      `.${flag}_comp.active`
    );
    if (!activeSideComp) return;
    if (activeSideComp.id.slice(-2) === "-1") {
      activeSideComp.querySelector(".hyd_spacer").classList.add("hide");
      activeSideComp.querySelector(".img_side").src = COMP_IMG.side;
      this._checkCrossLimit();

      return;
    }
    activeSideComp.parentNode.removeChild(activeSideComp);
    const targetActiveSideComp = this._compWrapper //***retarget()?
      .querySelector(".comp-div.active")
      .querySelector(`.${flag}_comp`);
    flag === "left"
      ? targetActiveSideComp.parentNode.firstElementChild.classList.add(
          "active"
        )
      : targetActiveSideComp.parentNode.lastElementChild.classList.add(
          "active"
        );

    this._checkCrossLimit();
  };
  //____________________________________________________________________
  //Add component to active side of active cross in stack
  _configCrossComp = function (compFlag) {
    this._retarget();
    let sideCompImg;
    if (compFlag === "spl") {
      sideCompImg = COMP_IMG.spl;
    }
    if (compFlag === "man") {
      sideCompImg = COMP_IMG.man;
    }
    if (compFlag === "hyd") {
      sideCompImg = COMP_IMG.hyd;
    }
    this._allSideComps.forEach(function (el) {
      if (el.classList.contains("active")) {
        el.querySelector(".hyd_spacer").classList.add("hide");
        el.querySelector(".img_side").src = sideCompImg;

        if (compFlag === "hyd") {
          el.querySelector(".hyd_spacer").classList.remove("hide");
        }
      }
    });
    this._checkCrossLimit();
  };
  //____________________________________________________________________
  //Check if more than 3 cross comps, if so => use alt cross img and automate note
  _checkCrossLimit = function () {
    const leftCount =
      this._activeComp.querySelector(".side_left_div").childElementCount;
    const rightCount =
      this._activeComp.querySelector(".side_right_div").childElementCount;
    const crossNote = this._activeComp.querySelector(".cross_note_div");
    const crossNoteHTML = `
      <div class= "cross_note_div">
      <div class= "cross-note">${LETTERS[0]}</div>
      </div>`;
    const allActiveSideComps = [
      ...this._activeComp.querySelectorAll(".left_comp"),
      ...this._activeComp.querySelectorAll(".right_comp"),
    ];
    if (
      !allActiveSideComps.every((el) =>
        el.querySelector(".img_side").src.includes("blank")
      )
    ) {
      if (!crossNote) {
        this._activeComp
          .querySelector(".img")
          .insertAdjacentHTML("afterend", crossNoteHTML);

        optionsView._addHandlerCrossNoteBtn();
        this._arrangeCrossLetters();
      }
    } else if (crossNote) crossNote.parentNode.removeChild(crossNote);

    if (leftCount > 3 || rightCount > 3) {
      this._activeComp.querySelector(".img").src = COMP_IMG.cross_limit;
      this._activeComp.querySelector(".height-div").classList.add("hide");
      this._activeComp.querySelector(".opts-div").classList.add("hide");
    } else {
      this._activeComp.querySelector(".img").src = COMP_IMG.cross;
      this._activeComp.querySelector(".height-div").classList.remove("hide");
      this._activeComp.querySelector(".opts-div").classList.remove("hide");
    }
    this._arrangeCrossLetters();
  };

  //____________________________________________________________________
  _arrangeCrossLetters = function () {
    const crossNoteArr = document.querySelectorAll(".cross_note_div");
    for (let i = 0; i < crossNoteArr.length; i++) {
      crossNoteArr[i].querySelector(".cross-note").innerHTML =
        LETTERS[crossNoteArr.length - 1 - i];
    }
  };
  //____________________________________________________________________
  //Prepare cross comps for PDF notes output
  _prepCrossNotes = function () {
    const allCrossNotes = [...document.querySelectorAll(".cross_note_div")];
    const allNotesOutput = [];

    allCrossNotes.forEach(function (el) {
      const thisCrossNote = {};
      thisCrossNote.letter =
        el.parentNode.querySelector(".cross-note").innerHTML;
      thisCrossNote.height =
        el.parentNode.querySelector(".height-text").innerHTML.slice(0, -1) +
        '"';
      thisCrossNote.options = el.parentNode
        .querySelector(".opts-text")
        .innerHTML.replaceAll(";", " ")
        .replaceAll("&nbsp", "");

      thisCrossNote.sides = [...el.parentNode.querySelectorAll(".img_side")];
      thisCrossNote.leftSrcs = [];
      thisCrossNote.rightSrcs = [];
      thisCrossNote.sides.forEach(function (el) {
        let newNote = el.src.slice(-7).replace(".png", "");
        if (newNote === "oss") newNote = "(none)";
        el.parentElement.classList.contains("left_comp")
          ? thisCrossNote.leftSrcs.push(newNote)
          : thisCrossNote.rightSrcs.push(newNote);
      });
      thisCrossNote.outputStr =
        thisCrossNote.letter +
        ": " +
        thisCrossNote.options +
        "--" +
        "(Left Comps): " +
        thisCrossNote.leftSrcs +
        " " +
        "(Right Comps): " +
        thisCrossNote.rightSrcs +
        " " +
        "(Height): " +
        thisCrossNote.height;
      thisCrossNote.outputStr += "\n";
      allNotesOutput.push(thisCrossNote.outputStr);
    });
    this._finalCrossNotes = allNotesOutput.reverse().join("");
  };
}
export default new StackView();
