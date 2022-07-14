import { TElisaFinals } from '../interfaces/eliza.interface';

/**
 * Final expressions.
 *
 * Entries prestructured as layed out in Weizenbaum's description
 * [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]
 * Links:
 * - https://cacm.acm.org/
 * - https://dl.acm.org/doi/10.1145/365153.365168
 */
export const elizaFinals: TElisaFinals = [
  'Goodbye.  It was nice talking to you.',
  // additions (not original)
  'Goodbye.  This was really a nice talk.',
  "Goodbye.  I'm looking forward to our next session.",
  "This was a good session, wasn't it -- but time is over now.   Goodbye.",
  'Maybe we could discuss this moreover in our next session ?   Goodbye.',
];

/**
 * The default final message is used if no finals are configured.
 */
export const elizaFinalDefault = 'Bye.';
