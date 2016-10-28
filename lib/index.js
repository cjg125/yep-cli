const chalk = require('chalk')

const app = require('koa')()

const nj = require('koa-simple-nunjucks')

app.use(nj('template', { /*watch: true*/ }))

app.use(require('koa-static')('static'))

app.use(require('koa-trie-router')(app))


app.get([
  '/',
  '/:file(.*\.html)'
], function*(next) {
  yield this.render(this.params.file || 'index.html')
})

app.use(function*() {
  this.status = 404
  this.body = '404'
})

app.listen(Number.parseInt(process.argv[2]) || 8888)
