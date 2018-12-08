const path = require("path");

module.exports = {
  output: {
    publicPath: '/'
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.less', '.json']
  },
  module: {
    rules: [
      {
        test: /\.less/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  }
};
