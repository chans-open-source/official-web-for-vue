const { port, publicPath, pages } = require('./config')
module.exports = {
  pages,
  publicPath,
  devServer: {
    port,
    disableHostCheck: true
  },

  configureWebpack: {
    plugins: [],
    module: {
      rules: [{
        test: /\.less$/,
        use: [{
          loader: 'less-loader', // compiles Less to CSS,
          options: { javascriptEnabled: true }
        }]
      }]
    }
  }
}
