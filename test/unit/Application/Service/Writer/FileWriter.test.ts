import { FileWriter, OutputSample, PropertyInfo } from '../../../../../src';

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('FileWriter', () => {
  it('should write samples to files', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ts-json-sampler-'));
    const sample = new OutputSample().add(new PropertyInfo('test', 'string'), 'value');
    jest.spyOn(console, 'log').mockImplementation(() => {});

    FileWriter.exportSamples(dir, 'Entity', { MyTypeEntity: sample });

    expect(fs.readFileSync(path.join(dir, 'my_type.sample.json'), 'utf8')).toBe(sample.toString());
    fs.rmSync(dir, { recursive: true, force: true });
  });
});
