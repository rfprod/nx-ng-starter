import { IElisaPostTransform } from '../interfaces/eliza.interface';

/**
 * Post transform rules.
 *
 * Entries prestructured as layed out in Weizenbaum's description
 * [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]
 * Links:
 * - https://cacm.acm.org/
 * - https://dl.acm.org/doi/10.1145/365153.365168
 */
export const elizaPostTransforms: IElisaPostTransform[] = [
  { searchValue: / old old/g, replaceValue: ' old' },
  { searchValue: /\bthey were( not)? me\b/g, replaceValue: 'it was$1 me' },
  { searchValue: /\bthey are( not)? me\b/g, replaceValue: 'it is$1 me' },
  { searchValue: /Are they( always)? me\b/, replaceValue: 'it is$1 me' },
  { searchValue: /\bthat your( own)? (\w+)( now)? \?/, replaceValue: 'that you have your$1 $2 ?' },
  { searchValue: /\bI to have (\w+)/, replaceValue: 'I have $1' },
  { searchValue: /Earlier you said your( own)? (\w+)( now)?\./, replaceValue: 'Earlier you talked about your $2.' },
];
