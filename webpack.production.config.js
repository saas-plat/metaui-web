const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const theme = require('./theme');
const fs = require('fs');
const packageJson = require('./package.json');

module.exports = {
  devtool: 'source-map',
  entry: './main.js',
  node: {
    fs: 'empty'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'dist/[name].[chunkhash:5].js',
    chunkFilename: 'dist/[name].chunk.[chunkhash:5].js',
  },
  resolve: {
    extensions: ['.js', '.less', '.json']
  },
  module: {
    rules: [{
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      // css编译 单独分离出css文件
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, "postcss-loader"]
        })
      },
      // 图片处理
      {
        test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            'limit': 500,
          }
        }]
      },
      // less 编译
      {
        test: /\.less$/,
        // 分离css文件
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, "postcss-loader", {
            loader: 'less-loader',
            options: {
              modifyVars: theme
            }
          }]
        })
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  // 插件
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
      },
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      '__DEV__': false,
      '__CAS_DISABLED__': false,
      '__VERSION__': JSON.stringify(packageJson.version),
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    //new webpack.optimize.CommonsChunkPlugin('entry'),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html', //Load a custom template
      tpl: fs.readFileSync('./src/loading.tpl', 'utf-8').replace('/loading.svg', 'data:image/svg+xml;base64,' + fs.readFileSync('./src/loading.svg').toString('base64')),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      }
    }),
    new CopyWebpackPlugin([{
      from: './src/favicon.ico',
      to: 'favicon.ico'
    }]),
    // 这里已经没用了，改成异步加载，entry没有引用css
    new extractTextPlugin("dist/bundle.[contenthash:5].css")
  ]
}
