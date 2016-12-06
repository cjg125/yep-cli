#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const nodemon = require('nodemon')
const path = require('path')
const port = Number.parseInt(process.argv[2]) || 8888

program
  .usage('[options] [port]')
  .allowUnknownOption()
  .on('--help', function() {
    console.log('  Examples:')
    console.log(chalk.gray('    #  start http server,port => default:8888'))
    console.log('    $ yep start 8888')
    console.log()
  })
  .parse(process.argv)


nodemon({
  script: path.resolve(__dirname, '..', 'lib'),
  ext: 'html',
  nodeArgs: '--harmony',
  args: process.argv.slice(2),
  "watch": [
    "html"
  ]
}).on('start', function() {
  console.log('App listening on port ' + port)
}).on('restart', function(files) {
  if (!files) return
  console.log('App restarted due to ' + files)
}).on('quit', function() {
  process.kill(process.pid, 'SIGUSR2')

  // process.exit(0)
}).on('log', function(data) {
  // console.log(data.message)
})
