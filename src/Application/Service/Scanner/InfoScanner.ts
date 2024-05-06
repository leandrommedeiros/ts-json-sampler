import * as ts from 'typescript';
import * as c from 'ansi-colors';
import { PropertyInfo } from '../../../Domain/Entity/TypeInfo/PropertyInfo';

const declarationKindFilter = [
  ts.SyntaxKind.TypeReference,
  /* Copied from ts.KeywordTypeSyntaxKind: */
  ts.SyntaxKind.AnyKeyword,
  ts.SyntaxKind.BigIntKeyword,
  ts.SyntaxKind.BooleanKeyword,
  ts.SyntaxKind.IntrinsicKeyword,
  ts.SyntaxKind.NeverKeyword,
  ts.SyntaxKind.NumberKeyword,
  ts.SyntaxKind.ObjectKeyword,
  ts.SyntaxKind.StringKeyword,
  ts.SyntaxKind.UndefinedKeyword,
  ts.SyntaxKind.UnknownKeyword,
  ts.SyntaxKind.ArrayType,
  // ts.SyntaxKind.SymbolKeyword,
  // ts.SyntaxKind.VoidKeyword,
  // ts.SyntaxKind.DateKeyword,
];

export class InfoScanner {
  public static extractInfo(typeChecker: ts.TypeChecker, typeName: string, typeNode: ts.Node): PropertyInfo[] {
    const type = typeChecker.getTypeAtLocation(typeNode);

    if (!type) {
      console.log(`Type '${typeName}' not found in the TS Program`);
      return [];
    }

    console.log(c.yellow(`\nProcessing Type '${c.white(typeName)}'...`));

    return type.getProperties().map((symbol): PropertyInfo => {
      const result = new PropertyInfo(
        symbol.getEscapedName() ?? 'unknown',
        symbol
          .getDeclarations()
          ?.filter((x) => x.kind === ts.SyntaxKind.PropertySignature)
          .map((x) =>
            x
              .getChildren()
              .filter((y) => declarationKindFilter.includes(y.kind))
              .map((z) => z.getText()),
          )
          .flat()[0],
        symbol.getJsDocTags(),
      );

      console.log(` ↳ Found property '${c.blue(result.name)}' of type ${c.cyan(result.type)}`);
      console.log(
        `    (nullable: ${result.isNullable ? c.green.bold('Y') : c.magenta.bold('N')}, array: ${result.isArray ? c.green.bold('Y') : c.magenta.bold('N')}, with sample value: ${result.hasSampleValue ? c.green.bold('Y') : c.magenta.bold('N')})\n`,
      );

      return result;
    });
  }
}
