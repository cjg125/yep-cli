const chalk = require('chalk')

module.exports = function(message) {
  console.log(chalk.magenta('[' + new Date().toString().split(' ')[4] + '] ' + '[yep] ') + chalk.cyan(message))
}
