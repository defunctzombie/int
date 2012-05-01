
var assert = require('assert');
var int = require('../');

test('pow', function() {
    assert.equal(int(2).pow(10), 1024);
});

