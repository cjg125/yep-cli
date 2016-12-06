const { join, resolve } = require('path')

module.exports = (file, query) => {
  let path = resolve('./html/data/')
  let data = require(join(path, 'common'))(query)
  try {
    Object.assign(data, require(resolve(join(path, file)))(query))
  } catch (e) {}
  return data
}
