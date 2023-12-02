/**
 * @title The log method decorator.
 * @description This log is mainly useful for development and should not be used in production.
 * @param enable Indicates whether to enable the logger or not.
 * @param propertyKey The class property key.
 */
export function logMethod<TargetClass extends object = Record<string, unknown>>(enable = true) {
  return function (targetClass: TargetClass, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod: (...args: any[]) => unknown = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const className = targetClass.constructor.name;
      const result = originalMethod.apply(this, args);
      if (enable) {
        console.log(`Executing: ${className}.${propertyKey}`, `\nArguments: ${JSON.stringify(args)}`, `\nResult: ${result}`);
      }
      return result;
    };
    return descriptor;
  };
}
