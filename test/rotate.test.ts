import { rotateDocument } from '../src';
import { getDummyDocument } from './utils';

describe('rotate module', () => {
  test('rotate document', async () => {
    const doc = await getDummyDocument();
    expect(rotateDocument(doc, 90)).toBeNull;
  });
});
