import * as fs from 'fs';
import { PDFDocument } from 'pdf-lib';

// Load document from file without browser APIs
const loadFile = () => {
  const buffer = fs.readFileSync('./test/dummy.pdf', 'utf-8');
  return new File([buffer], 'dummy.pdf');
};

// Load base64 bytes of file
const loadBase64File = () => {
  return fs.readFileSync('./test/dummy.pdf', 'base64');
};

// Load document as PDFDocument
const getDummyDocument = async () => {
  const bytes = loadBase64File();
  return await PDFDocument.load(bytes);
};

export { loadFile, loadBase64File, getDummyDocument };
