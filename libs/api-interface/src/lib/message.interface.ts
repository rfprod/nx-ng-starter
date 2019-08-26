/**
 * Message interface with initialization.
 */
export class Message {
  constructor(input?: Message) {
    if (input) {
      this.message = input.message;
    }
  }
  message: string = '';
}
