#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const program = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const template = require('../lib/template')

program
  .option('-c, --clone', 'use git clone')
  .on('--help', function() {
    console.log('  Examples:')
    console.log(chalk.gray('    # create a new project'))
    console.log('    $ yep init')
    console.log(chalk.gray('    # create a new project use git clone'))
    console.log('    $ yep init -c')
    console.log()
  })
  .parse(process.argv)


let dirname = process.cwd()
let projectConfig = {}
let clone = program.clone || false

inquirer.prompt([{
  type: 'input',
  name: 'name',
  message: 'Please enter a project name:',
  validate: (input) => {
    if (input == '') {
      return 'Please enter a project name'
    }
    return new Promise((resolve, reject) => {
      fs.stat(path.join(dirname, input), (err, stats) => {
        // stats.isDirectory()
        return resolve(err ? true : 'Project already exists')
      })

    })
  }
}]).then((answers) => {
  projectConfig.name = answers.name
  chooseTemplate()
})



function chooseTemplate() {
  inquirer.prompt([{
    type: 'list',
    name: 'template',
    message: 'Choose a template for your new project',
    choices: Object.keys(template)
  }]).then(function(answers) {
    projectConfig.template = answers.template
    generate(projectConfig)
  })
}

function generate(options) {
  let name = path.join(dirname, options.name)
  let tpl = template[options.template]
  let ui = installation()

  download(tpl, name, { clone: clone }, (err) => {
    if (err) {
      ui.updateBottomBar(chalk.red(err))
    } else {
      ui.updateBottomBar('Installation done!')
    }
    process.exit()
  })
}

function installation() {
  let loader = [
    '/ Installing',
    '| Installing',
    '\\ Installing',
    '- Installing'
  ]

  let i = 4
  let ui = new inquirer.ui.BottomBar({
    bottomBar: loader[i % 4]
  })

  let t = setInterval(function() {
    ui.updateBottomBar(loader[i++ % 4])
  }, 300)

  return {
    updateBottomBar: function(...args) {
      clearInterval(t)
      ui.updateBottomBar.apply(ui, args)
    }
  }
}
