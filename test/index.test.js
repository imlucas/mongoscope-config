var config = require('../'),
  assert = require('assert');

describe('mongoscope-config', function() {
  it('should work', function() {
    assert.equal(config.get('token:lifetime'), 10);
  });
});
