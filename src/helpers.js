import View from "./Views/View";

// export const retarget = function (tarActC, tarActSC, remActC, rem) {
//   const helpAllComps = document.querySelectorAll(".comp-div");
//   const helpCompActive = document.querySelector(".comp-div.active");

//   const helpAllSideComps = [
//     ...document.querySelectorAll(".left_comp"),
//     ...document.querySelectorAll(".right_comp"),
//   ];
//   const helpAllSideCompsActive = [
//     ...document.querySelectorAll(".left_comp.active"),
//     ...document.querySelectorAll(".right_comp.active"),
//   ];
// };

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
