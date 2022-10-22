import { COLORS } from './colors';
import { logger } from './logger';

describe('logger', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    spy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    spy.mockClear();
  });

  it('printSuccess should call console.log with expected parameters, default title', () => {
    const payload = { property: 'value' };
    logger.printSuccess(payload);
    expect(spy).toHaveBeenCalledWith(`\n ✅ ${COLORS.GREEN}%s${COLORS.DEFAULT}:\n%s\n`, 'Success', payload);
  });

  it('printSuccess should call console.log with expected parameters, custom title', () => {
    const title = 'Title';
    const payload = { property: 'value' };
    logger.printSuccess(payload, title);
    expect(spy).toHaveBeenCalledWith(`\n ✅ ${COLORS.GREEN}%s${COLORS.DEFAULT}:\n%s\n`, title, payload);
  });

  it('printInfo should call console.log with expected parameters, default title', () => {
    const payload = { property: 'value' };
    logger.printInfo(payload);
    expect(spy).toHaveBeenCalledWith(`\n 💬 ${COLORS.YELLOW}%s${COLORS.DEFAULT}:\n%s\n`, 'Info', payload);
  });

  it('printInfo should call console.log with expected parameters, custom title', () => {
    const title = 'Title';
    const payload = { property: 'value' };
    logger.printInfo(payload, title);
    expect(spy).toHaveBeenCalledWith(`\n 💬 ${COLORS.YELLOW}%s${COLORS.DEFAULT}:\n%s\n`, title, payload);
  });

  it('printError should call console.log with expected parameters, default title', () => {
    const payload = new Error('test');
    logger.printError(payload);
    expect(spy).toHaveBeenCalledWith(`\n ❌ ${COLORS.RED}%s${COLORS.DEFAULT}:\n%s\n`, 'Error', payload.stack);
  });

  it('printError should call console.log with expected parameters, custom title', () => {
    const title = 'Title';
    const payload = new Error('test');
    logger.printError(payload, title);
    expect(spy).toHaveBeenCalledWith(`\n ❌ ${COLORS.RED}%s${COLORS.DEFAULT}:\n%s\n`, title, payload.stack);
  });
});
