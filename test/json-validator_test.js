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

function testBasicTypes(test, _function, _map) {
	var length = 0;
	for (var key in _map) {
		if (Array.isArray(_map[key])) { length += _map[key].length; }
		else { length++; }
	}
	test.expect(length);
	
	var genericFunction = function() {};
	for (key in _map) {
		var value;
		var message = '';
		if (Array.isArray(_map[key])) {
			var i = 0;
			if (key === 'falseList') {
				for (i = 0; i < _map[key].length; i++) {
					message = '"' + _map[key][i] + '" should be false';
					test.strictEqual(_function(_map[key][i]), false, message);
				}
			} else if (key === 'trueList') {
				for (i = 0; i < _map[key].length; i++) {
					message = '"' + _map[key][i] + '" should be true';
					test.strictEqual(_function(_map[key][i]), true, message);
				}
			} else if (key === 'undefinedList') {
				for (i = 0; i < _map[key].length; i++) {
					message = '"' + _map[key][i] + '" should be undefined';
					test.strictEqual(_function(_map[key][i]), undefined, message);
				}
			}
			continue;
		}
		else if (key === 'null') { value = null; }
		else if (key === 'nan') { value = NaN; }
		else if (key === 'undefined') { value = undefined; }
		else if (key === 'boolFalse') { value = false; }
		else if (key === 'boolTrue') { value = true; }
		else if (key === 'numZero') { value = 0; }
		else if (key === 'numPositive') { value = 1.1; }
		else if (key === 'numNegative') { value = -1.1; }
		else if (key === 'intPositive') { value = 1; }
		else if (key === 'intNegative') { value = -1; }
		else if (key === 'stringBlank') { value = ''; }
		else if (key === 'stringShort') { value = 'a'; }
		else if (key === 'stringLong') { value = 'abcdefgh'; }
		else if (key === 'stringInt') { value = '1'; }
		else if (key === 'stringNum') { value = '1.1'; }
		else if (key === 'regexp') { value = /^a$/; }
		else if (key === 'arrayEmpty') { value = []; }
		else if (key === 'arrayShort') { value = [1]; }
		else if (key === 'arrayLong') { value = [1, 2, 3, 4, 5, 6, 7, 8]; }
		else if (key === 'objectEmpty') { value = {}; }
		else if (key === 'objectShort') { value = { 'a': 1 }; }
		else if (key === 'objectLong') { value = { 'a': 1, 'b': 2, 'c': 3 }; }
		else if (key === 'function') { value = genericFunction; }
		else if (key === 'tld') { value = 'com'; }
		else if (key === 'tldShort') { value = 'com'; }
		else if (key === 'tldLong') { value = 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabc'; }
		else if (key === 'domain') { value = 'example.com'; }
		else if (key === 'domainShort') { value = 'a.us'; }
		else if (key === 'domainLong') { value = '123456789012345678901234567890123456789012345678901234567890123.com'; }
		else if (key === 'domainHyphen') { value = 'example-example.com'; }
		else if (key === 'hostname') { value = 'www.example.com'; }
		else if (key === 'hostnameLong') { value = '123456789012345678901234567890123456789012345678901234567890123.a.us'; }
		else if (key === 'hostnameLong2') { value = 'www.example.example.example.example.com'; }
		else if (key === 'email') { value = 'none@example.com'; }
		else if (key === 'emailShort') { value = 'a@a.us'; }
		else if (key === 'emailComplex') { value = 'az09!#$%&\'*+/=?^_`{|}~-.az09!#$%&\'*+/=?^_`{|}~-@mail.example.com'; }
		else if (key === 'httpUrl') { value = 'http://example.com'; }
		else if (key === 'httpUrlLong') { value = 'https://www.example.com:443/test/sample.php?key=value'; }
		else if (key === 'arn') { value = 'arn:aws:ec2:us-west-2:1234567890:instance/i-1234567'; }
		else if (key === 'arnShort') { value = 'arn:aws:ec2:::instance/*'; }
		else if (key === 'sesArn') { value = 'arn:aws:ses:us-west-2:1234567890:identity/none@example.com'; }
		else { continue; }
		
		message = 'type ' + key + ' should be "' + _map[key] + '"';
		if (typeof _map[key] === 'boolean') {
			if (_map[key]) { message = 'type ' + key + ' should be true'; }
			else { message = 'type ' + key + ' should be false'; }
		} else if (typeof(arg) === 'undefined') {
			message = 'type ' + key + ' should be undefined';
		}
		
		test.strictEqual(_function(value), _map[key], message);
	}
	test.done();
}

exports.type = {
	setUp: function(done) {
		// setup here
		done();
	},
	test: function(test) {
		testBasicTypes(test, v.type, {
			'null':			'null',
			'nan':			'nan',
			'undefined':	'undefined',
			'boolFalse':	'boolean',
			'boolTrue':		'boolean',
			'numZero':		'number',
			'intPositive':	'number',
			'intNegative':	'number',
			'stringBlank':	'string',
			'stringShort':	'string',
			'stringLong':	'string',
			'regexp':		'regexp',
			'arrayEmpty':	'array',
			'arrayShort':	'array',
			'arrayLong':	'array',
			'objectEmpty':	'object',
			'objectShort':	'object',
			'objectLong':	'object',
			'function':		'function'
		});
	}
};

exports.isFunctions = {
	isArrayWithContent: function(test) {
		testBasicTypes(test, v.isArrayWithContent, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolFalse':	false,
			'boolTrue':		false,
			'numZero':		false,
			'intPositive':	false,
			'intNegative':	false,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'arrayEmpty':	false,
			'arrayShort':	true,
			'arrayLong':	true,
			'objectEmpty':	false,
			'objectShort':	false,
			'objectLong':	false,
			'function':		false
		});
	},
	isObjectWithContent: function(test) {
		testBasicTypes(test, v.isObjectWithContent, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolFalse':	false,
			'boolTrue':		false,
			'numZero':		false,
			'intPositive':	false,
			'intNegative':	false,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'arrayLong':	false,
			'objectEmpty':	false,
			'objectShort':	true,
			'objectLong':	true,
			'function':		false
		});
	},
	isNothing: function(test) {
		testBasicTypes(test, v.isNothing, {
			'null':			true,
			'nan':			true,
			'undefined':	true,
			'boolFalse':	false,
			'boolTrue':		false,
			'numZero':		false,
			'intPositive':	false,
			'intNegative':	false,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'arrayLong':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'objectLong':	false,
			'function':		false
		});
	},
	isSomething: function(test) {
		testBasicTypes(test, v.isSomething, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolFalse':	true,
			'boolTrue':		true,
			'numZero':		true,
			'intPositive':	true,
			'intNegative':	true,
			'stringBlank':	true,
			'stringShort':	true,
			'stringLong':	true,
			'arrayEmpty':	true,
			'arrayShort':	true,
			'arrayLong':	true,
			'objectEmpty':	true,
			'objectShort':	true,
			'objectLong':	true,
			'function':		true
		});
	},
	isEmpty: function(test) {
		testBasicTypes(test, v.isEmpty, {
			'null':			true,
			'nan':			true,
			'undefined':	true,
			'boolFalse':	true,
			'boolTrue':		false,
			'numZero':		true,
			'intPositive':	false,
			'intNegative':	false,
			'stringBlank':	true,
			'stringShort':	false,
			'stringLong':	false,
			'arrayEmpty':	true,
			'arrayShort':	false,
			'arrayLong':	false,
			'objectEmpty':	true,
			'objectShort':	false,
			'objectLong':	false,
			'function':		false
		});
	},
	isPositiveNumber: function(test) {
		testBasicTypes(test, v.isPositiveNumber, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolFalse':	false,
			'boolTrue':		false,
			'numZero':		true,
			'numPositive':	true,
			'numNegative':	false,
			'intPositive':	true,
			'intNegative':	false,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'stringInt':	false,
			'stringNum':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'arrayLong':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'objectLong':	false,
			'function':		false
		});
	},
	isNegativeNumber: function(test) {
		testBasicTypes(test, v.isNegativeNumber, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolFalse':	false,
			'boolTrue':		false,
			'numZero':		true,
			'numPositive':	false,
			'numNegative':	true,
			'intPositive':	false,
			'intNegative':	true,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'stringInt':	false,
			'stringNum':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'arrayLong':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'objectLong':	false,
			'function':		false
		});
	},
	isInteger: function(test) {
		testBasicTypes(test, v.isInteger, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolFalse':	false,
			'boolTrue':		false,
			'numZero':		true,
			'numPositive':	false,
			'numNegative':	false,
			'intPositive':	true,
			'intNegative':	true,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'stringInt':	false,
			'stringNum':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'arrayLong':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'objectLong':	false,
			'function':		false
		});
	},
	isPositiveInteger: function(test) {
		testBasicTypes(test, v.isPositiveInteger, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolFalse':	false,
			'boolTrue':		false,
			'numZero':		true,
			'numPositive':	false,
			'numNegative':	false,
			'intPositive':	true,
			'intNegative':	false,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'stringInt':	false,
			'stringNum':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'arrayLong':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'objectLong':	false,
			'function':		false
		});
	},
	isNegativeInteger: function(test) {
		testBasicTypes(test, v.isNegativeInteger, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolFalse':	false,
			'boolTrue':		false,
			'numZero':		true,
			'numPositive':	false,
			'numNegative':	false,
			'intPositive':	false,
			'intNegative':	true,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'stringInt':	false,
			'stringNum':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'arrayLong':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'objectLong':	false,
			'function':		false
		});
	},
	isTopLevelDomain: function(test) {
		testBasicTypes(test, v.isTopLevelDomain, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolTrue':		false,
			'numZero':		false,
			'numPositive':	false,
			'intPositive':	false,
			'intNegative':	false,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'stringInt':	false,
			'stringNum':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'function':		false,
			'tld':			true,
			'domain':		false,
			falseList: [
				'a-b',
				'123',
				'aa1',
				'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcd'
			]
		});
	},
	isDomain: function(test) {
		testBasicTypes(test, v.isDomain, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolTrue':		false,
			'numZero':		false,
			'numPositive':	false,
			'intPositive':	false,
			'intNegative':	false,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'stringInt':	false,
			'stringNum':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'function':		false,
			'tld':			false,
			'domain':		true,
			'domainShort':	true,
			'domainLong':	true,
			'domainHyphen':	true,
			'hostname':		false,
			falseList: [
				'example.a',
				'example_example.com',
				'1234567890123456789012345678901234567890123456789012345678901234.com'
			]
		});
	},
	isHostname: function(test) {
		testBasicTypes(test, v.isHostname, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolTrue':		false,
			'numPositive':	false,
			'intPositive':	false,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'stringInt':	false,
			'stringNum':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'function':		false,
			'tld':			false,
			'domain':		true,
			'hostname':		true,
			'hostnameLong':	true,
			'hostnameLong2':	true,
			falseList: [
				'www.example_example.com',
				'example_example.example.com',
				'1234567890123456789012345678901234567890123456789012345678901234.a.com'
			]
		});
	},
	isEmail: function(test) {
		testBasicTypes(test, v.isEmail, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolTrue':		false,
			'numPositive':	false,
			'intPositive':	false,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'stringInt':	false,
			'stringNum':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'function':		false,
			'tld':			false,
			'domain':		false,
			'hostname':		false,
			'email':		true,
			falseList: [
				'@example.com',
				'none@example_example.com',
				'a()z@example.com',
				'a"z@example.com',
				'.a@example.com'
			]
		});
	},
	isHttpURL: function(test) {
		testBasicTypes(test, v.isHttpURL, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolTrue':		false,
			'numPositive':	false,
			'intPositive':	false,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'stringInt':	false,
			'stringNum':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'function':		false,
			'domain':		false,
			'httpUrl':		true,
			'httpUrlLong':	true,
			falseList: [
				'ftp://ftp.example.com/sample.txt',
				'http://www.example.a/sample.php',
				'http://www.example.com:ab/sample.php'
			]
		});
	},
	isARN: function(test) {
		testBasicTypes(test, v.isARN, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolTrue':		false,
			'numPositive':	false,
			'intPositive':	false,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'stringInt':	false,
			'stringNum':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'function':		false,
			'domain':		false,
			'arn':			true,
			'arnShort':		true,
			'sesArn':		true,
			falseList: [
				'arn:aws::us-west-2:1234567890:i-1234567',
				'arn:aws:ses::none@example.com'
			]
		});
	},
	isSesARN: function(test) {
		testBasicTypes(test, v.isSesARN, {
			'null':			false,
			'nan':			false,
			'undefined':	false,
			'boolTrue':		false,
			'numPositive':	false,
			'intPositive':	false,
			'stringBlank':	false,
			'stringShort':	false,
			'stringLong':	false,
			'stringInt':	false,
			'stringNum':	false,
			'arrayEmpty':	false,
			'arrayShort':	false,
			'objectEmpty':	false,
			'objectShort':	false,
			'function':		false,
			'domain':		false,
			'arn':			false,
			'arnShort':		false,
			'sesArn':		true,
			falseList: [
				'arn:aws::us-west-2:1234567890:i-1234567',
				'arn:aws:ses::identity/none@example.com',
				'arn:aws:ses:::none@example.com'
			]
		});
	},
};

