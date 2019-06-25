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
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        // options: {
        //   babelrc: false,
        //   presets: ['@babel/preset-env', "@babel/preset-react"],
        //   plugins: ["@babel/plugin-transform-runtime",
        //       "@babel/plugin-proposal-export-namespace-from",
        //   	  "@babel/plugin-proposal-export-default-from",
        //   	  ["@babel/plugin-proposal-decorators",
        //       {
        //         "legacy": true
        //       }],
	      //     ["@babel/plugin-proposal-class-properties", { "loose": true }]
        //     ]
        // }
      }
    },
      {
        test: /\.less/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  }
};
