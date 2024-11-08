import stackView from "./views/stackView";
import stackBtnsView from "./views/stackBtnsView";

let compIdCounterContinual = 2;
//________________________________________________________________________
//ID main comps
// export const setIds = function () {
//   stackView._retarget();
//   let compIdCounter = stackView._allComps.length;
//   stackView._allComps.forEach(function (el, i) {
//     el.id = "c-" + compIdCounter;
//     compIdCounter -= 1;
//   });
//   //if no active cross elements, turn off cross comp buttons
//   stackView._allSideComps.forEach(function (el) {
//     el.classList.contains("active")
//       ? (sideActiveFlag = true)
//       : (sideActiveFlag = false);
//   });
// };
//________________________________________________________________________
//ID main comps - id numbers do not reset, only count up with more comps
export const setIdsContinual = function () {
  stackView._retarget();

  stackView._activeComp.id = "c-" + compIdCounterContinual;
  compIdCounterContinual += 1;

  //if no active cross elements, turn off cross comp buttons
  stackView._allSideComps.forEach(function (el) {
    el.classList.contains("active")
      ? (sideActiveFlag = true)
      : (sideActiveFlag = false);
  });
};
//_________________________________________________________________________
//ID cross comps
export const setIdsSides = function () {
  stackView._retarget();
  const activeCompId = document.querySelector(".comp-div.active").id;
  let leftCompIdsCounter = stackView._leftArray.length;
  let rightCompIdsCounter = stackView._rightArray.length;
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
    rightCompIdsCounter -= 1; //unnecessary?
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
