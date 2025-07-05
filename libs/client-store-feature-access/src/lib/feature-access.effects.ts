import { inject, Injectable } from '@angular/core';
import { WEB_CLIENT_APP_ENV } from '@app/client-util';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { featureAccessAction } from './feature-access.actions';

@Injectable({
  providedIn: 'root',
})
export class AppFeatureAccessEffects {
  private readonly actions$ = inject(Actions);

  private readonly env = inject(WEB_CLIENT_APP_ENV);

  public readonly action$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureAccessAction.initialize.type),
      map(() => featureAccessAction.setEnvironment({ payload: { production: this.env.production } })),
    ),
  );
}
