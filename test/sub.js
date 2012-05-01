
var assert = require('assert');
var int = require('../');

test('sub', function() {
    assert.equal(int(1).sub(0001), 0);
    assert.equal(int(100).sub(9), 91);
    assert.equal(int(9).sub(100), -91);

    assert.equal(int(00090).sub(100), -10);
    assert.equal(int(-99).sub(-99), 0);

    assert.equal(int(-99).sub(1), -100);
    assert.equal(int(-1).sub(99), -100);
});
