import { FileScanner } from '../../../../../src';

import * as fs from 'fs';

describe('FileScanner', () => {
  it('should scan a directory and return file paths', () => {
    const mockReaddirSync = jest.spyOn(fs, 'readdirSync').mockReturnValue(['file1.ts', 'file2.ts']);
    const mockStatSync = jest.spyOn(fs, 'statSync').mockReturnValue({ isDirectory: () => false } as fs.Stats);
    const result = FileScanner.scanDirectory('/mock/path', []);
    expect(result).toEqual(['/mock/path/file1.ts', '/mock/path/file2.ts']);
    mockReaddirSync.mockRestore();
    mockStatSync.mockRestore();
  });
});
