import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';
import * as c from 'ansi-colors';
import {hideBin} from "yargs/helpers";
import {InvalidPathArgumentError} from "./Error/InvalidPathArgumentError";

export class CliArguments {
  public readonly pathEntity: string;
  public readonly pathAppRoot: string;
  public readonly pathTsConfig: string;
  public readonly pathOutput: string;
  public readonly fixFilter: string;

  constructor(scriptLocation: string, pathAppRoot: string, pathEntity: string, pathTsConfig: string, pathOutput: string, fixFilter: string) {
    this.pathAppRoot = path.isAbsolute(pathAppRoot) ? pathAppRoot : path.resolve(scriptLocation, pathAppRoot);
    this.pathEntity = path.isAbsolute(pathEntity) ? pathEntity : path.join(this.pathAppRoot, pathEntity);
    this.pathTsConfig = path.isAbsolute(pathTsConfig) ? pathTsConfig : path.join(this.pathAppRoot, pathTsConfig);
    this.pathOutput = path.isAbsolute(pathOutput) ? pathOutput : path.join(this.pathAppRoot, pathOutput);
    this.fixFilter = path.isAbsolute(fixFilter) ? fixFilter : path.join(this.pathAppRoot, fixFilter);

    if (!fs.existsSync(this.pathEntity)) throw new InvalidPathArgumentError('Entity path does not exist');
    if (!fs.existsSync(this.pathAppRoot)) throw new InvalidPathArgumentError('App Root path does not exist');
    if (!fs.existsSync(this.pathTsConfig)) throw new InvalidPathArgumentError('TS Config file does not exist');
    if (!fs.existsSync(this.pathOutput)) fs.mkdirSync(this.pathOutput);
  }

  public static parse(): CliArguments {
    const scriptLocation = path.dirname(path.dirname(process.argv[1]));

    const parsedArguments = yargs(hideBin(process.argv))
      .command(c.yellow('generate'), 'Produces JSON samples based on TypeScript type definitions')
      .option('entity-path', {
        alias: 'e',
        describe: c.green('Relative path to where the TypeScript entities are defined'),
        type: 'string',
        demandOption: true
      })
      .option('root-app-path', {
        alias: 'r',
        describe: c.green(`Application's root folder`),
        type: 'string',
        default: scriptLocation
      })
      .option('tsconfig-path', {
        alias: 't',
        describe: c.green(`Application's tsconfig path`),
        type: 'string',
        default: './tsconfig.json'
      })
      .option('output-path', {
        alias: 'o',
        describe: c.green('Desired location for the generated samples'),
        type: 'string',
        default: './ts-json-sampler-output/'
      })
      .option('fix-filter', {
        alias: 'f',
        describe: c.green('Values passed here will be removed from the output file name (pre/in/suffix)'),
        type: 'string',
        default: ''
      })
      .help()
      .wrap(null)
      .argv as unknown as Record<string, string | undefined>;

    return new CliArguments(
      scriptLocation,
      parsedArguments.rootAppPath as string,
      parsedArguments.entityPath as string,
      parsedArguments.tsconfigPath as string,
      parsedArguments.outputPath as string,
      parsedArguments.fixFilter as string,
    );
  }
}
