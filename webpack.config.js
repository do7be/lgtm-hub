const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanAssetsPlugin = require('clean-assets-webpack-plugin')

module.exports = (env, argv) => {
  return {
    entry: {
      'index': [
        path.resolve(__dirname, 'src/index.jsx')
      ]
    },
    output: {
      filename: argv.mode !== 'production'
        ? '[name].dev.js'
        : '[name].[hash].js',
      path: path.resolve(__dirname, 'public/js/dist'),
      publicPath: '/',
    },
    plugins: [
      new webpack.DefinePlugin({
        '__DEV__': argv.mode !== 'production'
      }),
      new ManifestPlugin({ fileName: path.resolve(__dirname, 'manifest.json') }),
      new CleanAssetsPlugin()
    ],
    optimization: {
      minimize: argv.mode === 'production',
      splitChunks: {
        chunks: 'all'
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader?modules', 'sass-loader'],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  }
};
