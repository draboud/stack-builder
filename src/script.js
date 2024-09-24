import jsPDF from "jspdf";
console.log("Sept 24, 2024 - Stack Builder - Test 1");

// const myNum = 55;
// console.log("myNum: ", toString(myNum));
window.addEventListener("load", (event) => {
  const compClasses = [
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

  const compButtonsDiv = document.querySelector(".vert_buttons_div");
  const crossCompButtonsDiv = document.querySelector(".cross_vert_buttons_div");
  const compWrapper = document.querySelector(".comp-wrapper");
  const plusMinusWrapper = document.querySelector(".plus_minus_wrapper");
  const optionsModal = document.querySelector(".options_modal");

  const modalCloseButton = document.querySelector(".modal_close_button");
  const adaptButton = document.querySelector(".adapt_button");
  const viewButton = document.querySelector(".view_button");
  const pdfButton = document.querySelector(".pdf_button");
  const adapterHeight = "70px";

  const crossSplButton = document.querySelector(".cross_comp_button.spl");
  const crossManButton = document.querySelector(".cross_comp_button.man");
  const crossHydButton = document.querySelector(".cross_comp_button.hyd");
  //___________________________________________________________________________
  const form = document.querySelector(".form");
  let jobTitle = "";
  let notes = "";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const jobTitleInput = document.querySelector(".job_title_input").value;
    // console.log(jobTitleInput);
    const notesInput = document.querySelector(".custom_notes_input").value;
    // console.log(notesInput);

    // jobTitle.value = "";
    jobTitle += jobTitleInput;
    notes += notesInput;
  });
  //___________________________________________________________________________

  let allComps = [...compWrapper.children];
  let compFlag = "";
  let sideFlag = "";
  let currentStack = [];
  let stackCounter = 0;

  //Event Handlers_____________________________________________________________
  //Select main comp type
  compButtonsDiv.addEventListener("click", function (e) {
    const clickedComp = e.target.closest(".comp_button");
    const clickedCrossComp = e.target.closest(".cross_comp_button");
    const clickedAdd = e.target.closest(".comp_button_plus");
    const clickedMinus = e.target.closest(".comp_button_minus");

    if (clickedComp) {
      compFlag = clickedComp.className.split(" ")[1];
      addCompImg(compFlag);
    }
    if (clickedCrossComp) {
      compFlag = clickedCrossComp.className.split(" ")[1];
      addCrossCompImg(compFlag);
    }
    if (clickedAdd) {
      addComponent();
    }
    if (clickedMinus) {
      removeComponent();
    }
  });
  //_________________________________________________________________________
  //Main comps clicks
  compWrapper.addEventListener("click", function (e) {
    const allCompDivs = compWrapper.querySelectorAll(".comp-div");
    const activeSideComp = [
      ...compWrapper.querySelectorAll(".left_comp.active"),
      ...compWrapper.querySelectorAll(".right_comp.active"),
    ];
    const activeCross = compWrapper.querySelector(".comp-div.cross.active");
    const clicked = e.target.closest(".comp-div");

    if (!clicked) return;
    allCompDivs.forEach(function (el) {
      el.classList.remove("active");
    });

    clicked.classList.add("active");

    if (
      !clicked.querySelector(".left_comp.active") &&
      !clicked.querySelector(".right_comp.active")
    ) {
      activeSideComp.forEach(function (el) {
        el.classList.remove("active");
        //turn on cross comp buttons
        crossSplButton.classList.remove("on");
        crossManButton.classList.remove("on");
        crossHydButton.classList.remove("on");
      });
    }
  });
  //_________________________________________________________________________
  //Side plus and minus clicks
  plusMinusWrapper.addEventListener("click", function (e) {
    const clicked = e.target.closest(".side_effect");
    if (!clicked) return;
    if (clicked.classList.contains("plus")) {
      e.stopPropagation();
      addSideComp(sideFlag);
    }
    if (clicked.classList.contains("minus")) {
      e.stopPropagation();
      removeSideComp(sideFlag);
    }
  });
  //_________________________________________________________________________
  //Adaptation
  adaptButton.addEventListener("click", function (e) {
    const clicked = e.target.closest(".adapt_button");
    if (!clicked) return;
    autoAdapt();
  });
  //_________________________________________________________________________
  //PDF
  pdfButton.addEventListener("click", function (e) {
    const clicked = e.target.closest(".pdf_button");
    if (!clicked) return;
    convertToPDF();
  });
  //_________________________________________________________________________
  //Viewer
  viewButton.addEventListener("click", function () {
    compButtonsDiv.classList.toggle("hide");
    const allCompDivs = compWrapper.querySelectorAll(".comp-div");
    allCompDivs.forEach(function (el) {
      el.classList.toggle("no_border");
    });
    scaleStack();
  });
  //_________________________________________________________________________
  //Assign height and options events
  const assignHandOClicks = function () {
    const heightDiv = document
      .querySelector(".comp-div.active")
      .querySelector(".height-div");
    const optsDiv = document
      .querySelector(".comp-div.active")
      .querySelector(".opts-div");

    heightDiv.addEventListener("mouseenter", function (e) {
      const hoverIn = e.target.closest(".height-div");
      if (!hoverIn) return;
      hoverIn.classList.add("highlight");
    });
    heightDiv.addEventListener("mouseout", function (e) {
      const hoverOut = e.target.closest(".height-div");
      if (!hoverOut) return;
      hoverOut.classList.remove("highlight");
    });

    optsDiv.addEventListener("click", function (e) {
      const clicked = e.target.closest(".opts-text");
      if (!clicked) return;
      clicked.classList.add("highlight");
    });

    optsDiv.addEventListener("click", function (e) {
      const clicked = e.target.closest(".opts-text");
      if (!clicked) return;
      optionsModal.classList.remove("hide");
    });
  };
  //_________________________________________________________________________
  //Options modal events
  optionsModal.addEventListener("click", function (e) {
    const activeOption = document
      .querySelector(".comp-div.active")
      .querySelector(".opts-text.highlight");
    const clicked = e.target.closest(".modal_div");
    if (!clicked) return;
    activeOption.innerHTML = clicked.querySelector(".modal_div_text").innerHTML;
    activeOption.classList.remove("highlight");
    optionsModal.classList.add("hide");
  });
  //_________________________________________________________________________
  //Close modal
  modalCloseButton.addEventListener("click", function (e) {
    const activeOption = document
      .querySelector(".comp-div.active")
      .querySelector(".opts-text.highlight");
    const clicked = e.target.closest(".modal_close_button");
    if (!clicked) return;
    e.stopPropagation();
    activeOption.classList.remove("highlight");
    optionsModal.classList.add("hide");
  });
  //_________________________________________________________________________
  //Side component events for cross
  const assignSideClicks = function (side) {
    const activeCrossDiv = document.querySelector(".comp-div.active.cross");
    const sideDiv = activeCrossDiv.querySelector(`.side_${side}_div`);

    sideDiv.addEventListener("click", function (e) {
      const clicked = e.target.closest(`.${side}_comp`);
      if (!clicked) return;

      const allSideComps = [
        ...compWrapper.querySelectorAll(".left_comp"),
        ...compWrapper.querySelectorAll(".right_comp"),
      ];
      allSideComps.forEach(function (el) {
        el.classList.remove("active");
      });
      clicked.classList.add("active");
      sideFlag = `${side}`;
      //turn on cross comp buttons
      crossSplButton.classList.add("on");
      crossManButton.classList.add("on");
      crossHydButton.classList.add("on");
    });
  };
  //_________________________________________________________________________
  //Functions
  const addComponent = function () {
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

    const compActive = compWrapper.querySelector(".comp-div.active");
    const activeSideComp = [
      ...compWrapper.querySelectorAll(".left_comp.active"),
      ...compWrapper.querySelectorAll(".right_comp.active"),
    ];
    compActive.insertAdjacentHTML("beforebegin", htmlComp);

    allComps = [...compWrapper.children];
    allComps.forEach(function (el) {
      el.classList.remove("active");
      if (el.id === "new") el.classList.add("active");
    });
    activeSideComp.forEach(function (el) {
      el.classList.remove("active");
    });

    setIds();
  };
  //_________________________________________________________________________
  //Delete stack comp
  const removeComponent = function () {
    const activeElement = compWrapper.querySelector(".comp-div.active");
    const activeSideComp = [
      ...activeElement.querySelectorAll(".left_comp.active"),
      ...activeElement.querySelectorAll(".right_comp.active"),
    ];
    if (activeElement.id !== "c-1") {
      activeElement.parentNode.removeChild(activeElement);
    } else {
      console.log("you cannot remove this one!");
      return;
    }
    if (activeElement.classList.contains("cross")) {
      activeSideComp.forEach(function (el) {
        el.classList.remove("active");
      });
    }
    compWrapper.firstElementChild.classList.contains("comp-div")
      ? compWrapper.firstElementChild.classList.add("active")
      : compWrapper.firstElementChild.nextElementSibling.classList.add(
          "active"
        );

    setIds();
    setIdsSides();

    autoAdapt();
  };
  //_________________________________________________________________________
  //Add stack comp
  const addCompImg = function (compFlag) {
    let compImg;
    let sideCompImg;
    const activeDiv = compWrapper.querySelector(".comp-div.active");
    const heightDiv = activeDiv.querySelector(".height-div");
    const imageEl = activeDiv.querySelector(".img");
    const optsDiv = activeDiv.querySelector(".opts-div");
    const activeLeftComp = compWrapper.querySelector(".left_comp.active");
    const activeRightComp = compWrapper.querySelector(".right_comp.active");

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

    activeDiv.querySelector(".side_left_div").classList.add("hide");
    activeDiv.querySelector(".side_right_div").classList.add("hide");
    activeDiv.querySelector(".height-div").classList.remove("hide");
    activeDiv.querySelector(".opts-div").classList.remove("hide");

    compClasses.forEach(function (el) {
      el === compFlag
        ? activeDiv.classList.add(compFlag)
        : activeDiv.classList.remove(el); //don't need?
    });

    if (compFlag === "cross") {
      activeDiv.querySelector(".side_left_div").classList.remove("hide");
      activeDiv.querySelector(".side_right_div").classList.remove("hide");

      assignSideClicks("left");
      assignSideClicks("right");
      setIdsSides();
    }
    assignHandOClicks();
    addCompHeight(compFlag);
  };

  //_________________________________________________________________________
  //Add cross side comp
  const addSideComp = function (flag) {
    const htmlSide = `
    <div class= "${flag}_comp active">
      <img class="img_side" src="https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd053ce29208cca039c35e_blank-cross.png">
      <div class="hyd_spacer hide"></div>
    </div>`;

    const targetActiveComp = compWrapper.querySelector(
      ".comp-div.cross.active"
    );
    const allSideComps = [
      ...targetActiveComp.querySelectorAll(".left_comp"),
      ...targetActiveComp.querySelectorAll(".right_comp"),
    ];
    allSideComps.forEach(function (el) {
      el.classList.remove("active");
    });
    const sideSelect =
      flag === "left"
        ? targetActiveComp.firstElementChild
        : targetActiveComp.lastElementChild;

    const beforeOrAfter = flag === "left" ? "afterbegin" : "beforeend";
    sideSelect.insertAdjacentHTML(beforeOrAfter, htmlSide);
    setIdsSides();
  };
  //_________________________________________________________________________
  //Remove cross side comp
  const removeSideComp = function (flag) {
    const activeSideComp = compWrapper.querySelector(`.${flag}_comp.active`);

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
    const targetActiveSideComp = compWrapper
      .querySelector(".comp-div.active")
      .querySelector(`.${flag}_comp`);
    flag === "left"
      ? targetActiveSideComp.parentNode.firstElementChild.classList.add(
          "active"
        )
      : targetActiveSideComp.parentNode.lastElementChild.classList.add(
          "active"
        );

    setIdsSides();
  };
  //_________________________________________________________________________
  //Add component to active side of active cross in stack
  const addCrossCompImg = function (compFlag) {
    const allSideComps = [
      ...compWrapper.querySelectorAll(".left_comp"),
      ...compWrapper.querySelectorAll(".right_comp"),
    ];
    let sideCompImg;

    if (compFlag === "spl") {
      sideCompImg =
        "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bd0316fff7c3bffbb6c781_Cross%20-%20Spool.png";
    }
    if (compFlag === "man") {
      sideCompImg =
        "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bcdf61a2ceb56331d1bc3b_Cross%20-%20Manual.png";
    }
    if (compFlag === "hyd") {
      sideCompImg =
        "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66bcdf611491cc6deb154360_Cross%20-%20Hydraulic.png";
    }

    allSideComps.forEach(function (el) {
      if (el.classList.contains("active")) {
        // el.querySelector(".img_side").classList.remove("hyd");
        el.querySelector(".hyd_spacer").classList.add("hide");
        // el.querySelector(".side_opts_div").classList.remove("hyd");
        el.querySelector(".img_side").src = sideCompImg;
        // el.querySelector(".cross_opt_text").innerHTML = compFlag;

        if (compFlag === "hyd") {
          // el.querySelector(".img_side").classList.add("hyd");
          el.querySelector(".hyd_spacer").classList.remove("hide");
          // el.querySelector(".side_opts_div").classList.add("hyd");
        }
      }
    });
  };
  //_________________________________________________________________________
  //ID main comps
  const setIds = function () {
    const newCompArray = compWrapper.querySelectorAll(".comp-div");
    const allSideComps = [
      ...compWrapper.querySelectorAll(".left_comp"),
      ...compWrapper.querySelectorAll(".right_comp"),
    ];
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
  //_________________________________________________________________________
  //ID cross comps
  const setIdsSides = function () {
    const newLeftArray = [...compWrapper.querySelectorAll(".left_comp")];
    const newRightArray = [...compWrapper.querySelectorAll(".right_comp")];
    const activeCompId = compWrapper.querySelector(".comp-div.active").id;
    let leftCompIdsCounter = newLeftArray.length;
    let rightCompIdsCounter = newRightArray.length;
    let indexCountLeft = 1;
    let indexCountRight = 1;
    let indexCount = 1;

    const currentLeftArray = [
      ...compWrapper
        .querySelector(".comp-div.active")
        .querySelector(".side_left_div")
        .querySelectorAll(".left_comp"),
    ].reverse();

    currentLeftArray.forEach(function (el) {
      el.id = `${activeCompId}-left-${indexCountLeft}`;
      indexCountLeft += 1;
      leftCompIdsCounter -= 1; //unnecessary
    });

    const currentRightArray = [
      ...compWrapper
        .querySelector(".comp-div.active")
        .querySelector(".side_right_div")
        .querySelectorAll(".right_comp"),
    ];

    currentRightArray.forEach(function (el) {
      el.id = `${activeCompId}-right-${indexCountRight}`;
      indexCountRight += 1;
      rightCompIdsCounter -= 1; //unnecessary
    });

    //ACTIVATE BELOW FOR CONSEC IDS______________________________________
    // const currentLeftArray = [
    //   ...document
    //     .querySelector(".comp-div.active")
    //     .querySelectorAll(".left_comp"),
    // ];
    // const currentRightArray = [
    //   ...document
    //     .querySelector(".comp-div.active")
    //     .querySelectorAll(".right_comp"),
    // ];

    // currentLeftArray.forEach(function (el) {
    //   el.id = `${activeCompId.slice(2)}-${indexCount}`;
    //   indexCount += 1;
    // });

    // currentRightArray.forEach(function (el) {
    //   el.id = `${activeCompId.slice(2)}-${indexCount}`;
    //   indexCount += 1;
    // });
    //_____________________________________________________________________
  };
  //_________________________________________________________________________
  //Add adaptors to stack
  const autoAdapt = function () {
    const allCompDivs = compWrapper.querySelectorAll(".comp-div");
    const allAdapters = compWrapper.querySelectorAll(".adapter_block");
    const allOptionText = [...compWrapper.querySelectorAll(".opts-text")];
    let newLengthArray = [];
    let extArray = [];

    allAdapters.forEach(function (el) {
      el.remove();
    });

    allOptionText.forEach(function (el) {
      let intArray = "";
      if (el.classList.contains("hide") || el.classList.contains("second")) {
        return;
      }

      newLengthArray.push(el);
      intArray += el.innerHTML;
      extArray.push(intArray);
    });

    for (let i = 0; i < newLengthArray.length - 1; i++) {
      if (extArray[i] !== extArray[i + 1]) {
        const adapterHtml = `
        <div class= "adapter_block">
          <div class= "option_letter top">${extArray[i]}</div>
          <div class=option_letter bottom">${extArray[i + 1]}</div>
        </div>`;
        allCompDivs[i].insertAdjacentHTML("afterend", adapterHtml);
      }
    }
  };
  //_________________________________________________________________________
  //Convert html content to pdf
  function convertToPDF(newHeight) {
    if (!jobTitle) {
      alert("enter a title");
      return;
    }
    // console.log(newHeight);
    const allCompDivs = document.querySelectorAll(".comp-div");
    allCompDivs.forEach(function (el) {
      el.classList.remove("active");
    });
    const elementHTML = document.querySelector(".content_to_print");
    const doc = new jsPDF("p", "pt", "a4");
    const img = new Image();
    let xAxis = 15;
    let yAxis = 10;
    const scaleFactor = 0.35;
    const logoX = 337.8;
    const logoY = 120.7;
    const xOffset = doc.internal.pageSize.getWidth() / 2;
    const pageHeight = 841;
    const yDown = (pageHeight - newHeight) / 2;

    img.src =
      "https://cdn.prod.website-files.com/66b00a322e7002f201e5b9e2/66b41c3b6d1b3e37580ee90a_Team%20Snubbing%20International%20-%20Horizontal-p-500.png";

    doc.html(elementHTML, {
      callback: function (doc) {
        // Save the PDF
        doc.save("TSI - Stack Builder.pdf");
      },
      margin: [yDown, 10, 10, 10],
      autoPaging: "text",
      x: 192,
      y: 0,
      width: 190, // Target width in the PDF document
      windowWidth: 200, // Window width in CSS pixels
    });

    doc.addImage(
      img,
      "PNG",
      xAxis,
      yAxis,
      logoX * scaleFactor,
      logoY * scaleFactor
    );

    doc.setFontSize(15);
    doc.text(jobTitle, xOffset, 40, { align: "center" });
    doc.setFontSize(11);
    doc.text("Sept 24, 2024", 570, 40, { align: "right" });

    if (notes) {
      doc.text("NOTES: ", 20, 775, { align: "left", maxWidth: "550" });
      doc.text(notes, 20, 790, { align: "left", maxWidth: "550" });
    }
    doc.text("STACK HEIGHT: ", 20, 735, { align: "left" });
    doc.text(newHeight.toString(), 20, 750, { align: "left" });
  }
  //_________________________________________________________________________
  //Assign component heights
  const addCompHeight = function (compFlag) {
    const activeDiv = document.querySelector(".comp-div.active");
    const compHeights = {
      wellhead: 27,
      spool: 44,
      cross: 49,
      single: 72,
      double: 112,
      annular: 91,
    };

    activeDiv.querySelector(".height-text").innerHTML =
      compHeights[compFlag] + '"';
  };
  //_________________________________________________________________________
  //View stack and adjust for pdf output
  const scaleStack = function () {
    const allCompHeights = document.querySelectorAll(".height-text");
    const allCompDivs = document.querySelectorAll(".comp-div");
    const allCompImgs = document.querySelectorAll(".img");
    const allSpacers = document.querySelectorAll(".opts-spacer");
    const allHydSpacers = document.querySelectorAll(".hyd_spacer");
    const allSidesLeft = document.querySelectorAll(".left_comp");
    const allSidesRight = document.querySelectorAll(".right_comp");
    const stackMax = 620;
    const stackMaxforOpts = 1000;
    let stackHeight = 0;
    let newHeight;

    allCompHeights.forEach(function (el) {
      stackHeight += parseFloat(el.innerHTML.slice(0, -1));
    });

    if (stackHeight > stackMax) {
      let factor = (stackHeight - stackMax) / stackHeight;
      let result = (100 - factor * 100) / 100;
      newHeight = stackHeight * result;

      allCompImgs.forEach(function (el) {
        el.style.height = $(el).height() * result + "px";
      });

      allCompDivs.forEach(function (el) {
        el.style.width = $(el).width() * result + "px";
      });

      allSpacers.forEach(function (el) {
        el.style.height = $(el).height() * result + "px";
      });

      allHydSpacers.forEach(function (el) {
        el.style.height = $(el).height() * result + "px";
      });
      //______________________________________________________________________
      allSidesLeft.forEach(function (el) {
        el.style.width = $(el).width() * result + "px";
        // el.style.height = $(el).height() * result + "px";
      });

      allSidesRight.forEach(function (el) {
        el.style.width = $(el).width() * result + "px";
        // el.style.height = $(el).height() * result + "px";
      });
      //______________________________________________________________________

      if (stackHeight > stackMaxforOpts) {
        allSpacers.forEach(function (el) {
          el.style.height = "0px";
        });
      }
    } else {
      newHeight = stackHeight;
    }
    convertToPDF(newHeight);
    // console.log("newHeight: ", newHeight);
  };
});
