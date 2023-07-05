import { PDFDocument, PDFPage, degrees } from 'pdf-lib';

const rotatePage = (page: PDFPage, angle: number): PDFPage => {
  page.setRotation(degrees(angle));
  return page;
};

const rotatePages = (
  pages: PDFPage[],
  angle: number,
  start?: number,
  end?: number
): PDFPage[] => {
  // Check if valid angle
  if (!isValidAngle(angle)) {
    console.error(errorMsg.invalidAngle);
    return pages;
  }

  // Rotate only a range
  if (start && end) {
    // Check if valid range
    if (start >= 0 && start <= end && end <= pages.length - 1) {
      const begin = pages.slice(0, start);

      const toRotate = pages.slice(start, end + 1);
      for (const page of toRotate) {
        page.setRotation(degrees(angle));
      }

      const allPages = begin.concat(toRotate);
      if (end !== pages.length - 1) {
        allPages.concat(pages.slice(end + 1));
      }
      return allPages;
    } else {
      console.error(errorMsg.invalidRange);
      return pages;
    }
  }

  // Otherwise rotate all pages the same
  for (const page of pages) {
    page.setRotation(degrees(angle));
  }
  return pages;
};

const rotatePageInDoc = (
  document: PDFDocument,
  angle: number,
  index: number
): PDFDocument => {
  const total = document.getPageCount();
  // Check if valid range
  if (index > total - 1) {
    console.error(errorMsg.invalidIndex);
    return document;
  }

  // Check if valid angle
  if (!isValidAngle(angle)) {
    console.error(errorMsg.invalidAngle);
    return document;
  }

  // Begin rotation
  const pages = document.getPages();
  const rotatedPage = pages[index];
  if (rotatedPage) {
    rotatedPage.setRotation(degrees(angle));
    return document;
  } else {
    // Can't find index
    console.error(errorMsg.invalidIndex);
    return document;
  }
};

const rotatePagesInDoc = (
  document: PDFDocument,
  angle: number,
  start?: number,
  end?: number
): PDFDocument => {
  // Check if valid angle
  if (!isValidAngle(angle)) {
    console.error(errorMsg.invalidAngle);
    return document;
  }

  // Rotate only a range
  const pages = document.getPages();
  if (typeof start === 'number' && typeof end === 'number') {
    // Check if valid range
    if (start >= 0 && start <= end && end <= pages.length - 1) {
      const toRotate = pages.slice(start, end + 1);
      for (const page of toRotate) {
        page.setRotation(degrees(angle));
      }

      return document;
    } else {
      console.error(errorMsg.invalidRange);
      return document;
    }
  }

  // Otherwise rotate all pages the same
  for (const page of pages) {
    page.setRotation(degrees(angle));
  }
  return document;
};

const rotateDocument = (document: PDFDocument, angle: number): PDFDocument => {
  // Check if valid angle
  if (!isValidAngle(angle)) {
    console.error(errorMsg.invalidAngle);
    return document;
  }

  // Continue rotation
  const pages = document.getPages();
  pages.forEach((page) => {
    page.setRotation(degrees(angle));
  });
  return document;
};

const isValidAngle = (angle: number): boolean => {
  if (angle % 90 === 0) return true;
  return false;
};

const errorMsg = {
  invalidRange: 'Invalid range for rotating pages.',
  invalidAngle: 'Invalid rotation angle. Angle must be a multiple of 90.',
  invalidIndex: 'Index for rotation not in range.',
};

export {
  rotatePage,
  rotatePages,
  rotateDocument,
  rotatePageInDoc,
  rotatePagesInDoc,
};
