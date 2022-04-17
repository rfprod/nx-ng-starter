/**
 * Initializes a DTO class properties.
 * @param self initial class instance
 * @param input class instance property values
 */
export const initializeClassProperties = <T>(self: T, input?: T) => {
  if (typeof input !== 'undefined') {
    const keys = Object.keys(input);
    for (const key of keys) {
      self[key] = Boolean(input[key]) ? input[key] : self[key];
    }
  }
};
