<div align="center">
    <h1>modify-pdf</h1>
    <p>Typesafe library for performing simple modifcations of PDF files.</p>
    <img src='https://github.com/jrobsontull/pdf-modify/actions/workflows/main.yml/badge.svg' />
</div>

## Table of Contents

- <a href="#why">Why?</a>
- <a href="#getting-started">Getting Started</a>
- <a href="#contributing">Contributing</a>

<h2 id='why'>Why?</h2>

`pdf-lib` provides a thorough toolset for manipulation of PDF files within JavaScript environments. This library provides an abstraction over `pdf-lib` for common tasks such as copying, merging, rotating, inserting and more!

<h2 id='getting-started'>Getting Started</h2>

### npm

Install the package using the package manager of your choice.

```bash
npm install pdf-modify
```

### yarn

```bash
yarn add pdf-modify
```

### pnpm

```bash
pnpm install pdf-modify
```

<br/>

`pdf-modify` can then be imported into your app as follows:

```tsx
import { rotateDocument } from 'pdf-modify';
import { PDFDocument } from 'pdf-lib';

const document: PDFDocument; // some document
const rotated = rotateDocument(document, 90); // 90° rotation
```

<h2 id='contributing'>Contributing</h2>

We wlecome any and all contributions. Contribution guidelines will be updated soon but in the meantime there are some useful snippets below.

We use `yarn` as a package manager. Before raising a PR, lint and format the codebase with the following commands:

```bash
yarn lint
yarn format
```
