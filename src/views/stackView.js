import View from "./View";
import { COMP_CLASSES } from "../config";

//___________________________________________________________________
// let heightDiv;
class StackView extends View {
  addHandlerAdjustBlocks(handler) {
    //Select main comp type
    const compButtonsDiv = document.querySelector(".vert_buttons_div");
    compButtonsDiv.addEventListener("click", function (e) {
      const clickedComp = e.target.closest(".comp_button");
      const clickedCompCross = e.target.closest(".comp_button_cr");
      const clickedAdd = e.target.closest(".comp_button_plus");
      const clickedMinus = e.target.closest(".comp_button_minus");

      const clickedArray = [
        clickedComp,
        clickedCompCross,
        clickedAdd,
        clickedMinus,
      ];

      handler(...clickedArray.filter((el) => el != null));
    });
  }
  //______________________________________________________________________
  //Side plus and minus clicks
  addHandlerAdjustCross(handler) {
    const plusMinusWrapper = document.querySelector(".plus_minus_wrapper");
    plusMinusWrapper.addEventListener("click", function (e) {
      const clicked = e.target.closest(".side_effect");
      if (!clicked) return;
      e.stopPropagation();

      clicked.classList.contains("plus") ? handler("plus") : handler("minus");
    });
  }
  //_____________________________________________________________________
  //Height and Option clicks
  addHandlerHandO(handler) {
    //Assign height and options events
    this._heightDiv = document
      .querySelector(".comp-div.active")
      .querySelector(".height-div");
    this._optsDiv = document
      .querySelector(".comp-div.active")
      .querySelector(".opts-div");

    this._heightDiv.addEventListener("click", function (e) {
      const clicked = e.target.closest(".height-div");
      if (!clicked) return;
      clicked.classList.toggle("highlight");
      // handler("height");
    });

    this._optsDiv.addEventListener("click", function (e) {
      const clicked = e.target.closest(".opts-div");
      if (!clicked) return;
      clicked.classList.toggle("highlight");
      // handler("opt");
    });
  }
  //_____________________________________________________________________
  //Clicks for stack components
  addHandlerCompSelect(handler) {
    //Main comps clicks

    this._compWrapper.addEventListener("click", function (e) {
      const clicked = e.target.closest(".comp-div");
      if (!clicked) return;
      if (
        !clicked.querySelector(".left_comp.active") &&
        !clicked.querySelector(".right_comp.active")
      ) {
        const sideActive = false;
        handler(clicked, sideActive);
      }
      handler(clicked);

      // this._allCompDivs.forEach(function (el) {
      //   el.classList.remove("active");
      // });

      // clicked.classList.add("active");

      // if (
      //   !clicked.querySelector(".left_comp.active") &&
      //   !clicked.querySelector(".right_comp.active")
      // ) {
      //   activeSideComp.forEach(function (el) {
      //     el.classList.remove("active");
      //     //turn on cross comp buttons
      //     crossSplButton.classList.remove("on");
      //     crossManButton.classList.remove("on");
      //     crossHydButton.classList.remove("on");
      //   });
      // }
    });
  }

