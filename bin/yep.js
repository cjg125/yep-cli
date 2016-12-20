#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'create a new project')
  .command('alias', 'template alias')
  .command('start', 'start http server')
  .command('build', 'build project')
  .parse(process.argv)
