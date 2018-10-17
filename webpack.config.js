const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const theme = require('./theme');
const packageJson = require('./package.json');

!process.env.NO_MOCK && require('./mockserver');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    './main.js'
  ],
  node: {
    fs: 'empty'
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dev'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
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
          use: ["css-loader", "postcss-loader"]
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
          use: ['css-loader', "postcss-loader",
            {
              loader: 'less-loader',
              options: {
                modifyVars: theme
              }
            }
          ]
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
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('debug'),
      '__DEV__': !process.env.NO_MOCK, // 是否启用模拟数据
      '__VERSION__': JSON.stringify(packageJson.version),
      '__CAS_DISABLED__': true // 禁用跳转cas认证服务
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html', //Load a custom template
    }),
    new CopyWebpackPlugin([{
      from: './src/favicon.ico',
      to: 'favicon.ico'
    }]),
    // 这里已经没用了，改成异步加载，entry没有引用css
    new extractTextPlugin({
      filename: "bundle.css",
      disable: true
    })
  ],
  // webpack-dev-server
  devServer: {
    //设置基本目录结构
    contentBase: path.resolve(__dirname, 'dev'),
    // 路由支持
    historyApiFallback: true,
    //服务器的IP地址，
    host: '0.0.0.0',
    //服务端压缩是否开启
    compress: true,
    //配置服务端口号
    port: 3000,
    // 实时刷新
    inline: true,
    hot: true,
  }
}
