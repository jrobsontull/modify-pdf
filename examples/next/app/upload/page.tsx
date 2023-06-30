'use client';

import { ChangeEvent, useState } from 'react';
import {
  loadDocument,
  documentToBlobUrl,
  rotateDocument,
} from '../../../../dist/index';

export default function Upload() {
  const [blobUrl, setBlobUrl] = useState<string>();
  const [modifiedUrl, setModifiedUrl] = useState<string>();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && files[0].type === 'application/pdf') {
      const doc = await loadDocument(files[0]);
      if (doc) {
        setBlobUrl(await documentToBlobUrl(doc));

        // rotate pdf
        const rotated = rotateDocument(doc, 90);
        setModifiedUrl(await documentToBlobUrl(rotated));
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
