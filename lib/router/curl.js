const request = require('request')

module.exports = function(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      this.status = 200
      if (error) {
        this.type = 'text/html; charset=utf-8'
        this.body = error.message
      } else {
        this.type = response.headers['content-type']
        this.body = body
      }
      return resolve()
    })
  })

}