(() => {
  // src/model.js
  var setIds = function(newCompArray, allSideComps) {
    let sideActiveFlag;
    let compIdCounter = newCompArray.length;
    newCompArray.forEach(function(el, i) {
      el.id = "c-" + compIdCounter;
      compIdCounter -= 1;
    });
    allSideComps.forEach(function(el) {
      el.classList.contains("active") ? sideActiveFlag = true : sideActiveFlag = false;
    });
    if (sideActiveFlag === false) {
      document.querySelector(".cross_comp_button.spl").classList.remove("on");
      document.querySelector(".cross_comp_button.man").classList.remove("on");
      document.querySelector(".cross_comp_button.hyd").classList.remove("on");
    }
  };

  // src/View.js
  var View = class {
    _data;
    _compWrapper = document.querySelector(".comp-wrapper");
    _allComps;
    _allSideComps;
    _activeElement;
    _activeSideComp;
  };

  // src/stackButtonsView.js
  var StackButtonsView = class extends View {
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
    //_________________________________________________________________________
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
      const compActive = document.querySelector(".comp-div.active");
      const activeSideComp = [
        ...document.querySelectorAll(".left_comp.active"),
        ...document.querySelectorAll(".right_comp.active")
      ];
      this._allSideComps = [
        ...this._compWrapper.querySelectorAll(".left_comp"),
        ...this._compWrapper.querySelectorAll(".right_comp")
      ];
      compActive.insertAdjacentHTML("beforebegin", htmlComp);
      this._allComps = [...this._compWrapper.children];
      this._allComps.forEach(function(el) {
        el.classList.remove("active");
        if (el.id === "new") el.classList.add("active");
      });
      activeSideComp.forEach(function(el) {
        el.classList.remove("active");
      });
    }
    //_________________________________________________________________________
    //Delete stack comp
    removeComponent = function() {
      this._activeElement = this._compWrapper.querySelector(".comp-div.active");
      this._activeSideComp = [
        ...this._activeElement.querySelectorAll(".left_comp.active"),
        ...this._activeElement.querySelectorAll(".right_comp.active")
      ];
      if (this._activeElement.id !== "c-1") {
        this._activeElement.parentNode.removeChild(this._activeElement);
      } else {
        console.log("you cannot remove this one!");
        return;
      }
      if (this._activeElement.classList.contains("cross")) {
        this._activeSideComp.forEach(function(el) {
          el.classList.remove("active");
        });
      }
      this._compWrapper.firstElementChild.classList.contains("comp-div") ? this._compWrapper.firstElementChild.classList.add("active") : this._compWrapper.firstElementChild.nextElementSibling.classList.add(
        "active"
      );
    };
  };
  var stackButtonsView_default = new StackButtonsView();

  // src/controller.js
  var controlAdjustStack = function(arrayEl) {
    const compVal = arrayEl.attributes.class.nodeValue.split(" ")[1];
    if (compVal === "plus") {
      stackButtonsView_default.addComponent();
      setIds(stackButtonsView_default._allComps, stackButtonsView_default._allSideComps);
    } else if (compVal === "minus") {
      stackButtonsView_default.removeComponent();
      setIds(stackButtonsView_default._allComps, stackButtonsView_default._allSideComps);
    } else console.log("comp: ", compVal);
  };
  var init = function() {
    stackButtonsView_default.addHandlerAdjustBlocks(controlAdjustStack);
  };
  init();
})();
