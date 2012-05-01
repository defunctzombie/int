
var assert = require('assert');
var int = require('../');

test('mul', function() {

    assert.equal(int(9).mul(9), 81);
    assert.equal(int(99).mul(9), 891);
    assert.equal(int(99).mul(99), 9801);

    assert.equal(int(12).mul(2), '24');
    assert.equal(int(12).mul(12), '144');
    assert.equal(int(1234).mul(1234), '1522756');
    assert.equal(int('1234567890').mul('1234567890'), '1524157875019052100');

    var n1 = int(1);
    for (var i = 0; i<10 ; ++i, n1=n1.mul(2));
    assert.equal(n1, '1024');
});

