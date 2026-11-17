# ts-json-sampler

[![npm version](https://badge.fury.io/js/%40leandrommedeiros%2Fts-json-sampler.svg)](https://badge.fury.io/js/%40leandrommedeiros%2Fts-json-sampler)
[![License: BSD 2-Clause](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

`ts-json-sampler` is a TypeScript library and CLI tool that generates sample JSON for selected types. It is designed to be used both as a command-line tool and as a library in TypeScript/JavaScript projects.

## Features

- Generate sample JSON for TypeScript types.
- Use as a CLI tool or integrate into your TypeScript/JavaScript projects.
- Supports custom type definitions and configurations.

## Installation

You can install `ts-json-sampler` via npm:

```bash
npm install -g @leandrommedeiros/ts-json-sampler
```

## Usage

### CLI

To use `ts-json-sampler` as a CLI tool, run:

```bash
ts-json-sampler --entity-path <path> --root-app-path <path> --tsconfig-path <path> --output-path <path>
```

### Library

To use `ts-json-sampler` in your TypeScript/JavaScript project:

```typescript
import { SamplerService } from '@leandrommedeiros/ts-json-sampler';

// Example usage
const samplerService = new SamplerService(inputTypes);
const samples = samplerService.generateForAll();
console.log(samples);
```

## Configuration

For detailed configuration options, refer to the [Configuration Guide](./docs/Configuration.md).

## Release Notes

### 1.0.2

First stable release. Versions `1.0.0` and `1.0.1` were published early and later unpublished, so npm doesn't allow those version numbers to be reused.

**Breaking changes**

- Requires Node.js `^20.19.0 || ^22.12.0 || >=24.0.0` (Node 18 is no longer supported).
- `typescript` (6.x) is now a runtime dependency instead of a dev dependency. TypeScript 7 is not supported, as it no longer provides the compiler API this package relies on.
- The package entry point no longer re-exports the CLI module, so importing the library no longer runs the CLI.

**Changes**

- Upgraded dependencies, including `yargs` 18, `lodash` 4.18, Jest 30, ESLint 9 (flat config) and typescript-eslint 8.
- Replaced the deprecated `pkg` with `@yao-pkg/pkg` (packaging requires Node 22+).
- Fixed the test setup (ts-jest) and outdated unit tests.
- Added CI running lint, build and tests on Node 20, 22 and 24.

### 0.0.8

- Union-type properties (for example `string | null`) are now included in samples, using the first type of the union.
- Sample files are written explicitly as UTF-8, overwriting existing files.
- Renamed the `format` script to `lint:fix`.

### 0.0.7

- Fixed `--fix-filter` being treated as a path: the value is now used as-is to strip text from output file names.

### 0.0.6

- The output directory is now created recursively, so nested output paths that don't exist yet work.
- Added the `publish:public` script.

### 0.0.5

- Fixed nested complex types being written with an internal wrapper object instead of their plain sample values.

### 0.0.4

- Fixed sample files containing an internal `container` wrapper; files now hold only the sample JSON.
- README usage updated to the kebab-case CLI options.

### 0.0.3

- Fixed the package being declared as an ES module (`"type": "module"`) while shipping CommonJS output.
- Documentation updated to the actual CLI options: `--entity-path`, `--root-app-path`, `--tsconfig-path` and `--output-path`.

### 0.0.2

Initial public release.

- CLI (`ts-json-sampler`) and library (`SamplerService`, scanners and writer) for generating sample JSON from TypeScript types.
- Supports `string`, `number` and `boolean` scalars, arrays, and nested types.
- JSDoc tags: `@sampleValue` sets a fixed value and `@float` marks a number as a float.
- One `<type_name>.sample.json` file per type, with `--fix-filter` to strip text from file names.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./docs/Contributing.md) to get started.

## License

This project is licensed under the BSD 2-Clause License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

Special thanks to all contributors and the open-source community for their support.
