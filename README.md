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

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./docs/Contributing.md) to get started.

## License

This project is licensed under the BSD 2-Clause License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

Special thanks to all contributors and the open-source community for their support.
