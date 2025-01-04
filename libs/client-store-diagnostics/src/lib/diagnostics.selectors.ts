import { createSelector } from '@ngrx/store';

import type { IDiagnosticsState, IDiagnosticsStateModel } from './diagnostics.interface';

const selectFeature = (state: IDiagnosticsState) => state.diagnostics;

export const diagnosticsSelector = {
  events: createSelector(selectFeature, (state: IDiagnosticsStateModel) => state.events),
  users: createSelector(selectFeature, (state: IDiagnosticsStateModel) => state.users),
  dynamicData: createSelector(selectFeature, (state: IDiagnosticsStateModel) => state.dynamicData),
  staticData: createSelector(selectFeature, (state: IDiagnosticsStateModel) => state.staticData),
};
