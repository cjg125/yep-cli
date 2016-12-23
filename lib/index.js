'use strict'

const Koa = require('koa')
const app = new Koa()
const opn = require('opn')
const port = Number.parseInt(process.argv[2]) || 8888

app.use(require('./middleware/sass')())
app.use(require('./middleware/nunjucks')())
app.use(require('./middleware/webpack')())
app.use(require('./middleware/static')())
app.use(require('./middleware/router')())

app.listen(port)