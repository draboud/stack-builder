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
  blank:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b4cd1ae8a7f37543072995_border-s-p-500.png",

  side: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png",

  spl: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a5fa6e4d52fd0b3de57a9_3D-spl.png",

  man: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a5fa6725b057559cbf6aa_3D-man.png",

  hyd: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a5fa6f13b04fef09ca675_3D-hyd.png",

  adaptor:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a74027217473126aea363_3D-dsa.png",

  single:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a6c6ec4b8b91a31aa5abe_3D-single.png",

  cross:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a6c6e1a63013f513c6d6b_3D-cross.png",

  cross_limit:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a776323e23acebce2481d_3D-cross-limit.png",

  bell_nipple:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a69c604d50a77f5517d85_3D-bell-nipple.png",

  gate_valve:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a6c6f7172a37aa03166a1_3D-gate-valve.png",

  washington:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a6c6e03fa1f13aafbc392_3D-washington.png",

  wellhead:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a5fa60fc8656bfb6db500_3D-wellhead.png",

  annular:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a68e44adb1f08dc09b296_3D-annular.png",

  spool:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a6c6e7e501610bd690378_3D-spool.png",

  double:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/671a6c6ed57c9634eecf5172_3D-double.png",

  //lightHeight comps:................................................
  // adaptor:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/672be0deab94fee2605702d7_lightHeight-dsa.png",

  // washington:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/672be0de193241ec190d4a29_lightHeight-washington.png",

  // annular:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/672be0de76270bb9c890bcb8_lightHeight-annular.png",

  // spool:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/672be0de576b643d58f31667_lightHeight-spool.png",

  // cross:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/672be0dd147aeef9be7c81f3_lightHeight-cross.png",

  // gate_valve:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/672be0ddd564641923a85eff_lightHeight-gate-valve.png",

  // bell_nipple:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/672be0ddf4d2ff7923163bf2_lightHeight-bell-nipple.png",

  // single:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/672be0dd1e897bf8299810ea_lightHeight-single.png",

  // double:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/672be0dde2fd1a5cae043dcd_lightHeight-double.png",

  // wellhead:
  //   "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/672ac180c317d9b254527e4d_test-wellhead.png",
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

export const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
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
