declare module 'clean-assets-webpack-plugin' {
  interface Options {
    root: string
    verbose: boolean
    dry: boolean
    watch: boolean
    exclude: [ 'files' | 'to' | 'ignore' ],
    allowExternal: boolean
    beforeEmit: boolean
  }
  class CleanAssetsPlugin {
    constructor(paths: string|string[], options?: string|Options);
  }
  export = CleanAssetsPlugin;
}

declare module 'find-cache-dir' {
  interface Options {
    name: string
    files?: string[]
    cwd?: string
    create?: boolean
    thunk?: boolean
  }
  var _: (options: Options) => any;
  export = _;
}
