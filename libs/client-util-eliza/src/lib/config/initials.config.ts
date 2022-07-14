import { TElisaInitials } from '../interfaces/eliza.interface';

/**
 * Initial expressions.
 *
 * Entries prestructured as layed out in Weizenbaum's description
 * [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]
 * Links:
 * - https://cacm.acm.org/
 * - https://dl.acm.org/doi/10.1145/365153.365168
 */
export const elizaInitials: TElisaInitials = [
  'How do you do. Please tell me your problem.',
  // additions (not original)
  "Please tell me what's been bothering you.",
  'Is something troubling you ?',
];

/**
 * The default initial message is used if no initials are configured.
 */
export const elizaInitialDefault = 'Hello.';
