import { ECOUNTER } from '../interfaces';

export function generateEmptyArray(length: ECOUNTER | number) {
  return [...new Array(length)];
}
