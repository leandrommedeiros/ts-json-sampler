// yargs 18 is ESM-only; Jest can only require() ESM natively on Node >= 24.9.
export default (): never => {
  throw new Error('yargs is not available in unit tests');
};
export const hideBin = (argv: string[]): string[] => argv.slice(2);
