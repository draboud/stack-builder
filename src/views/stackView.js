import View from "./View";
import { COMP_CLASSES, COMP_IMG, GENERATE_MARKUP } from "../config";
import stackBtnsView from "./stackBtnsView";
import { cleanCross } from "../helpers";
import heightsView from "./heightsView";
import optionsView from "./optionsView";

const viewBtn = document.querySelector(".view_button");

class StackView extends View {
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

    this._compWrapper.firstElementChild.classList.contains("adapt-div")
      ? this._compWrapper.firstElementChild.nextElementSibling.classList.add(
          "active"
        )
      : this._compWrapper.firstElementChild.classList.add("active");
    stackBtnsView.toggleCrossBtns("remove");
  };
  //____________________________________________________________________
  //Add stack comp
  _configComp = function (compFlag) {
    this._retarget();
    let compImg;

    heightsView._activeHeightDiv.classList.remove("highlight"); //reset heights
    [".opts-text", ".opts-text.second"].forEach(
      (el) =>
        (optionsView._activeOptsDiv.querySelector(el).innerHTML = "options")
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
    console.log("compFlag: ", compFlag);
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
  };
}
export default new StackView();
