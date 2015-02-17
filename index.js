var debug = require('debug')('mongoscope-config'),
  crypto = require('crypto'),
  parseUrl = require('url').parse,
  nconf = require('nconf');

function BadConfig(message) {
  var err = new Error();
  err.message = message;
  Error.captureStackTrace(err, BadConfig);
  return err;
}

var defaults = {
  listen: 'http://127.0.0.1:29017',
  seed: 'mongodb://localhost:27017',
  token: {
    lifetime: 10,
    secret: crypto.randomBytes(128)
  }
};

// Wercker might provision it for us
if (process.env.MONGODB_URL) {
  debug('wercker override', process.env.MONGODB_URL);
  process.env.seed = process.env.MONGODB_URL;
}

nconf
  .env()
  .argv()
  .use('memory')
  .defaults(defaults);

// Default to http.
if (nconf.get('listen').indexOf('http') !== 0) {
  nconf.overrides({
    listen: 'http://' + nconf.get('listen')
  });
}

var parsed = parseUrl(nconf.get('listen'));
['href', 'port', 'hostname', 'protocol'].map(function(k) {
  nconf.set(k, parsed[k]);
});

// Some versions of node leave the colon on the end.
nconf.overrides({
  protocol: nconf.get('protocol').replace(':', '')
});

// @todo: a lot more configuration validation that should be done,
// eg specified protocol as https but ssl not supported yet.
if (nconf.get('token:expires') > 60) {
  throw new BadConfig('token:expires cannot be higher than 60 minutes');
}

if (!nconf.get('token:secret')) {
  throw new BadConfig('token:secret must be set');
}

module.exports = nconf;
