import { COMP_CLASSES } from "./config";
import * as model from "./model.js";
import View from "./views/View.js";
import stackView from "./views/stackView.js";
import heightsView from "./views/heightsView.js";

const controlAdjustStack = function (arrayEl) {
  const compVal = arrayEl.attributes.class.nodeValue.split(" ")[1];

  //Adding component and setting ids
  if (compVal === "plus") {
    stackView.addComponent();
    stackView.setIds();
    stackView.setIdsSides();
  }

  //Removing component and setting ids
  else if (compVal === "minus") {
    stackView.removeComponent();
    stackView.setIds();
    stackView.setIdsSides();

    //Configuring component
  } else {
    stackView.addCompImg(compVal);
    stackView.setIds();
    stackView.setIdsSides();

    if (compVal === "cross") {
      stackView.assignSideClicks("left");
      stackView.assignSideClicks("right");
      stackView.setIdsSides();
    }
  }
  stackView.assignHandOClicks();
  heightsView.addCompHeight(compVal);
};

const init = function () {
  stackView.addHandlerAdjustBlocks(controlAdjustStack);
};

init();
