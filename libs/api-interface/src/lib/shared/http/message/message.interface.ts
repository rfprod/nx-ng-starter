/**
 * Message interface with initialization.
 */
export class Message {
  public message = '';

  constructor(input?: Message) {
    if (typeof input !== 'undefined') {
      const keys = Object.keys(input);
      for (const key of keys) {
        this[key] = Boolean(input[key]) ? input[key] : this[key];
      }
    }
  }
}
