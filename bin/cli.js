#!/usr/bin/env node

var minimist = require('minimist')
var argv = minimist(process.argv.slice(2))

if (argv.help) {
  console.log('--config [path]', ':', 'Specify config file')
  console.log('--connect      ', ':', 'Connect new account')
  console.log('--refresh      ', ':', 'Refresh token')
  process.exit()
}

if (!argv.config) {
  console.error('Specify config file')
  process.exit()
}

var fs = require('fs')
var path = require('path')

var fpath = path.resolve(process.cwd(), process.argv[3])
var config = require(fpath)

var server = require('../lib/server')(config)
var browser = require('../lib/browser')(config)


if (argv.refresh) {
  server.listen(() => {
    browser.refresh((err, res, body) => {
      if (err) {
        console.error(err)
      }
      else {
        console.log(body.access_token)
      }
      server.close(() => process.exit())
    })
  })
}
else if (argv.connect) {
  server.listen(() => console.log('Oh Hi', config.server.port, '!'))
}
else {
  console.log('Specify --connect or --refresh')
}
