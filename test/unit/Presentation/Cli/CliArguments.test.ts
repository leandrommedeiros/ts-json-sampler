import { CliArguments } from '../../../../src';

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('CliArguments', () => {
  it('should initialize with correct paths', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ts-json-sampler-'));
    fs.mkdirSync(path.join(root, 'entity'));
    fs.writeFileSync(path.join(root, 'tsconfig.json'), '{}');

    const cliArgs = new CliArguments('/script/location', root, 'entity', 'tsconfig.json', 'output', 'fixFilter');

    expect(cliArgs.pathAppRoot).toBe(root);
    expect(cliArgs.pathEntity).toBe(path.join(root, 'entity'));
    expect(cliArgs.pathTsConfig).toBe(path.join(root, 'tsconfig.json'));
    expect(cliArgs.pathOutput).toBe(path.join(root, 'output'));
    expect(cliArgs.fixFilter).toBe('fixFilter');
    fs.rmSync(root, { recursive: true, force: true });
  });
});
