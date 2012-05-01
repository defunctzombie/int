
var assert = require('assert');
var int = require('../');

test('build', function() {
    // zeros
    assert.equal(int(0), '0');
    assert.equal(int('0'), '0');

    assert.equal(int('-1'), '-1');
    assert.equal(int(-1), '-1');

    assert.equal(int('123456789012345678901234567890123456789'), '123456789012345678901234567890123456789');
});

test('add', function() {

    var n1 = int(0);

    assert.equal(n1.add(int(1)), '1');
    assert.equal(n1.add(1), '1');
    assert.equal(n1.add('1'), '1');

    assert.equal(int(100).add(9), 109);

    assert.equal(int('123456789012345678901234567890123456789').add(1), '123456789012345678901234567890123456790');
});

test('div', function() {
    assert.equal(int(100).div(2), 50);
});

test('sub', function() {
    assert.equal(int(1).sub(0001), 0);
    assert.equal(int(100).sub(9), 91);
    assert.equal(int(9).sub(100), -91);

    assert.equal(int(00090).sub(100), -10);
});

test('mul', function() {

    var n1 = int(1);
    for (var i = 0; i<10 ; ++i, n1=n1.mul(2));
    assert.equal(n1, '1024');
});

test('pow', function() {
    assert.equal(int(2).pow(10), 1024);
});

test('lt', function() {
    assert.equal(int(-1).lt(int(0)), true);
});

test('gt', function() {
    assert.equal(int(1).gt(int(0)), true);
});

test('lte', function() {
    assert.equal(int(-2).lte(int(-2)), true);
});

test('gte', function() {
    assert.equal(int(1).gte(int(1)), true);
});

test('eq', function() {
    assert.equal(int(0).eq(int(-0)), true);
    assert.equal(int(1).eq(int(1)), true);
});

test('ne', function() {
    assert.equal(int(1).ne(int(0)), true);
});

test('set', function() {
    var n1 = int(1);

    assert.equal(n1, '1');
    assert.equal(n1.set(2), '2');
});
