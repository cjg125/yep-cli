module.exports = function(_) {


  const { proxy = {} } = require(process.cwd() + '/app.config')
  const filedata = require('./filedata')
  const curl = require('./curl')

  Object.keys(proxy).forEach((path) => {
    _.get(path, async function(ctx, next) {
      let url = proxy[path]
      let querystring = ctx.querystring
      querystring && (url += ('?' + querystring))
      await curl.bind(ctx)(url)
    })
  })

  _.get(['/', '/:file(.*\).html'], async function(ctx, next) {
    let file = ctx.params.file || 'index'
    let data = filedata(file, ctx.query)
    await ctx.render(file, data)
  })

  _.get('*', async function(ctx, next) {
    ctx.status = 404
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = '404'
  })
}