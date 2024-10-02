import View from "./View";
import { COMP_CLASSES, COMP_IMG } from "../config";
import stackBtnsView from "./stackBtnsView";

let sideActiveFlag;

//___________________________________________________________________
// let heightDiv;
class StackView extends View {
  //_____________________________________________________________________
  //Height and Option clicks
  addHandlerHandO(handler) {
    //Assign height and options events
    this._heightDiv = document
      .querySelector(".comp-div.active")
      .querySelector(".height-div");
    this._optsDiv = document
      .querySelector(".comp-div.active")
      .querySelector(".opts-div");

    this._heightDiv.addEventListener("click", function (e) {
      const clicked = e.target.closest(".height-div");
      if (!clicked) return;
      clicked.classList.toggle("highlight");
      // handler("height");
    });

    this._optsDiv.addEventListener("click", function (e) {
      const clicked = e.target.closest(".opts-div");
      if (!clicked) return;
      clicked.classList.toggle("highlight");
      // handler("opt");
    });
  }
  //_____________________________________________________________________
  //Clicks for stack components
  addHandlerCompClick(handler) {
    //Main comps clicks

    this._compWrapper.addEventListener("click", function (e) {
      const clicked = e.target.closest(".comp-div");
      if (!clicked) return;

      handler(clicked);
    });
  }

  //_____________________________________________________________________
  //Add stack comp
  addComp() {
    const htmlComp = `
    <div id="new" class="comp-div">
      <div class="side_left_div hide">
        <div class="left_comp">
          <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
          <div class="hyd_spacer hide"></div>
        </div>
      </div>
      <div class="height-div hide">
        <div class="height-text">height</div>
      </div>
      <img class="img" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b4cd1ae8a7f37543072995_border-s-p-500.png">
      <div class="opts-div hide">
        <div class="opts-text">options</div>
        <div class="opts-spacer"></div>
        <div class="opts-text second">options</div>
      </div>
      <div class="side_right_div hide">
        <div class="right_comp">
          <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
          <div class="hyd_spacer hide"></div>
        </div>
      </div>`; //new comp template

    this._retarget();

    this._activeComp.insertAdjacentHTML("beforebegin", htmlComp);

    this._allComps = [...this._compWrapper.children];
    this._allComps.forEach(function (el) {
      el.classList.remove("active");
      if (el.id === "new") el.classList.add("active");
    });

    this._activeSideComp?.classList.remove("active");
    stackBtnsView.toggleCrossBtns("remove");
  }
  //_______________________________________________________________________
  //Delete stack comp
  delComp = function () {
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
    this._compWrapper.firstElementChild.classList.contains("comp-div")
      ? this._compWrapper.firstElementChild.classList.add("active")
      : this._compWrapper.firstElementChild.nextElementSibling.classList.add(
          "active"
        );

    stackBtnsView.toggleCrossBtns("remove");
  };

  //_______________________________________________________________________
  //Add stack comp
  configureComp = function (compFlag) {
    let compImg;
    this._retarget();
    const heightDiv = this._activeComp.querySelector(".height-div");
    const imageEl = this._activeComp.querySelector(".img");

    imageEl.parentNode.removeChild(imageEl); //just change src instead?

    compImg = COMP_IMG[compFlag];

    const htmlImg = `<img class= img src=${compImg}>`;
    heightDiv.insertAdjacentHTML("afterend", htmlImg);
    imageEl.classList.remove("hide");

    // if (!activeDiv) return;

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

  //_______________________________________________________________________
  //Check for special cases: 'double' or 'cross' and apply treatments
  _compSpecialCases = function (compFlag) {
    if (compFlag != "double" && compFlag != "cross") return;
    const optsDiv = this._activeComp.querySelector(".opts-div");

    if (compFlag !== "double") {
      optsDiv.querySelector(".opts-text.second").classList.add("hide");
      optsDiv.querySelector(".opts-spacer").classList.add("hide");
    } else {
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

  //_____________________________________________________________________
  //Side component events for cross
  _assignSideClicks = function (side) {
    const sideDiv = this._compWrapper
      .querySelector(".comp-div.active.cross")
      .querySelector(`.side_${side}_div`);

    sideDiv.addEventListener("click", (e) => {
      const clicked = e.target.closest(`.${side}_comp`);
      if (!clicked) return;

      this._retarget();
      this._allSideComps.forEach(function (el) {
        el.classList.remove("active");
      });
      clicked.classList.add("active");
      this._sideFlag = `${side}`;
    });
  };
  //_______________________________________________________________________
  //Add cross side comp
  addSideComp = function (flag) {
    const htmlSide = `
    <div class= "${flag}_comp active">
      <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
      <div class="hyd_spacer hide"></div>
    </div>`;

    const targetActiveComp = this._compWrapper.querySelector(
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
    // setIdsSides();
  };

  //_______________________________________________________________________
  //Remove cross side comp
  removeSideComp = function (flag) {
    const activeSideComp = this._compWrapper.querySelector(
      `.${flag}_comp.active`
    );

    if (!activeSideComp) return;
    if (activeSideComp.id.slice(-2) === "-1") {
      activeSideComp.querySelector(".hyd_spacer").classList.add("hide");
      activeSideComp.querySelector(".img_side").src =
        "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png";
      return;
    }

    activeSideComp.parentNode.removeChild(activeSideComp);
    const targetActiveSideComp = this._compWrapper
      .querySelector(".comp-div.active")
      .querySelector(`.${flag}_comp`);
    flag === "left"
      ? targetActiveSideComp.parentNode.firstElementChild.classList.add(
          "active"
        )
      : targetActiveSideComp.parentNode.lastElementChild.classList.add(
          "active"
        );

    // setIdsSides();
  };
}

export default new StackView();
