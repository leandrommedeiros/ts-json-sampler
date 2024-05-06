import { TypeScanner } from '../../../../../src';

import * as ts from 'typescript';

describe('TypeScanner', () => {
  it('should extract types from source files', () => {
    const sourceFile = ts.createSourceFile('test.ts', 'export type Test = {}', ts.ScriptTarget.Latest);
    const result = TypeScanner.extractTypes('', [sourceFile]);
    expect(result).toHaveProperty('Test');
  });
});
