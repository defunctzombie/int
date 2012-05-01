
var assert = require('assert');
var int = require('../');

test('div', function() {
    assert.equal(int(100).div(2), 50);
});
