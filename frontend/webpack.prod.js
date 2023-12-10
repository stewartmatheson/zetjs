const path = require('path')

module.exports = {
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.env.ZET_HOME + '/build')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}

