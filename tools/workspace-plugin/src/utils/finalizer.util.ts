import { exec } from 'child_process';
import { promisify } from 'util';

import { logger } from './logger';

/**
 * A generator finalizer:
 * - configures custom executors;
 * - lints generated source code.
 * @param schema generator schema
 */
export const finalizeGenerator = async <T>(schema: T) => {
  const tscConfigure = await promisify(exec)(`npx nx run tools:tsc-configure`);
  logger.printInfo(void 0, tscConfigure.stdout);
  logger.printError(void 0, tscConfigure.stderr);

  const lint = await promisify(exec)(`npx nx lint ${(schema as Record<string, string>).name} --fix`);
  logger.printInfo(void 0, lint.stdout);
  logger.printError(void 0, lint.stderr);

  return { success: tscConfigure.stderr === '' && lint.stderr === '' };
};
