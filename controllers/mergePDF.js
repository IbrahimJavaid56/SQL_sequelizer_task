import { PDFDocument } from 'pdf-lib';
import { promises as fs } from 'fs';
import {dirname,resolve} from 'path';
import {fileURLToPath} from 'url';
async function mergeFile(req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log('No files were uploaded.');
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const pdfFiles = req.files.pdfFile;

    // const outputPath = path.join('./uploads', '..', 'merged.pdf');
    const filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(filename);
    const outputPath = resolve(_dirname, '../uploads/mergedFile.pdf');
    await mergePDFs(pdfFiles, outputPath);
    
    return res.status(200).json({ success: true, message: 'PDFs are merged successfully.' });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: `Error: ${error.message}` });
  }
}


async function mergePDFs(pdfFiles, outputPath) {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const pdfFile of pdfFiles) {
      const pdfDoc = await PDFDocument.load(pdfFile.data);
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    await fs.writeFile(outputPath, mergedPdfBytes);

  } catch (error) {
    throw new Error(`Error merging PDFs: ${error.message}`);
  }
}

export { mergeFile };
