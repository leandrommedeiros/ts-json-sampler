import * as ts from 'typescript';
import * as c from 'ansi-colors';
import * as _ from 'lodash';

const syntaxKindFilter: ts.SyntaxKind[] = [
  ts.SyntaxKind.TypeAliasDeclaration,
  // ts.SyntaxKind.TypeLiteral,
];

export class TypeScanner {
  private static processNode(result: Record<string, ts.Node>, node: ts.Node, sourceFileText: string): void {
    if (syntaxKindFilter.includes(node.kind)) {
      const pos = parseInt(_.get(node, 'name.pos') ?? '0');
      const end = parseInt(_.get(node, 'name.end') ?? sourceFileText.length.toString());
      const typeName = sourceFileText.substring(pos, end).trim();
      console.log(` ↳ Adding '${c.blue(typeName)}' to the list of exported types`);
      result[typeName] = node;
    }

    ts.forEachChild(node, (child) => TypeScanner.processNode(result, child, sourceFileText));
  }

  public static extractTypes(rootDir: string, sourceFiles: (ts.SourceFile | undefined)[]): Record<string, ts.Node> {
    const result: Record<string, ts.Node> = {};

    sourceFiles
      .map((sourceFile) => {
        if (!sourceFile || !sourceFile.text) return null;

        console.log(c.yellow('\nReading file'), sourceFile?.fileName.replace(rootDir, ''));

        return TypeScanner.processNode(result, sourceFile, sourceFile.text);
      })
      .filter((x) => x != null);

    return result;
  }
}
