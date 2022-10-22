import { COLORS } from './colors';

/**
 * Print error message in the terminal.
 * @param payload message payload
 * @param title message title
 */
const printSuccess = <T>(payload: T, title = 'Success') => console.log(`\n ✅ ${COLORS.GREEN}%s${COLORS.DEFAULT}:\n%s\n`, title, payload);

/**
 * Print info message in the terminal.
 * @param payload message payload
 * @param title message title
 */
const printInfo = <T>(payload: T, title = 'Info') => console.log(`\n 💬 ${COLORS.YELLOW}%s${COLORS.DEFAULT}:\n%s\n`, title, payload);

/**
 * Print error message in the terminal.
 * @param payload message payload
 * @param title message title
 */
const printError = <T>(payload: Error & T, title = 'Error') =>
  console.log(`\n ❌ ${COLORS.RED}%s${COLORS.DEFAULT}:\n%s\n`, title, payload.stack);

export const logger = {
  printSuccess,
  printInfo,
  printError,
};
