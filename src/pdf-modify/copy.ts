import { PDFDocument } from 'pdf-lib';
import { createDocument } from './create';
import { errorMsg, log, range } from './utils';

const copyDocument = async (document: PDFDocument): Promise<PDFDocument> => {
  return await document.copy();
};

/* // Copy page to PDFPage
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
      //const dummyDoc = await createDocument();
      //const pagesCopy = await dummyDoc.copyPages(document, range(start, end));
      return pages.slice(start, end + 1);
    } else {
      log('error', 'copyPages', errorMsg.invalidRange);
      return null;
    }
  }

  return pages;
}; */

// Copy page to a document
const extractPage = async (
  document: PDFDocument,
  index: number
): Promise<PDFDocument | null> => {
  const pageCount = document.getPageCount();
  if (index <= pageCount - 1) {
    const extracted = await createDocument();
    const page = await extracted.copyPages(document, [index]);
    extracted.addPage(page[0]);
    return extracted;
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
    const pageCount = document.getPageCount();
    // Check if valid range
    if (start >= 0 && start <= end && end <= pageCount - 1) {
      const extracted = await createDocument();
      const pages = await extracted.copyPages(document, range(start, end));
      for (const page of pages) {
        extracted.addPage(page);
      }
      return extracted;
    } else {
      log('error', 'extractPages', errorMsg.invalidRange);
      return null;
    }
  }

  return document.copy();
};

// Duplicate pages within a document
const duplicatePages = async (
  document: PDFDocument,
  start?: number,
  end?: number
): Promise<PDFDocument | null> => {
  const pageCount = document.getPageCount();
  const duplicated = await createDocument();

  if (typeof start === 'number' && typeof end === 'number') {
    // Check if valid range
    if (start >= 0 && start <= end && end <= pageCount - 1) {
      const pages = await duplicated.copyPages(
        document,
        document.getPageIndices()
      );
      for (let i = 0; i < pages.length; i++) {
        if (i >= start && i <= end) {
          duplicated.addPage(pages[i]);
          duplicated.addPage(pages[i]);
        } else {
          duplicated.addPage(pages[i]);
        }
      }

      return duplicated;
    } else {
      log('error', 'copyPage', errorMsg.invalidRange);
      return null;
    }
  }

  // Else duplicate all pages
  const pages = await duplicated.copyPages(document, document.getPageIndices());
  for (const page of pages) {
    duplicated.addPage(page);
  }

  return duplicated;
};

export { copyDocument, duplicatePages, extractPage, extractPages };
