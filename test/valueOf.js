var assert = require('assert');
var int = require('../');

test('valueOf', function() {
    assert.equal(int('1').valueOf(), 1);
    assert.equal(int('9223372036854775808').valueOf(), 9223372036854776000);
    assert.equal(int('123') + 1, 124);
});
