import stackView from "./views/stackView";
import stackBtnsView from "./Views/stackBtnsView";
import View from "./Views/View";

//________________________________________________________________________
//ID main comps
export const setIds = function () {
  this._newCompArray = document.querySelectorAll(".comp-div");
  this._allSideComps = [
    ...document.querySelectorAll(".left_comp"),
    ...document.querySelectorAll(".right_comp"),
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
};

//_________________________________________________________________________
//ID cross comps
export const setIdsSides = function () {
  this._newLeftArray = [...document.querySelectorAll(".left_comp")];
  this._newRightArray = [...document.querySelectorAll(".right_comp")];
  const activeCompId = document.querySelector(".comp-div.active").id;
  let leftCompIdsCounter = this._newLeftArray.length;
  let rightCompIdsCounter = this._newRightArray.length;
  let indexCountLeft = 1;
  let indexCountRight = 1;
  let indexCount = 1;

  const currentLeftArray = [
    ...document
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
    ...document
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
//Remove extra cross side components and 'active'
export const cleanCross = function () {
  stackBtnsView.toggleCrossBtns("remove");

  ["left", "right"].forEach(function (el) {
    stackView._retarget(el);
    stackView._currentSideComps.forEach((el) => el.classList.remove("active"));
    stackView._currentSideComps
      .at(el === "left" ? 0 : -1)
      .classList.add("active");
    stackView._currentSideComps.forEach(function (el2) {
      stackView._delSideComp(el);
    });
    stackView._currentSideComps.forEach((el) => el.classList.remove("active"));
  });
};
//_________________________________________________________________________
//Send indicator into function for either 'compBlock','compSideBlock'
export const generateMarkup = function (compType) {
  if (compType === "compBlock") {
    return `
    <div id="new" class="comp-div">
      <div class="side_left_div hide">
        <div class="left_comp">
          <img class="img_side" src=${COMP_IMG.side}>
          <div class="hyd_spacer hide"></div>
        </div>
      </div>
      <div class="height-div hide">
        <div class="height-text">height</div>
      </div>
      <img class="img" src=${COMP_IMG.blank}>
      <div class="opts-div hide">
        <div class="opts-text">options</div>
        <div class="opts-spacer"></div>
        <div class="opts-text second">options</div>
      </div>
      <div class="side_right_div hide">
        <div class="right_comp">
          <img class="img_side" src=${COMP_IMG.side}>
          <div class="hyd_spacer hide"></div>
        </div>
    </div>`;
  }
  if (compType === "compSideBlock") {
    return `
    <div class= "${stackView._sideFlag}_comp active">
      <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
      <div class="hyd_spacer hide"></div>
    </div>`;
  }
};
