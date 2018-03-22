const path = require('path');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './src/assets/js/app.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'app.bundle.js'
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
      }//,
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: ['/node_modules/','/dist/'],
      //   loader: 'eslint-loader'
      // }
    ]
  }
};