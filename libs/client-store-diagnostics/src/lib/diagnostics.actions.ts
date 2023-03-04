import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { diagnosticsReducerConfig, IDiagnosticsStateModel, TDiagnosticData } from './diagnostics.interface';

const connect = createAction(actionType(diagnosticsReducerConfig.featureName, 'connect'));

const connected = createAction(
  actionType(diagnosticsReducerConfig.featureName, 'connected'),
  props<{ payload: Pick<IDiagnosticsStateModel, 'events'> }>(),
);

const startEvents = createAction(actionType(diagnosticsReducerConfig.featureName, 'start events'));

const stopEvents = createAction(actionType(diagnosticsReducerConfig.featureName, 'stop events'));

const staticData = createAction(actionType(diagnosticsReducerConfig.featureName, 'static data'));

const staticDataSuccess = createAction(
  actionType(diagnosticsReducerConfig.featureName, 'static data success'),
  props<{ payload: TDiagnosticData[] }>(),
);

const dynamicDataSuccess = createAction(
  actionType(diagnosticsReducerConfig.featureName, 'dynamic data success'),
  props<{ payload: TDiagnosticData[] }>(),
);

const userDataSuccess = createAction(actionType(diagnosticsReducerConfig.featureName, 'user data success'), props<{ payload: number }>());

export const diagnosticsActions = {
  connect,
  connected,
  startEvents,
  stopEvents,
  staticData,
  staticDataSuccess,
  dynamicDataSuccess,
  userDataSuccess,
};
