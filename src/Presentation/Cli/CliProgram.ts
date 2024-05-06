import * as c from 'ansi-colors';
import * as fs from 'fs';
import * as ts from 'typescript';
import { FileScanner } from '../../Application/Service/Scanner/FileScanner';
import { TypeScanner } from '../../Application/Service/Scanner/TypeScanner';
import { InfoScanner } from '../../Application/Service/Scanner/InfoScanner';
import { TypeInfo } from '../../Domain/Entity/TypeInfo/TypeInfo';
import { SamplerService } from '../../Application/Service/SamplerService';
import { CliArguments } from './CliArguments';
import { FileWriter } from '../../Application/Service/Writer/FileWriter';

export class CliProgram {
  public static run(args: CliArguments): void {
    console.log(c.yellow(`\nScanning '${c.white(args.pathEntity)}'...`));
    const tsConfig = JSON.parse(fs.readFileSync(args.pathTsConfig, 'utf-8')) as unknown as ts.TypeAcquisition;
    const filteredFiles = FileScanner.scanDirectory(args.pathEntity, tsConfig.exclude as unknown as RegExp[]);

    // Create TypeScript program based on tsconfig.json
    const program = ts.createProgram({
      rootNames: filteredFiles,
      options: tsConfig,
    });

    const sourceFiles = filteredFiles
      .map((fileName) => program.getSourceFile(fileName))
      .filter((sourceFile) => sourceFile != undefined);
    console.log(` ↳ Found`, sourceFiles.length, 'source files!');

    // Generating samples
    const typesInfo = Object.entries(TypeScanner.extractTypes(args.pathAppRoot, sourceFiles)).map(
      ([typeName, typeNode]) => {
        return {
          name: typeName,
          properties: InfoScanner.extractInfo(program.getTypeChecker(), typeName, typeNode),
        } as TypeInfo;
      },
    );

    const samples = new SamplerService(typesInfo).generateForAll();

    // Exporting generated samples
    FileWriter.exportSamples(args.pathOutput, args.fixFilter, samples);
  }
}
