import { animate, style, transition, trigger } from '@angular/animations';

export const animateSlideEnterTiming = 200;
export const animateSlideVoidTiming = 10;

/**
 * Slide and fade in out animation.
 */
export const slideAndFadeInOut = trigger('slideAndFadeInOut', [
  transition(':enter', [
    style({
      transform: 'translateX(100%)',
      opacity: 0,
    }),
    animate(
      animateSlideEnterTiming,
      style({
        transform: 'translateX(0)',
        opacity: 1,
      }),
    ),
  ]),
  transition('* => void', [
    style({
      transform: 'translateX(100%)',
      opacity: 1,
    }),
    animate(
      animateSlideVoidTiming,
      style({
        transform: 'translateX(100%)',
        opacity: 0,
      }),
    ),
  ]),
]);
