import { PDFDocument, PDFPage } from 'pdf-lib';
import { createDocument } from './create';

const copyDocument = async (document: PDFDocument): Promise<PDFDocument> => {
  return await document.copy();
};

// Copy page to PDFPage
const copyPage = (document: PDFDocument, index: number): PDFPage => {
  const total = document.getPageCount();
  if (index <= total - 1) {
    const page = document.getPage(index);
    return page;
  } else {
    throw new Error('Index does not exist in document.');
  }
};

// Copy pages to PDFPages[]
const copyPages = (
  document: PDFDocument,
  start: number,
  end: number
): PDFPage[] => {
  const pages = document.getPages();

  if (start && end) {
    // Check if valid range
    if (start >= 0 && start <= end && end <= pages.length - 1) {
      return pages.slice(start, end + 1);
    } else {
      throw new Error('Invalid range for duplicating pages from.');
    }
  }

  return pages;
};

// Copy page to a document
const extractPage = async (
  document: PDFDocument,
  index: number
): Promise<PDFDocument> => {
  const total = document.getPageCount();
  if (index <= total - 1) {
    const page = document.getPage(index);
    const newDocument = await createDocument();
    newDocument.addPage(page);
    return newDocument;
  } else {
    throw new Error('Index does not exist in document.');
  }
};

// Copy pages to a document
const extractPages = async (
  document: PDFDocument,
  start: number,
  end: number
): Promise<PDFDocument> => {
  if (start && end) {
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
      throw new Error('Invalid range for duplicating pages from.');
    }
  }

  return document.copy();
};

// Duplicate pages within a document
const duplicatePages = (
  document: PDFDocument,
  start?: number,
  end?: number
) => {
  const pages = document.getPages();

  if (start && end) {
    // Check if valid range
    if (start >= 0 && start <= end && end <= pages.length - 1) {
    } else {
      throw new Error('Invalid range for duplicating pages from.');
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
