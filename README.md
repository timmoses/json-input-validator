# json-validator

node.js module to clean and validate JSON input.

## Getting Started
Install the module with: `npm install json-validator`

	var validator = require('json-validator');
	var argType = validator.type(arg); // Returns the type of arg

## Documentation
There are a good number of functions just to test variable types and formats. While many of them exist in other forms, they are here to provide some consistency regardless of where you use this module and what other modules are available.

### .type(arg)

### .isNumber(arg)

### .isString(arg)

### .isRegexp(arg)

### .isFunction(arg)

### .isArray(arg)

### .isObject(arg)

### .isArrayWithContent(arg)

### .isObjectWithContent(arg)

### .isDate(arg)

### .isNothing(arg)
isNothing returns true if input is null, undefined, or NaN

### .isSomething(arg)
isSomething returns true if input is not null, undefined, or NaN

### .isEmpty(arg)
isEmpty returns true if input is null, undefined, NaN, false, 0, or ''

### .isNegativeNumber(arg)

### .isInteger(arg)

### .isPositiveInteger(arg)

### .isNegativeInteger(arg)

### .isDomain(arg)

### .isHostname(arg)

### .isEmail(arg)

### .parseHttpURL(arg)

### .isHttpURL(arg)

### .parseARN(arg)

### .isARN(arg)

### .isSesARN(arg)

### .stripObject(source, isEmpty)

### .stripArray(source, isEmpty)
stripObject and stripArray recursively remove key/value pairs or array elements with values that are
	null and undefined, empty objects, or empty arrays. Returns true if anything was removed. False, otherwise.
	Pass a second argument of true to also remove values that are false, 0, or ''.

### .checkInput(data, fields)
checkInput tests input object and returns converted object and errors

		var results = c.checkInput(data, fields);
			data - input object to test
			fields - array of objects containing field definitions
				[ {
					name		required, a string matching each key from the input object that should be included in the output
					type		optional, one of 'boolean', 'number', 'string', 'array', 'object' used to convert or produce error
					require		optional, boolean true or 'exists', 'value', 'same as {field}', 'different than {field}', 'with {field}', 'without {field}'
					format		optional, one of 'domain', 'email', 'hostname' for strings or 'integer' for numbers to require that format
					regexp		optional, string values must match this regular expression
					values		optional, array of whitelisted values
					actions		optional, array of actions to perform on strings: 'lowercase', 'uppercase', 'strip'
				}, ... ]
			options - optional parameters for the function
				{
					prefix		string to be prefixed to error messages
				}

			results
				{
					data		converted version of original input object (_data)
					messages	array of error messages
					isModified	true if any fields were modified
				}

## Examples

	var validator = require('json-validator');
	
	var incomingData = {
		email_address:	'test@EXAMPLE.COM  ',
		password:		'abc123',
		password2:		'abc123',
		remember_me:	1
	};
	
	var fields = [
		{
			name:		'email_address',
			type:		'string',
			format:		'email',
			require:	'value',
			actions:	['strip', 'lowercase']
		}, {
			name:		'password',
			type:		'string',
			require:	'value'
		}, {
			name:		'password2',
			type:		'string',
			require:	'same as password'
		}, {
			name:		'remember_me',
			type:		'boolean'
		}
	];
	
	var output = validator.checkInput(incomingData, fields);
	
	// output = {
	//		data: {
	//			email_address:	'test@example.com',
	//			password:		'abc123',
	//			password2:		'abc123',
	//			remember_me:	true
	//		},
	//		messages: [],
	//		isModified: true
	// };
	

## Contributing
_(Nothing yet)_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Tim Moses  
Licensed under the GNU license.
