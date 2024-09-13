export class ErrorHandler extends Error {
  constructor(message, statusCode, success = false) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.success = success;
  }
}
