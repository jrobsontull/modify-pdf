import { PDFDocument, PDFPage } from 'pdf-lib';
import { createDocument } from './create';
import { errorMsg, log } from './utils';

const insertPage = (
  document: PDFDocument,
  page: PDFPage,
  index: number
): PDFDocument => {
  log('log', 'insertPage', errorMsg.experimental);

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
  log('log', 'insertPages', errorMsg.experimental);

  const total = document.getPageCount();
  if (index > total - 1) {
    throw new Error('');
  }

  const final = await createDocument();
  const documentPages = document.getPages();
  const start = documentPages.slice(0, index);
  const end = documentPages.slice(index, documentPages.length);
  const allPages = start.concat(pages, end);
  for (const page of allPages) {
    final.addPage(page);
  }
  return final;
};

export { insertPage, insertPages };
