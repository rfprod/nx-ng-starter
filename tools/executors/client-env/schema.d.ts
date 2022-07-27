export type TSupportedApp = 'client' | 'documentation' | 'elements' | '';

export interface IExecutorOptions {
  app: TSupportedApp;
  dryRun?: boolean;
  reset?: boolean;
}
