import View from "./View";
import notesView from "./notesView";
import jsPDF from "jspdf";
import { PDF_SETTINGS } from "../config";
import statsView from "./statsView";
import stackView from "./stackView";

class PDFView extends View {
  //_________________________________________________________________________
  //Convert html content to pdf
  _convertToPDF = function (newHeight) {
    let finalCrossNotes = "";
    let notesInput = "";
    if (notesView._notes) notesInput = notesView._notes;
    stackView._prepCrossNotes();
    finalCrossNotes = stackView._finalCrossNotes;
    notesInput += finalCrossNotes;
    // if (!notesView._jobTitle) {
    //   alert("enter a title");
    //   return;
    // }

    const elementHTML = document.querySelector(".content_to_print");
    //.................................................
    let stackWidthArr = [];
    // stackView._retarget();
    stackView._allOptsDivs.forEach((el) => stackWidthArr.push($(el).width()));
    const stackWidth =
      Math.max(...stackWidthArr) +
      $(document.querySelector(".comp-wrapper")).width();
    // debugger;
    //.................................................

    const doc = new jsPDF("p", "pt", "a4");
    const img = new Image();
    const printDivHeight = $(document.querySelector(".comp-wrapper")).height();
    const xOffset = doc.internal.pageSize.getWidth() / 2;
    const yDown = (PDF_SETTINGS.pageHeight - printDivHeight) / 2;
    // const xValue = (595 - stackWidth) / 2;
    const xValue = (doc.internal.pageSize.getWidth() - stackWidth) / 2;

    img.src = PDF_SETTINGS.logoImg;

    doc.html(elementHTML, {
      callback: function (doc) {
        // Save the PDF
        doc.save("TSI - Stack Builder.pdf");
      },
      margin: [yDown, 10, 10, 10],
      // margin: [yDown, 0, 0, xValue],
      // margin: [yDown, 0, 0, ],
      autoPaging: "text",
      // x: 192,
      x: xValue,
      // x: xValue,
      // x: 0,

      y: 0,
      width: 190, // Target width in the PDF document
      windowWidth: 200, // Window width in CSS pixels
    });
    doc.addImage(
      img,
      "PNG",
      PDF_SETTINGS.xAxis,
      PDF_SETTINGS.yAxis,
      PDF_SETTINGS.logoX * PDF_SETTINGS.scaleFactor,
      PDF_SETTINGS.logoY * PDF_SETTINGS.scaleFactor
    );
    doc.setFontSize(15);
    if (notesView._jobTitle) {
      doc.text(notesView._jobTitle, xOffset, 40, { align: "center" });
    }
    doc.setFontSize(11);
    doc.text(`${statsView._setDate()}`, 570, 40, { align: "right" });
    if (notesInput) {
      doc.text("NOTES: ", 20, 762, {
        align: "left",
        maxWidth: PDF_SETTINGS.notesMaxWidth,
      });
      doc.text(notesInput, 20, 777, {
        align: "left",
        maxWidth: PDF_SETTINGS.notesMaxWidth,
      });
    }
    doc.text("STACK HEIGHT: ", 20, 727, { align: "left" });
    doc.text(newHeight.toString() + '"', 20, 742, { align: "left" });
  };
}
export default new PDFView();
