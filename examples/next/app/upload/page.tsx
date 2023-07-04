'use client';

import { ChangeEvent, useState } from 'react';
import {
  loadDocument,
  documentToBlobUrl,
  rotateDocument,
  rotatePageInDoc,
  rotatePagesInDoc,
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
      const doc = await loadDocument(files[0]);
      if (doc) {
        setBlobUrl(await documentToBlobUrl(doc));

        // rotate pdf
        const rotated = await rotatePagesInDoc(doc, 90, 2, 1);

        // render
        const modifiedUrl = await documentToBlobUrl(rotated);
        setModifiedUrl(modifiedUrl);
        open(modifiedUrl);
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <h1>Upload page</h1>
      <input type="file" onChange={(e) => onChange(e)} />
      <div>
        <p>Iframe here:</p>
        {blobUrl ? <iframe src={blobUrl} /> : null}
        {modifiedUrl ? <iframe src={modifiedUrl} /> : null}
      </div>
    </div>
  );
}
