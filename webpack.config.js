const path = require('path');
const webpack = require('webpack');




/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');




/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require('terser-webpack-plugin');


const CopyWebpackPlugin = require('copy-webpack-plugin'); // installed via npm



module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  devtool: 'source-map',

  plugins: [
    new webpack.ProgressPlugin(),
    // new MiniCssExtractPlugin({ filename:'style.[contenthash].css' }),
    new MiniCssExtractPlugin({ filename:'styles/style.bundle.css' }),
    //    new CopyWebpackPlugin([{ from: 'src/index.html' }], { logLevel: 'debug' })
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/index.html",
        },
      ],
    })
],

  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'js/[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src/js')],
        loader: 'babel-loader'
      },

      // ローダーは下から上に処理されるためbabel-loaderの下にeslint-loaderを追記します。
      {
        test: /.js$/,
        include: [path.resolve(__dirname, 'src/js')],
        loader: 'eslint-loader'
      },

      {
        test: /.scss$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",

            options: {
              sourceMap: false
            }
          },

          {
            loader: "postcss-loader",

            options: {

              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }

            }
          },

          {
            loader: "sass-loader",

            options: {
              sourceMap: false
            }
          },
        ]
      }
    ]
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'docs'),
    contentBasePublicPath: '/',
    index: 'index.html',
    // サーバー起動時にブラウザを開く
    open: true,
    // エラーや警告をブラウザに表示する
    overlay: true
  }

}