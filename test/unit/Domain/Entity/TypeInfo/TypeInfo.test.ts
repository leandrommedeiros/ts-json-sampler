import { TypeInfo } from '../../../../../src';

describe('TypeInfo', () => {
  it('should have a name and properties', () => {
    const typeInfo: TypeInfo = { name: 'TestType', properties: [] };
    expect(typeInfo.name).toBe('TestType');
    expect(typeInfo.properties).toEqual([]);
  });
});
