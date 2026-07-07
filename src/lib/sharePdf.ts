import type jsPDF from 'jspdf';

// Attempts to open the native share sheet (WhatsApp, Email, etc.) with the PDF.
// Falls back to triggering a plain download if the browser doesn't support
// sharing files (e.g. desktop browsers, or older Android WebViews).
export async function sharePdf(doc: jsPDF, filename: string): Promise<void> {
  const blob = doc.output('blob');
  const file = new File([blob], filename, { type: 'application/pdf' });

  const canShareFiles =
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [file] });

  if (canShareFiles) {
    try {
      await navigator.share({
        files: [file],
        title: 'Stock Request',
      });
      return;
    } catch (err) {
      // If the user cancels the share sheet, navigator.share throws —
      // that's expected behavior, not an error worth surfacing.
      if ((err as Error).name === 'AbortError') return;
      console.error('Share failed, falling back to download:', err);
    }
  }

  downloadPdfFallback(doc, filename);
}

function downloadPdfFallback(doc: jsPDF, filename: string): void {
  doc.save(filename);
}