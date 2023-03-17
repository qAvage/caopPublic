
const developmentConfig = require('./webpack.dev.js')
const productionConfig = require('./webpack.prod.js')
const ESLintPlugin = require('eslint-webpack-plugin')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')
const Walk = require('@root/walk')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const srcPath = path.resolve(__dirname, 'src')
const { merge } = require('webpack-merge')

const pages = []

function walkFunc (err, pathname, dirent) {
  if (err) {
    console.warn('fs stat error for %s: %s', pathname, err.message)
    return Promise.resolve()
  }
  if (dirent.isDirectory() && dirent.name.startsWith('.')) {
    return Promise.resolve(false)
  }
  if (dirent.isFile()) {
    pages.push({
      name: dirent.name,
      in: `${path.dirname(pathname)}`,
      test: `${pathname}`
    })
    return Promise.resolve()
      .then(() => pages)
  }
  return Promise.resolve()
}

module.exports = (env, args) => {
  const walkFuncCommon = cfg => {
    return Walk.walk('./src/views/pages/', walkFunc)
      .then(() => Promise.resolve(merge(commonConfig(), cfg())))
  }

  switch (args.mode) {
    case 'development':
      return walkFuncCommon(developmentConfig)
    case 'production':
      return walkFuncCommon(productionConfig)
    default:
      throw new Error('No matching configuration was found!')
  }
}

const commonConfig = () => {
  return {

    // Entry point
    entry: {
      main: ['./src/main.js', './src/assets/scss/main.scss']
    },

    // Output point
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'js/[name].[contenthash].js',
      publicPath: '/'
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    },

    // Plugins
    plugins: [

      ...pages.map(el => {
        return new HtmlWebpackPlugin({
          template: `${el.in}/${el.name}`,
          filename: `${el.in.split('src\\views\\pages')[1]}/${el.name.split('-page.pug')[0]}.html`
        })
      }),

      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: true
      }),

      new VueLoaderPlugin(),

      new ESLintPlugin({
        extensions: ['js', 'vue'],
        exclude: ['/node_modules/']
      }),

      new CopyWebpackPlugin({
        patterns: [
          {
            from: `${srcPath}/static`,
            to: './',
            globOptions: {
              ignore: []
            },
            noErrorOnMissing: true
          }
        ]
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new JsonMinimizerPlugin()
      ]
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.json$/i,
          type: 'asset/resource'
        },
        {
          test: /\.pug$/,
          oneOf: [
            {
              exclude: /\.vue$/,
              use: {
                loader: 'pug-loader'
              }
            },
            {
              use: ['vue-pug-loader']
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash:8][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            // output filename of fonts
            filename: 'fonts/[name][ext][query]'
          }
        }
      ]
    }
  }
}
