import type { MockInstance } from 'vitest';

import { COLORS } from './colors';
import { logger } from './logger';

describe('logger', () => {
  let spy: MockInstance;

  beforeEach(() => {
    spy = vi.spyOn(process.stdout, 'write');
  });

  afterEach(() => {
    spy.mockClear();
  });

  it('printSuccess should call process.stdout.write with expected parameters, default title', () => {
    const payload = { property: 'value' };
    logger.printSuccess(payload);
    expect(spy).toHaveBeenCalledWith(`\n ✅ ${COLORS.GREEN}Success${COLORS.DEFAULT}:\n${payload}\n`);
  });

  it('printSuccess should call process.stdout.write with expected parameters, custom title', () => {
    const title = 'Title';
    const payload = { property: 'value' };
    logger.printSuccess(payload, title);
    expect(spy).toHaveBeenCalledWith(`\n ✅ ${COLORS.GREEN}${title}${COLORS.DEFAULT}:\n${payload}\n`);
  });

  it('printInfo should call process.stdout.write with expected parameters, default title', () => {
    const payload = { property: 'value' };
    logger.printInfo(payload);
    expect(spy).toHaveBeenCalledWith(`\n 💬 ${COLORS.YELLOW}Info${COLORS.DEFAULT}:\n${payload}\n`);
  });

  it('printInfo should call process.stdout.write with expected parameters, custom title', () => {
    const title = 'Title';
    const payload = { property: 'value' };
    logger.printInfo(payload, title);
    expect(spy).toHaveBeenCalledWith(`\n 💬 ${COLORS.YELLOW}${title}${COLORS.DEFAULT}:\n${payload}\n`);
  });

  it('printError should call process.stdout.write with expected parameters, default title', () => {
    const payload = new Error('test');
    logger.printError(payload);
    expect(spy).toHaveBeenCalledWith(`\n ❌ ${COLORS.RED}Error${COLORS.DEFAULT}:\n${payload.stack}\n`);
  });

  it('printError should call process.stdout.write with expected parameters, custom title', () => {
    const title = 'Title';
    const payload = new Error('test');
    logger.printError(payload, title);
    expect(spy).toHaveBeenCalledWith(`\n ❌ ${COLORS.RED}${title}${COLORS.DEFAULT}:\n${payload.stack}\n`);
  });
});
