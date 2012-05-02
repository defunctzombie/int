
var assert = require('assert');
var int = require('../');

test('add#sign', function() {
    assert.ok(int(-1).add(1).eq(0));

    // simple arithmatic
    assert.equal(int(0).add(0)._s, 0);
    assert.equal(int(1).add(0)._s, 0);

    // two negative numbers should end up negative
    assert.ok(int(-1).add(-1).lt(0));

    // should equate to zero regardless of sign
    assert.ok(int(-1).add(1).eq(0));
    assert.ok(int(1).add(-1).eq(0));
});

test('add', function() {

    var n1 = int(0);

    assert.equal(n1.add(int(1)), '1');
    assert.equal(n1.add(1), '1');
    assert.equal(n1.add('1'), '1');

    assert.equal(int(99).add(99), '198');

    assert.equal(int(-1235).add(1), '-1234');

    assert.equal(int(100).add(9), 109);

    assert.equal(int(123456789).add(1), 123456790);
    assert.equal(int('123456789012345678901234567890123456789').add(1), '123456789012345678901234567890123456790');
});

