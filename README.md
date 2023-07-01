<div align="center">
    <h1>modify-pdf</h1>
    <p>Typesafe library for performing simple modifcations of PDF files.</p>
    <p>Currently a <strong>WIP</strong> whilst we work torwards a stable release. <strong>PRs</strong> welcome.</p>
    <img src='https://github.com/jrobsontull/modify-pdf/actions/workflows/main.yml/badge.svg' />
</div>

## Table of Contents

- [Why?](#why)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Contributing](#contributing)

## Why?

`pdf-lib` provides a thorough toolset for manipulation of PDF files within JavaScript environments. This library provides an abstraction over `pdf-lib` for common tasks such as copying, merging, rotating, inserting and more!

## Getting Started

### npm

Install the package using the package manager of your choice.

```bash
npm install modify-pdf
```

### yarn

```bash
yarn add modify-pdf
```

### pnpm

```bash
pnpm install modify-pdf
```

<br/>

`modify-pdf` can then be imported into your app as follows:

```tsx
import { loadLocalDocument, rotateDocument } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';

const document: PDFDocument = await loadLocalDocument('example.pdf');
const rotated: PDFDocument = rotateDocument(document, 90); // 90° rotation
```

## Documentation

### Conents

- [Creating and loading PDFs](#creating-pdfs)
  - [Creating PDFs](#creating-pdfs)
  - [Load PDF from HTML source](#load-pdf-from-html-source)
  - [Load PDF from local source](#load-pdf-from-local-source)
  - [Load PDF from base64 string](#load-pdf-from-base64-string)
  - [Convert PDF to an object URL](#convert-pdf-to-an-object-url)
- [Merging PDFs](#merge-documents)
  - [Merge files](#merge-files)
  - [Merge documents](#merge-documents)
  - [Merge pages](#merge-pages)

### Creating PDFs

An empty PDF can be created with `createDocument()`. This generates a `PDFDocument`. See the pdf-lib [docs](https://pdf-lib.js.org/docs/api/classes/pdfdocument) for more details. There are no parameters for this function currently.

```ts
import { createDocument } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';

const document: PDFDocument = await createDocument();
```

### Load PDF from HTML source

Files read from a HTML input can be loaded using `loadDocument()`. This takes a `File` as a parameter. Make sure to pass only PDF documents. If the document fails to load, `null` is returned. An example of a React component is shown below.

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

PDFs can be read from local sources using `loadLocalDocument()`. This requires a `str` argument for the location of the file on the local machine. If the document fails to load, `null` is returned.

```ts
import { loadLocalDocument } from 'modify-pdf'; // uses fs library
import { PDFDocument } from 'pdf-lib';

const document: PDFDocument | null = await loadLocalDocument('example.pdf');
```

### Load PDF from base64 string

PDFs can be directly loaded from `base64` strings using `loadFromBytes()`. This takes a `str` argument for the data and returns `null` if the load fails.

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

This is useful for displaying the PDF in the DOM e.g. in an `iframe`. Use `documentToBlobUrl()` to perform this conversion. The asynchronous function takes a `PDFDocument` as an argument and returns a `str`. An example React component is shown below.

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

### Merge files

A list of files can be merged to produce a single `PDFDocument`. Use the `mergeFiles()` function to achieve this. This takes `File[]` as an argument and always returns a `PDFDocument`. This is useful for merging PDF documents provided from a HTML input. An example React component is shown below.

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

`mergeDocuments()` can be used to merge `PDFDocument[]` into a single `PDFDocument`. This takes an array of `PDFDocument` as an argument and returns a single `PDFDocument` or `null`.

```ts
import { mergeDocuments } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';

const documents: PDFDocument[] = [...] // array of documents;
const merged: PDFDocument | null = await mergeDocuments(documents);
```

### Merge pages

`mergePages()` can be used to merge individual PDF pages into a PDF document. This takes `PDFPage[]` as an argument and returns `PDFDocument` or `null`.

```ts
import { mergePages } from 'modify-pdf';
import { PDFDocument, PDFPage } from 'pdf-lib';

const pages: PDFPage[] = [...] // array of pages;
const merged: PDFDocument | null = await mergePages(pages);
```

### Rotating PDFs

Needs documenting.

- `rotateDocument()`
- `rotatePages()`
- `rotatePage()`

### Copying

Needs documenting.

- `copyDocument()`
- `copyPage()`
- `copyPages()`
- `extractPage()`
- `extractPages()`
- `duplicatePages()`

### Inserting pages

Needs documenting.

- `insertPage()`
- `insertPages()`

### Metadata

Needs documenting.

- `getMeta()`
- `setMeta()`
- `resetMeta()`

## Contributing

We wlecome any and all contributions. Contribution guidelines will be updated soon but in the meantime there are some useful snippets below.

We use `yarn` as a package manager. Before raising a PR, lint and format the codebase with the following commands:

```bash
yarn lint
yarn format
```

All tests can be found in `./test/`. Tests are run with `jest` and can be initiated with:

```bash
yarn test
```
