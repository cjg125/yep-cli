const chalk = require('chalk')

const app = require('koa')()


app.use(require('koa-static')('static'))

app.use(function*() {
  this.body = 'Hello World'
})

app.listen(Number.parseInt(process.argv[2]) || 8888)
