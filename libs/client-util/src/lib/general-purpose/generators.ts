import { COUNTER } from './enums';

export function generateEmptyArray(length: COUNTER | number) {
  return [...new Array(length)];
}
