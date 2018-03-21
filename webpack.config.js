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
    rules: [{
      test: /\.js$/,
      enforce: "pre",
      exclude: [/dist/, /node_modules/],
      use: [
        {
          loader: "jshint-loader"
        }
      ]
    }],
    loaders: [{
        test: /\.js$/,
        exclude: [/dist/, /node_modules/],
        loader: 'babel-loader',
        query: {
           presets: ['env', 'stage-0']
        }
    }]
  }
};