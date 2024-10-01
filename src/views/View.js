// const crossSplButton = (document
//   .querySelector(".comp_button.cr")
//   .querySelector(".comp_text").innerHTML = "spl");
// const crossManButton = document.querySelector(".cross_comp_button");
// const crossHydButton = document.querySelector(".cross_comp_button.hyd");
// const [compSpl, compMan, compHyd] = Array.from([
//   ...document.querySelectorAll(".comp_button.cr"),

// import stackBtnsView from "./stackBtnsView";

// ]);
let sideActiveFlag;

export default class View {
  _data;
  _compWrapper = document.querySelector(".comp-wrapper");
  _allComps;
  _allSideComps;
  _activeComp;
  _activeSideComp;
  _compFlag;
  _newLeftArray;
  _newRightArray;
  _sideFlag;
  // _sideActiveFlag;
  _heightDiv;
  _optsDiv;

  //________________________________________________________________________
  //ID main comps
  setIds = function () {
    this._newCompArray = this._compWrapper.querySelectorAll(".comp-div");
    this._allSideComps = [
      ...this._compWrapper.querySelectorAll(".left_comp"),
      ...this._compWrapper.querySelectorAll(".right_comp"),
    ];
    let compIdCounter = this._newCompArray.length;
    this._newCompArray.forEach(function (el, i) {
      el.id = "c-" + compIdCounter;
      compIdCounter -= 1;
    });
    //if no active cross elements, turn off cross comp buttons
    this._allSideComps.forEach(function (el) {
      el.classList.contains("active")
        ? (sideActiveFlag = true)
        : (sideActiveFlag = false);
    });
    // if (this._sideActiveFlag === false) {
    //   stackBtnsView.toggleCrosBtns();
    // }
  };

  //_________________________________________________________________________
  //ID cross comps
  setIdsSides = function () {
    this._newLeftArray = [...this._compWrapper.querySelectorAll(".left_comp")];
    this._newRightArray = [
      ...this._compWrapper.querySelectorAll(".right_comp"),
    ];
    const activeCompId = this._compWrapper.querySelector(".comp-div.active").id;
    let leftCompIdsCounter = this._newLeftArray.length;
    let rightCompIdsCounter = this._newRightArray.length;
    let indexCountLeft = 1;
    let indexCountRight = 1;
    let indexCount = 1;

    const currentLeftArray = [
      ...this._compWrapper
        .querySelector(".comp-div.active")
        .querySelector(".side_left_div")
        .querySelectorAll(".left_comp"),
    ].reverse();

    currentLeftArray.forEach(function (el) {
      el.id = `${activeCompId}-left-${indexCountLeft}`;
      indexCountLeft += 1;
      leftCompIdsCounter -= 1; //unnecessary
    });

    const currentRightArray = [
      ...this._compWrapper
        .querySelector(".comp-div.active")
        .querySelector(".side_right_div")
        .querySelectorAll(".right_comp"),
    ];

    currentRightArray.forEach(function (el) {
      el.id = `${activeCompId}-right-${indexCountRight}`;
      indexCountRight += 1;
      rightCompIdsCounter -= 1; //unnecessary
    });
  };
  //_________________________________________________________________________
  // //Assign height and options events
  // assignHandOClicks = function () {
  //   const heightDiv = this._activeComp.querySelector(".height-div");
  //   const optsDiv = this._activeComp.querySelector(".opts-div");

  //   heightDiv.addEventListener("mouseenter", function (e) {
  //     const hoverIn = e.target.closest(".height-div");
  //     if (!hoverIn) return;
  //     hoverIn.classList.add("highlight");
  //   });
  //   heightDiv.addEventListener("mouseout", function (e) {
  //     const hoverOut = e.target.closest(".height-div");
  //     if (!hoverOut) return;
  //     hoverOut.classList.remove("highlight");
  //   });

  //   optsDiv.addEventListener("click", function (e) {
  //     const clicked = e.target.closest(".opts-text");
  //     if (!clicked) return;
  //     clicked.classList.add("highlight");
  //   });

  //   optsDiv.addEventListener("click", function (e) {
  //     const clicked = e.target.closest(".opts-text");
  //     if (!clicked) return;
  //     optionsModal.classList.remove("hide");
  //   });
  // };
}
