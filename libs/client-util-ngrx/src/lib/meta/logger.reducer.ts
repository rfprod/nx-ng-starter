import { ActionReducer } from '@ngrx/store';

/**
 * Store logger.
 * @param reducer
 */
export function storeLogger(reducer: ActionReducer<unknown>): ActionReducer<unknown> {
  return function (state, action) {
    console.log('state', state);

    console.log('action', action);

    return reducer(state, action);
  };
}
