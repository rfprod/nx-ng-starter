/**
 * Generates a configuration object based on a defaut configuration and an options object.
 * @param config the default object with all properties
 * @param options the input object
 * @param result the output object
 */
export const generateConfiguration = <T>(
  config: T,
  options: Partial<T & Record<string, unknown>> | undefined,
  result: Record<string, unknown>,
) => {
  const defaultConfiguration = config as Record<string, unknown>;

  if (typeof options === 'undefined') {
    return config;
  }
  const keys = Object.keys(defaultConfiguration);
  for (const key of keys) {
    const defaultValue = defaultConfiguration[key];
    const value = options[key];
    const typedKey: keyof typeof defaultConfiguration = key;
    if (typeof defaultValue === 'string' || typeof defaultValue === 'number' || typeof defaultValue === 'boolean') {
      result[typedKey] = typeof value !== 'undefined' ? value : defaultValue;
    } else if (defaultValue instanceof Function) {
      result[typedKey] = defaultValue;
    } else if (typeof defaultValue === 'object' && defaultValue !== null) {
      const nestedDefaultObject = defaultValue as Record<string, unknown>;
      const nestedObject = value as Record<string, unknown>;
      result[typedKey] = generateConfiguration(nestedDefaultObject, nestedObject, {});
    }
  }
  return result as T;
};
