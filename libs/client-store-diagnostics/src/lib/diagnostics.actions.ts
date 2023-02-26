import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { featureName, IDiagnosticsStateModel, TDiagnosticData } from './diagnostics.interface';

const connect = createAction(actionType(featureName, 'connect'));

const connected = createAction(actionType(featureName, 'connected'), props<{ payload: Pick<IDiagnosticsStateModel, 'events'> }>());

const startEvents = createAction(actionType(featureName, 'start events'));

const stopEvents = createAction(actionType(featureName, 'stop events'));

const staticData = createAction(actionType(featureName, 'static data'));

const staticDataSuccess = createAction(actionType(featureName, 'static data success'), props<{ payload: TDiagnosticData[] }>());

const dynamicDataSuccess = createAction(actionType(featureName, 'dynamic data success'), props<{ payload: TDiagnosticData[] }>());

const userDataSuccess = createAction(actionType(featureName, 'user data success'), props<{ payload: number }>());

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
