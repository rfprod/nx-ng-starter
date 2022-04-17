import { initializeClassProperties } from '../utils/class.util';

export interface IMessage {
  message: string;
}

/**
 * Mostly used for diagnostics, e.g. for the ping endpoints.
 */
export class Message implements IMessage {
  public message = '';

  constructor(input?: Message) {
    initializeClassProperties<Message>(this, input);
  }
}
