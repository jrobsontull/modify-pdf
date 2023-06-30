import { PDFDocument, PDFPage } from 'pdf-lib';
import { createDocument } from './create';

const mergeDocuments = async (
  documents: PDFDocument[]
): Promise<PDFDocument | null> => {
  if (documents.length === 0) {
    return null;
  }

  if (documents.length === 1) {
    return documents[0];
  }

  // Else do merge
  const merged = await createDocument();
  for (const file of documents) {
    const pages = file.getPages();
    for (const page of pages) {
      merged.addPage(page);
    }
  }

  return merged;
};

const mergePages = async (pages: PDFPage[]): Promise<PDFDocument | null> => {
  if (pages.length === 0) {
    return null;
  }

  const document = await createDocument();

  if (pages.length === 1) {
    document.addPage(pages[0]);
    return document;
  }

  for (const page of pages) {
    document.addPage(page);
  }

  return document;
};

export { mergeDocuments, mergePages };
