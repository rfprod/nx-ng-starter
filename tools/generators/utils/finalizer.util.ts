import { logger } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';

/**
 * A generator finalizer:
 * - configures custom executors;
 * - lints generated source code.
 * @param schema generator schema
 */
export const finalizeGenerator = async <T>(schema: T) => {
  const tscConfigure = await promisify(exec)(`npx nx run tools:tsc-configure`);
  logger.log(tscConfigure.stdout);
  logger.error(tscConfigure.stderr);

  const lint = await promisify(exec)(`npx nx lint ${(<Record<string, string>>schema).name} --fix`);
  logger.log(lint.stdout);
  logger.error(lint.stderr);

  return { success: tscConfigure.stderr === '' && lint.stderr === '' };
};
