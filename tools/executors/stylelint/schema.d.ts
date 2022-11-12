export interface IExecutorOptions {
  cleanup?: boolean;
  config: string;
  customSyntax?:
    | 'sugarss'
    | 'postcss-syntax'
    | 'postcss-html'
    | 'postcss-markdown'
    | 'postcss-jsx'
    | 'postcss-styled'
    | 'postcss-scss'
    | 'postcss-sass'
    | 'postcss-less'
    | 'postcss-less-engine'
    | 'postcss-js'
    | 'postcss-safe-parser'
    | 'midas'; // https://github.com/postcss/postcss#syntaxes
  dryRun?: boolean;
}
