import { PDFDocument, PDFPage, degrees } from 'pdf-lib';
import { createDocument } from './create';

const rotatePage = (page: PDFPage, degree: number): PDFPage => {
  page.setRotation(degrees(degree));
  return page;
};

const rotatePages = (
  pages: PDFPage[],
  degree: number,
  start?: number,
  end?: number
): PDFPage[] => {
  // Rotate only a range
  if (start && end) {
    // Check if valid range
    if (start >= 0 && start <= end && end <= pages.length - 1) {
      const begin = pages.slice(0, start);

      const toRotate = pages.slice(start, end + 1);
      for (const page of toRotate) {
        page.setRotation(degrees(degree));
      }

      const allPages = begin.concat(toRotate);
      if (end !== pages.length - 1) {
        allPages.concat(pages.slice(end + 1));
      }
      return allPages;
    } else {
      console.error('Invalid range for rotating pages.');
      return pages;
    }
  }

  // Otherwise rotate all pages the same
  for (const page of pages) {
    page.setRotation(degrees(degree));
  }
  return pages;
};

const rotatePageInDoc = async (
  document: PDFDocument,
  degree: number,
  index: number
): Promise<PDFDocument> => {
  const total = document.getPageCount();
  if (index > total - 1) {
    console.error('Rotation index not in range.');
    return document;
  }

  const rotatedDoc = await createDocument();
  const pages = document.getPages();
  const start = pages.slice(0, index);

  const rotatedPage = pages[index];
  if (rotatedPage) {
    rotatedPage.setRotation(degrees(degree));
    const allPages = start.concat(rotatedPage);

    if (index !== total - 1) {
      allPages.concat(pages.slice(index + 1));
    }

    for (const page of allPages) {
      rotatedDoc.addPage(page);
    }

    return rotatedDoc;
  } else {
    // Can't find index
    console.error('Rotation index not in range.');
    return document;
  }
};

const rotatePagesInDoc = async (
  document: PDFDocument,
  degree: number,
  start?: number,
  end?: number
): Promise<PDFDocument> => {
  // Rotate only a range
  const rotatedDoc = await createDocument();
  const pages = document.getPages();
  if (start && end) {
    // Check if valid range
    if (start >= 0 && start <= end && end <= pages.length - 1) {
      const begin = pages.slice(0, start);

      const toRotate = pages.slice(start, end + 1);
      for (const page of toRotate) {
        page.setRotation(degrees(degree));
      }

      const allPages = begin.concat(toRotate);
      if (end !== pages.length - 1) {
        allPages.concat(pages.slice(end + 1));
      }

      // Add pages to final document and return
      for (const page of allPages) {
        rotatedDoc.addPage(page);
      }
      return rotatedDoc;
    } else {
      console.error('Invalid range for rotating pages.');
      return document;
    }
  }

  // Otherwise rotate all pages the same
  for (const page of pages) {
    const rotatedPage = page;
    rotatedPage.setRotation(degrees(degree));
    rotatedDoc.addPage(rotatedPage);
  }
  return rotatedDoc;
};

const rotateDocument = (doc: PDFDocument, degree: number): PDFDocument => {
  const pages = doc.getPages();
  pages.forEach((page) => {
    page.setRotation(degrees(degree));
  });
  return doc;
};

export {
  rotatePage,
  rotatePages,
  rotateDocument,
  rotatePageInDoc,
  rotatePagesInDoc,
};
