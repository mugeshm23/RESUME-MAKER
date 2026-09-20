import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export async function exportResumeToPdf(
  elementId: string,
  fileName = 'Resume.pdf',
  pageSize: 'a4' | 'letter' = 'a4'
): Promise<boolean> {
  // Prioritize dedicated unscaled export element if present
  let element =
    document.getElementById('pdf-export-document') ||
    document.getElementById(elementId) ||
    document.getElementById('resume-document-container');

  if (!element) {
    console.error(`Element with id ${elementId} not found for PDF export`);
    window.print();
    return false;
  }

  try {
    // Generate image using html-to-image which delegates rendering directly
    // to the browser's native engine via SVG foreignObject, avoiding
    // html2canvas CSS parsing bugs with modern color formats like "oklch".
    let imgData: string;
    try {
      imgData = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2, // 2x Retina clarity
        backgroundColor: '#ffffff',
      });
    } catch (fontErr) {
      console.warn('First render attempt had asset loading issue, retrying with font fallback:', fontErr);
      imgData = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        skipFonts: true,
      });
    }

    if (!imgData || imgData === 'data:,') {
      throw new Error('Canvas capture produced empty image');
    }

    // PDF Dimensions in mm
    const isA4 = pageSize === 'a4';
    const pdfWidth = isA4 ? 210 : 215.9; // mm
    const pdfHeight = isA4 ? 297 : 279.4; // mm

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: isA4 ? 'a4' : 'letter',
      compress: true,
    });

    // Create an image element to measure the rendered aspect ratio
    const img = new Image();
    img.src = imgData;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load captured image into PDF generator'));
    });

    const imgWidth = pdfWidth;
    const imgHeight = (img.naturalHeight * pdfWidth) / img.naturalWidth;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Add subsequent pages if the resume content overflows 1 page
    while (heightLeft > 5) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('Failed to generate PDF with html-to-image:', err);
    // Graceful fallback to browser print dialog so the user is never blocked
    window.print();
    return false;
  }
}

export function triggerPrintResume(): void {
  window.print();
}
