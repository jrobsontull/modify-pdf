# Documentation

This is the documentation for the [modify-pdf](https://github.com/jrobsontull/modify-pdf) package. This NPM package provides a typesafe layer for simple manipulations of PDFs using the [pdf-lib](https://pdf-lib.js.org/) library.

## Contents

- [Creating and loading PDFs](#creating-and-loading-pdfs)
  - [Creating PDFs](#creating-pdfs)
  - [Load PDF from HTML source](#load-pdf-from-html-source)
  - [Load PDF from local source](#load-pdf-from-local-source)
  - [Load PDF from base64 string](#load-pdf-from-base64-string)
  - [Convert PDF to an object URL](#convert-pdf-to-an-object-url)
- [Merging PDFs](#merging-pdfs)
  - [Merge files](#merge-files)
  - [Merge documents](#merge-documents)
  - [Merge pages](#merge-pages)
- [Rotating PDFs](#rotating-pdfs)
  - [Rotate document](#rotate-document)
  - [Rotate page](#rotate-page)
  - [Rotate pages](#rotate-pages)
  - [Rotate page in document](#rotate-page-in-document)
  - [Rotate pages in document](#rotate-pages-in-document)
- [Copying](#copying)
- [Inserting Pages](#inserting-pages)
- [Metadata](#metadata)
- [Troubleshooting](#troublshooting)
  - [Next.js usage](#nextjs-usage)

## Creating and loading PDFs

### Creating PDFs

An empty PDF can be created with `createDocument()`. This generates a `PDFDocument`. See the `pdf-lib` [documentation](https://pdf-lib.js.org/docs/api/classes/pdfdocument) for more details.

Example usage:

```ts
import { createDocument } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';

const document: PDFDocument = await createDocument();
```

### Load PDF from HTML source

Files read from a HTML input can be loaded using `loadDocument()`. Make sure to pass only PDF documents. If the document fails to load, `null` is returned. An example of a React component is shown below.

_Parameters:_

| Argument | Type   |
| -------- | ------ |
| file     | `File` |

_Return type:_

`PDFDocument | null`

_Example usage:_

```tsx
import { loadDocument } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';
import { ChangeEvent, useState } from 'react';

const MyComponent = () => {
    const handleChange = async (e: ChangEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files[0] && files[0].type === 'application/pdf') {
            const document: PDFDocument | null = await loadDocument(files[0]);
            if (document) {
                console.log(document.getTitle());
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={(e) => handleChange(e)} />
        </div>
    );
}
```

### Load PDF from local source

PDFs can be read from local sources using `loadLocalDocument()`. Provide a location of the file on the local machine to this function. If the document fails to load, `null` is returned.

_Parameters:_

| Argument | Type     |
| -------- | -------- |
| src      | `string` |

_Return type:_

`PDFDocument | null`

_Example usage:_

```ts
import { loadLocalDocument } from 'modify-pdf'; // uses fs library
import { PDFDocument } from 'pdf-lib';

const document: PDFDocument | null = await loadLocalDocument('example.pdf');
```

### Load PDF from base64 string

PDFs can be directly loaded from `base64` strings using `loadFromBytes()`. This is an async function and returns `null` if the load fails.

_Parameters:_

| Argument | Type     |
| -------- | -------- |
| data     | `string` |

_Return type:_

`Promise<PDFDocument | null>`

_Example usage:_

```ts
import { loadFromBytes } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';

const base64 =
  'JVBERi0xLjcKJYGBgYEKCjUgMCBvYmoKPDwKL0ZpbHRlciAvRmxhdGVEZWNvZGUKL0xlbm' +
  'd0aCAxMDQKPj4Kc3RyZWFtCniccwrhMlAAwaJ0Ln2P1Jyy1JLM5ERdc0MjCwUjE4WQNC4Q' +
  '6cNlCFZkqGCqYGSqEJLLZWNuYGZiZmbkYuZsZmlmZGRgZmluDCQNzc3NTM2NzdzMXMxMjQ' +
  'ztFEKyuEK0uFxDuAAOERdVCmVuZHN0cmVhbQplbmRvYmoKCjYgMCBvYmoKPDwKL0ZpbHRl' +
  'ciAvRmxhdGVEZWNvZGUKL1R5cGUgL09ialN0bQovTiA0Ci9GaXJzdCAyMAovTGVuZ3RoID' +
  'IxNQo+PgpzdHJlYW0KeJxVj9GqwjAMhu/zFHkBzTo3nCCCiiKIHPEICuJF3cKoSCu2E8/b' +
  '20wPIr1p8v9/8kVhgilmGfawX2CGaVrgcAi0/bsy0lrX7IGWpvJ4iJYEN3gEmrrGBlQwGs' +
  'HHO9VBX1wNrxAqMX87RBD5xpJuddqwd82tjAHxzV1U5LPgy52DKXWnr1Lheg+j/c/pzGVr' +
  'iqV0VlwZPXGPCJjElw/ybkwUmeoWgxesDXGhHJC/D/iikp1Av80ptKU0FdBEe25pPihAM1' +
  'u6ytgaaWfs2Hrz35CJT1+EWmAKZW5kc3RyZWFtCmVuZG9iagoKNyAwIG9iago8PAovU2l6' +
  'ZSA4Ci9Sb290IDIgMCBSCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlCi9UeXBlIC9YUmVmCi9MZW' +
  '5ndGggMzgKL1cgWyAxIDIgMiBdCi9JbmRleCBbIDAgOCBdCj4+CnN0cmVhbQp4nBXEwREA' +
  'EBAEsCwz3vrvRmOOyyOoGhZdutHN2MT55fIAVocD+AplbmRzdHJlYW0KZW5kb2JqCgpzdG' +
  'FydHhyZWYKNTEwCiUlRU9G';

const document: PDFDocument | null = await loadFromBytes(base64);
```

### Convert PDF to an object URL

This is useful for displaying the PDF in the DOM e.g. in an `iframe`. Use the asynchronous `documentToBlobUrl()` to perform this conversion. An example React component is shown below.

_Parameters:_

| Argument | Type          |
| -------- | ------------- |
| document | `PDFDocument` |

_Return type:_

`Promise<string>`

_Example usage:_

```tsx
import { documentToBlobUrl } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';
import { useState } from 'react';

const MyComponent = () => {
  const [blobUrl, setBlobUrl] = useState<string>();

  const document: PDFDocument; // example document
  const url = await documentToBlobUrl(document);
  setBlobUrl(url);

  return <div>{blobUrl ? <iframe src={blobUrl} /> : null}</div>;
};
```

## Merging PDFs

### Merge files

A list of files can be merged to produce a single `PDFDocument` with the asynchronous `mergeFiles()` function. This is useful for merging PDF documents provided from a HTML input. An example React component is shown below.

_Parameters:_

| Argument | Type     |
| -------- | -------- |
| files    | `File[]` |

_Return type:_

`Promise<PDFDocument>`

_Example usage:_

```tsx
import { mergeFiles } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';

const MyComponent = () => {
    const handleChange = async (e: ChangEvent<HTMLInputElement>) {
        const files = e.target.files;
        // Assemble list of true PDF files
        const pdfFiles: File[] = [];
        for (const file of files) {
            if (file.type === 'application/pdf') {
                pdfFiles.push(file);
            }
        }
        // Now merge files
        const merged: PDFDocument = await mergeFiles(pdfFiles);
    };

    return (
        <div>
            <input type="file" onChange={(e) => handleChange(e)} />
        </div>
    );
};
```

### Merge documents

`mergeDocuments()` can be used to merge `PDFDocument[]` into a single `PDFDocument`. This returns null if the array of documents is empty.

_Parameters:_

| Argument  | Type            |
| --------- | --------------- |
| documents | `PDFDocument[]` |

_Return type:_

`Promise<PDFDocument | null>`

_Example usage:_

```ts
import { mergeDocuments } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';

const documents: PDFDocument[] = [...] // array of documents;
const merged: PDFDocument | null = await mergeDocuments(documents);
```

### Merge pages

`mergePages()` can be used to merge individual PDF pages into a PDF document. This returns null if the pages array is empty.

_Parameters:_

| Argument | Type        |
| -------- | ----------- |
| pages    | `PDFPage[]` |

_Return type:_

`Promise<PDFDocument | null>`

_Example usage:_

```ts
import { mergePages } from 'modify-pdf';
import { PDFDocument, PDFPage } from 'pdf-lib';

const pages: PDFPage[] = [...] // array of pages;
const merged: PDFDocument | null = await mergePages(pages);
```

## Rotating PDFs

### Rotate document

Use `rotateDocument()` to rotate all pages in a PDF document. The rotation angle must be a multiple of 90.

_Parameters:_

| Argument | Type                      |
| -------- | ------------------------- |
| document | `PDFDocument`             |
| angle    | `number` (multiple of 90) |

_Return type:_

`PDFDocument`

_Example usage:_

```ts
import { createDocument, rotateDocument } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';

const document: PDFDocument = await createDocument(); // example document
const rotated: PDFDocument = rotateDocument(document, 90); // 90° rotation
```

### Rotate page

Use `rotatePage()` this to rotate an individual page.

_Parameters:_

| Argument | Type                      |
| -------- | ------------------------- |
| page     | `PDFPage`                 |
| angle    | `number` (multiple of 90) |

_Return type:_

`PDFPage`

_Example usage:_

```ts
import { createDocument, rotatePage } from 'modify-pdf';
import { PDFDocument, PDFPage } from 'pdf-lib';

const document: PDFDocument = await createDocument(); // example document
const page: PDFPage = document.getPage(0); // page 1
const rotated: PDFPage = rotatePage(page, 90); // 90° rotation
```

### Rotate pages

Use `rotatePages()` to rotate multiple pages in an array of pages. This can optionally take a range to rotate a subset of pages. If no start and end is specified, all pages will be rotated by the same amount.

_Parameters:_

| Argument | Type                      |
| -------- | ------------------------- |
| pages    | `PDFPage`                 |
| angle    | `number` (multiple of 90) |
| start    | `number \| undefined`     |
| end      | `number \| undefined`     |

_Return type:_

`PDFPage[]`

_Example usage:_

```ts
import { createDocument, rotatePages } from 'modify-pdf';
import { PDFPage } from 'pdf-lib';

const pages: PDFPage[] = [...] // example array

const rotatedAll: PDFPage[] = rotatePages(pages, 90); // 90° rotation of all
const rotatedSubset: PDFPage[] = rotatePages(pages, 90, 0, 2, 90); // 90° rotation of indexes 0 -> 2

```

### Rotate page in document

Similar to `rotatePage()` except that `rotatePageInDoc()` rotates a specific page inside of a document.

_Parameters:_

| Argument | Type                      |
| -------- | ------------------------- |
| document | `PDFDocument`             |
| angle    | `number` (multiple of 90) |
| index    | `number`                  |

_Return type:_

`PDFDocument`

_Example usage:_

```ts
import { createDocument, rotatePageInDoc } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';

const document: PDFDocument = await createDocument(); // example document
const rotated: PDFPage = await rotatePageInDoc(page, 90, 0); // 90° rotation of page 1
```

### Rotate pages in document

Use `rotatePagesInDoc()` to rotate a subset of pages within a PDF document. Works similarly to the previous function but it can take an index range for rotation.

_Parameters:_

| Argument | Type                      |
| -------- | ------------------------- |
| document | `PDFDocument`             |
| angle    | `number` (multiple of 90) |
| start    | `number \| undefined`     |
| end      | `number \| undefined`     |

_Return type:_

`PDFDocument`

_Example usage:_

If no start and end is specified, all pages will be rotated by the same amount.

```ts
import { createDocument, rotatePagesInDoc } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';

const document: PDFDocuemnt; // example document

const rotatedAll: PDFDocument = await rotatePagesInDoc(document, 90); // 90° rotation of all pages
const rotatedSubset: PDFDocument = await rotatePagesInDoc(pages, 90, 0, 2); // 90° rotation of pages 1 -> 3
```

## Copying

Needs documenting.

- `copyDocument()`
- `copyPage()`
- `copyPages()`
- `extractPage()`
- `extractPages()`
- `duplicatePages()`

## Inserting pages

Needs documenting.

- `insertPage()`
- `insertPages()`

## Metadata

Needs documenting.

- `getMeta()`
- `setMeta()`
- `resetMeta()`

## Troublshooting

### Next.js usage

If you import this library inside of the Next.js framework, you will need to adjust the webpack config since this module imports `fs/promises`. If you are using Webpack 5, change the following inside of `/next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
```

If using Webpack 4 or older versions of Next.js where this was the default, make the following adjustment to `/next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },
};

module.exports = nextConfig;
```
