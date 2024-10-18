import View from "./View.js";

const stackHeightText = document.querySelector(".stack-height-text");

class StatsView extends View {
  //Displays stack height to UI
  _liveHeightTotal() {
    let stackHeight = 0;
    let runningResult;
    this._retarget();
    this._allHeightText.forEach(function (el) {
      stackHeight += parseFloat(el.innerHTML.slice(0, -1));
    });

    if (stackHeight) {
      runningResult = stackHeight;
      stackHeightText.innerHTML = "Stack Height: " + runningResult + '"';
    }

    return stackHeight;
  }
}

export default new StatsView();
