export class InvalidPathArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.message = InvalidPathArgumentError.name;
  }
}
