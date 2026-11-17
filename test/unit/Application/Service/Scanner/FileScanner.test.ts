import { FileScanner } from '../../../../../src';

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('FileScanner', () => {
  it('should scan a directory and return file paths', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ts-json-sampler-'));
    fs.writeFileSync(path.join(dir, 'file1.ts'), '');
    fs.writeFileSync(path.join(dir, 'file2.ts'), '');

    const result = FileScanner.scanDirectory(dir, []);

    expect(result.sort()).toEqual([path.join(dir, 'file1.ts'), path.join(dir, 'file2.ts')]);
    fs.rmSync(dir, { recursive: true, force: true });
  });
});
