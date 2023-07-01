import { PDFDocument, PDFPage } from 'pdf-lib';
import { createDocument, loadDocument } from './create';

// Merge documents of type PDFDocument
const mergeDocuments = async (
  documents: PDFDocument[]
): Promise<PDFDocument | null> => {
  if (documents.length === 0) {
    return null;
  }

  if (documents.length === 1) {
    if (documents[0]) {
      return documents[0];
    } else {
      return null;
    }
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

// Merge pages of type PDFPage
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

// Merge PDF files read using File API
const mergeFiles = async (files: File[]): Promise<PDFDocument> => {
  const document = await createDocument();

  for (const file of files) {
    const loaded = await loadDocument(file);
    if (loaded) {
      const pages = loaded.getPages();
      for (const page of pages) {
        document.addPage(page);
      }
    }
  }

  return document;
};

export { mergeDocuments, mergePages, mergeFiles };
