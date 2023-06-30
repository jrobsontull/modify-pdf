import { PDFDocument, PDFPage, degrees } from 'pdf-lib';

const rotatePage = (page: PDFPage, degree: number): PDFPage => {
  page.setRotation(degrees(degree));
  return page;
};

const rotatePages = (doc: PDFDocument, degree: number): PDFDocument => {
  const pages = doc.getPages();
  pages.forEach((page) => {
    page.setRotation(degrees(degree));
  });
  return doc;
};

export { rotatePage, rotatePages };
