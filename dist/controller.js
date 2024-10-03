(() => {
  // src/config.js
  var COMP_CLASSES = [
    "washington",
    "annular",
    "double",
    "cross",
    "single",
    "spool",
    "wellhead",
    "spl",
    "man",
    "hyd"
  ];
  var COMP_IMG = {
    annular: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43c4b43469a2e8adef108_annular-lines-s-p-500.png",
    double: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a607b6e620e8d095cd8_double-lines-s-p-500.png",
    single: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a600e30348edb10ea25_single-lines-s-p-500.png",
    cross: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a6185c880cf2c85a7c3_cross-lines-s-p-500.png",
    spool: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a60ad38b5aab5702ba1_spool-lines-s-p-500.png",
    wellhead: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b434b3ef1b19da5b4282b7_wellhead-lines-s-p-500.png",
    side: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png",
    blank: "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b4cd1ae8a7f37543072995_border-s-p-500.png"
  };
  var COMP_HEIGHTS = {
    wellhead: 27,
    spool: 44,
    cross: 49,
    single: 72,
    double: 112,
    annular: 91
  };

  // src/Views/View.js
  var View = class {
    _data;
    _compWrapper = document.querySelector(".comp-wrapper");
    _allComps;
    _allSideComps;
    _activeComp = document.querySelector(".comp-div.active");
    _activeSideComp;
    _compFlag;
    _newLeftArray;
    _newRightArray;
    _sideFlag;
    // _sideActiveFlag;
    _heightDiv;
    _optsDiv;
    _retarget() {
      this._allComps = [...this._compWrapper.children];
      this._activeComp = document.querySelector(".comp-div.active");
      this._allSideComps = [
        ...document.querySelectorAll(".left_comp"),
        ...document.querySelectorAll(".right_comp")
      ];
      this._activeSideComp = this._allSideComps.find(
        (el) => el.classList.contains("active")
      );
    }
    //_________________________________________________________________________
    // //Assign height and options events
    // assignHandOClicks = function () {
    //   const heightDiv = this._activeComp.querySelector(".height-div");
    //   const optsDiv = this._activeComp.querySelector(".opts-div");
    //   heightDiv.addEventListener("mouseenter", function (e) {
    //     const hoverIn = e.target.closest(".height-div");
    //     if (!hoverIn) return;
    //     hoverIn.classList.add("highlight");
    //   });
    //   heightDiv.addEventListener("mouseout", function (e) {
    //     const hoverOut = e.target.closest(".height-div");
    //     if (!hoverOut) return;
    //     hoverOut.classList.remove("highlight");
    //   });
    //   optsDiv.addEventListener("click", function (e) {
    //     const clicked = e.target.closest(".opts-text");
    //     if (!clicked) return;
    //     clicked.classList.add("highlight");
    //   });
    //   optsDiv.addEventListener("click", function (e) {
    //     const clicked = e.target.closest(".opts-text");
    //     if (!clicked) return;
    //     optionsModal.classList.remove("hide");
    //   });
    // };
  };

  // src/Views/stackBtnsView.js
  var [compSpl, compMan, compHyd] = Array.from([
    ...document.querySelectorAll(".comp_button.cr")
  ]);
  var StackBtnsView = class extends View {
    addHandlerStackBtns(handler) {
      const compButtonsDiv = document.querySelector(".vert_buttons_div");
      compButtonsDiv.addEventListener("click", function(e) {
        const clickedComp = e.target.closest(".comp_button");
        const clickedCompCross = e.target.closest(".comp_button_cr");
        const clickedAdd = e.target.closest(".comp_button_plus");
        const clickedMinus = e.target.closest(".comp_button_minus");
        const clickedArray = [
          clickedComp,
          clickedCompCross,
          clickedAdd,
          clickedMinus
        ];
        handler(...clickedArray.filter((el) => el != null));
      });
    }
    //______________________________________________________________________
    //Side plus and minus clicks
    addHandlerCrossPlusMinus(handler) {
      const plusMinusWrapper = document.querySelector(".plus_minus_wrapper");
      plusMinusWrapper.addEventListener("click", function(e) {
        const clicked = e.target.closest(".side_effect");
        if (!clicked) return;
        e.stopPropagation();
        clicked.classList.contains("plus") ? handler("plus") : handler("minus");
      });
    }
    //_____________________________________________________________________
    //Turn on/off cross buttons
    toggleCrossBtns(addOrRemove) {
      addOrRemove === "add" ? [compSpl, compMan, compHyd].forEach((el) => el.classList.add("on")) : [compSpl, compMan, compHyd].forEach((el) => el.classList.remove("on"));
    }
  };
  var stackBtnsView_default = new StackBtnsView();

  // src/views/stackView.js
  var StackView = class extends View {
    //_____________________________________________________________________
    //Height and Option clicks
    addHandlerHandO(handler) {
      this._heightDiv = document.querySelector(".comp-div.active").querySelector(".height-div");
      this._optsDiv = document.querySelector(".comp-div.active").querySelector(".opts-div");
      this._heightDiv.addEventListener("click", function(e) {
        const clicked = e.target.closest(".height-div");
        if (!clicked) return;
        clicked.classList.toggle("highlight");
      });
      this._optsDiv.addEventListener("click", function(e) {
        const clicked = e.target.closest(".opts-div");
        if (!clicked) return;
        clicked.classList.toggle("highlight");
      });
    }
    //_____________________________________________________________________
    //Clicks for stack components
    addHandlerCompClick(handler) {
      this._compWrapper.addEventListener("click", function(e) {
        const clicked = e.target.closest(".comp-div");
        if (!clicked) return;
        handler(clicked);
      });
    }
    //_____________________________________________________________________
    //Add stack comp
    addComp() {
      const htmlComp = `
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
      this._activeComp.insertAdjacentHTML("beforebegin", htmlComp);
      this._retarget();
      this._allComps.forEach(function(el) {
        el.classList.remove("active");
        if (el.id === "new") el.classList.add("active");
      });
      this._activeSideComp?.classList.remove("active");
      stackBtnsView_default.toggleCrossBtns("remove");
    }
    //_______________________________________________________________________
    //Delete stack comp
    delComp = function() {
      this._retarget();
      if (this._activeComp.id !== "c-1") {
        this._activeComp.parentNode.removeChild(this._activeComp);
      } else {
        console.log("you cannot remove this one!");
        return;
      }
      if (this._activeComp.classList.contains("cross")) {
        this._activeSideComp?.classList.remove("active");
      }
      this._compWrapper.firstElementChild.classList.contains("comp-div") ? this._compWrapper.firstElementChild.classList.add("active") : this._compWrapper.firstElementChild.nextElementSibling.classList.add(
        "active"
      );
      stackBtnsView_default.toggleCrossBtns("remove");
    };
    //_______________________________________________________________________
    //Add stack comp
    configureComp = function(compFlag) {
      let compImg;
      this._retarget();
      const heightDiv = this._activeComp.querySelector(".height-div");
      const imageEl = this._activeComp.querySelector(".img");
      imageEl.parentNode.removeChild(imageEl);
      compImg = COMP_IMG[compFlag];
      const htmlImg = `<img class= img src=${compImg}>`;
      heightDiv.insertAdjacentHTML("afterend", htmlImg);
      imageEl.classList.remove("hide");
      this._activeComp.querySelector(".side_left_div").classList.add("hide");
      this._activeComp.querySelector(".side_right_div").classList.add("hide");
      this._activeComp.querySelector(".height-div").classList.remove("hide");
      this._activeComp.querySelector(".opts-div").classList.remove("hide");
      COMP_CLASSES.forEach((el) => {
        el === compFlag ? this._activeComp.classList.add(compFlag) : this._activeComp.classList.remove(el);
      });
      this._compSpecialCases(compFlag);
    };
    //_______________________________________________________________________
    //Check for special cases: 'double' or 'cross' and apply treatments
    _compSpecialCases = function(compFlag) {
      if (compFlag != "double" && compFlag != "cross") return;
      const optsDiv = this._activeComp.querySelector(".opts-div");
      if (compFlag !== "double") {
        optsDiv.querySelector(".opts-text.second").classList.add("hide");
        optsDiv.querySelector(".opts-spacer").classList.add("hide");
      } else {
        optsDiv.querySelector(".opts-text.hide")?.classList.remove("hide");
        optsDiv.querySelector(".opts-spacer.hide")?.classList.remove("hide");
      }
      if (compFlag === "cross") {
        this._activeComp.querySelector(".side_left_div").classList.remove("hide");
        this._activeComp.querySelector(".side_right_div").classList.remove("hide");
        ["left", "right"].forEach((el) => this._assignSideClicks(el));
      }
    };
    //_____________________________________________________________________
    //Side component events for cross
    _assignSideClicks = function(side) {
      this._retarget();
      const sideDiv = this._compWrapper.querySelector(".comp-div.active.cross").querySelector(`.side_${side}_div`);
      sideDiv.addEventListener("click", (e) => {
        const clicked = e.target.closest(`.${side}_comp`);
        if (!clicked) return;
        e.stopPropagation();
        this._allSideComps.forEach(function(el) {
          el.classList.remove("active");
        });
        clicked.classList.add("active");
        this._allComps.forEach((el) => el.classList.remove("active"));
        clicked.closest(".comp-div").classList.add("active");
        this._sideFlag = `${side}`;
        stackBtnsView_default.toggleCrossBtns("add");
      });
    };
    //_______________________________________________________________________
    //Add cross side comp
    addSideComp = function(flag) {
      const htmlSide = `
    <div class= "${flag}_comp active">
      <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
      <div class="hyd_spacer hide"></div>
    </div>`;
      const targetActiveComp = this._compWrapper.querySelector(
        ".comp-div.cross.active"
      );
      this._retarget();
      this._allSideComps.forEach(function(el) {
        el.classList.remove("active");
      });
      const sideSelect = flag === "left" ? targetActiveComp.firstElementChild : targetActiveComp.lastElementChild;
      const beforeOrAfter = flag === "left" ? "afterbegin" : "beforeend";
      sideSelect.insertAdjacentHTML(beforeOrAfter, htmlSide);
    };
    //_______________________________________________________________________
    //Remove cross side comp
    removeSideComp = function(flag) {
      const activeSideComp = this._compWrapper.querySelector(
        `.${flag}_comp.active`
      );
      if (!activeSideComp) return;
      if (activeSideComp.id.slice(-2) === "-1") {
        activeSideComp.querySelector(".hyd_spacer").classList.add("hide");
        activeSideComp.querySelector(".img_side").src = "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png";
        return;
      }
      activeSideComp.parentNode.removeChild(activeSideComp);
      const targetActiveSideComp = this._compWrapper.querySelector(".comp-div.active").querySelector(`.${flag}_comp`);
      flag === "left" ? targetActiveSideComp.parentNode.firstElementChild.classList.add(
        "active"
      ) : targetActiveSideComp.parentNode.lastElementChild.classList.add(
        "active"
      );
    };
  };
  var stackView_default = new StackView();

  // src/views/heightsView.js
  var HeightsView = class extends View {
    //_________________________________________________________________________
    //Assign component heights
    addCompHeight = function(compFlag) {
      this._activeComp = document.querySelector(".comp-div.active");
      this._activeComp.querySelector(".height-text").innerHTML = COMP_HEIGHTS[compFlag] + '"';
    };
  };
  var heightsView_default = new HeightsView();

  // src/helpers.js
  var setIds = function() {
    this._newCompArray = document.querySelectorAll(".comp-div");
    this._allSideComps = [
      ...document.querySelectorAll(".left_comp"),
      ...document.querySelectorAll(".right_comp")
    ];
    let compIdCounter = this._newCompArray.length;
    this._newCompArray.forEach(function(el, i) {
      el.id = "c-" + compIdCounter;
      compIdCounter -= 1;
    });
    this._allSideComps.forEach(function(el) {
      el.classList.contains("active") ? sideActiveFlag = true : sideActiveFlag = false;
    });
  };
  var setIdsSides = function() {
    this._newLeftArray = [...document.querySelectorAll(".left_comp")];
    this._newRightArray = [...document.querySelectorAll(".right_comp")];
    const activeCompId = document.querySelector(".comp-div.active").id;
    let leftCompIdsCounter = this._newLeftArray.length;
    let rightCompIdsCounter = this._newRightArray.length;
    let indexCountLeft = 1;
    let indexCountRight = 1;
    let indexCount = 1;
    const currentLeftArray = [
      ...document.querySelector(".comp-div.active").querySelector(".side_left_div").querySelectorAll(".left_comp")
    ].reverse();
    currentLeftArray.forEach(function(el) {
      el.id = `${activeCompId}-left-${indexCountLeft}`;
      indexCountLeft += 1;
      leftCompIdsCounter -= 1;
    });
    const currentRightArray = [
      ...document.querySelector(".comp-div.active").querySelector(".side_right_div").querySelectorAll(".right_comp")
    ];
    currentRightArray.forEach(function(el) {
      el.id = `${activeCompId}-right-${indexCountRight}`;
      indexCountRight += 1;
      rightCompIdsCounter -= 1;
    });
  };

  // src/controller.js
  console.log("CONTROLLER - Oct 3, 2024");
  var controlStackBtns = function(arrayEl) {
    const compVal = arrayEl.attributes.class.nodeValue.split(" ")[1];
    if (compVal === "plus") {
      stackView_default.addComp();
    }
    if (compVal === "minus") {
      stackView_default.delComp();
    }
    if (compVal === "cr") {
      console.log("new cross btn");
    }
    if (compVal != "plus" && compVal != "minus" && compVal != "cr") {
      stackView_default.configureComp(compVal);
    }
    if (stackView_default._sideActiveFlag === false) {
      stackBtnsView_default.toggleCrossBtns("remove");
    }
    setIds();
    setIdsSides();
    stackView_default.addHandlerHandO();
    heightsView_default.addCompHeight(compVal);
  };
  controlCrossPlusMinus = function(sign) {
    sign === "plus" ? stackView_default.addSideComp(stackView_default._sideFlag) : stackView_default.removeSideComp(stackView_default._sideFlag);
    setIdsSides();
  };
  controlCompClick = function(clicked) {
    stackView_default._retarget();
    stackView_default._allComps.forEach((el) => el.classList.remove("active"));
    stackView_default._activeSideComp?.classList.remove("active");
    stackBtnsView_default.toggleCrossBtns("remove");
    clicked.classList.add("active");
  };
  var init = function() {
    stackBtnsView_default.addHandlerStackBtns(controlStackBtns);
    stackBtnsView_default.addHandlerCrossPlusMinus(controlCrossPlusMinus);
    stackView_default.addHandlerCompClick(controlCompClick);
  };
  init();
})();
