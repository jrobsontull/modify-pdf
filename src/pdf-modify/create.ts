import { PDFDocument, PDFPage } from 'pdf-lib';
import { errorMsg, isBrowser, log } from './utils';

const createDocument = async (pages?: PDFPage[]): Promise<PDFDocument> => {
  const document = await PDFDocument.create();

  if (pages && pages.length > 0) {
    for (const page of pages) {
      const pageCopy = await document.copyPages(page.doc, [0]);
      document.addPage(pageCopy[0]);
    }
  }

  return document;
};

// Load using the File API
const loadDocument = async (file: File): Promise<PDFDocument | null> => {
  return blobToBase64(file)
    .then((data) => {
      if (data) {
        return PDFDocument.load(data)
          .then((doc) => doc)
          .catch((err) => {
            log('error', 'loadDocument', errorMsg.parseFailed, err);
            return null;
          });
      } else {
        log(
          'error',
          'loadDocument',
          errorMsg.loadFailed,
          `Failure reading: ${file.name}`
        );
        return null;
      }
    })
    .catch((err) => {
      log('error', 'loadDocument', errorMsg.blobConvertFailed, err);
      return null;
    });
};

// Load using fs from local environment
const loadLocalDocument = async (src: string): Promise<PDFDocument | null> => {
  if (isBrowser()) {
    log('error', 'loadLocalDocument', errorMsg.serverOnly);
    return null;
  }

  // Dynamically import fs if in node env
  return import('fs/promises').then(async (fs) => {
    const buffer = await fs.readFile(src);
    const name = src.split('/').pop() ?? 'file.pdf';
    const file = new File([buffer], name);
    return loadDocument(file);
  });
};

// Load a base64 string
const loadFromBytes = async (data: string): Promise<PDFDocument | null> => {
  try {
    return await PDFDocument.load(data);
  } catch (err) {
    log('error', 'loadFromBytes', errorMsg.parseFailed, err);
    return null;
  }
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
