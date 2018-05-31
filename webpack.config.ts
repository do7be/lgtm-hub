// tsconfig.jsonではなく、webpack用のtsconfigを使用するようにしているが、エディタ側がtsconfig.jsonを参照してしまうため
// @ts-ignore
import path = require('path')
// @ts-ignore
import webpack = require('webpack')
// @ts-ignore
import ManifestPlugin = require('webpack-manifest-plugin')
// @ts-ignore
import CleanAssetsPlugin = require('clean-assets-webpack-plugin')
// @ts-ignore
import findCacheDir = require('find-cache-dir')

const cacheLoaderOptions = {
  cacheDirectory: findCacheDir({ name: 'cache-loader' })
}
const threadLoaderOptions = {
  workers: require('physical-cpu-count') - 1
}
const tsLoaderOptions = {
  happyPackMode: true,
}

module.exports = (_env: any, argv: { mode: webpack.Configuration['mode'] }) => {
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
      new CleanAssetsPlugin(path.resolve(__dirname, 'public/js/dist'))
    ],
    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: 'all'
      }
    },
    module: {
      rules: rules(isProduction)
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: ['node_modules'],
    },
  }
};

function rules (_isProduction: boolean) {
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
