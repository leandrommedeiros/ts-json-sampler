export type MyScalarCollectionType = {
  /**
   * Description for the text property
   * @sampleValue Random value for the text property
   */
  textProperty: string;
  /**
   * Description for the integer property
   * @sampleValue 500
   */
  integerProperty: number;
  /**
   * Description for the float property
   * @sampleValue 2.5
   */
  floatProperty: number;
  /**
   * Description for the float property
   * @float
   */
  otherNumber: number;
  /**
   * Description for the flag property
   */
  flagProperty: boolean;
};

export type MyComplexType = {
  complexChild: MyScalarCollectionType;
  children: MyScalarCollectionType[];
  descriptions: string[];
  counter?: number;
  nullableValue: string | null;
};

export type MyComplexTypes = Record<string, MyComplexType>;
