import { SamplerService } from '../../../../src';

import { TypeInfo } from '../../../../src';

describe('SamplerService', () => {
  it('should generate samples for all input types', () => {
    const inputTypes: TypeInfo[] = [{ name: 'TestType', properties: [] }];
    const samplerService = new SamplerService(inputTypes);
    const output = samplerService.generateForAll();
    expect(output).toHaveProperty('TestType');
  });
});
