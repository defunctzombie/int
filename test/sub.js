
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

    assert.equal(int(82).sub(73), 9);

    assert.equal(int('782910138827292261791972728324982').sub('182373273283402171237474774728373'), '600536865543890090554497953596609');
});
