import { Inject, Injectable } from '@angular/core';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@app/client-util';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { featureAccessAction } from './feature-access.actions';

@Injectable({
  providedIn: 'root',
})
export class AppFeatureAccessEffects {
  public readonly action$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureAccessAction.initialize.type),
      map(() => featureAccessAction.setEnvironment({ payload: { production: this.env.production } })),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    @Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment,
  ) {}
}
