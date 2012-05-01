
var assert = require('assert');
var int = require('../');

test('mul', function() {

    var n1 = int(1);
    for (var i = 0; i<10 ; ++i, n1=n1.mul(2));
    assert.equal(n1, '1024');
});

