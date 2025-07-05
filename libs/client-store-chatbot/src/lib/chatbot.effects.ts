import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { chatbotAction } from './chatbot.actions';

@Injectable({
  providedIn: 'root',
})
export class AppChatbotEffects {
  private readonly actions$ = inject(Actions);

  private readonly router = inject(Router);

  public readonly open$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(chatbotAction.open.type),
        mergeMap(() => from(this.router.navigate([{ outlets: { chatbot: ['root'] } }]))),
      ),
    { dispatch: false },
  );

  public readonly close$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(chatbotAction.close.type),
        mergeMap(() => from(this.router.navigate([{ outlets: { chatbot: [] } }]))),
      ),
    { dispatch: false },
  );
}
