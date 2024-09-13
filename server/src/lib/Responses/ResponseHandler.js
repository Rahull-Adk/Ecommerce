export class ResponseHandler {
  constructor(data, message, statusCode, success = true) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.success = success;
  }
}
