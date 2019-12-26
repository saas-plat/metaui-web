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
    rules: [{
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
        loaders: ["style-loader", "css-loader", {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            modifyVars: {
              'primary-color': '#1DA57A',
              'link-color': '#1DA57A',
              'border-radius-base': '2px',
              'border-radius-base': '0px',
              'border-radius-sm': '0px', 
            },
            javascriptEnabled: true,
          }
        }]
      }
    ]
  }
};
