'use strict'
process.env.NODE_ENV = 'production'

const Koa = require('koa')
const app = new Koa()

app.use(require('./middleware/sass')())
app.use(require('./middleware/nunjucks')())
app.use(require('./middleware/webpack')())
app.use(require('./middleware/static')())
app.use(require('./middleware/router')())

app.listen(Number.parseInt(process.argv[2]) || 8888)
