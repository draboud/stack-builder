import stackView from "./views/stackView";

export const COMP_CLASSES = [
  "washington",
  "annular",
  "double",
  "cross",
  "single",
  "spool",
  "wellhead",
  "spl",
  "man",
  "hyd",
  "gate_valve",
  "bell_nipple",
];

export const COMP_IMG = {
  side: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png",

  spl: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd0316fff7c3bffbb6c781_Cross%20-%20Spool.png",

  man: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bcdf61a2ceb56331d1bc3b_Cross%20-%20Manual.png",

  hyd: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bcdf611491cc6deb154360_Cross%20-%20Hydraulic.png",

  //alternate side comp imgs:...........................................
  // spl: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/67117a12b7be63f689976418_cross-spl.png",

  // man: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/67117a128b9b4fcb4d820863_cross-man.png",

  // hyd: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/67117a12fd16176ad78204f4_cross-hyd.png",
  //....................................................................

  double:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/67113e2e31935f629aac8048_double-2.png",

  single:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671144a63278e75e8411fe6c_single-2.png",

  cross:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671144a651504ebf148b4cd6_cross-2.png",
  // cross:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/67117a12fd16176ad78204f4_cross-hyd.png",

  bell_nipple:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671144a6fcd56570fad07590_bell%20nipple-2.png",

  gate_valve:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671144a6fcd56570fad0758d_gate%20valve-2.png",

  washington:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671144a6f41e86f336bcb5e2_washington-2.png",

  wellhead:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671144a674e41c46ddf6a523_wellhead-2.png",

  annular:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671144a69b81cf89e91e3c58_annular-2.png",

  spool:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671144a693ce93795200daa9_spool-2.png",

  blank:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b4cd1ae8a7f37543072995_border-s.png",

  adaptor:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6711472a9b81cf89e9209361_dsa-2.png",
};

export const COMP_HEIGHTS = {
  wellhead: 27,
  spool: 44,
  cross: 49,
  single: 72,
  double: 112,
  annular: 91,
  adaptor: 7,
  gate_valve: 72,
  bell_nipple: 112,
  washington: 60,
};
//_________________________________________________________________________
//Send indicator into function for either 'compBlock', 'compSideBlock', 'adaptor'
export const GENERATE_MARKUP = function (compType) {
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
  // if (compType === "adaptor") {
  //   return `
  //   <div class="comp-div adaptor">
  //     <div class="height-div">
  //       <div class="height-text">${COMP_HEIGHTS.adaptor}"</div>
  //     </div>
  //     <img class="img" src=${COMP_IMG.adaptor}>
  //     <div class="opts-div">
  //       <div class="opts-text">options</div>
  //      </div>
  //   </div>`;
  // }
};
//_________________________________________________________________________
// for scaleStack
export const STACK_MAX = 620;
// export const STACK_MAX = 400;
export const STACK_MAX_FOR_OPTS = 1000;
export const COMP_DIV_WIDTH = 230;
//_________________________________________________________________________
//for pdf settings
export const PDF_SETTINGS = {
  xAxis: 15,
  yAxis: 10,
  scaleFactor: 0.35,
  logoX: 337.8,
  logoY: 120.7,
  pageHeight: 841,
  notesMaxWidth: "550",
  logoImg:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b41c3b6d1b3e37580ee90a_Team%20Snubbing%20International%20-%20Horizontal-p-500.png",
};
