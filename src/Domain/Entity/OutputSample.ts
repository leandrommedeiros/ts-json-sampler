import { PropertyInfo } from './TypeInfo/PropertyInfo';

export class OutputSample {
  private container: Record<string, unknown> = {};

  public add(propertyInfo: PropertyInfo, value: unknown): OutputSample {
    this.container[propertyInfo.name] = propertyInfo.isArray ? [value] : value;
    return this;
  }

  public toString(): string {
    return JSON.stringify(this.container, null, 2);
  }

  public get(): Record<string, unknown> {
    return this.container;
  }
}
