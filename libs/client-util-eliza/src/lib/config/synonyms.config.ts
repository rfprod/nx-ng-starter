import { TElisaSynonyms } from '../interfaces/eliza.interface';

/**
 * Synonyms mapping.
 *
 * Entries prestructured as layed out in Weizenbaum's description
 * [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]
 * Links:
 * - https://cacm.acm.org/
 * - https://dl.acm.org/doi/10.1145/365153.365168
 */
export const elizaSynonyms: TElisaSynonyms = {
  be: ['am', 'is', 'are', 'was'],
  belief: ['feel', 'think', 'believe', 'wish'],
  cannot: ["can't"],
  desire: ['want', 'need'],
  everyone: ['everybody', 'nobody', 'noone'],
  family: ['mother', 'mom', 'father', 'dad', 'sister', 'brother', 'wife', 'children', 'child'],
  happy: ['elated', 'glad', 'better'],
  sad: ['unhappy', 'depressed', 'sick'],
};
