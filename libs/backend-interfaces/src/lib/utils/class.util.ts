/**
 * Initializes a DTO class properties.
 * @param self initial class instance
 * @param input class instance property values
 */
export const initializeClassProperties = <T = Record<string, unknown>>(self: T, input?: T) => {
  if (typeof input !== 'undefined') {
    const typedSelf = <Record<string, unknown>>self;
    const typedInput = <Record<string, unknown>>input;
    const keys = Object.keys(typedInput);
    for (const key of keys) {
      const inputValue = typedInput[key];
      typedSelf[key] = typeof inputValue !== 'undefined' && inputValue !== null ? typedInput[key] : typedSelf[key];
    }
  }
};
