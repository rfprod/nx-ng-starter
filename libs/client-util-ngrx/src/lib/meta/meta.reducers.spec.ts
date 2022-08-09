import { storeLogger } from './logger.reducer';
import { metaReducers } from './meta.reducers';

describe('metaReducers', () => {
  it('dev setup, should include store logger', () => {
    const meta = metaReducers(false);
    expect(meta.length).toEqual(1);
    expect(meta[0]).toEqual(storeLogger);
  });

  it('prod setup, should not include store logger', () => {
    const meta = metaReducers(true);
    expect(meta.length).toEqual(0);
  });
});
