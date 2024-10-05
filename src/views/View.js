export default class View {
  _data;
  _compWrapper = document.querySelector(".comp-wrapper");
  _allComps;
  _allCompImgs;
  _allSideComps;
  _currentSideComps; //all side comps of currently active cross (if applicable)
  _activeSideComp;
  _compFlag;
  _newLeftArray;
  _newRightArray;
  _sideFlag;
  _activeHeightDiv;
  _allHeightDivs;
  _allHeightText;
  _activeOptsDiv;
  _allOptsDivs;
  _allOptsText;
  _allAdaptors;
  _allSpacers;
  _allHydSpacers;

  _retarget(side) {
    this._allComps = [...document.querySelectorAll(".comp-div")];
    this._allCompImgs = document.querySelectorAll(".img");
    this._activeComp = document.querySelector(".comp-div.active");
    this._allSideComps = [
      ...document.querySelectorAll(".left_comp"),
      ...document.querySelectorAll(".right_comp"),
    ];
    this._activeSideComp = this._allSideComps.find((el) =>
      el.classList.contains("active")
    );
    this._currentSideComps = [
      ...this._activeComp.querySelectorAll(`.${side}_comp`),
    ];
    this._leftArray = [...document.querySelectorAll(".left_comp")];
    this._rightArray = [...document.querySelectorAll(".right_comp")];
    this._activeHeightDiv = document
      .querySelector(".comp-div.active")
      .querySelector(".height-div");
    this._allHeightDivs = document.querySelectorAll(".height-div");
    this._allHeightText = document.querySelectorAll(".height-text");
    this._activeOptsDiv = document
      .querySelector(".comp-div.active")
      .querySelector(".opts-div");
    this._allOptsDivs = [...document.querySelectorAll(".opts-div")];
    this._allOptsText = [...document.querySelectorAll(".opts-text")];
    this._allAdaptors = [...document.querySelectorAll(".adapter_block")];
    this._allSpacers = document.querySelectorAll(".opts-spacer");
    this._allHydSpacers = document.querySelectorAll(".hyd_spacer");
    // this._allAdaptors = document.querySelectorAll(".adapter_block");
  }
}
