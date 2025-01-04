import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { diagnosticsReducerConfig, type IDiagnosticsStateModel, type TDiagnosticData } from './diagnostics.interface';

export const diagnosticsAction = {
  connect: createAction(actionType(diagnosticsReducerConfig.featureName, 'connect')),
  connected: createAction(
    actionType(diagnosticsReducerConfig.featureName, 'connected'),
    props<{ payload: Pick<IDiagnosticsStateModel, 'events'> }>(),
  ),
  startEvents: createAction(actionType(diagnosticsReducerConfig.featureName, 'start events')),
  stopEvents: createAction(actionType(diagnosticsReducerConfig.featureName, 'stop events')),
  staticData: createAction(actionType(diagnosticsReducerConfig.featureName, 'static data')),
  staticDataSuccess: createAction(
    actionType(diagnosticsReducerConfig.featureName, 'static data success'),
    props<{ payload: TDiagnosticData[] }>(),
  ),
  dynamicDataSuccess: createAction(
    actionType(diagnosticsReducerConfig.featureName, 'dynamic data success'),
    props<{ payload: TDiagnosticData[] }>(),
  ),
  userDataSuccess: createAction(actionType(diagnosticsReducerConfig.featureName, 'user data success'), props<{ payload: number }>()),
};
