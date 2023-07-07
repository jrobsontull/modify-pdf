import { PDFDocument } from 'pdf-lib';
import { errorMsg } from './utils';

// As defined at https://pdf-lib.js.org/docs/api/classes/pdfdocument
export type MetaQuery = {
  author?: true;
  creator?: true;
  producer?: true;
  title?: true;
  keywords?: true;
  subject?: true;
  creationDate?: true;
  modificationDate?: true;
};

export type Meta = {
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
): void => {
  if (Object.keys(meta).length === 0) {
    throw new Error(`setMeta: ${errorMsg.metaEmpty}`);
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
};

const getMeta = (documet: PDFDocument, query?: MetaQuery): Meta => {
  const documentMeta: Meta = {};

  if (query && Object.keys(query).length > 0) {
    // Get specific params
    if (query.author) documentMeta.author = documet.getAuthor();
    if (query.creator) documentMeta.creator = documet.getCreator();
    if (query.producer) documentMeta.producer = documet.getProducer();
    if (query.title) documentMeta.title = documet.getTitle();
    if (query.keywords) documentMeta.keywords = documet.getKeywords();
    if (query.subject) documentMeta.subject = documet.getSubject();
    if (query.creationDate)
      documentMeta.creationDate = documet.getCreationDate();
    if (query.modificationDate)
      documentMeta.modificationDate = documet.getModificationDate();
  } else {
    // Get all
    documentMeta.author = documet.getAuthor();
    documentMeta.creator = documet.getCreator();
    documentMeta.producer = documet.getProducer();
    documentMeta.title = documet.getTitle();
    documentMeta.keywords = documet.getKeywords();
    documentMeta.subject = documet.getSubject();
    documentMeta.creationDate = documet.getCreationDate();
    documentMeta.modificationDate = documet.getModificationDate();
  }

  return documentMeta;
};

const resetMeta = (document: PDFDocument): void => {
  document.setAuthor('');
  document.setCreator('');
  document.setProducer('');
  document.setTitle('');
  document.setKeywords(['']);
  document.setSubject('');
  document.setCreationDate(new Date());
  document.setModificationDate(new Date());
};

export { setMeta, getMeta, resetMeta };
