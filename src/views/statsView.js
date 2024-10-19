import View from "./View.js";

const stackHeightText = document.querySelector(".stack-height-text");
const dateText = document.querySelector(".date-text");
const date = new Date();

class StatsView extends View {
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  //____________________________________________________________________
  _setDate() {
    const currentDate = (dateText.innerHTML = `${
      this.months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`);
    return currentDate;
  }
  //____________________________________________________________________
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
  //____________________________________________________________________
}

export default new StatsView();
