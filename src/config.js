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

  spl: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b6eebe9ad00b35d6612a_spl.png",

  man: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b6ef9b4d2c8142a7f216_man.png",

  hyd: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b6ee394953790797f3cb_hyd.png",

  adaptor:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b312d2fffcb9a524d767_dsa.png",

  single:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b5ea1c06997b0220fcc8_single.png",

  cross:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b3c7f8b23dec7c289076_cross.png",

  cross_limit:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b3f6ba678f63c4e3435b_cross-limit.png",

  bell_nipple:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b5eac5e2db20f536b96e_bell-nipple.png",

  gate_valve:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b5ea99a5d62431ab9fdd_gate-valve.png",

  washington:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b5ea1505503c09e8350d_washington.png",

  wellhead:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b5ea8583818d4d9a7805_wellhead.png",

  annular:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b5eaf8b23dec7c2a0609_annular.png",

  spool:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b5ea9b4d2c8142a7082a_spool.png",

  double:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/6719b27b99a5d62431a90ed2_double.png",
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
