const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = (template) => {
  const htmlWebpackPluginOptions = template
    ? { template }
    : {}

  return {
    mode: 'development',
    entry: {
      main: ['webpack-hot-middleware/client', './src/index.js']
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin(htmlWebpackPluginOptions),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
}
