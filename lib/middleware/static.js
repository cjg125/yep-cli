const { resolve } = require('path')
const static = require('koa-static')
module.exports = function() {
  return static(resolve('./static'))
}
