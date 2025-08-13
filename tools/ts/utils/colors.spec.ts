import { COLORS } from './colors';

describe('COLORS', () => {
  it('should have expected DEFAULT color', () => {
    expect(COLORS.DEFAULT).toEqual('\x1b[0m');
    process.stdout.write(`${COLORS.DEFAULT}DEFAULT${COLORS.DEFAULT}`);
  });

  it('should have expected GRAY tones', () => {
    expect(COLORS.GRAY).toEqual('\x1b[0;30m');
    process.stdout.write(`${COLORS.GRAY}GRAY${COLORS.GRAY}`);

    expect(COLORS.LIGHT_GRAY).toEqual('\x1b[1;30m');
    process.stdout.write(`${COLORS.LIGHT_GRAY}LIGHT_GRAY${COLORS.LIGHT_GRAY}`);
  });

  it('should have expected RED tones', () => {
    expect(COLORS.RED).toEqual('\x1b[0;31m');
    process.stdout.write(`${COLORS.RED}RED${COLORS.RED}`);

    expect(COLORS.LIGHT_RED).toEqual('\x1b[1;31m');
    process.stdout.write(`${COLORS.LIGHT_RED}LIGHT_RED${COLORS.LIGHT_RED}`);
  });

  it('should have expected GREEN tones', () => {
    expect(COLORS.GREEN).toEqual('\x1b[0;32m');
    process.stdout.write(`${COLORS.GREEN}GREEN${COLORS.GREEN}`);

    expect(COLORS.LIGHT_GREEN).toEqual('\x1b[1;32m');
    process.stdout.write(`${COLORS.LIGHT_GREEN}LIGHT_GREEN${COLORS.LIGHT_GREEN}`);
  });

  it('should have expected YELLOW tones', () => {
    expect(COLORS.YELLOW).toEqual('\x1b[0;33m');
    process.stdout.write(`${COLORS.YELLOW}YELLOW${COLORS.YELLOW}`);

    expect(COLORS.LIGHT_YELLOW).toEqual('\x1b[1;33m');
    process.stdout.write(`${COLORS.LIGHT_YELLOW}LIGHT_YELLOW${COLORS.LIGHT_YELLOW}`);
  });

  it('should have expected BLUE tones', () => {
    expect(COLORS.BLUE).toEqual('\x1b[0;34m');
    process.stdout.write(`${COLORS.BLUE}BLUE${COLORS.BLUE}`);

    expect(COLORS.LIGHT_BLUE).toEqual('\x1b[1;34m');
    process.stdout.write(`${COLORS.LIGHT_BLUE}LIGHT_BLUE${COLORS.LIGHT_BLUE}`);
  });

  it('should have expected PURPLE tones', () => {
    expect(COLORS.PURPLE).toEqual('\x1b[0;35m');
    process.stdout.write(`${COLORS.PURPLE}PURPLE${COLORS.PURPLE}`);

    expect(COLORS.LIGHT_PURPLE).toEqual('\x1b[1;35m');
    process.stdout.write(`${COLORS.LIGHT_PURPLE}LIGHT_PURPLE${COLORS.LIGHT_PURPLE}`);
  });

  it('should have expected CYAN tones', () => {
    expect(COLORS.CYAN).toEqual('\x1b[0;36m');
    process.stdout.write(`${COLORS.CYAN}CYAN${COLORS.CYAN}`);

    expect(COLORS.LIGHT_CYAN).toEqual('\x1b[1;36m');
    process.stdout.write(`${COLORS.LIGHT_CYAN}LIGHT_CYAN${COLORS.LIGHT_CYAN}`);
  });

  it('should have expected WHITE tones', () => {
    expect(COLORS.WHITE).toEqual('\x1b[0;37m');
    process.stdout.write(`${COLORS.WHITE}WHITE${COLORS.WHITE}`);

    expect(COLORS.LIGHT_WHITE).toEqual('\x1b[1;37m');
    process.stdout.write(`${COLORS.LIGHT_WHITE}LIGHT_WHITE${COLORS.LIGHT_WHITE}`);
  });
});
