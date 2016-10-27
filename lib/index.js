const chalk = require('chalk')

const app = require('koa')()


app.use(require('koa-static')('static'))

app.use(require('koa-trie-router')(app))


app.get([
  '/',
  '/:file(.*\.html)'
], function*(next) {
  this.body = this.params.file || ''
})

app.use(function*() {
  this.status = 404
  this.body = '404'
})

app.listen(Number.parseInt(process.argv[2]) || 8888)
