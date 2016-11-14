
var request = require('request')


module.exports = (config) => {
  var refresh = (done) => {
    request({
      method: 'GET',

      url: config.server.protocol + '://'
        + config.server.host + ':' + config.server.port + '/connect/facebook',

      headers: {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.90 Safari/537.36',
        cookie: config.browser.cookie
      },

      jar: request.jar(),

      json: true,
      callback: done
    })
  }

  return {refresh}
}
