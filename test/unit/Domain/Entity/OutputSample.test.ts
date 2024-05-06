import { OutputSample } from '../../../../src';
import { PropertyInfo } from '../../../../src';

describe('OutputSample', () => {
  it('should add a property to the container', () => {
    const outputSample = new OutputSample();
    const propertyInfo = new PropertyInfo('test', 'string', [], null, false, false, false, false, false);
    outputSample.add(propertyInfo, 'value');
    expect(outputSample.get()).toEqual({ test: 'value' });
  });

  it('should convert container to JSON string', () => {
    const outputSample = new OutputSample();
    const propertyInfo = new PropertyInfo('test', 'string', [], null, false, false, false, false, false);
    outputSample.add(propertyInfo, 'value');
    expect(outputSample.toString()).toBe(JSON.stringify({ test: 'value' }, null, 2));
  });
});
