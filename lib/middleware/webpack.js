const webpack = require('koa2-webpack')
const { resolve, join } = require('path')
module.exports = function() {
  const webpack = require('koa2-webpack')
  return webpack({
    config: require(join(__dirname, '..', 'webpack.config.js')),
    dev: {
      // stats: {
      //   colors: true
      // },
      quiet: true
    }
  })
}
