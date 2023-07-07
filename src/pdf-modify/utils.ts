const isBrowser = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  } else {
    return true;
  }
};

const errorMsg = {
  experimental: 'This feature is experimental and is subject to change.',
  invalidRange: 'Invalid range. Index of start or end out of range.',
  invalidAngle: 'Invalid angle. Angle must be a multiple of 90.',
  invalidIndex: 'Index out of range.',
  loadFailed: 'Failed to load file.',
  parseFailed: 'Failed to parse to PDF.',
  blobConvertFailed: `Failed to convert blob to base64.`,
  serverOnly:
    'Incorrect usage. This function only runs in node.js environments (server only).',
  metaEmpty: 'Meta params are empty.',
};

const log = (
  type: 'error' | 'warning' | 'log',
  from: string,
  msg: string,
  err?: unknown
): void => {
  const content = `${from}: ${msg}`;
  if (type === 'error') {
    console.error(content);
  } else if (type === 'warning') {
    console.warn(content);
  } else if (type === 'log') {
    console.log(content);
  }

  if (err) {
    console.error(err);
  }
};

// Python-like range function
const range = (start: number, end: number, step = 1): number[] => {
  if (start <= end) {
    return Array.from(
      { length: (end - start) / step + 1 },
      (_, i) => start + i * step
    );
  } else {
    throw new Error('range: Invalid params.');
  }
};

export { isBrowser, errorMsg, log, range };
