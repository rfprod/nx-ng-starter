import { COUNTER } from '../interfaces';

export function generateEmptyArray(length: COUNTER | number) {
  return [...new Array(length)];
}
