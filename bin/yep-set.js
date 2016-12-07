#!/usr/bin/env node

const fs = require('fs')
const { resolve } = require('path') 
const program = require('commander')
const chalk = require('chalk')
program
  .usage('[options] [template-name] [repository]')
  .option('-d, --delete', 'delete a template')
  .option('-l, --list', 'template list')
  .allowUnknownOption()
  .on('--help', function() {
    console.log('  Examples:')
    console.log(chalk.gray('    # github template'))
    console.log('    $ yep set template-name github:owner/name  or simply owner/name')
    console.log(chalk.gray('    # gitlab template'))
    console.log('    $ yep set template-name gitlab:owner/name')
    console.log(chalk.gray('    # custom template'))
    console.log('    $ yep set template-name gitlab:custom.com:owner/name')
    console.log(chalk.gray('    # display template list'))
    console.log('    $ yep set -l')
    console.log(chalk.gray('    # delete a template'))
    console.log('    $ yep set -d template-name')
    console.log()
  })
  .parse(process.argv)

function help() {
  return program.help()
}

function shell() {
  let args = program.args
  let template = require('../lib/tmpl.config')

  // list
  if (program.list) {
    return console.log(JSON.stringify(template, null, 2))
  }

  // delete
  if (program.delete) {
    if (args.length < 1) {
      return help()
    }
    delete template[args[0]]
    return updateConfigFile(template)
  }

  // add or update
  if (args.length < 2) {
    return help()
  }
  Object.assign(template, {
    [program.args[0]]: program.args[1]
  })
  updateConfigFile(template)
}

shell()


function updateConfigFile(data) {
  let str = JSON.stringify(data, null, 2)
  let dir = resolve(__dirname, '../lib/tmpl.config.json')
  fs.writeFile(dir, str, (err) => {
    if (err) {
      console.log(chalk.red(err))
      return
    }
    console.log(chalk.green('It\'s saved!'))
  })
}
