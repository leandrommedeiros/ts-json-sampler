import {ScalarTypes} from "../../Constant/ScalarTypes";
import {JSDocTagInfo} from "typescript";

export class PropertyInfo {
  public readonly name: string;
  public readonly type: string;
  public readonly docTags: JSDocTagInfo[];
  public readonly sampleValue: string | null;
  public readonly isArray: boolean;
  public readonly isNullable: boolean;
  public readonly isUndefinable: boolean;
  public readonly isScalar: boolean;
  public readonly isFloat: boolean;
  public readonly hasSampleValue: boolean;

  constructor(name: string, type?: string, docTags?: JSDocTagInfo[]) {
    this.name = name.replace('?', '');
    this.type = (type ?? 'unknown').replace('[]', '').split('|')[0].trim();
    this.docTags = docTags ?? [];
    this.sampleValue = PropertyInfo.getSampleValue(this.docTags);
    this.hasSampleValue = this.sampleValue != null;
    this.isArray = type?.endsWith('[]') ?? false;
    this.isNullable = type?.includes('null') ?? false;
    this.isUndefinable = name.endsWith('?') ?? false;
    this.isFloat = PropertyInfo.isFloat(this.docTags);
    this.isScalar = Object.values(ScalarTypes).includes((this.type) as ScalarTypes);
  }

  public static isFloat(docTags: JSDocTagInfo[]): boolean {
    for (const tag of docTags)
      if (tag.name == 'float') return true;

    return false;
  }

  public static getSampleValue(docTags: JSDocTagInfo[]): string | null {
    for (const tag of docTags)
      if (tag.name == 'sampleValue')
        return tag.text?.at(0)?.text ?? null;

    return null;
  }
}
