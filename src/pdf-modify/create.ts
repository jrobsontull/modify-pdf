import { PDFDocument } from 'pdf-lib';

const createDocument = async (): Promise<PDFDocument> => {
  return await PDFDocument.create();
};

export { createDocument };
