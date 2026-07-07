import jsPDF from 'jspdf';
<<<<<<< HEAD
import autoTable from 'jspdf-autotable';
=======
>>>>>>> cc155ab (app done)
import type { Request } from '../types/models';

// Builds a jsPDF document from a finished request and returns it.
// Kept separate from sharing/downloading logic (see lib/sharePdf.ts)
// so this function has no knowledge of how the PDF gets delivered.
<<<<<<< HEAD
export function generateRequestPdf(request: Request): jsPDF {
  const doc = new jsPDF();
=======
//
// Deliberately draws the items table manually using only jsPDF's own core
// text/line methods, rather than the separate jspdf-autotable plugin package.
// autotable has to stay version-matched with jsPDF itself, and mismatches
// between the two are a common source of silent/hard-to-diagnose failures —
// this removes that entire class of bug.
export function generateRequestPdf(request: Request): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 14;
  const marginRight = 14;
  const tableWidth = pageWidth - marginLeft - marginRight;
>>>>>>> cc155ab (app done)

  const requestIdLabel = request.id
    ? `REQ-${String(request.id).padStart(4, '0')}`
    : 'REQ-DRAFT';

  // Header
  doc.setFontSize(16);
<<<<<<< HEAD
  doc.text('Stock Request', 14, 18);

  doc.setFontSize(10);
  doc.text(`Request ID: ${requestIdLabel}`, 14, 26);
  doc.text(`Date: ${request.date}`, 14, 32);
  doc.text(`Department: ${request.department}`, 14, 38);
  doc.text(`Type: ${request.type}`, 14, 44);
  doc.text(`Prepared by: ${request.preparedBy}`, 14, 50);

  // Items table
  autoTable(doc, {
    startY: 58,
    head: [['Item #', 'Description', 'Unit', 'Quantity']],
    body: request.items.map((item) => [
      item.itemNumber,
      item.description,
      item.unit,
      String(item.quantity),
    ]),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [0, 0, 0] },
  });
=======
  doc.text('Stock Request', marginLeft, 18);

  doc.setFontSize(10);
  doc.text(`Request ID: ${requestIdLabel}`, marginLeft, 26);
  doc.text(`Date: ${request.date}`, marginLeft, 32);
  doc.text(`Department: ${request.department}`, marginLeft, 38);
  doc.text(`Type: ${request.type}`, marginLeft, 44);
  doc.text(`Prepared by: ${request.preparedBy}`, marginLeft, 50);

  // Items table — drawn manually with fixed column widths
  const colWidths = {
    itemNumber: tableWidth * 0.2,
    description: tableWidth * 0.4,
    unit: tableWidth * 0.15,
    quantity: tableWidth * 0.25,
  };
  const colX = {
    itemNumber: marginLeft,
    description: marginLeft + colWidths.itemNumber,
    unit: marginLeft + colWidths.itemNumber + colWidths.description,
    quantity:
      marginLeft + colWidths.itemNumber + colWidths.description + colWidths.unit,
  };

  let y = 58;
  const rowHeight = 8;
  const pageHeight = doc.internal.pageSize.getHeight();
  const bottomMargin = 20;

  function drawHeaderRow() {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Item #', colX.itemNumber, y);
    doc.text('Description', colX.description, y);
    doc.text('Unit', colX.unit, y);
    doc.text('Quantity', colX.quantity, y);
    doc.setLineWidth(0.3);
    doc.line(marginLeft, y + 2, marginLeft + tableWidth, y + 2);
    doc.setFont('helvetica', 'normal');
    y += rowHeight;
  }

  drawHeaderRow();

  for (const item of request.items) {
    // Start a new page if we're about to run off the bottom
    if (y + rowHeight > pageHeight - bottomMargin) {
      doc.addPage();
      y = 20;
      drawHeaderRow();
    }

    doc.text(item.itemNumber, colX.itemNumber, y);
    doc.text(item.description, colX.description, y, {
      maxWidth: colWidths.description - 4,
    });
    doc.text(item.unit, colX.unit, y);
    doc.text(String(item.quantity), colX.quantity, y);
    y += rowHeight;
  }
>>>>>>> cc155ab (app done)

  return doc;
}