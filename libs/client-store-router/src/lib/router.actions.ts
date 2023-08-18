import { NavigationExtras } from '@angular/router';
import { TRouterCommands } from '@app/client-util';
import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { featureName } from './router.interface';

export const routerAction = {
  navigate: createAction(
    actionType(featureName, 'navigate'),
    props<{
      payload: {
        path: TRouterCommands;
        query?: Record<string, unknown>;
        extras?: NavigationExtras;
      };
    }>(),
  ),
  back: createAction(actionType(featureName, 'back')),
  forward: createAction(actionType(featureName, 'forward')),
};
