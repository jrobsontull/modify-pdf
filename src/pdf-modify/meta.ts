import { PDFDocument } from 'pdf-lib';

// As defined at https://pdf-lib.js.org/docs/api/classes/pdfdocument
type Meta = {
  author?: string;
  creator?: string;
  producer?: string;
  title?: string;
  keywords?: string[] | string;
  subject?: string;
  creationDate?: Date;
  modificationDate?: Date;
};

const setMeta = (
  document: PDFDocument,
  meta: Meta & { language?: string }
): PDFDocument => {
  if (Object.keys(meta).length === 0) {
    throw new Error('No meta data provided.');
  }

  meta.author && document.setAuthor(meta.author);
  meta.creator && document.setCreator(meta.creator);
  meta.producer && document.setProducer(meta.producer);
  meta.title && document.setTitle(meta.title);
  meta.language && document.setLanguage(meta.language);
  meta.keywords &&
    document.setKeywords(
      Array.isArray(meta.keywords) ? meta.keywords : [meta.keywords]
    );
  meta.subject && document.setSubject(meta.subject);
  meta.creationDate && document.setCreationDate(meta.creationDate);
  meta.modificationDate && document.setModificationDate(meta.modificationDate);

  return document;
};

const getMeta = (documet: PDFDocument, meta: Meta): PDFDocument => {
  if (Object.keys(meta).length === 0) {
    throw new Error('No meta data provided.');
  }

  const documentMeta: Meta = {};

  if (meta.author) documentMeta.author = documet.getAuthor();
  if (meta.creator) documentMeta.creator = documet.getCreator();
  if (meta.producer) documentMeta.producer = documet.getProducer();
  if (meta.title) documentMeta.title = documet.getTitle();
  if (meta.keywords) documentMeta.keywords = documet.getKeywords();
  if (meta.subject) documentMeta.subject = documet.getSubject();
  if (meta.creationDate) documentMeta.creationDate = documet.getCreationDate();
  if (meta.modificationDate)
    documentMeta.modificationDate = documet.getModificationDate();

  return documet;
};

const resetMeta = (document: PDFDocument): PDFDocument => {
  document.setAuthor('');
  document.setCreator('');
  document.setProducer('');
  document.setTitle('');
  document.setKeywords(['']);
  document.setSubject('');
  document.setCreationDate(new Date());
  document.setModificationDate(new Date());

  return document;
};

export { setMeta, getMeta, resetMeta };
