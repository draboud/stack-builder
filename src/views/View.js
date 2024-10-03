// const crossSplButton = (document
//   .querySelector(".comp_button.cr")
//   .querySelector(".comp_text").innerHTML = "spl");
// const crossManButton = document.querySelector(".cross_comp_button");
// const crossHydButton = document.querySelector(".cross_comp_button.hyd");
// const [compSpl, compMan, compHyd] = Array.from([
//   ...document.querySelectorAll(".comp_button.cr"),

// import stackBtnsView from "./stackBtnsView";

// ]);

export default class View {
  _data;
  _compWrapper = document.querySelector(".comp-wrapper");
  _allComps;
  _allSideComps;
  _activeComp = document.querySelector(".comp-div.active");
  _activeSideComp;
  _compFlag;
  _newLeftArray;
  _newRightArray;
  _sideFlag;
  // _sideActiveFlag;
  _heightDiv;
  _optsDiv;

  _retarget() {
    // this._allComps = document.querySelectorAll(".comp-div");
    this._allComps = [...this._compWrapper.children];
    this._activeComp = document.querySelector(".comp-div.active");
    this._allSideComps = [
      ...document.querySelectorAll(".left_comp"),
      ...document.querySelectorAll(".right_comp"),
    ];
    this._activeSideComp = this._allSideComps.find((el) =>
      el.classList.contains("active")
    );
  }
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
