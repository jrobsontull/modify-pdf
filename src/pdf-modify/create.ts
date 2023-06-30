import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';

const createDocument = async (): Promise<PDFDocument> => {
  return await PDFDocument.create();
};

// Load using the File API
const loadDocument = async (file: File): Promise<PDFDocument> => {
  const data = await blobToBase64(file);
  if (data) {
    return await PDFDocument.load(data);
  } else {
    throw new Error(`Failed to load "${file.name}"`);
  }
};

// Load using fs from local environment
const loadLocalDocument = async (src: string): Promise<PDFDocument> => {
  const buffer = await fs.readFile(src);
  const name = src.split('/').pop() ?? 'file.pdf';
  const file = new File([buffer], name);
  return loadDocument(file);
};

// Load a base64 string
const loadFromBytes = async (data: string) => {
  return await PDFDocument.load(data);
};

// Create a blob URL from a PDFDocument
const documentToBlobUrl = async (document: PDFDocument): Promise<string> => {
  const bytes = await document.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
};

// Convert a File blob to base64 string
const blobToBase64 = async (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

export {
  createDocument,
  loadDocument,
  loadFromBytes,
  documentToBlobUrl,
  loadLocalDocument,
};
