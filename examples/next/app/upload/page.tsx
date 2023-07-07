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
  extractPage,
  extractPages,
  duplicatePages,
  getMeta,
  setMeta,
  resetMeta,
} from '../../../../dist/index';

export default function Upload() {
  const [blobUrl, setBlobUrl] = useState<string>();
  const [modifiedUrl, setModifiedUrl] = useState<string>();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // Clean up blob urls
    if (blobUrl && blobUrl.length > 0) URL.revokeObjectURL(blobUrl);
    if (modifiedUrl && modifiedUrl.length > 0) URL.revokeObjectURL(modifiedUrl);

    const files = e.target.files;

    if (files && files[0] && files[0].type === 'application/pdf') {
      const doc1 = await loadDocument(files[0]);
      //const doc2 = await loadDocument(files[1]);

      if (doc1) {
        setBlobUrl(await documentToBlobUrl(doc1));

        // Meta modifications
        const meta = getMeta(doc1);
        console.log(meta);
        setMeta(doc1, { title: 'beans' });
        const modified = getMeta(doc1);
        console.log(modified);
        resetMeta(doc1);
        console.log(getMeta(doc1));
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
