'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const copyPlugin = require('copy-webpack-plugin')
const replacePlugin = require('string-replace-loader')


module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer:{
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html', favicon: "./src/favicon.ico" }),
    new HtmlWebpackPlugin({ template: './src/privacy-policy.html', filename: 'privacy-policy.html', favicon: "./src/favicon.ico"}),
    new miniCssExtractPlugin(),
    new copyPlugin({
      patterns: [
        { from: 'src/robots.txt', to: 'robots.txt' },
        { from: 'src/sitemap.xml', to: 'sitemap.xml' }
    ]}),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Extracts CSS for each JS file that includes CSS
            loader: miniCssExtractPlugin.loader
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /sitemap\.xml$/,
        loader: 'string-replace-loader',
        options: {
          search: '__WEBPACK_DATE_REPLACE__',
          raeplace: '2023-10-10',
        }
      }
    ]
  }
}
