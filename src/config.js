import stackView from "./Views/stackView";

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
];

export const COMP_IMG = {
  blank:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b4cd1ae8a7f37543072995_border-s-p-500.png",
  annular:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43c4b43469a2e8adef108_annular-lines-s-p-500.png",

  double:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a607b6e620e8d095cd8_double-lines-s-p-500.png",

  single:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a600e30348edb10ea25_single-lines-s-p-500.png",

  cross:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a6185c880cf2c85a7c3_cross-lines-s-p-500.png",

  spool:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a60ad38b5aab5702ba1_spool-lines-s-p-500.png",

  wellhead:
    "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b434b3ef1b19da5b4282b7_wellhead-lines-s-p-500.png",

  side: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png",

  spl: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd0316fff7c3bffbb6c781_Cross%20-%20Spool.png",

  man: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bcdf61a2ceb56331d1bc3b_Cross%20-%20Manual.png",

  hyd: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bcdf611491cc6deb154360_Cross%20-%20Hydraulic.png",
};

export const COMP_HEIGHTS = {
  wellhead: 27,
  spool: 44,
  cross: 49,
  single: 72,
  double: 112,
  annular: 91,
};
//_________________________________________________________________________
//Send indicator into function for either 'compBlock','compSideBlock'
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
