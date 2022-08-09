import { MetaReducer } from '@ngrx/store';

import { storeLogger } from './logger.reducer';

export const metaReducers: (production: boolean) => MetaReducer[] = (production: boolean) => (production ? [] : [storeLogger]);
