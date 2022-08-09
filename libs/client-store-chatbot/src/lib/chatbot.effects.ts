import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { chatbotActions } from './chatbot.actions';
import { IChatbotState } from './chatbot.interface';
import { chatbotSelectors } from './chatbot.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppChatbotEffects {
  public readonly open$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(chatbotActions.open.type),
        mergeMap(() => from(this.router.navigate([{ outlets: { chatbot: ['root'] } }]))),
      ),
    { dispatch: false },
  );

  public readonly close$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(chatbotActions.close.type),
        mergeMap(() => from(this.router.navigate([{ outlets: { chatbot: [] } }]))),
      ),
    { dispatch: false },
  );

  public readonly toggle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chatbotActions.toggle.type),
      withLatestFrom(this.store.select(chatbotSelectors.chatbotOpened)),
      map((action, chatbotOpened) => (chatbotOpened ? chatbotActions.close() : chatbotActions.open())),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly store: Store<IChatbotState>, private readonly router: Router) {}
}
