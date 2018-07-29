const webpack = require('webpack')
const webpackMerge = require("webpack-merge");
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const modeConfig = (mode) => require(`./build-utils/webpack.${mode}`)();

const commonConfig = {
  entry: path.resolve(__dirname, './src/index.js'),

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build')
  },

  resolve: {
    // add 'src' to the modules, so that when you import files you can do so with 'src' as the relative route
    modules: [
      path.resolve(__dirname, './src/'),
      'node_modules'
    ],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(svg|png|woff2?)$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    })
  ]
}

module.exports = ({ mode="production" }) => {
  return webpackMerge(
    {
      mode
    },
    commonConfig,
    modeConfig(mode)
  );
}
