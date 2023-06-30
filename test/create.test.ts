import { PDFDocument } from 'pdf-lib';
import { createDocument, documentToBlobUrl } from '../src';
import { loadBase64File } from './utils';
import { loadDocumentFromBytes } from '../src/pdf-modify/create';

describe('create module', () => {
  test('document can be created', async () => {
    expect(await createDocument()).toBeInstanceOf(PDFDocument);
  });

  test('load from base64 string', async () => {
    const bytes = loadBase64File();
    expect(await loadDocumentFromBytes(bytes)).toBeInstanceOf(PDFDocument);
  });

  test('document to blob url', async () => {
    const doc = await createDocument();
    expect(await documentToBlobUrl(doc)).toMatch(/blob:.+/);
  });
});
