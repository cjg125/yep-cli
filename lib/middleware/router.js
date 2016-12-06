const compose = require('koa-compose')
const router = require('koa-router')()

module.exports = function() {
  require('../router/')(router)

  return compose([
    router.routes(),
    router.allowedMethods()
  ])
}
