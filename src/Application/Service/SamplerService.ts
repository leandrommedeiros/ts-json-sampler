import { TypeInfo } from "../../Domain/Entity/TypeInfo/TypeInfo";
import {ScalarTypes} from "../../Domain/Constant/ScalarTypes";
import * as uuid from 'uuid';
import {PropertyInfo} from "../../Domain/Entity/TypeInfo/PropertyInfo";
import {OutputSample} from "../../Domain/Entity/OutputSample";

export class SamplerService {
  private readonly inputTypes: TypeInfo[];
  private readonly outputTypes: Record<string, OutputSample>;

  constructor(inputTypes: TypeInfo[]) {
    this.inputTypes = inputTypes;
    this.outputTypes = {};
  }

  public generateForAll(): Record<string, OutputSample> {
    for (const inputType of this.inputTypes) {
      this.outputTypes[inputType.name] = this.generateForComplexType(inputType);
    }

    return this.outputTypes;
  }

  public generateForComplexType(type: TypeInfo): OutputSample {
    const outputSample = new OutputSample();

    for (const property of type.properties) {
      this.handleProperty(property, type, outputSample);
    }

    return outputSample;
  }

  private handleProperty(property: PropertyInfo, parentType: TypeInfo, outputSample: OutputSample): void {
    if (this.isCircularReference(property, parentType)) {
      throw new Error(`Circular type reference is not supported: ${parentType.name}.${property.name}`);
    }

    if (this.isScalarProperty(property)) {
      this.handleScalarProperty(property, outputSample);
    } else {
      this.handleNonScalarProperty(property, outputSample);
    }
  }

  private isCircularReference(property: PropertyInfo, parentType: TypeInfo): boolean {
    return property.type === parentType.name;
  }

  private isScalarProperty(property: PropertyInfo): boolean {
    return property.isScalar;
  }

  private handleScalarProperty(property: PropertyInfo, outputSample: OutputSample): void {
    if (property.hasSampleValue) {
      outputSample.add(property, this.castSampleForScalar(property));
    } else {
      outputSample.add(property, this.randomSampleForScalar(property.type as ScalarTypes));
    }
  }

  private handleNonScalarProperty(property: PropertyInfo, outputSample: OutputSample): void {
    if (this.outputTypes.hasOwnProperty(property.type)) {
      outputSample.add(property, this.outputTypes[property.type].get());
    } else {
      const inputType = this.getInputType(property.type);
      const value = inputType ? this.generateForComplexType(inputType) : null;
      outputSample.add(property, value);
    }
  }

  public castSampleForScalar(property: PropertyInfo) {
    switch (property.type) {
      case ScalarTypes.NUMBER:
        return parseFloat(property.sampleValue || '');
      case ScalarTypes.STRING:
        return property.sampleValue;
      default:
        return null;
    }
  }

  public randomSampleForScalar(scalarType: ScalarTypes) {
    switch (scalarType) {
      case ScalarTypes.BOOLEAN:
        return true;
      case ScalarTypes.NUMBER:
        return Math.random();
      case ScalarTypes.STRING:
        return uuid.v4();
      default:
        return null;
    }
  }

  private getInputType(type: string): TypeInfo | null {
    for (const inputType of this.inputTypes)
      if (inputType.name == type)
        return inputType;
    return null;
  }
}
