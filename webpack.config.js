const path = require('path')
const webpack = require('webpack')

module.exports = {
  // modeをわたすようにしたい
  mode: 'production',
  entry: {
    'index': [
      path.resolve(__dirname, 'src/index.jsx')
    ]
  },
  output: {
    filename: '[name].bundle.js',
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
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
