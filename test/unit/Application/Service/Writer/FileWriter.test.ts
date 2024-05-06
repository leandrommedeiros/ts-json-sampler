import { FileWriter } from '../../../../../src';

import * as fs from 'fs';

describe('FileWriter', () => {
  it('should write data to a file', () => {
    const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    FileWriter.writeToFile('/mock/path', 'data');
    expect(mockWriteFileSync).toHaveBeenCalledWith('/mock/path', 'data');
    mockWriteFileSync.mockRestore();
  });
});
