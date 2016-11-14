
var express = require('express')
var session = require('express-session')
var Grant = require('grant-express')


module.exports = (config) => {
  var server

  var listen = (done) => {
    var app = express()
    app.use(session({secret: 'Grant is awesome'}))
    app.use(new Grant({
      server: {
        host: config.server.host + ':' + config.server.port,
        protocol: config.server.protocol
      },
      facebook: {
        key: config.app.key,
        secret: config.app.secret,
        scope: config.app.scope,
        callback: '/callback'
      }
    }))

    app.get('/callback', (req, res) => {
      res.end(JSON.stringify(req.query))
    })

    server = app.listen(config.server.port, done)
  }

  var close = (done) => {
    server.close(done)
  }

  return {listen, close}
}
