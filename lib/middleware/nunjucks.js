const { resolve } = require('path')
const nj = require('koa2-nunjucks')
module.exports = function() {
  return nj({
    // debug: true,
    ext: 'html',
    path: resolve('./html'),
    njConfig: {
      watch: true
    }
  })
}
