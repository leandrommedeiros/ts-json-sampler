# Configuration Guide

This guide provides detailed information on how to configure `ts-json-sampler` for your specific needs.

## CLI Options

- `--entity-path`: Path to the entity files.
- `--root-app-path`: Path to the application root.
- `--tsconfig-path`: Path to the TypeScript configuration file.
- `--output-path`: Path where the output JSON files will be saved.

## Library Configuration

When using `ts-json-sampler` as a library, you can configure it by passing options to the `SamplerService` constructor.

```typescript
import { SamplerService } from '@leandrommedeiros/ts-json-sampler';

const samplerService = new SamplerService(inputTypes);
```

For more advanced configurations, refer to the API documentation.

