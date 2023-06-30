import { PDFDocument } from 'pdf-lib';

const createDocument = async (): Promise<PDFDocument> => {
  return await PDFDocument.create();
};

const loadDocument = async (file: File): Promise<PDFDocument | null> => {
  const data = await blobToBase64(file);
  if (data) {
    return await PDFDocument.load(data);
  } else {
    return null;
  }
};

const loadDocumentFromBytes = async (data: string) => {
  return await PDFDocument.load(data);
};

const documentToBlobUrl = async (document: PDFDocument): Promise<string> => {
  const bytes = await document.save();
  const blob = new Blob([bytes], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
};

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
  loadDocumentFromBytes,
  documentToBlobUrl,
};
