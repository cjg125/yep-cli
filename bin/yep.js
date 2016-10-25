#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'create a new project')
  .command('set', 'add or update a template')
  .command('start', 'start http server')
  .command('build', 'build project')
  .parse(process.argv)
