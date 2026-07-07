import type jsPDF from 'jspdf';
<<<<<<< HEAD

// Attempts to open the native share sheet (WhatsApp, Email, etc.) with the PDF.
// Falls back to triggering a plain download if the browser doesn't support
// sharing files (e.g. desktop browsers, or older Android WebViews).
export async function sharePdf(doc: jsPDF, filename: string): Promise<void> {
=======
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { FileOpener } from '@capacitor-community/file-opener';

// Entry point — picks the right sharing strategy depending on whether this
// is running inside the installed native app (Capacitor) or a regular
// browser/PWA. Android's native WebView has no built-in downloads system,
// so the Web Share API / plain <a download> approaches silently do nothing
// there — the native path below is required for the button to actually work
// inside the installed app.
export async function sharePdf(doc: jsPDF, filename: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    await shareNative(doc, filename);
    return;
  }
  await shareWeb(doc, filename);
}

// Native app path: write the PDF to a persistent app directory on-device,
// then hand its file URI to Capacitor's Share plugin so Android can open it
// in a real PDF viewer or share it with another app.
async function shareNative(doc: jsPDF, filename: string): Promise<void> {
  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  const dataUri = doc.output('datauristring');
  const base64Data = dataUri.split(',')[1];

  await Filesystem.writeFile({
    path: safeFilename,
    data: base64Data,
    directory: Directory.Documents,
  });

  const { uri } = await Filesystem.getUri({
    directory: Directory.Documents,
    path: safeFilename,
  });

  try {
    await FileOpener.open({
      filePath: uri,
      contentType: 'application/pdf',
    });
  } catch (error) {
    console.error('Could not open PDF directly:', error);
    await Share.share({
      title: 'Stock Request',
      text: 'Open the generated stock request PDF',
      url: uri,
    });
  }
}

// Browser/PWA path — unchanged from before. Attempts the Web Share API with
// files, falls back to a plain download if unsupported.
async function shareWeb(doc: jsPDF, filename: string): Promise<void> {
>>>>>>> cc155ab (app done)
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
<<<<<<< HEAD
      // If the user cancels the share sheet, navigator.share throws —
      // that's expected behavior, not an error worth surfacing.
=======
>>>>>>> cc155ab (app done)
      if ((err as Error).name === 'AbortError') return;
      console.error('Share failed, falling back to download:', err);
    }
  }

<<<<<<< HEAD
  downloadPdfFallback(doc, filename);
}

function downloadPdfFallback(doc: jsPDF, filename: string): void {
=======
>>>>>>> cc155ab (app done)
  doc.save(filename);
}