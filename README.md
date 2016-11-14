
# facebook-refresh-token

[![npm-version]][npm]

```bash
npm install -g facebook-refresh-token
```


# Configuration

```js
{
  "server": {
    "protocol": "http",
    "host": "dummy.com",
    "port": 3000
  },
  "app": {
    "key": "",
    "secret": "",
    "scope": []
  },
  "browser": {
    "cookie": ""
  }
}
```

1. Make sure you are logged in with your primary Facebook account that you are using regularly (this module relies on your browser `cookie`)
2. Create new OAuth application on [developers.facebook.com][facebook]
3. Set the app's *Site URL* to `http://dummy.com:3000` (or whatever else you want)
4. Add `127.0.0.1    dummy.com` to your hosts file
5. Create `config.json` file and copy/paste the above configuration data structure in it
6. Configure the server
  - `protocol`, `host` and `port` should be the same as in your app's *Site URL*
  - `key` *App ID*
  - `secret` *App Secret*
  - `scope` optionally set scopes required by your app
7. Start the server
  - `facebook-refresh-token --config config.json --connect`
8. Navigate to `http://dummy.com:3000` in your browser
9. Open up the Developer Tools and select the Network tab, make sure `Preserve log` is checked
10. Navigate to `http://dummy.com:3000/connect/facebook` and authenticate as usual
11. Take a look at the authorization request in the Network tab and copy the request's `cookie` header value to the above configuration


# Refresh

Every time you want to update your access token execute

```bash
facebook-refresh-token --config config.json --refresh
```

The refreshed access token is logged out to the console. This makes it easy for spawning this script using node or external daemon tool on certain interval of time.

For example you can configure the [cron][cron] daemon to refresh your access token at 12:00AM on the first of every month

```bash
0 0 1 * * facebook-refresh-token --config config.json --refresh > access_token
```


# Reconnect

Keep in mind that if you ever log out manually or due to prolonged inactivity of your Facebook account your cookie will be lost

In this case execute steps 7 to 11 from the above configuration steps


  [npm-version]: http://img.shields.io/npm/v/facebook-refresh-token.svg?style=flat-square (NPM Package Version)

  [npm]: https://www.npmjs.com/package/facebook-refresh-token

  [facebook]: https://developers.facebook.com
  [cron]: https://en.wikipedia.org/wiki/Cron
