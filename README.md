
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

## OAuth Application

1. Create OAuth application on [developers.facebook.com][facebook] (in case you don't have one already)
2. Set the app's *Site URL* to `http://dummy.com:3000` (or whatever else you want)
3. Add `127.0.0.1    dummy.com` to your hosts file

# On your Workstation

1. Make sure you are logged in with your primary Facebook account that you are using regularly (this module relies on your browser `cookie`)
2. Create `config.json` file and copy/paste the above configuration data structure in it
3. Configure the server
  - `protocol`, `host` and `port` should match your app's *Site URL*
  - `key` *App ID*
  - `secret` *App Secret*
  - `scope` specify any scopes required by your app (optional)

## Connect

1. Start the server `facebook-refresh-token --config config.json --connect`
2. Navigate to `http://dummy.com:3000` in your browser
3. Open up the Developer Tools and select the Network tab, make sure `Preserve log` is checked
4. Navigate to `http://dummy.com:3000/connect/facebook` and authenticate as usual
5. Take a look at the authorization request in the Network tab and copy the request's `cookie` header value to the above configuration

# On your Server

1. Add `127.0.0.1    dummy.com` to your hosts file
2. Deploy the `config.json` file to your server

## Refresh

1. Every time you want to update your access token execute:

```bash
facebook-refresh-token --config config.json --refresh
```

The refreshed access token is logged out to the console. This makes it easy to pipe this script's output to another one.

For example on Linux servers you may want to configure the [cron][cron] daemon to refresh your access token at 12:00AM on the first day of every 3 months:

```bash
0 0 1 */3 * facebook-refresh-token --config config.json --refresh > access_token
```

# Reconnect

Keep in mind that if you ever log out manually or due to prolonged inactivity of your Facebook account your cookie will be lost.

1. In this case execute the steps outlined in the [Connect][connect] section on your workstation.
2. Update your server's `config.json` file with your new `cookie` value.


  [npm-version]: https://img.shields.io/npm/v/facebook-refresh-token.svg?style=flat-square (NPM Package Version)

  [npm]: https://www.npmjs.com/package/facebook-refresh-token

  [facebook]: https://developers.facebook.com
  [cron]: https://en.wikipedia.org/wiki/Cron

  [connect]: #connect
