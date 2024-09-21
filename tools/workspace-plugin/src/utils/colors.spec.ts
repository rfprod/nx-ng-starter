import { COLORS } from './colors';

describe('COLORS', () => {
  it('should have expected DEFAULT color', () => {
    expect(COLORS.DEFAULT).toEqual('\x1b[0m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.DEFAULT}%s${COLORS.DEFAULT}`, 'DEFAULT');
  });

  it('should have expected GRAY tones', () => {
    expect(COLORS.GRAY).toEqual('\x1b[0;30m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.GRAY}%s${COLORS.GRAY}`, 'GRAY');

    expect(COLORS.LIGHT_GRAY).toEqual('\x1b[1;30m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.LIGHT_GRAY}%s${COLORS.LIGHT_GRAY}`, 'LIGHT_GRAY');
  });

  it('should have expected RED tones', () => {
    expect(COLORS.RED).toEqual('\x1b[0;31m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.RED}%s${COLORS.RED}`, 'RED');

    expect(COLORS.LIGHT_RED).toEqual('\x1b[1;31m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.LIGHT_RED}%s${COLORS.LIGHT_RED}`, 'LIGHT_RED');
  });

  it('should have expected GREEN tones', () => {
    expect(COLORS.GREEN).toEqual('\x1b[0;32m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.GREEN}%s${COLORS.GREEN}`, 'GREEN');

    expect(COLORS.LIGHT_GREEN).toEqual('\x1b[1;32m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.LIGHT_GREEN}%s${COLORS.LIGHT_GREEN}`, 'LIGHT_GREEN');
  });

  it('should have expected YELLOW tones', () => {
    expect(COLORS.YELLOW).toEqual('\x1b[0;33m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.YELLOW}%s${COLORS.YELLOW}`, 'YELLOW');

    expect(COLORS.LIGHT_YELLOW).toEqual('\x1b[1;33m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.LIGHT_YELLOW}%s${COLORS.LIGHT_YELLOW}`, 'LIGHT_YELLOW');
  });

  it('should have expected BLUE tones', () => {
    expect(COLORS.BLUE).toEqual('\x1b[0;34m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.BLUE}%s${COLORS.BLUE}`, 'BLUE');

    expect(COLORS.LIGHT_BLUE).toEqual('\x1b[1;34m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.LIGHT_BLUE}%s${COLORS.LIGHT_BLUE}`, 'LIGHT_BLUE');
  });

  it('should have expected PURPLE tones', () => {
    expect(COLORS.PURPLE).toEqual('\x1b[0;35m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.PURPLE}%s${COLORS.PURPLE}`, 'PURPLE');

    expect(COLORS.LIGHT_PURPLE).toEqual('\x1b[1;35m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.LIGHT_PURPLE}%s${COLORS.LIGHT_PURPLE}`, 'LIGHT_PURPLE');
  });

  it('should have expected CYAN tones', () => {
    expect(COLORS.CYAN).toEqual('\x1b[0;36m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.CYAN}%s${COLORS.CYAN}`, 'CYAN');

    expect(COLORS.LIGHT_CYAN).toEqual('\x1b[1;36m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.LIGHT_CYAN}%s${COLORS.LIGHT_CYAN}`, 'LIGHT_CYAN');
  });

  it('should have expected WHITE tones', () => {
    expect(COLORS.WHITE).toEqual('\x1b[0;37m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.WHITE}%s${COLORS.WHITE}`, 'WHITE');

    expect(COLORS.LIGHT_WHITE).toEqual('\x1b[1;37m');
    // eslint-disable-next-line no-console -- visual test
    console.log(`${COLORS.LIGHT_WHITE}%s${COLORS.LIGHT_WHITE}`, 'LIGHT_WHITE');
  });
});
