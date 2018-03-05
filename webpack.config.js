const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    'client': [
      path.resolve(__dirname, 'public/src/es6/index.js')
    ]
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
