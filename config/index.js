const dateformat = require('dateformat')

const TIMESTAMP = dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss')
module.exports = {
  port: 8001,
  publicPath: '/',
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: {
        n: '兔子人开源网',
        t: TIMESTAMP
      },
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
}