exports.parseFunctions = {
	parseHttpURL: function(test) {
		test.expect(2);
		test.deepEqual(v.parseHttpURL('http://www.example.com'), {
			protocol:	'http',
			hostname:	'www.example.com'
		}, 'objects should match');
		test.deepEqual(v.parseHttpURL('https://www.example.com:443/test/sample.php?key=value'), {
			protocol:	'https',
			hostname:	'www.example.com',
			port:		'443',
			path:		'/test/sample.php',
			queryString:	'key=value'
		}, 'objects should match');
		test.done();
	},
	parseARN: function(test) {
		test.expect(3);
		test.deepEqual(v.parseARN('arn:aws:ec2:::instance/*'), {
			partition:	'aws',
			service:	'ec2',
			resource:	'instance/*'
		}, 'objects should match');
		test.deepEqual(v.parseARN('arn:aws:ec2:us-west-2:1234567890:instance/i-1234567'), {
			partition:	'aws',
			service:	'ec2',
			region:		'us-west-2',
			accountId:	'1234567890',
			resource:	'instance/i-1234567'
		}, 'objects should match');
		test.deepEqual(v.parseARN('arn:aws:ses:us-west-2:1234567890:identity/none@example.com'), {
			partition:	'aws',
			service:	'ses',
			region:		'us-west-2',
			accountId:	'1234567890',
			resource:	'identity/none@example.com'
		}, 'objects should match');
		test.done();
	},
};

