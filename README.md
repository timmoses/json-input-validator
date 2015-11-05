# json-validator

node.js module to clean and validate JSON input.

## Getting Started
Install the module with: `npm install json-validator`

```javascript
var validator = require('json-validator');
var argType = validator.type(arg); // Returns the type of arg
```

## Documentation
### Functions
.type(arg)
.isNumber(arg)
.isString(arg)
.isRegexp(arg)
.isFunction(arg)
.isArray(arg)
.isObject(arg)
.isArrayWithContent(arg)
.isObjectWithContent(arg)
.isDate(arg)
.isNothing(arg)
	isNothing returns true if input is null, undefined, or NaN
.isSomething(arg)
	isSomething returns true if input is not null, undefined, or NaN
.isEmpty(arg)
	isEmpty returns true if input is null, undefined, NaN, false, 0, or ''
.isNegativeNumber(arg)
.isInteger(arg)
.isPositiveInteger(arg)
.isNegativeInteger(arg)
.isDomain(arg)
.isHostname(arg)
.isEmail(arg)
.parseHttpURL(arg)
.isHttpURL(arg)
.parseARN(arg)
.isARN(arg)
.isSesARN(arg)
.stripObject(source)
.stripArray(source, isEmpty)
	stripObject and stripArray recursively remove key/value pairs or array elements with values that are
		null and undefined, empty objects, or empty arrays. Returns true if anything was removed. False, otherwise.
		Pass a second argument of true to also remove values that are false, 0, or ''.
.checkInput(data, fields, options)
	checkInput tests input object and returns converted object and errors
		var results = c.checkInput(_data, _fields, _options);
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
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Tim Moses  
Licensed under the GNU license.
