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
export const setIds = function (newCompArray, allSideComps) {
  //   const newCompArray = compWrapper.querySelectorAll(".comp-div");
  //   const allSideComps = [
  //     ...compWrapper.querySelectorAll(".left_comp"),
  //     ...compWrapper.querySelectorAll(".right_comp"),
  //   ];
  let sideActiveFlag;
  let compIdCounter = newCompArray.length;
  newCompArray.forEach(function (el, i) {
    el.id = "c-" + compIdCounter;
    compIdCounter -= 1;
  });
  //if no active cross elements, turn off cross comp buttons
  allSideComps.forEach(function (el) {
    el.classList.contains("active")
      ? (sideActiveFlag = true)
      : (sideActiveFlag = false);
  });
  if (sideActiveFlag === false) {
    document.querySelector(".cross_comp_button.spl").classList.remove("on");
    document.querySelector(".cross_comp_button.man").classList.remove("on");
    document.querySelector(".cross_comp_button.hyd").classList.remove("on");
  }
};