exports.stripFunctions = {
	stripObject: function(test) {
		test.expect(2);
		var sample = {
			'null':			null,
			'nan':			NaN,
			'undefined':	undefined,
			'boolFalse':	false,
			'boolTrue':		true,
			'numZero':		0,
			'intPositive':	1,
			'stringBlank':	'',
			'stringShort':	'a',
			'arrayEmpty':	[],
			'arrayShort':	[1],
			'arrayLong':	[ 1, [], {}, [1], { b: 2 } ],
			'objectEmpty':	{},
			'objectShort':	{ a: 1 },
			'objectLong':	{ a: 1, b: [], c: {}, d: [1], e: { f: 2 } },
		};
		test.strictEqual(v.stripObject(sample), true, 'should be true');
		test.deepEqual(sample, {
			'boolFalse':	false,
			'boolTrue':		true,
			'numZero':		0,
			'intPositive':	1,
			'stringBlank':	'',
			'stringShort':	'a',
			'arrayShort':	[1],
			'arrayLong':	[ 1, [1], { b: 2 } ],
			'objectShort':	{ a: 1 },
			'objectLong':	{ a: 1, d: [1], e: { f: 2 } },
		}, 'objects should match');
		test.done();
	},
	stripObjectOfEmpties: function(test) {
		test.expect(2);
		var sample = {
			'null':			null,
			'nan':			NaN,
			'undefined':	undefined,
			'boolFalse':	false,
			'boolTrue':		true,
			'numZero':		0,
			'intPositive':	1,
			'stringBlank':	'',
			'stringShort':	'a',
			'arrayEmpty':	[],
			'arrayZero':	[0],
			'arrayShort':	[1],
			'arrayLong':	[ 0, 1, [], {}, [1], { b: 2 } ],
			'objectEmpty':	{},
			'objectShort':	{ a: 1 },
			'objectLong':	{ a: 1, b: [], c: {}, d: [1], e: { f: 2 } },
		};
		test.strictEqual(v.stripObject(sample, true), true, 'should be true');
		test.deepEqual(sample, {
			'boolTrue':		true,
			'intPositive':	1,
			'stringShort':	'a',
			'arrayShort':	[1],
			'arrayLong':	[ 1, [1], { b: 2 } ],
			'objectShort':	{ a: 1 },
			'objectLong':	{ a: 1, d: [1], e: { f: 2 } },
		}, 'objects should match');
		test.done();
	},
	stripArray: function(test) {
		test.expect(2);
		var sample = [
			null,
			NaN,
			undefined,
			false,
			true,
			0,
			1,
			'',
			'a',
			[],
			[1],
			[ 1, [], {}, [1], { b: 2 } ],
			{},
			{ a: 1 },
			{ a: 1, b: [], c: {}, d: [1], e: { f: 2 } },
		];
		test.strictEqual(v.stripObject(sample), true, 'should be true');
		test.deepEqual(sample, [
			false,
			true,
			0,
			1,
			'',
			'a',
			[1],
			[ 1, [1], { b: 2 } ],
			{ a: 1 },
			{ a: 1, d: [1], e: { f: 2 } },
		], 'objects should match');
		test.done();
	},
	stripArrayOfEmpties: function(test) {
		test.expect(2);
		var sample = [
			null,
			NaN,
			undefined,
			false,
			true,
			0,
			1,
			'',
			'a',
			[],
			[0],
			[1],
			[ 1, [], {}, [1], { b: 2 } ],
			{},
			{ a: 0 },
			{ a: 1 },
			{ a: 1, b: [], c: {}, d: [1], e: { f: 2 } },
		];
		test.strictEqual(v.stripObject(sample, true), true, 'should be true');
		test.deepEqual(sample, [
			true,
			1,
			'a',
			[1],
			[ 1, [1], { b: 2 } ],
			{ a: 1 },
			{ a: 1, d: [1], e: { f: 2 } },
		], 'objects should match');
		test.done();
	},
};

