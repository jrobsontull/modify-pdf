<div align="center">
    <h1>modify-pdf</h1>
    <p>Typesafe library for performing simple modifcations of PDF files.</p>
    <p>Currently a <strong>WIP</strong> whilst we work torwards a stable release. <strong>PRs</strong> welcome.</p>
    <img src='https://img.shields.io/npm/v/modify-pdf' />
    <a href='https://www.npmjs.com/package/modify-pdf'><img src='https://github.com/jrobsontull/modify-pdf/actions/workflows/main.yml/badge.svg' /><a/>
</div>

## Table of Contents

- [Why?](#why)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Toubleshooting](#troublshooting)
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

Please refer to our [documentation](https://jrobsontull.github.io/modify-pdf) page. Alternatively, the documentation can be found at `docs/index.md`.

This pacakage is still a work in progress. Current status:

- Creating PDFs ✅
- Loading PDFs ✅
- Rotating ✅
- Copying (WIP)
- Merging (WIP)
- Metadata (WIP)
- Testing (WIP)
- Examples (WIP)

## Troubleshooting

If you are having issues, please check the [documentation](https://jrobsontull.github.io/modify-pdf) first and the troubleshooting section there. If that does not help, feel free to open an [issue](https://github.com/jrobsontull/modify-pdf/issues).

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
