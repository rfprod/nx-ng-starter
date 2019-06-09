import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Slide and fade in out animation.
 */
export const slideAndFadeInOut = trigger('slideAndFadeInOut', [
  transition(':enter', [
    style({
      transform: 'translateX(100%)',
      opacity: 0
    }),
    animate(
      200,
      style({
        transform: 'translateX(0)',
        opacity: 1
      })
    )
  ]),
  transition('* => void', [
    style({
      transform: 'translateX(100%)',
      opacity: 1
    }),
    animate(
      10,
      style({
        transform: 'translateX(100%)',
        opacity: 0
      })
    )
  ])
]);
