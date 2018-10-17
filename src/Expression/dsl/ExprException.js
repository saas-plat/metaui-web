export default class ExprException {
  message;

  constructor(message) {
    this.message = message;
  }

  toString() {
    return this.message;
  }
}