  //_____________________________________________________________________
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
      </div>`; //new comp template
    this._activeComp = document.querySelector(".comp-div.active");
    this._activeSideComp = [
      ...document.querySelectorAll(".left_comp.active"),
      ...document.querySelectorAll(".right_comp.active"),
    ];
    this._allSideComps = [
      ...this._compWrapper.querySelectorAll(".left_comp"),
      ...this._compWrapper.querySelectorAll(".right_comp"),
    ];

    this._activeComp.insertAdjacentHTML("beforebegin", htmlComp);

    this._allComps = [...this._compWrapper.children];
    this._allComps.forEach(function (el) {
      el.classList.remove("active");
      if (el.id === "new") el.classList.add("active");
    });
    this._activeSideComp.forEach(function (el) {
      el.classList.remove("active");
    });
  }
  //_______________________________________________________________________
  //Delete stack comp
  removeComponent = function () {
    this._activeComp = this._compWrapper.querySelector(".comp-div.active");
    this._activeSideComp = [
      ...this._activeComp.querySelectorAll(".left_comp.active"),
      ...this._activeComp.querySelectorAll(".right_comp.active"),
    ];
    if (this._activeComp.id !== "c-1") {
      this._activeComp.parentNode.removeChild(this._activeComp);
    } else {
      console.log("you cannot remove this one!");
      return;
    }
    if (this._activeComp.classList.contains("cross")) {
      this._activeSideComp.forEach(function (el) {
        el.classList.remove("active");
      });
    }
    this._compWrapper.firstElementChild.classList.contains("comp-div")
      ? this._compWrapper.firstElementChild.classList.add("active")
      : this._compWrapper.firstElementChild.nextElementSibling.classList.add(
          "active"
        );

    this._newLeftArray = [...this._compWrapper.querySelectorAll(".left_comp")];
    this._newRightArray = [
      ...this._compWrapper.querySelectorAll(".right_comp"),
    ];

    // autoAdapt();
  };

  //_______________________________________________________________________
  //Add stack comp
  addCompImg = function (compFlag) {
    let compImg;
    this._activeComp = this._compWrapper.querySelector(".comp-div.active");
    const heightDiv = this._activeComp.querySelector(".height-div");
    const imageEl = this._activeComp.querySelector(".img");
    const optsDiv = this._activeComp.querySelector(".opts-div");

    imageEl.parentNode.removeChild(imageEl); //just change src instead?

    if (compFlag === "annular") {
      compImg =
        "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43c4b43469a2e8adef108_annular-lines-s-p-500.png";
    }
    if (compFlag === "double") {
      compImg =
        "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a607b6e620e8d095cd8_double-lines-s-p-500.png";
    }
    if (compFlag === "single") {
      compImg =
        "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a600e30348edb10ea25_single-lines-s-p-500.png";
    }
    if (compFlag === "cross") {
      compImg =
        "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a6185c880cf2c85a7c3_cross-lines-s-p-500.png";
    }
    if (compFlag === "spool") {
      compImg =
        "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b43a60ad38b5aab5702ba1_spool-lines-s-p-500.png";
    }
    if (compFlag === "wellhead") {
      compImg =
        "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b434b3ef1b19da5b4282b7_wellhead-lines-s-p-500.png";
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

    // if (!activeDiv) return;

    this._activeComp.querySelector(".side_left_div").classList.add("hide");
    this._activeComp.querySelector(".side_right_div").classList.add("hide");
    this._activeComp.querySelector(".height-div").classList.remove("hide");
    this._activeComp.querySelector(".opts-div").classList.remove("hide");

    COMP_CLASSES.forEach((el) => {
      el === compFlag
        ? this._activeComp.classList.add(compFlag)
        : this._activeComp.classList.remove(el); //don't need?
    });

    if (compFlag === "cross") {
      this._activeComp.querySelector(".side_left_div").classList.remove("hide");
      this._activeComp
        .querySelector(".side_right_div")
        .classList.remove("hide");
    }
  };

  //_______________________________________________________________________
  //Add cross side comp
  addSideComp = function (flag) {
    const htmlSide = `
    <div class= "${flag}_comp active">
      <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
      <div class="hyd_spacer hide"></div>
    </div>`;

    const targetActiveComp = this._compWrapper.querySelector(
      ".comp-div.cross.active"
    );
    this._allSideComps = [
      ...targetActiveComp.querySelectorAll(".left_comp"),
      ...targetActiveComp.querySelectorAll(".right_comp"),
    ];
    this._allSideComps.forEach(function (el) {
      el.classList.remove("active");
    });
    const sideSelect =
      flag === "left"
        ? targetActiveComp.firstElementChild
        : targetActiveComp.lastElementChild;

    const beforeOrAfter = flag === "left" ? "afterbegin" : "beforeend";
    sideSelect.insertAdjacentHTML(beforeOrAfter, htmlSide);
    // setIdsSides();
  };

  //_______________________________________________________________________
  //Remove cross side comp
  removeSideComp = function (flag) {
    const activeSideComp = this._compWrapper.querySelector(
      `.${flag}_comp.active`
    );

    if (!activeSideComp) return;
    if (activeSideComp.id.slice(-2) === "-1") {
      // console.log("not this one!");
      // activeSideComp.querySelector(".img_side").classList.remove("hyd");
      // activeSideComp.querySelector(".side_opts_div").classList.remove("hyd");
      activeSideComp.querySelector(".hyd_spacer").classList.add("hide");
      activeSideComp.querySelector(".img_side").src =
        "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png";
      // activeSideComp.querySelector(".cross_opt_text").innerHTML = "-";
      return;
    }

    activeSideComp.parentNode.removeChild(activeSideComp);
    const targetActiveSideComp = this._compWrapper
      .querySelector(".comp-div.active")
      .querySelector(`.${flag}_comp`);
    flag === "left"
      ? targetActiveSideComp.parentNode.firstElementChild.classList.add(
          "active"
        )
      : targetActiveSideComp.parentNode.lastElementChild.classList.add(
          "active"
        );

    // setIdsSides();
  };
}

export default new StackView();
