import * as fs from 'fs';
import * as path from 'path';

export class FileScanner {
  public static scanDirectory(directory: string, excludePatterns: RegExp[]): string[] {
    const result: string[] = [];
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        result.push(...FileScanner.scanDirectory(filePath, excludePatterns));
      } else if (
        file.endsWith('.ts') ||
        (file.endsWith('.tsx') && !excludePatterns.some((pattern) => filePath.match(pattern)))
      ) {
        result.push(filePath);
      }
    }

    return result;
  }
}
