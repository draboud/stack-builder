// export const state = {
//   recipe: {},
//   search: {
//     query: "",
//     results: [],
//     page: 1,
//     resultsPerPage: RES_PER_PAGE,
//   },
//   bookmarks: [],
// };
//_________________________________________________________________________
//ID main comps
// export const setIds = function (newCompArray, allSideComps) {
//   //   const newCompArray = compWrapper.querySelectorAll(".comp-div");
//   //   const allSideComps = [
//   //     ...compWrapper.querySelectorAll(".left_comp"),
//   //     ...compWrapper.querySelectorAll(".right_comp"),
//   //   ];
//   let sideActiveFlag;
//   let compIdCounter = newCompArray.length;
//   newCompArray.forEach(function (el, i) {
//     el.id = "c-" + compIdCounter;
//     compIdCounter -= 1;
//   });
//   //if no active cross elements, turn off cross comp buttons
//   allSideComps.forEach(function (el) {
//     el.classList.contains("active")
//       ? (sideActiveFlag = true)
//       : (sideActiveFlag = false);
//   });
//   if (sideActiveFlag === false) {
//     document.querySelector(".cross_comp_button.spl").classList.remove("on");
//     document.querySelector(".cross_comp_button.man").classList.remove("on");
//     document.querySelector(".cross_comp_button.hyd").classList.remove("on");
//   }
// };

// //_________________________________________________________________________
// //ID cross comps
// export const setIdsSides = function (
//   compWrapper,
//   newLeftArray,
//   newRightArray,
//   activeComp
// ) {
//   //   const newLeftArray = [...compWrapper.querySelectorAll(".left_comp")];
//   //   const newRightArray = [...compWrapper.querySelectorAll(".right_comp")];
//   const activeCompId = activeComp.id;
//   let leftCompIdsCounter = newLeftArray.length;
//   let rightCompIdsCounter = newRightArray.length;
//   let indexCountLeft = 1;
//   let indexCountRight = 1;
//   let indexCount = 1;

//   const currentLeftArray = [
//     ...compWrapper
//       .querySelector(".comp-div.active")
//       .querySelector(".side_left_div")
//       .querySelectorAll(".left_comp"),
//   ].reverse();

//   currentLeftArray.forEach(function (el) {
//     el.id = `${activeCompId}-left-${indexCountLeft}`;
//     indexCountLeft += 1;
//     leftCompIdsCounter -= 1; //unnecessary
//   });

//   const currentRightArray = [
//     ...compWrapper
//       .querySelector(".comp-div.active")
//       .querySelector(".side_right_div")
//       .querySelectorAll(".right_comp"),
//   ];

//   currentRightArray.forEach(function (el) {
//     el.id = `${activeCompId}-right-${indexCountRight}`;
//     indexCountRight += 1;
//     rightCompIdsCounter -= 1; //unnecessary
//   });
// };
