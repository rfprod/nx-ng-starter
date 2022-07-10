export type TSupportedApp = 'client' | 'documentation' | 'elements';

export interface IExecutorOptions {
  app: TSupportedApp;
  reset?: boolean;
}
