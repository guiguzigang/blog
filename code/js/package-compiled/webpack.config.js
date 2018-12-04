const path = require('path')

module.exports = {
  mode: 'production',
  entry: './webpack/index.js',
  output: {
    path: path.resolve(__dirname, 'webpack'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  optimization: {
    minimize: false
  }
}