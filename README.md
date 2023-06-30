<div align="center">
    <h1>modify-pdf</h1>
    <p>Typesafe library for performing simple modifcations of PDF files.</p>
    <p>Currently a <strong>WIP</strong> whilst we work torwards a stable release. <strong>PRs</strong> welcome.</p>
    <img src='https://github.com/jrobsontull/modify-pdf/actions/workflows/main.yml/badge.svg' />
</div>

## Table of Contents

- <a href="#why">Why?</a>
- <a href="#getting-started">Getting Started</a>
- <a href="#documentation">Documentation</a>
- <a href="#contributing">Contributing</a>

<h2 id='why'>Why?</h2>

`pdf-lib` provides a thorough toolset for manipulation of PDF files within JavaScript environments. This library provides an abstraction over `pdf-lib` for common tasks such as copying, merging, rotating, inserting and more!

<h2 id='getting-started'>Getting Started</h2>

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

<h2 id='documentation'>Documentation</h2>

### Creating and loading PDFs

```ts
import { createDocument } from 'modify-pdf';
import { PDFDocument } from 'pdf-lib';

const document: PDFDocument = await createDocument(); // creates an empty PDF
// See https://pdf-lib.js.org/docs/api/classes/pdfdocument
```

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

```ts
import { loadLocalDocument } from 'modify-pdf'; // uses fs library
import { PDFDocument } from 'pdf-lib';

const document: PDFDocument = await loadLocalDocument('example.pdf');
```

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

const document: PDFDocument = await loadFromBytes(base64);
```

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

### Merging PDFs

Needs documenting.

- `mergeDocuments()`
- `mergePages()`
- `mergeFiles()`

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

<h2 id='contributing'>Contributing</h2>

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
