#!/usr/bin/env node

const { resolve } = require('path')
const fork = require('child_process').fork
const gulpcli = resolve(__dirname, '..', 'node_modules', 'gulp-cli', 'bin', 'gulp.js')
const gulpfile = resolve(__dirname, '..', 'lib', 'gulpfile.js')
const chalk = require('chalk')
const program = require('commander')
program
  .on('--help', function() {
    console.log('  Examples:')
    console.log(chalk.gray('    # yep build'))
  })
  .parse(process.argv)


function worker() {
  return new Promise((resolve, reject) => {
    let forker = fork(gulpcli, ['--gulpfile', gulpfile, '--cwd', process.cwd(), '--color'])
    forker.on('close', (code) => {
      resolve(true)
    })
  })
}

worker()
