/**
 * Message interface with initialization.
 */
export class Message {
  public message = '';
  constructor(input?: Message) {
    if (input) {
      this.message = input.message;
    }
  }
}
