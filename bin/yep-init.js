#!/usr/bin/env node

const { join } = require('path')
const fs = require('fs')

const program = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const ora = require('ora')
const tmpls = require('../lib/tmpl.config')
const co = require('co')


program
  .usage('[template-name] [project-name] [options]')
  .option('-c, --clone', 'use git clone')
  .on('--help', function() {
    console.log('  Examples:')
    console.log(chalk.gray('    # create a new project'))
    console.log('    $ yep init')
    console.log(chalk.gray('    # create a new project using git clone'))
    console.log('    $ yep init -c')
    console.log(chalk.gray('    # created a project using command line'))
    console.log('    $ yep init template-name project-name -c')
    console.log()
  })
  .parse(process.argv)


let dirname = process.cwd()
let clone = program.clone || false

function exist(path, message = '') {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      return resolve(err ? true : message)
    })
  })
}


function projectName() {
  return inquirer.prompt([{
    type: 'input',
    name: 'value',
    message: 'Please enter a project name:',
    validate: (input) => {
      if (input == '') {
        return 'Please enter a project name'
      }
      return exist(join(dirname, input), 'Project already exists')
    }
  }])
}

function templateName() {
  return inquirer.prompt([{
    type: 'list',
    name: 'value',
    message: 'Choose a template for your new project',
    choices: Object.keys(tmpls)
  }])
}

function generate(opts) {
  const spinner = ora('Installing')
  const fail = function(message = '') {
    spinner.color = 'magenta'
    spinner.text = message
    spinner.fail()
  }
  const succeed = function() {
    spinner.color = 'green'
    spinner.succeed()
  }
  spinner.start()

  // download-git-repo bug 内部没有判断exec结果
  if (/^((github|gitlab|bitbucket):)?((.+):)?([^/]+)\/([^#]+)(#(.+))?$/.exec(opts.tpl) == null) {
    fail('Invalid Template: ' + opts.tpl)
    return
  }
  download(opts.tpl, opts.name, { clone: clone }, (err) => {
    if (err) {
      fail(err.message)
    } else {
      succeed()
    }
    process.exit()
  })
}



co(function*() {
  let args = program.args

  let tpl, name

  if (args.length == 0) {
    name = yield projectName()
    tpl = yield templateName()
    name = name.value
    tpl = tpl.value
  } else {
    tpl = args[0]
    name = args[1] || tpl + (+new Date)
  }

  tpl = tmpls[tpl] || tpl
  name = join(dirname, name)

  let message = yield exist(name, false)

  // console.log(tpl)
  // console.log(name)
  // console.log(message)


  if (message === false) { // 存在
    console.log('Project already exists')
    return
  }

  generate({
    tpl: tpl,
    name: name
  })
})