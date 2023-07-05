import { PDFDocument, PDFPage } from 'pdf-lib';
import { createDocument } from './create';
import { errorMsg, log, range } from './utils';

const copyDocument = async (document: PDFDocument): Promise<PDFDocument> => {
  return await document.copy();
};

// Copy page to PDFPage
const copyPage = (document: PDFDocument, index: number): PDFPage | null => {
  const total = document.getPageCount();
  if (index <= total - 1) {
    const page = document.getPage(index);
    return page;
  } else {
    log('error', 'copyPage', errorMsg.invalidIndex);
    return null;
  }
};

// Copy pages to PDFPages[]
const copyPages = async (
  document: PDFDocument,
  start?: number,
  end?: number
): Promise<PDFPage[] | null> => {
  const pages = document.getPages();

  if (typeof start === 'number' && typeof end === 'number') {
    // Check if valid range
    if (start >= 0 && start <= end && end <= pages.length - 1) {
      const dummyDoc = await createDocument();
      const pagesCopy = await dummyDoc.copyPages(document, range(start, end));
      return pagesCopy;
    } else {
      log('error', 'copyPages', errorMsg.invalidRange);
      return null;
    }
  }

  return pages;
};

// Copy page to a document
const extractPage = async (
  document: PDFDocument,
  index: number
): Promise<PDFDocument | null> => {
  const total = document.getPageCount();
  if (index <= total - 1) {
    const page = document.getPage(index);
    const newDocument = await createDocument();
    newDocument.addPage(page);
    return newDocument;
  } else {
    log('error', 'extractPage', errorMsg.invalidIndex);
    return null;
  }
};

// Copy pages to a document
const extractPages = async (
  document: PDFDocument,
  start: number,
  end: number
): Promise<PDFDocument | null> => {
  if (typeof start === 'number' && typeof end === 'number') {
    const pages = document.getPages();
    // Check if valid range
    if (start >= 0 && start <= end && end <= pages.length - 1) {
      const newDocument = await createDocument();
      const toCopy = pages.slice(start, end + 1);
      for (const page of toCopy) {
        newDocument.addPage(page);
      }
      return newDocument;
    } else {
      log('error', 'extractPages', errorMsg.invalidRange);
      return null;
    }
  }

  return document.copy();
};

// Duplicate pages within a document
const duplicatePages = (
  document: PDFDocument,
  start?: number,
  end?: number
): PDFDocument | null => {
  const pages = document.getPages();

  if (start && end) {
    // Check if valid range
    if (start >= 0 && start <= end && end <= pages.length - 1) {
    } else {
      log('error', 'copyPage', errorMsg.invalidRange);
      return null;
    }
  }

  // Else duplicate all pages
  for (const page of pages) {
    document.addPage(page);
  }

  return document;
};

export {
  copyDocument,
  copyPage,
  copyPages,
  duplicatePages,
  extractPage,
  extractPages,
};
