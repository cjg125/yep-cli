const { join, resolve } = require('path')

module.exports = (file, query) => {
  let path = resolve('./html/data/')
  let data = {}
  try {
    let d1 = require(join(path, 'common'))(query)
    let d2 = require(join(path, file))(query)
    Object.assign(data, d1, d2)
  } catch (e) {}
  return data
}
