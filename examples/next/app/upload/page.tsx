'use client';

import { ChangeEvent, useState } from 'react';
import {
  loadDocument,
  documentToBlobUrl,
  rotateDocument,
  rotatePageInDoc,
  rotatePagesInDoc,
  mergeFiles,
  mergeDocuments,
  mergePages,
  rotatePages,
  createDocument,
  rotatePage,
  copyPage,
  copyPages,
} from '../../../../dist/index';
import { PDFPage } from 'pdf-lib';

export default function Upload() {
  const [blobUrl, setBlobUrl] = useState<string>();
  const [modifiedUrl, setModifiedUrl] = useState<string>();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // Clean up blob urls
    if (blobUrl && blobUrl.length > 0) URL.revokeObjectURL(blobUrl);
    if (modifiedUrl && modifiedUrl.length > 0) URL.revokeObjectURL(modifiedUrl);

    const files = e.target.files;

    if (
      files &&
      files[0] &&
      files[0].type === 'application/pdf' &&
      files[1] &&
      files[1].type === 'application/pdf'
    ) {
      const doc1 = await loadDocument(files[0]);
      const doc2 = await loadDocument(files[1]);

      if (doc1 && doc2) {
        setBlobUrl(await documentToBlobUrl(doc1));

        // Pages
        const page1 = doc1.getPage(0);
        const page2 = await copyPages(doc2, 0, 1);

        if (page2) {
          const mergedDoc = await createDocument([page1]);
          console.log('create');
          if (mergedDoc) {
            // render
            const modifiedUrl = await documentToBlobUrl(mergedDoc);
            setModifiedUrl(modifiedUrl);
            open(modifiedUrl);
          }
        }

        // rotate pdf
        //const merged = await rotatePage(page1, 90);
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <h1>Upload page</h1>
      <input type="file" onChange={(e) => onChange(e)} multiple />
      <div>
        <p>Iframe here:</p>
        {blobUrl ? <iframe src={blobUrl} /> : null}
        {modifiedUrl ? <iframe src={modifiedUrl} /> : null}
      </div>
    </div>
  );
}
