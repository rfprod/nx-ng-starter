import { NavigationExtras } from '@angular/router';
import { TRouterCommands } from '@app/client-util';
import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { featureName } from './router.interface';

const navigate = createAction(
  actionType(featureName, 'navigate'),
  props<{
    payload: {
      path: TRouterCommands;
      query?: Record<string, unknown>;
      extras?: NavigationExtras;
    };
  }>(),
);

const back = createAction(actionType(featureName, 'back'));

const forward = createAction(actionType(featureName, 'forward'));

export const routerActions = {
  navigate,
  back,
  forward,
};
