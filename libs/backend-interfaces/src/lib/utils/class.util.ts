/**
 * Initializes a DTO class properties.
 * @param self initial class instance
 * @param input class instance property values
 */
export const initializeClassProperties = <T>(self: T, input?: T) => {
  if (typeof input !== 'undefined') {
    const keys = Object.keys(<Record<string, unknown>>input);
    for (const key of keys) {
      const inputValue = input[key];
      self[key] = typeof inputValue !== 'undefined' && inputValue !== null ? inputValue : self[key];
    }
  }
};
