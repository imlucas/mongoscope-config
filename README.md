# mongoscope-config

[![build status](https://secure.travis-ci.org/imlucas/mongoscope-config.png)](http://travis-ci.org/imlucas/mongoscope-config)

Thin wrapper around nconf, validation and defaults.

## Example

```javascript
var config = require('mongoscope-config');
console.log('Token lifetime minutes', config.get('token:lifetime'));
// Token lifetime minutes 10
```

## Install

```
npm install --save mongoscope-config
```

## Test

```
npm test
```

## License

MIT
