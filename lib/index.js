const resolve = require('path').resolve
const chalk = require('chalk')
const app = require('koa')()
const nj = require('koa-simple-nunjucks')
const sass = require('koa-simple-sass')
app.use(nj(resolve('./html'), { watch: true }))

app.use(sass(resolve('./static/sass'), {
  includePaths: [resolve('./static/sass')]
}))

app.use(require('koa-static')(resolve('./static')))

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
