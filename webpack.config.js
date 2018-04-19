const path = require('path');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true,
      compress: {
        warnings: false,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    compress: true,
    open: true,
  },
  entry: {
    app: [
      'babel-polyfill',
      './src/assets/js/app.js'
    ]
  },
  output: {
    devtoolLineToLine: true,
    sourceMapFilename: "app.bundle.js.map",
    pathinfo: true,
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'app.bundle.js',
    libraryTarget: 'var',
    library: 'EntryPoint'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['/node_modules/','/dist/'],
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-0']
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: ['/node_modules/','/dist/'],
        loader: 'eslint-loader'
      }
    ]
  }
};