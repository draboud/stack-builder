import View from "./View";
import notesView from "./notesView";
import jsPDF from "jspdf";
import { PDF_SETTINGS } from "../config";
import adaptorsView from "./adaptorsView";

class PDFView extends View {
  //_________________________________________________________________________
  //Convert html content to pdf
  _convertToPDF = function (newHeight) {
    if (!notesView._jobTitle) {
      alert("enter a title");
      return;
    }
    const allCompDivs = document.querySelectorAll(".comp-div");
    allCompDivs.forEach(function (el) {
      el.classList.remove("active");
    });
    const elementHTML = document.querySelector(".content_to_print");
    const doc = new jsPDF("p", "pt", "a4");
    const img = new Image();
    const xOffset = doc.internal.pageSize.getWidth() / 2;
    //   const pageHeight = 841;
    const yDown = (PDF_SETTINGS.pageHeight - newHeight) / 2;

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
    doc.text(notesView._jobTitle, xOffset, 40, { align: "center" });
    doc.setFontSize(11);
    doc.text("Sept 24, 2024", 570, 40, { align: "right" });
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
    doc.text(newHeight.toString(), 20, 750, { align: "left" });
  };
}
export default new PDFView();
