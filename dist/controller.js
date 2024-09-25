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

  // src/View.js
  var crossSplButton = document.querySelector(".cross_comp_button.spl");
  var crossManButton = document.querySelector(".cross_comp_button.man");
  var crossHydButton = document.querySelector(".cross_comp_button.hyd");
  var View = class {
    _data;
    _compWrapper = document.querySelector(".comp-wrapper");
    _allComps;
    _allSideComps;
    _activeComp;
    _activeSideComp;
    _compFlag;
    _newLeftArray;
    _newRightArray;
    //________________________________________________________________________
    //ID main comps
    setIds = function() {
      this._newCompArray = this._compWrapper.querySelectorAll(".comp-div");
      this._allSideComps = [
        ...this._compWrapper.querySelectorAll(".left_comp"),
        ...this._compWrapper.querySelectorAll(".right_comp")
      ];
      let sideActiveFlag;
      let compIdCounter = this._newCompArray.length;
      this._newCompArray.forEach(function(el, i) {
        el.id = "c-" + compIdCounter;
        compIdCounter -= 1;
      });
      this._allSideComps.forEach(function(el) {
        el.classList.contains("active") ? sideActiveFlag = true : sideActiveFlag = false;
      });
      if (sideActiveFlag === false) {
        document.querySelector(".cross_comp_button.spl").classList.remove("on");
        document.querySelector(".cross_comp_button.man").classList.remove("on");
        document.querySelector(".cross_comp_button.hyd").classList.remove("on");
      }
    };
    //_________________________________________________________________________
    //ID cross comps
    setIdsSides = function() {
      this._newLeftArray = [...this._compWrapper.querySelectorAll(".left_comp")];
      this._newRightArray = [
        ...this._compWrapper.querySelectorAll(".right_comp")
      ];
      const activeCompId = this._compWrapper.querySelector(".comp-div.active").id;
      let leftCompIdsCounter = this._newLeftArray.length;
      let rightCompIdsCounter = this._newRightArray.length;
      let indexCountLeft = 1;
      let indexCountRight = 1;
      let indexCount = 1;
      const currentLeftArray = [
        ...this._compWrapper.querySelector(".comp-div.active").querySelector(".side_left_div").querySelectorAll(".left_comp")
      ].reverse();
      currentLeftArray.forEach(function(el) {
        el.id = `${activeCompId}-left-${indexCountLeft}`;
        indexCountLeft += 1;
        leftCompIdsCounter -= 1;
      });
      const currentRightArray = [
        ...this._compWrapper.querySelector(".comp-div.active").querySelector(".side_right_div").querySelectorAll(".right_comp")
      ];
      currentRightArray.forEach(function(el) {
        el.id = `${activeCompId}-right-${indexCountRight}`;
        indexCountRight += 1;
        rightCompIdsCounter -= 1;
      });
    };
    //_________________________________________________________________________
    //Assign height and options events
    assignHandOClicks = function() {
      const heightDiv = this._activeComp.querySelector(".height-div");
      const optsDiv = this._activeComp.querySelector(".opts-div");
      heightDiv.addEventListener("mouseenter", function(e) {
        const hoverIn = e.target.closest(".height-div");
        if (!hoverIn) return;
        hoverIn.classList.add("highlight");
      });
      heightDiv.addEventListener("mouseout", function(e) {
        const hoverOut = e.target.closest(".height-div");
        if (!hoverOut) return;
        hoverOut.classList.remove("highlight");
      });
      optsDiv.addEventListener("click", function(e) {
        const clicked = e.target.closest(".opts-text");
        if (!clicked) return;
        clicked.classList.add("highlight");
      });
      optsDiv.addEventListener("click", function(e) {
        const clicked = e.target.closest(".opts-text");
        if (!clicked) return;
        optionsModal.classList.remove("hide");
      });
    };
    //_________________________________________________________________________
    //Side component events for cross
    assignSideClicks = function(side) {
      const activeCrossDiv = this._compWrapper.querySelector(
        ".comp-div.active.cross"
      );
      const sideDiv = activeCrossDiv.querySelector(`.side_${side}_div`);
      sideDiv.addEventListener("click", (e) => {
        const clicked = e.target.closest(`.${side}_comp`);
        if (!clicked) return;
        this._allSideComps = [
          ...this._compWrapper.querySelectorAll(".left_comp"),
          ...this._compWrapper.querySelectorAll(".right_comp")
        ];
        this._allSideComps.forEach(function(el) {
          el.classList.remove("active");
        });
        clicked.classList.add("active");
        const sideFlag = `${side}`;
        crossSplButton.classList.add("on");
        crossManButton.classList.add("on");
        crossHydButton.classList.add("on");
      });
    };
  };

  // src/stackView.js
  var StackView = class extends View {
    addHandlerAdjustBlocks(handler) {
      const compButtonsDiv = document.querySelector(".vert_buttons_div");
      compButtonsDiv.addEventListener("click", function(e) {
        const clickedComp = e.target.closest(".comp_button");
        const clickedCrossComp = e.target.closest(".cross_comp_button");
        const clickedAdd = e.target.closest(".comp_button_plus");
        const clickedMinus = e.target.closest(".comp_button_minus");
        const clickedArray = [
          clickedComp,
          clickedCrossComp,
          clickedAdd,
          clickedMinus
        ];
        handler(...clickedArray.filter((el) => el != null));
      });
    }
    ______;
    //Add stack comp
    addComponent() {
      const htmlComp = `
    <div id="new" class="comp-div">
      <div class="side_left_div hide">
        <div class="left_comp">
          <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
          <div class="hyd_spacer hide"></div>
        </div>
      </div>
      <div class="height-div hide">
        <div class="height-text">height</div>
      </div>
      <img class="img" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b4cd1ae8a7f37543072995_border-s-p-500.png">
      <div class="opts-div hide">
        <div class="opts-text">options</div>
        <div class="opts-spacer"></div>
        <div class="opts-text second">options</div>
      </div>
      <div class="side_right_div hide">
        <div class="right_comp">
          <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
          <div class="hyd_spacer hide"></div>
        </div>
      </div>`;
      this._activeComp = document.querySelector(".comp-div.active");
      this._activeSideComp = [
        ...document.querySelectorAll(".left_comp.active"),
        ...document.querySelectorAll(".right_comp.active")
      ];
      this._allSideComps = [
        ...this._compWrapper.querySelectorAll(".left_comp"),
        ...this._compWrapper.querySelectorAll(".right_comp")
      ];
      this._activeComp.insertAdjacentHTML("beforebegin", htmlComp);
      this._allComps = [...this._compWrapper.children];
      this._allComps.forEach(function(el) {
        el.classList.remove("active");
        if (el.id === "new") el.classList.add("active");
      });
      this._activeSideComp.forEach(function(el) {
        el.classList.remove("active");
      });
    }
    //_________________________________________________________________________
    //Delete stack comp
    removeComponent = function() {
      this._activeComp = this._compWrapper.querySelector(".comp-div.active");
      this._activeSideComp = [
        ...this._activeComp.querySelectorAll(".left_comp.active"),
        ...this._activeComp.querySelectorAll(".right_comp.active")
      ];
      if (this._activeComp.id !== "c-1") {
        this._activeComp.parentNode.removeChild(this._activeComp);
      } else {
        console.log("you cannot remove this one!");
        return;
      }
      if (this._activeComp.classList.contains("cross")) {
        this._activeSideComp.forEach(function(el) {
          el.classList.remove("active");
        });
      }
      this._compWrapper.firstElementChild.classList.contains("comp-div") ? this._compWrapper.firstElementChild.classList.add("active") : this._compWrapper.firstElementChild.nextElementSibling.classList.add(
        "active"
      );
      this._newLeftArray = [...this._compWrapper.querySelectorAll(".left_comp")];
      this._newRightArray = [
        ...this._compWrapper.querySelectorAll(".right_comp")
      ];
    };
    //_________________________________________________________________________
    //Add stack comp
    addCompImg = function(compFlag) {
      let compImg;
      this._activeComp = this._compWrapper.querySelector(".comp-div.active");
      const heightDiv = this._activeComp.querySelector(".height-div");
      const imageEl = this._activeComp.querySelector(".img");
      const optsDiv = this._activeComp.querySelector(".opts-div");
      imageEl.parentNode.removeChild(imageEl);
      if (compFlag === "annular") {
        compImg = "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43c4b43469a2e8adef108_annular-lines-s-p-500.png";
      }
      if (compFlag === "double") {
        compImg = "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a607b6e620e8d095cd8_double-lines-s-p-500.png";
      }
      if (compFlag === "single") {
        compImg = "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a600e30348edb10ea25_single-lines-s-p-500.png";
      }
      if (compFlag === "cross") {
        compImg = "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a6185c880cf2c85a7c3_cross-lines-s-p-500.png";
      }
      if (compFlag === "spool") {
        compImg = "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a60ad38b5aab5702ba1_spool-lines-s-p-500.png";
      }
      if (compFlag === "wellhead") {
        compImg = "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b434b3ef1b19da5b4282b7_wellhead-lines-s-p-500.png";
      }
      if (compFlag !== "double") {
        optsDiv.querySelector(".opts-text.second").classList.add("hide");
        optsDiv.querySelector(".opts-spacer").classList.add("hide");
      } else {
        optsDiv.querySelector(".opts-text.hide")?.classList.remove("hide");
        optsDiv.querySelector(".opts-spacer.hide")?.classList.remove("hide");
      }
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
      if (compFlag === "cross") {
        this._activeComp.querySelector(".side_left_div").classList.remove("hide");
        this._activeComp.querySelector(".side_right_div").classList.remove("hide");
      }
    };
  };
  var stackView_default = new StackView();

  // src/controller.js
  var controlAdjustStack = function(arrayEl) {
    const compVal = arrayEl.attributes.class.nodeValue.split(" ")[1];
    if (compVal === "plus") {
      stackView_default.addComponent();
      stackView_default.setIds();
      stackView_default.setIdsSides();
    } else if (compVal === "minus") {
      stackView_default.removeComponent();
      stackView_default.setIds();
      stackView_default.setIdsSides();
    } else {
      stackView_default.addCompImg(compVal);
      stackView_default.setIds();
      stackView_default.setIdsSides();
      if (compVal === "cross") {
        stackView_default.assignSideClicks("left");
        stackView_default.assignSideClicks("right");
        stackView_default.setIdsSides();
      }
    }
    stackView_default.assignHandOClicks();
  };
  var init = function() {
    stackView_default.addHandlerAdjustBlocks(controlAdjustStack);
  };
  init();
})();
