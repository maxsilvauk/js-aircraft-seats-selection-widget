const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
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
    new webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: "[path].gzip[query]",
      algorithm: "gz",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    compress: true,
    open: true
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