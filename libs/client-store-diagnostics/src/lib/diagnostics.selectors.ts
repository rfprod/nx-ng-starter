import { createSelector } from '@ngrx/store';

import { IDiagnosticsState, IDiagnosticsStateModel } from './diagnostics.interface';

const selectFeature = (state: IDiagnosticsState) => state.diagnostics;

const events = createSelector(selectFeature, (state: IDiagnosticsStateModel) => state.events);
const users = createSelector(selectFeature, (state: IDiagnosticsStateModel) => state.users);
const dynamicData = createSelector(selectFeature, (state: IDiagnosticsStateModel) => state.dynamicData);
const staticData = createSelector(selectFeature, (state: IDiagnosticsStateModel) => state.staticData);

export const diagnosticsSelectors = {
  events,
  users,
  dynamicData,
  staticData,
};
