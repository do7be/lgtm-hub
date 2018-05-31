const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanAssetsPlugin = require('clean-assets-webpack-plugin')
const findCacheDir = require('find-cache-dir')
const cacheLoaderOptions = {
  cacheDirectory: findCacheDir({ name: 'cache-loader' })
}
const threadLoaderOptions = {
  workers: require('physical-cpu-count') - 1
}
const tsLoaderOptions = {
  happyPackMode: true,
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  return {
    entry: {
      'index': [
        path.resolve(__dirname, 'src/index.tsx')
      ]
    },
    output: {
      filename: !isProduction
        ? '[name].dev.js'
        : '[name].[hash].js',
      path: path.resolve(__dirname, 'public/js/dist'),
      publicPath: '/',
    },
    plugins: [
      new webpack.DefinePlugin({
        '__DEV__': !isProduction
      }),
      new ManifestPlugin({ fileName: path.resolve(__dirname, 'manifest.json') }),
      new CleanAssetsPlugin()
    ],
    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: 'all'
      }
    },
    module: {
      rules: rules(argv.mode)
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  }
};

function rules (mode) {
  return [
    {
      test: /\.css$/,
      use: [
        {
          loader: 'cache-loader',
          options: cacheLoaderOptions,
        },
        {
          loader: 'thread-loader',
          options: threadLoaderOptions,
        },
        { loader: 'style-loader' },
        { loader: 'css-loader' },
      ]
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'cache-loader',
          options: cacheLoaderOptions,
        },
        {
          loader: 'thread-loader',
          options: threadLoaderOptions,
        },
        { loader: 'style-loader' },
        { loader: 'css-loader?modules' },
        { loader: 'sass-loader' },
      ],
    },
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'cache-loader',
          options: cacheLoaderOptions,
        },
        {
          loader: 'thread-loader',
          options: threadLoaderOptions,
        },
        { loader: 'babel-loader' },
        {
          loader: 'ts-loader',
          options: tsLoaderOptions,
        }
      ]
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'cache-loader',
          options: cacheLoaderOptions,
        },
        {
          loader: 'thread-loader',
          options: threadLoaderOptions,
        },
        { loader: 'babel-loader' },
      ]
    },
    {
      test: /\.svg$/,
      use: [
        { loader: 'babel-loader' },
        {
          loader: 'react-svg-loader',
          options: {
            jsx: true
          }
        }
      ]
    },
    {
      test: /\.(jpe?g|png)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: '../../images',
            publicPath: 'images'
          }
        }
      ]
    }
  ]
}
