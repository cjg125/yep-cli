const { resolve } = require('path')
module.exports = function() {
const sass = require('koa2-sass')
  return sass({
    debug: true,
    path: resolve('./static/sass')
  }, {
    includePaths: [resolve('./static/sass')]
  })
}
