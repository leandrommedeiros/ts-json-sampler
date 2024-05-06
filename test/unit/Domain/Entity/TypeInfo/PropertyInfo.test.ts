import { PropertyInfo } from '../../../../../src';

import { JSDocTagInfo } from 'typescript';

describe('PropertyInfo', () => {
  it('should correctly identify float type from doc tags', () => {
    const docTags: JSDocTagInfo[] = [{ name: 'float', text: [] }];
    expect(PropertyInfo.isFloat(docTags)).toBe(true);
  });

  it('should return sample value from doc tags', () => {
    const docTags: JSDocTagInfo[] = [{ name: 'sampleValue', text: [{ text: '42' }] }];
    expect(PropertyInfo.getSampleValue(docTags)).toBe('42');
  });
});
