import { OutputSample } from '../../../Domain/Entity/OutputSample';
import * as c from 'ansi-colors';
import * as fs from 'node:fs';

export class FileWriter {
  public static exportSamples(targetPath: string, fixFilter: string, samples: Record<string, OutputSample>): void {
    console.log(c.green(`\nExporting:`));

    for (const [typeName, sample] of Object.entries(samples)) {
      const outputFileName = FileWriter.getFileNameForType(typeName, fixFilter);
      FileWriter.writeToFile(targetPath, outputFileName, sample);
      console.log(` ↳ Sample for type '${c.cyan(typeName)}' exported to '${c.green(outputFileName)}'`);
    }
  }

  private static writeToFile(targetPath: string, outputFileName: string, sample: OutputSample): void {
    try {
      fs.mkdirSync(targetPath, { recursive: true });
      fs.writeFileSync(`${targetPath}/${outputFileName}`, sample.toString(), {encoding:'utf8',flag:'w'});
    } catch (error) {
      console.log(c.red(`Error exporting sample to ${outputFileName}`));
      console.error(error);
    }
  }

  private static getFileNameForType(typeName: string, fixFilter: string): string {
    return typeName
      .replace(fixFilter, '')
      .split(/\.?(?=[A-Z])/)
      .join('_')
      .toLowerCase()
      .concat('.sample.json');
  }
}
