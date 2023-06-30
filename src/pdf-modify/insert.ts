import { PDFDocument, PDFPage } from 'pdf-lib';
import { createDocument } from './create';

const insertPage = (
  document: PDFDocument,
  page: PDFPage,
  index: number
): PDFDocument => {
  const total = document.getPageCount();
  if (index > total - 1) {
    throw new Error('');
  }

  document.insertPage(index, page);
  return document;
};

const insertPages = async (
  document: PDFDocument,
  pages: PDFPage[],
  index: number
): Promise<PDFDocument> => {
  const total = document.getPageCount();
  if (index > total - 1) {
    throw new Error('');
  }

  const final = await createDocument();
  const documentPages = document.getPages();
  const start = documentPages.slice(0, index);
  const end = documentPages.slice(index, documentPages.length);
  const allPages = [...start, ...pages, ...end];
  for (const page of allPages) {
    final.addPage(page);
  }
  return final;
};

export { insertPage, insertPages };
