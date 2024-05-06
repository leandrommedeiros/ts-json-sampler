#!/usr/bin/env node

import { CliArguments } from './Presentation/Cli/CliArguments';
import { CliProgram } from './Presentation/Cli/CliProgram';

const cliArguments = CliArguments.parse();

CliProgram.run(cliArguments);
