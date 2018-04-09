const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
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