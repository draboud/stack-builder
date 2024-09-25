import * as model from "./model.js";
import stackButtonsView from "./stackButtonsView";
import View from "./View";

const controlAdjustStack = function (arrayEl) {
  //   console.log(arrayEl.attributes.class.nodeValue);
  const compVal = arrayEl.attributes.class.nodeValue.split(" ")[1];
  //   console.log(compVal);

  if (compVal === "plus") {
    stackButtonsView.addComponent();
    model.setIds(stackButtonsView._allComps, stackButtonsView._allSideComps);
  } else if (compVal === "minus") {
    stackButtonsView.removeComponent();
    model.setIds(stackButtonsView._allComps, stackButtonsView._allSideComps);
  } else console.log("comp: ", compVal);

  //   if (clickedComp) {
  //     compFlag = clickedComp.className.split(" ")[1];
  //     addCompImg(compFlag);
  //   }
  //   if (clickedCrossComp) {
  //     compFlag = clickedCrossComp.className.split(" ")[1];
  //     addCrossCompImg(compFlag);
  //   }
  //   if (arrayEl.attributes.class.nodeValue === "comp_button_plus") {
  //     //   addComponent();
  //     console.log("plus!");
  //   }
  //   if (arrayEl.attributes.class.nodeValue === "comp_button_minus") {
  //     //   addComponent();
  //     console.log("minus!");
  //   }
  //   if (arrayEl.attributes.class.nodeValue.split(" ")[0] === "comp_button") {
  //     //   addComponent();
  //     console.log("comp!");
  //   }
  //   if (clickedMinus) {
  //     removeComponent();
  //   }
};

const init = function () {
  stackButtonsView.addHandlerAdjustBlocks(controlAdjustStack);
};

init();
