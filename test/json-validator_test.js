'use strict';

var v = require('../lib/json-validator.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.type = {
	setUp: function(done) {
		// setup here
		done();
	},
	test: function(test) {
		test.expect(11);
		test.strictEqual(v.type(null), 'null', 'should be "null".');
		test.strictEqual(v.type(NaN), 'nan', 'should be "nan".');
		test.strictEqual(v.type(undefined), 'undefined', 'should be "undefined".');
		test.strictEqual(v.type(false), 'boolean', 'should be "boolean".');
		test.strictEqual(v.type(true), 'boolean', 'should be "boolean".');
		test.strictEqual(v.type(0), 'number', 'should be "number".');
		test.strictEqual(v.type(1), 'number', 'should be "number".');
		test.strictEqual(v.type(''), 'string', 'should be "string".');
		test.strictEqual(v.type('a'), 'string', 'should be "string".');
		test.strictEqual(v.type([]), 'array', 'should be "array".');
		test.strictEqual(v.type({}), 'object', 'should be "object".');
		test.done();
	}
};

exports.isFunctions = {
	isArrayWithContent: function(test) {
		test.expect(4);
		test.strictEqual(v.isArrayWithContent([1]), true, 'should be true.');
		test.strictEqual(v.isArrayWithContent([]), false, 'should be false.');
		test.strictEqual(v.isArrayWithContent(1), false, 'should be false.');
		test.strictEqual(v.isArrayWithContent(false), false, 'should be false.');
		test.done();
	},
	isObjectWithContent: function(test) {
		test.expect(4);
		test.strictEqual(v.isObjectWithContent({'test':0}), true, 'should be true.');
		test.strictEqual(v.isObjectWithContent({}), false, 'should be false.');
		test.strictEqual(v.isObjectWithContent(1), false, 'should be false.');
		test.strictEqual(v.isObjectWithContent(false), false, 'should be false.');
		test.done();
	},
	isNothing: function(test) {
		test.expect(8);
		test.strictEqual(v.isNothing(null), true, 'should be true.');
		test.strictEqual(v.isNothing(NaN), true, 'should be true.');
		test.strictEqual(v.isNothing(undefined), true, 'should be true.');
		test.strictEqual(v.isNothing(false), false, 'should be false.');
		test.strictEqual(v.isNothing(0), false, 'should be false.');
		test.strictEqual(v.isNothing(''), false, 'should be false.');
		test.strictEqual(v.isNothing([]), false, 'should be false.');
		test.strictEqual(v.isNothing({}), false, 'should be false.');
		test.done();
	},
	isSomething: function(test) {
		test.expect(8);
		test.strictEqual(v.isSomething(null), false, 'should be false.');
		test.strictEqual(v.isSomething(NaN), false, 'should be false.');
		test.strictEqual(v.isSomething(undefined), false, 'should be false.');
		test.strictEqual(v.isSomething(false), true, 'should be true.');
		test.strictEqual(v.isSomething(0), true, 'should be true.');
		test.strictEqual(v.isSomething(''), true, 'should be true.');
		test.strictEqual(v.isSomething([]), true, 'should be true.');
		test.strictEqual(v.isSomething({}), true, 'should be true.');
		test.done();
	},
	isEmpty: function(test) {
		test.expect(13);
		test.strictEqual(v.isEmpty(null), true, 'should be true.');
		test.strictEqual(v.isEmpty(NaN), true, 'should be true.');
		test.strictEqual(v.isEmpty(undefined), true, 'should be true.');
		test.strictEqual(v.isEmpty(false), true, 'should be true.');
		test.strictEqual(v.isEmpty(true), false, 'should be false.');
		test.strictEqual(v.isEmpty(0), true, 'should be true.');
		test.strictEqual(v.isEmpty(1), false, 'should be false.');
		test.strictEqual(v.isEmpty(''), true, 'should be true.');
		test.strictEqual(v.isEmpty('a'), false, 'should be false.');
		test.strictEqual(v.isEmpty([]), true, 'should be true.');
		test.strictEqual(v.isEmpty([1]), false, 'should be false.');
		test.strictEqual(v.isEmpty({}), true, 'should be true.');
		test.strictEqual(v.isEmpty({'test':0}), false, 'should be false.');
		test.done();
	},
};
