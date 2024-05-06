import { CliArguments } from '../../../../src';

describe('CliArguments', () => {
  it('should initialize with correct paths', () => {
    const cliArgs = new CliArguments('/script/location', '/app/root', '/tsconfig/path', '/output/path', 'fixFilter');
    expect(cliArgs.pathEntity).toBe('/script/location');
    expect(cliArgs.pathAppRoot).toBe('/app/root');
    expect(cliArgs.pathTsConfig).toBe('/tsconfig/path');
    expect(cliArgs.pathOutput).toBe('/output/path');
    expect(cliArgs.fixFilter).toBe('fixFilter');
  });
});
