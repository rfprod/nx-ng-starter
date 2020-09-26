import { OnChanges, SimpleChanges } from '@angular/core';

export function trackChanges<TargetClass, Value, Method = (value: Value) => void>(
  key: string,
  methodName: string,
) {
  return function (
    targetClass: TargetClass,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _functionName: 'ngOnChanges',
    descriptor: PropertyDescriptor,
  ) {
    const source: OnChanges['ngOnChanges'] = descriptor.value;

    descriptor.value = function (changes: SimpleChanges) {
      const currentValue: Value | undefined | null = changes[key]?.currentValue;
      const method: Method | undefined = targetClass[methodName];
      if (
        typeof changes[key] !== 'undefined' &&
        typeof currentValue !== 'undefined' &&
        currentValue !== null &&
        typeof method === 'function'
      ) {
        method.call(this, currentValue);
      }

      return source.call(this, changes);
    };

    return descriptor;
  };
}
