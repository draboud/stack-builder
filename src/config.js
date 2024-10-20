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
  // spl: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd0316fff7c3bffbb6c781_Cross%20-%20Spool.png",

  // man: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bcdf61a2ceb56331d1bc3b_Cross%20-%20Manual.png",

  // hyd: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6711a24a216cf3489112e58e_Cross%20-%20Hydraulic-2.png",

  // annular:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43c4b43469a2e8adef108_annular-lines-s-p-500.png",

  // double:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a607b6e620e8d095cd8_double-lines-s-p-500.png",

  // single:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a600e30348edb10ea25_single-lines-s-p-500.png",

  // cross:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a6185c880cf2c85a7c3_cross-lines-s-p-500.png",

  // spool:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a60ad38b5aab5702ba1_spool-lines-s-p-500.png",

  // wellhead:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b434b3ef1b19da5b4282b7_wellhead-lines-s-p-500.png",

  // hyd: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bcdf611491cc6deb154360_Cross%20-%20Hydraulic.png",

  // adaptor:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6706acb871e7eebcfaaa2539_adaptor-lines-s.png",

  // bell_nipple:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6707e33c92c129265e244ade_bell_nipple-lines-s.png",

  // gate_valve:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6707e32d9da98d7a2926a97c_gate_valve-lines-s.png",

  //new-comps.............................................................
  blank:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b4cd1ae8a7f37543072995_border-s-p-500.png",

  side: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png",

  spl: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/67126fdf06a43383a969f298_Cross%20-%20Spool-2.png",

  man: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/67126fdf0797b645d0c5214a_Cross%20-%20Manual-2.png",

  hyd: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/67126fde59814ff97b1037f7_Cross%20-%20Hydraulic-2b.png",

  adaptor:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6711472a9b81cf89e9209361_dsa-2.png",

  single:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671144a63278e75e8411fe6c_single-2.png",

  cross:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671144a651504ebf148b4cd6_cross-2.png",

  cross_limit:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671568a579848e76035dd2da_cross-limit.png",

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

  double:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/67113e2e31935f629aac8048_double-2.png",
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
};
//_________________________________________________________________________
// for scaleStack
export const STACK_MAX = 620;
export const STACK_MAX_FOR_OPTS = 1000;
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
