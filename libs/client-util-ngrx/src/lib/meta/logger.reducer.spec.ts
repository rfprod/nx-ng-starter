import { ActionReducer } from '@ngrx/store';

import { storeLogger } from './logger.reducer';

describe('storeLogger', () => {
  const logSpy = jest.spyOn(console, 'log');

  it('should execute reducer function and call console.log twise', () => {
    const state = { test: 'test' };
    const reducer = jest.fn();
    const logger = storeLogger(reducer as ActionReducer<unknown>);
    const action = { type: 'test action' };
    logger(state as unknown, action);
    expect(reducer).toHaveBeenCalledWith(state, action);
    const expectedCalls = 2;
    expect(logSpy).toHaveBeenCalledTimes(expectedCalls);
    expect(logSpy).toHaveBeenNthCalledWith(1, 'state', state);
    expect(logSpy).toHaveBeenNthCalledWith(expectedCalls, 'action', action);
  });
});
