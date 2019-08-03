import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Fade in out animation.
 */
export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(
      200,
      style({
        opacity: 1
      })
    )
  ]),
  transition('* => void', [
    style({
      opacity: 1
    }),
    animate(
      10,
      style({
        opacity: 0
      })
    )
  ])
]);
