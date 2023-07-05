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
    const indicies = file.getPageIndices();
    const pages = await merged.copyPages(file, indicies);
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
    const pageCopy = await document.copyPages(page.doc, [0]);
    document.addPage(pageCopy[0]);
  }

  return document;
};

// Merge PDF files read using File API
const mergeFiles = async (files: File[]): Promise<PDFDocument | null> => {
  if (files.length === 0) {
    return null;
  }

  const document = await createDocument();

  for (const file of files) {
    const loaded = await loadDocument(file);
    if (loaded) {
      const indicies = loaded.getPageIndices();
      const pages = await document.copyPages(loaded, indicies);
      for (const page of pages) {
        document.addPage(page);
      }
    }
  }

  return document;
};

export { mergeDocuments, mergePages, mergeFiles };
