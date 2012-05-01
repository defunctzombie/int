
var assert = require('assert');
var int = require('../');

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
