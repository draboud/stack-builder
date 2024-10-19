import View from "./View";
import notesView from "./notesView";
import jsPDF from "jspdf";
import { PDF_SETTINGS } from "../config";
import statsView from "./statsView";
import adaptorsView from "./adaptorsView";

class PDFView extends View {
  //_________________________________________________________________________
  //Convert html content to pdf
  _convertToPDF = function (newHeight) {
    // if (!notesView._jobTitle) {
    //   alert("enter a title");
    //   return;
    // }

    const elementHTML = document.querySelector(".content_to_print");
    const doc = new jsPDF("p", "pt", "a4");
    const img = new Image();
    const printDivHeight = $(document.querySelector(".comp-wrapper")).height();
    const xOffset = doc.internal.pageSize.getWidth() / 2;
    const yDown = (PDF_SETTINGS.pageHeight - printDivHeight) / 2;

    img.src = PDF_SETTINGS.logoImg;

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
    if (notesView._notes) {
      doc.text("NOTES: ", 20, 775, {
        align: "left",
        maxWidth: PDF_SETTINGS.notesMaxWidth,
      });
      doc.text(notesView._notes, 20, 790, {
        align: "left",
        maxWidth: PDF_SETTINGS.notesMaxWidth,
      });
    }
    doc.text("STACK HEIGHT: ", 20, 735, { align: "left" });
    doc.text(newHeight.toString() + '"', 20, 750, { align: "left" });

    //then descale the stack to allow continuation of editing stack
    // adaptorsView._descaling();
  };
}
export default new PDFView();
