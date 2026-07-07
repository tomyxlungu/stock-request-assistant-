import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Request } from '../types/models';

// Builds a jsPDF document from a finished request and returns it.
// Kept separate from sharing/downloading logic (see lib/sharePdf.ts)
// so this function has no knowledge of how the PDF gets delivered.
export function generateRequestPdf(request: Request): jsPDF {
  const doc = new jsPDF();

  const requestIdLabel = request.id
    ? `REQ-${String(request.id).padStart(4, '0')}`
    : 'REQ-DRAFT';

  // Header
  doc.setFontSize(16);
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

  return doc;
}