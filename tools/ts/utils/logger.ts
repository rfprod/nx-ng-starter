import { COLORS } from './colors';

/**
 * Print error message in the terminal.
 * @param payload message payload
 * @param title message title
 */
const printSuccess = <T>(payload: T, title = 'Success') =>
  process.stdout.write(`\n ✅ ${COLORS.GREEN}${title}${COLORS.DEFAULT}:\n${payload}\n`);

/**
 * Print info message in the terminal.
 * @param payload message payload
 * @param title message title
 */
const printInfo = <T>(payload: T, title = 'Info') => process.stdout.write(`\n 💬 ${COLORS.YELLOW}${title}${COLORS.DEFAULT}:\n${payload}\n`);

/**
 * Print error message in the terminal.
 * @param payload message payload
 * @param title message title
 */
const printError = <T>(payload: Error & T, title = 'Error') =>
  process.stdout.write(`\n ❌ ${COLORS.RED}${title}${COLORS.DEFAULT}:\n${payload.stack}\n`);

export const logger = {
  printSuccess,
  printInfo,
  printError,
};