exports.checkinput = {
	unmodified: function(test) {
		test.expect(1);
		var fields = [
//			{
//				type		optional, one of 'boolean', 'number', 'string', 'array', 'object' used to convert or produce error
//			},
			{
				name:		'booleanValue',
				type:		'boolean',
				required:	true,
				notEmpty:	true
			},
			{
				name:		'numberValue',
				type:		'number',
				required:	true,
				notEmpty:	true
			},
			{
				name:		'integerValue',
				type:		'integer',
				required:	true,
				format:		'integer'
			},
			{
				name:		'stringValue',
				type:		'string',
				required:	true,
				notEmpty:	true
			},
			{
				name:		'domainValue',
				type:		'string',
				required:	true,
				format:		'domain'
			},
			{
				name:		'emailValue',
				type:		'string',
				required:	true,
				format:		'email'
			},
			{
				name:		'hostnameValue',
				type:		'string',
				required:	true,
				format:		'hostname'
			},
			{
				name:		'listOfValues',
				type:		'string',
				required:	true,
				values:		['a', 'b']
			},
			{
				name:		'regexMatch',
				type:		'string',
				required:	true,
				regexp:		/^[abc]+$/
			},
			{
				name:		'lowercaseAction',
				type:		'string',
				required:	true,
				actions:	['lowercase']
			},
			{
				name:		'uppercaseAction',
				type:		'string',
				required:	true,
				actions:	['uppercase']
			},
			{
				name:		'stripAction',
				type:		'string',
				required:	true,
				actions:	['strip']
			},
			{
				name:		'comboAction',
				type:		'string',
				required:	true,
				actions:	['strip', 'lowercase']
			},
			{
				name:		'arrayValue',
				type:		'array',
				required:	true
			},
			{
				name:		'objectValue',
				type:		'object',
				required:	true
			},
		];
		var sample = {
			booleanValue:		true,
			numberValue:		1,
			integerValue:		2,
			stringValue:		'a',
			domainValue:		'example.com',
			emailValue:			'test@example.com',
			hostnameValue:		'www.example.com',
			regexMatch:			'abcabc',
			listOfValues:		'b',
			lowercaseAction:	'LOWER',
			uppercaseAction:	'upper',
			stripAction:		'	whitespace ',
			comboAction:		'	LOWER ',
			arrayValue:			['a'],
			objectValue:		{'a':1},
		};
		var results = v.checkInput(sample, fields);
		test.deepEqual(results, {
			data: {
				booleanValue:		true,
				numberValue:		1,
				integerValue:		2,
				stringValue:		'a',
				domainValue:		'example.com',
				emailValue:			'test@example.com',
				hostnameValue:		'www.example.com',
				regexMatch:			'abcabc',
				listOfValues:		'b',
				lowercaseAction:	'lower',
				uppercaseAction:	'UPPER',
				stripAction:		'whitespace',
				comboAction:		'lower',
				arrayValue:			['a'],
				objectValue:		{'a':1},
			},
			isModified: false,
			messages: []
		}, 'objects should match');
		test.done();
	},
};
