import { animate, style, transition, trigger } from '@angular/animations';

export const animateFadeEnterTiming = 200;
export const animateFadeVoidTiming = 10;

/**
 * Fade in out animation.
 */
export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(
      animateFadeEnterTiming,
      style({
        opacity: 1,
      }),
    ),
  ]),
  transition('* => void', [
    style({
      opacity: 1,
    }),
    animate(
      animateFadeVoidTiming,
      style({
        opacity: 0,
      }),
    ),
  ]),
]);
