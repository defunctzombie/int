
var assert = require('assert');
var int = require('../');

test('add', function() {

    var n1 = int(0);

    assert.equal(n1.add(int(1)), '1');
    assert.equal(n1.add(1), '1');
    assert.equal(n1.add('1'), '1');

    assert.equal(int(99).add(99), '198');

    assert.equal(int(100).add(9), 109);

    assert.equal(int(123456789).add(1), 123456790);
    assert.equal(int('123456789012345678901234567890123456789').add(1), '123456789012345678901234567890123456790');
});

