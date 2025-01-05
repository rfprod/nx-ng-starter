import type { OnChanges, SimpleChanges } from '@angular/core';

/**
 * The track changes decorator.
 * @param key class member name
 * @param methodName change handler
 */
export function trackChanges<TargetClass = Record<string, unknown>, Value = unknown, Method = (value: Value) => void>(
  key: string,
  methodName: string,
) {
  return function (targetClass: TargetClass, functionName: 'ngOnChanges', descriptor: PropertyDescriptor) {
    const source: OnChanges[typeof functionName] = descriptor.value;

    descriptor.value = function (changes: SimpleChanges) {
      const currentValue: Value | null = changes[key]?.currentValue ?? null;
      const method: Method | undefined = (targetClass as Record<string, Method | undefined>)[methodName];
      if (typeof changes[key] !== 'undefined' && currentValue !== null && typeof method === 'function') {
        method.call(this, currentValue);
      }

      return source.call(this, changes);
    };

    return descriptor;
  };
}
