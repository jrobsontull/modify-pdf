import { PDFDocument, PDFPage, degrees } from 'pdf-lib';

const rotatePage = (page: PDFPage, degree: number): PDFPage => {
  page.setRotation(degrees(degree));
  return page;
};

const rotatePages = (pages: PDFPage[], degree: number): PDFPage[] => {
  for (const page of pages) {
    page.setRotation(degrees(degree));
  }
  return pages;
};

const rotateDocument = (doc: PDFDocument, degree: number): PDFDocument => {
  const pages = doc.getPages();
  pages.forEach((page) => {
    page.setRotation(degrees(degree));
  });
  return doc;
};

export { rotatePage, rotatePages, rotateDocument };
