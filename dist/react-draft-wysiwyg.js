'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var require$$1 = require('draft-js');
var require$$1__default = _interopDefault(require$$1);
var require$$0 = require('immutable');
var require$$0__default = _interopDefault(require$$0);
var React = require('react');
var React__default = _interopDefault(React);

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var printWarning$1 = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning$1(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning$1(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

function emptyFunction() {}

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var draftjsUtils = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t(require$$1__default,require$$0__default);}("undefined"!=typeof self?self:commonjsGlobal,function(e,t){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r});},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(t,n){t.exports=e;},function(e,t,n){function r(e){var t=e.getSelection(),n=e.getCurrentContent(),r=t.getStartKey(),o=t.getEndKey(),i=n.getBlockMap();return i.toSeq().skipUntil(function(e,t){return t===r}).takeUntil(function(e,t){return t===o}).concat([[o,i.get(o)]])}function o(e){return r(e).toList()}function i(e){if(e)return o(e).get(0)}function l(e){if(e){var t=i(e),n=e.getCurrentContent(),r=n.getBlockMap().toSeq().toList(),o=0;if(r.forEach(function(e,n){e.get("key")===t.get("key")&&(o=n-1);}),o>-1)return r.get(o)}}function c(e){return e?e.getCurrentContent().getBlockMap().toList():new v.List}function a(e){var t=o(e);if(!t.some(function(e){return e.type!==t.get(0).type}))return t.get(0).type}function f(e){var t=p.RichUtils.tryToRemoveBlockStyle(e);return t?p.EditorState.push(e,t,"change-block-type"):e}function u(e){var t="",n=e.getSelection(),r=n.getAnchorOffset(),i=n.getFocusOffset(),l=o(e);if(l.size>0){if(n.getIsBackward()){var c=r;r=i,i=c;}for(var a=0;a<l.size;a+=1){var f=0===a?r:0,u=a===l.size-1?i:l.get(a).getText().length;t+=l.get(a).getText().slice(f,u);}}return t}function s(e){var t=e.getCurrentContent(),n=e.getSelection(),r=p.Modifier.removeRange(t,n,"forward"),o=r.getSelectionAfter(),i=r.getBlockForKey(o.getStartKey());return r=p.Modifier.insertText(r,o,"\n",i.getInlineStyleAt(o.getStartOffset()),null),p.EditorState.push(e,r,"insert-fragment")}function g(e){var t=p.Modifier.splitBlock(e.getCurrentContent(),e.getSelection());return f(p.EditorState.push(e,t,"split-block"))}function d(e){var t=e.getCurrentContent().getBlockMap().toList(),n=e.getSelection().merge({anchorKey:t.first().get("key"),anchorOffset:0,focusKey:t.last().get("key"),focusOffset:t.last().getLength()}),r=p.Modifier.removeRange(e.getCurrentContent(),n,"forward");return p.EditorState.push(e,r,"remove-range")}function S(e,t){var n=p.Modifier.setBlockData(e.getCurrentContent(),e.getSelection(),t);return p.EditorState.push(e,n,"change-block-data")}function y(e){var t=new v.Map({}),n=o(e);if(n&&n.size>0)for(var r=0;r<n.size;r+=1){var i=function(e){var r=n.get(e).getData();if(!r||0===r.size)return t=t.clear(),"break";if(0===e)t=r;else if(t.forEach(function(e,n){r.get(n)&&r.get(n)===e||(t=t.delete(n));}),0===t.size)return t=t.clear(),"break"}(r);if("break"===i)break}return t}Object.defineProperty(t,"__esModule",{value:!0}),t.blockRenderMap=void 0,t.getSelectedBlocksMap=r,t.getSelectedBlocksList=o,t.getSelectedBlock=i,t.getBlockBeforeSelectedBlock=l,t.getAllBlocks=c,t.getSelectedBlocksType=a,t.removeSelectedBlocksStyle=f,t.getSelectionText=u,t.addLineBreakRemovingSelection=s,t.insertNewUnstyledBlock=g,t.clearEditorContent=d,t.setBlockData=S,t.getSelectedBlocksMetadata=y;var p=n(0),v=n(6),k=(0, v.Map)({code:{element:"pre"}});t.blockRenderMap=p.DefaultDraftBlockRenderMap.merge(k);},function(e,t,n){function r(e){if(e){var t=e.getType();return "unordered-list-item"===t||"ordered-list-item"===t}return !1}function o(e,t,n){var r=e.getSelection(),o=e.getCurrentContent(),i=o.getBlockMap(),l=(0, c.getSelectedBlocksMap)(e).map(function(e){var r=e.getDepth()+t;return r=Math.max(0,Math.min(r,n)),e.set("depth",r)});return i=i.merge(l),o.merge({blockMap:i,selectionBefore:r,selectionAfter:r})}function i(e,t,n){var r=e.getSelection(),i=void 0;i=r.getIsBackward()?r.getFocusKey():r.getAnchorKey();var c=e.getCurrentContent(),a=c.getBlockForKey(i),f=a.getType();if("unordered-list-item"!==f&&"ordered-list-item"!==f)return e;var u=c.getBlockBefore(i);if(!u)return e;if(u.getType()!==f)return e;var s=a.getDepth();if(1===t&&s===n)return e;var g=Math.min(u.getDepth()+1,n),d=o(e,t,g);return l.EditorState.push(e,d,"adjust-depth")}Object.defineProperty(t,"__esModule",{value:!0}),t.isListBlock=r,t.changeDepth=i;var l=n(0),c=n(1);},function(e,t,n){e.exports=n(4);},function(e,t,n){var r=n(5),o=n(1),i=n(7),l=function(e){return e&&e.__esModule?e:{default:e}}(i),c=n(2);e.exports={getSelectedBlocksMap:o.getSelectedBlocksMap,getSelectedBlocksList:o.getSelectedBlocksList,getSelectedBlock:o.getSelectedBlock,getBlockBeforeSelectedBlock:o.getBlockBeforeSelectedBlock,getAllBlocks:o.getAllBlocks,getSelectedBlocksType:o.getSelectedBlocksType,removeSelectedBlocksStyle:o.removeSelectedBlocksStyle,getSelectionText:o.getSelectionText,addLineBreakRemovingSelection:o.addLineBreakRemovingSelection,insertNewUnstyledBlock:o.insertNewUnstyledBlock,clearEditorContent:o.clearEditorContent,setBlockData:o.setBlockData,getSelectedBlocksMetadata:o.getSelectedBlocksMetadata,blockRenderMap:o.blockRenderMap,getEntityRange:r.getEntityRange,getCustomStyleMap:r.getCustomStyleMap,toggleCustomInlineStyle:r.toggleCustomInlineStyle,getSelectionEntity:r.getSelectionEntity,extractInlineStyle:r.extractInlineStyle,removeAllInlineStyles:r.removeAllInlineStyles,getSelectionInlineStyle:r.getSelectionInlineStyle,getSelectionCustomInlineStyle:r.getSelectionCustomInlineStyle,handleNewLine:l.default,isListBlock:c.isListBlock,changeDepth:c.changeDepth};},function(e,t,n){function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e){var t=e.getSelection();if(t.isCollapsed()){var n={},r=e.getCurrentInlineStyle().toList().toJS();if(r)return ["BOLD","ITALIC","UNDERLINE","STRIKETHROUGH","CODE","SUPERSCRIPT","SUBSCRIPT"].forEach(function(e){n[e]=r.indexOf(e)>=0;}),n}var o=t.getStartOffset(),i=t.getEndOffset(),l=(0, p.getSelectedBlocksList)(e);if(l.size>0){var c=function(){for(var e={BOLD:!0,ITALIC:!0,UNDERLINE:!0,STRIKETHROUGH:!0,CODE:!0,SUPERSCRIPT:!0,SUBSCRIPT:!0},t=0;t<l.size;t+=1){var n=0===t?o:0,r=t===l.size-1?i:l.get(t).getText().length;n===r&&0===n?(n=1,r=2):n===r&&(n-=1);for(var c=n;c<r;c+=1)!function(n){var r=l.get(t).getInlineStyleAt(n);["BOLD","ITALIC","UNDERLINE","STRIKETHROUGH","CODE","SUPERSCRIPT","SUBSCRIPT"].forEach(function(t){e[t]=e[t]&&r.get(t)===t;});}(c);}return {v:e}}();if("object"===(void 0===c?"undefined":S(c)))return c.v}return {}}function i(e){var t=void 0,n=e.getSelection(),r=n.getStartOffset(),o=n.getEndOffset();r===o&&0===r?o=1:r===o&&(r-=1);for(var i=(0, p.getSelectedBlock)(e),l=r;l<o;l+=1){var c=i.getEntityAt(l);if(!c){t=void 0;break}if(l===r)t=c;else if(t!==c){t=void 0;break}}return t}function l(e,t){var n=(0, p.getSelectedBlock)(e),r=void 0;return n.findEntityRanges(function(e){return e.get("entity")===t},function(e,t){r={start:e,end:t,text:n.get("text").slice(e,t)};}),r}function c(e,t,n){var r=e.getSelection(),o=Object.keys(v[t]).reduce(function(e,t){return y.Modifier.removeInlineStyle(e,r,t)},e.getCurrentContent()),i=y.EditorState.push(e,o,"changeinline-style"),l=e.getCurrentInlineStyle();if(r.isCollapsed()&&(i=l.reduce(function(e,t){return y.RichUtils.toggleInlineStyle(e,t)},i)),"SUPERSCRIPT"===t||"SUBSCRIPT"==t)l.has(n)||(i=y.RichUtils.toggleInlineStyle(i,n));else{var c="bgcolor"===t?"backgroundColor":t;l.has(c+"-"+n)||(i=y.RichUtils.toggleInlineStyle(i,t.toLowerCase()+"-"+n),k(t,c,n));}return i}function a(e){if(e){e.getCurrentContent().getBlockMap().map(function(e){return e.get("characterList")}).toList().flatten().forEach(function(e){e&&0===e.indexOf("color-")?k("color","color",e.substr(6)):e&&0===e.indexOf("bgcolor-")?k("bgcolor","backgroundColor",e.substr(8)):e&&0===e.indexOf("fontsize-")?k("fontSize","fontSize",+e.substr(9)):e&&0===e.indexOf("fontfamily-")&&k("fontFamily","fontFamily",e.substr(11));});}}function f(e,t,n){var r=e.getInlineStyleAt(n).toList(),o=r.filter(function(e){return e.startsWith(t.toLowerCase())});if(o&&o.size>0)return o.get(0)}function u(e,t){var n=e.getCurrentInlineStyle().toList(),r=n.filter(function(e){return e.startsWith(t.toLowerCase())});if(r&&r.size>0)return r.get(0)}function s(e,t){if(e&&t&&t.length>0){var n=function(){var n=e.getSelection(),r={};if(n.isCollapsed())return t.forEach(function(t){r[t]=u(e,t);}),{v:r};var o=n.getStartOffset(),i=n.getEndOffset(),l=(0, p.getSelectedBlocksList)(e);if(l.size>0){for(var c=0;c<l.size;c+=1)!function(e){var n=0===e?o:0,c=e===l.size-1?i:l.get(e).getText().length;n===c&&0===n?(n=1,c=2):n===c&&(n-=1);for(var a=n;a<c;a+=1)!function(o){o===n?t.forEach(function(t){r[t]=f(l.get(e),t,o);}):t.forEach(function(t){r[t]&&r[t]!==f(l.get(e),t,o)&&(r[t]=void 0);});}(a);}(c);return {v:r}}}();if("object"===(void 0===n?"undefined":S(n)))return n.v}return {}}function g(e){var t=e.getCurrentInlineStyle(),n=e.getCurrentContent();return t.forEach(function(t){n=y.Modifier.removeInlineStyle(n,e.getSelection(),t);}),y.EditorState.push(e,n,"change-inline-style")}Object.defineProperty(t,"__esModule",{value:!0}),t.getCustomStyleMap=void 0;var d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);}return e},S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.getSelectionInlineStyle=o,t.getSelectionEntity=i,t.getEntityRange=l,t.toggleCustomInlineStyle=c,t.extractInlineStyle=a,t.getSelectionCustomInlineStyle=s,t.removeAllInlineStyles=g;var y=n(0),p=n(1),v={color:{},bgcolor:{},fontSize:{},fontFamily:{},CODE:{fontFamily:"monospace",wordWrap:"break-word",background:"#f1f1f1",borderRadius:3,padding:"1px 3px"},SUPERSCRIPT:{fontSize:11,position:"relative",top:-8,display:"inline-flex"},SUBSCRIPT:{fontSize:11,position:"relative",bottom:-8,display:"inline-flex"}},k=function(e,t,n){v[e][e.toLowerCase()+"-"+n]=r({},""+t,n);};t.getCustomStyleMap=function(){return d({},v.color,v.bgcolor,v.fontSize,v.fontFamily,{CODE:v.CODE,SUPERSCRIPT:v.SUPERSCRIPT,SUBSCRIPT:v.SUBSCRIPT})};},function(e,n){e.exports=t;},function(e,t,n){function r(e){var t=e.getSelection();if(t.isCollapsed()){var n=e.getCurrentContent(),r=t.getStartKey(),o=n.getBlockForKey(r);if(!(0, a.isListBlock)(o)&&"unstyled"!==o.getType()&&o.getLength()===t.getStartOffset())return (0, c.insertNewUnstyledBlock)(e);if((0, a.isListBlock)(o)&&0===o.getLength()){var i=o.getDepth();if(0===i)return (0, c.removeSelectedBlocksStyle)(e);if(i>0)return (0, a.changeDepth)(e,-1,i)}}}function o(e){return 13===e.which&&(e.getModifierState("Shift")||e.getModifierState("Alt")||e.getModifierState("Control"))}function i(e,t){if(o(t)){return e.getSelection().isCollapsed()?l.RichUtils.insertSoftNewline(e):(0, c.addLineBreakRemovingSelection)(e)}return r(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var l=n(0),c=n(1),a=n(2);}])});
});

unwrapExports(draftjsUtils);
var draftjsUtils_1 = draftjsUtils.changeDepth;
var draftjsUtils_2 = draftjsUtils.handleNewLine;
var draftjsUtils_3 = draftjsUtils.blockRenderMap;
var draftjsUtils_4 = draftjsUtils.getCustomStyleMap;
var draftjsUtils_5 = draftjsUtils.extractInlineStyle;
var draftjsUtils_6 = draftjsUtils.getSelectedBlock;
var draftjsUtils_7 = draftjsUtils.getSelectedBlocksType;
var draftjsUtils_8 = draftjsUtils.getSelectionInlineStyle;
var draftjsUtils_9 = draftjsUtils.toggleCustomInlineStyle;
var draftjsUtils_10 = draftjsUtils.getSelectionCustomInlineStyle;
var draftjsUtils_11 = draftjsUtils.getBlockBeforeSelectedBlock;
var draftjsUtils_12 = draftjsUtils.isListBlock;
var draftjsUtils_13 = draftjsUtils.setBlockData;
var draftjsUtils_14 = draftjsUtils.getSelectedBlocksMetadata;
var draftjsUtils_15 = draftjsUtils.getEntityRange;
var draftjsUtils_16 = draftjsUtils.getSelectionText;
var draftjsUtils_17 = draftjsUtils.getSelectionEntity;
var draftjsUtils_18 = draftjsUtils.draftjsUtils;

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var ModalHandler = function ModalHandler() {
  var _this = this;

  classCallCheck(this, ModalHandler);
  this.callBacks = [];
  this.suggestionCallback = undefined;
  this.editorFlag = false;
  this.suggestionFlag = false;

  this.closeAllModals = function (event) {
    _this.callBacks.forEach(function (callBack) {
      callBack(event);
    });
  };

  this.init = function (wrapperId) {
    var wrapper = document.getElementById(wrapperId); // eslint-disable-line no-undef
    if (wrapper) {
      wrapper.addEventListener('click', function () {
        _this.editorFlag = true;
      });
    }
    if (document) {
      document.addEventListener('click', function () {
        // eslint-disable-line no-undef
        if (!_this.editorFlag) {
          _this.closeAllModals();
          if (_this.suggestionCallback) {
            _this.suggestionCallback();
          }
        } else {
          _this.editorFlag = false;
        }
      });
      document.addEventListener('keydown', function (event) {
        // eslint-disable-line no-undef
        if (event.key === 'Escape') {
          _this.closeAllModals();
        }
      });
    }
  };

  this.onEditorClick = function () {
    _this.closeModals();
    if (!_this.suggestionFlag && _this.suggestionCallback) {
      _this.suggestionCallback();
    } else {
      _this.suggestionFlag = false;
    }
  };

  this.closeModals = function (event) {
    _this.closeAllModals(event);
  };

  this.registerCallBack = function (callBack) {
    _this.callBacks.push(callBack);
  };

  this.deregisterCallBack = function (callBack) {
    _this.callBacks = _this.callBacks.filter(function (cb) {
      return cb !== callBack;
    });
  };

  this.setSuggestionCallback = function (callBack) {
    _this.suggestionCallback = callBack;
  };

  this.removeSuggestionCallback = function () {
    _this.suggestionCallback = undefined;
  };

  this.onSuggestionClick = function () {
    _this.suggestionFlag = true;
  };
};

var FocusHandler = function FocusHandler() {
  var _this = this;

  classCallCheck(this, FocusHandler);
  this.inputFocused = false;
  this.editorMouseDown = false;

  this.onEditorMouseDown = function () {
    _this.editorFocused = true;
  };

  this.onInputMouseDown = function () {
    _this.inputFocused = true;
  };

  this.isEditorBlur = function (event) {
    if ((event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL') && !_this.editorFocused) {
      _this.inputFocused = false;
      return true;
    } else if ((event.target.tagName !== 'INPUT' || event.target.tagName !== 'LABEL') && !_this.inputFocused) {
      _this.editorFocused = false;
      return true;
    }
    return false;
  };

  this.isEditorFocused = function () {
    if (!_this.inputFocused) {
      return true;
    }
    _this.inputFocused = false;
    return false;
  };

  this.isToolbarFocused = function () {
    if (!_this.editorFocused) {
      return true;
    }
    _this.editorFocused = false;
    return false;
  };

  this.isInputFocused = function () {
    return _this.inputFocused;
  };
};

var callBacks = [];

var KeyDownHandler = {
  onKeyDown: function onKeyDown(event) {
    callBacks.forEach(function (callBack) {
      callBack(event);
    });
  },

  registerCallBack: function registerCallBack(callBack) {
    callBacks.push(callBack);
  },

  deregisterCallBack: function deregisterCallBack(callBack) {
    callBacks = callBacks.filter(function (cb) {
      return cb !== callBack;
    });
  }
};

var suggestionDropdownOpen = void 0;

var SuggestionHandler = {
  open: function open() {
    suggestionDropdownOpen = true;
  },

  close: function close() {
    suggestionDropdownOpen = false;
  },

  isOpen: function isOpen() {
    return suggestionDropdownOpen;
  }
};

// The function will return block inline styles using block level meta-data
function blockStyleFn(block) {
  var blockAlignment = block.getData() && block.getData().get('text-align');
  if (blockAlignment) {
    return 'rdw-' + blockAlignment + '-aligned-block';
  }
  return '';
}

/**
* Utility function to execute callback for eack key->value pair.
*/
function forEach(obj, callback) {
  if (obj) {
    for (var key in obj) {
      // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key]);
      }
    }
  }
}

function hasProperty(obj, property) {
  var result = false;
  if (obj) {
    for (var key in obj) {
      // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(obj, key) && property === key) {
        result = true;
        break;
      }
    }
  }
  return result;
}

/**
* The function will return true for simple javascript object,
* which is not any other built in type like Array.
*/
function isMap(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
* The function will return filter out props fron and return new props.
*/
function filter(obj, keys) {
  var filteredKeys = Object.keys(obj).filter(function (key) {
    return keys.indexOf(key) < 0;
  });
  var filteredObject = {};
  if (filteredKeys && filteredKeys.length > 0) {
    filteredKeys.forEach(function (key) {
      filteredObject[key] = obj[key];
    });
  }
  return filteredObject;
}

function stopPropagation(event) {
  event.stopPropagation();
}

/**
* This function is used when displaying options in drop-down.
* Icon for first available options is used in drop-down placeholder.
*/
var getFirstIcon = function getFirstIcon(config) {
  return config[config.options[0]].icon;
};

/**
* The function is used to recursively merge toolbar options.
* It assumes all the options are peresent in obj1.
* It recursively merges objects but not arrays.
*/
var mergeRecursive = function mergeRecursive(obj1, obj2) {
  if (obj1 && obj2 === undefined) {
    return obj1;
  }
  var mergedValue = {};
  forEach(obj1, function (key, value) {
    if (isMap(value)) {
      mergedValue[key] = mergeRecursive(value, obj2[key]);
    } else {
      mergedValue[key] = obj2[key] !== undefined ? obj2[key] : value;
    }
  });
  return mergedValue;
};

var exports$1 = {
  getFirstIcon: getFirstIcon,
  mergeRecursive: mergeRecursive
};

module.exports = exports$1;

// todo: writing test cases for these methods and new methods added in common.js

var htmlToDraftjs = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t(require$$0__default,require$$1__default);}("undefined"!=typeof self?self:commonjsGlobal,function(e,t){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r});},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(t,n){t.exports=e;},function(e,n){e.exports=t;},function(e,t,n){e.exports=n(3);},function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,r,o,u){var a=e.nodeName.toLowerCase();if(u){var c=u(a,e);if(c){var s=l.Entity.__create(c.type,c.mutability,c.data||{});return {chunk:(0, d.getAtomicBlockChunk)(s)}}}if("#text"===a&&"\n"!==e.textContent)return (0, d.createTextChunk)(e,t,o);if("br"===a)return {chunk:(0, d.getSoftNewlineChunk)()};if("img"===a&&e instanceof HTMLImageElement){var f={};f.src=e.getAttribute?e.getAttribute("src")||e.src:e.src,f.alt=e.alt,f.height=e.style.height,f.width=e.style.width,e.style.float&&(f.alignment=e.style.float);var m=l.Entity.__create("IMAGE","MUTABLE",f);return {chunk:(0, d.getAtomicBlockChunk)(m)}}if("iframe"===a&&e instanceof HTMLIFrameElement){var k={};k.src=e.getAttribute?e.getAttribute("src")||e.src:e.src,k.height=e.height,k.width=e.width;var y=l.Entity.__create("EMBEDDED_LINK","MUTABLE",k);return {chunk:(0, d.getAtomicBlockChunk)(y)}}var b=(0, h.default)(a,r),x=void 0;b&&("ul"===a||"ol"===a?(r=a,n+=1):("unordered-list-item"!==b&&"ordered-list-item"!==b&&(r="",n=-1),M?(x=(0, d.getFirstBlockChunk)(b,(0, g.default)(e)),M=!1):x=(0, d.getBlockDividerChunk)(b,n,(0, g.default)(e)))),x||(x=(0, d.getEmptyChunk)()),t=(0, p.default)(a,e,t);for(var C=e.firstChild;C;){var E=(0, v.default)(C),w=i(C,t,n,r,E||o,u),_=w.chunk;x=(0, d.joinChunks)(x,_);C=C.nextSibling;}return {chunk:x}}function o(e,t){var n=e.trim().replace(x,b),r=(0, s.default)(n);return r?(M=!0,{chunk:i(r,new a.OrderedSet,-1,"",void 0,t).chunk}):null}function u(e,t){var n=o(e,t);if(n){var r=n.chunk,i=new a.OrderedMap({});r.entities&&r.entities.forEach(function(e){e&&(i=i.set(e,l.Entity.__get(e)));});var u=0;return {contentBlocks:r.text.split("\r").map(function(e,t){var n=u+e.length,i=r&&r.inlines.slice(u,n),o=r&&r.entities.slice(u,n),c=new a.List(i.map(function(e,t){var n={style:e,entity:null};return o[t]&&(n.entity=o[t]),l.CharacterMetadata.create(n)}));return u=n,new l.ContentBlock({key:(0, l.genKey)(),type:r&&r.blocks[t]&&r.blocks[t].type||"unstyled",depth:r&&r.blocks[t]&&r.blocks[t].depth,data:r&&r.blocks[t]&&r.blocks[t].data||new a.Map({}),text:e,characterList:c})}),entityMap:i}}return null}Object.defineProperty(t,"__esModule",{value:!0}),t.default=u;var l=n(1),a=n(0),c=n(4),s=r(c),d=n(5),f=n(6),h=r(f),m=n(7),p=r(m),k=n(8),g=r(k),y=n(9),v=r(y),b=" ",x=new RegExp("&nbsp;","g"),M=!0;},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){var t,n=null;return document.implementation&&document.implementation.createHTMLDocument&&(t=document.implementation.createHTMLDocument("foo"),t.documentElement.innerHTML=e,n=t.getElementsByTagName("body")[0]),n};t.default=r;},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.joinChunks=t.getAtomicBlockChunk=t.getBlockDividerChunk=t.getFirstBlockChunk=t.getEmptyChunk=t.getSoftNewlineChunk=t.createTextChunk=t.getWhitespaceChunk=void 0;var r=n(0),i=t.getWhitespaceChunk=function(e){return {text:" ",inlines:[new r.OrderedSet],entities:[e],blocks:[]}};t.createTextChunk=function(e,t,n){var r=e.textContent;return ""===r.trim()?{chunk:i(n)}:{chunk:{text:r,inlines:Array(r.length).fill(t),entities:Array(r.length).fill(n),blocks:[]}}},t.getSoftNewlineChunk=function(){return {text:"\n",inlines:[new r.OrderedSet],entities:new Array(1),blocks:[]}},t.getEmptyChunk=function(){return {text:"",inlines:[],entities:[],blocks:[]}},t.getFirstBlockChunk=function(e,t){return {text:"",inlines:[],entities:[],blocks:[{type:e,depth:0,data:t||new r.Map({})}]}},t.getBlockDividerChunk=function(e,t,n){return {text:"\r",inlines:[],entities:[],blocks:[{type:e,depth:Math.max(0,Math.min(4,t)),data:n||new r.Map({})}]}},t.getAtomicBlockChunk=function(e){return {text:"\r ",inlines:[new r.OrderedSet],entities:[e],blocks:[{type:"atomic",depth:0,data:new r.Map({})}]}},t.joinChunks=function(e,t){return {text:e.text+t.text,inlines:e.inlines.concat(t.inlines),entities:e.entities.concat(t.entities),blocks:e.blocks.concat(t.blocks)}};},function(e,t,n){function r(e,t){var n=o.filter(function(n){return n.element===e&&(!n.wrapper||n.wrapper===t)||n.wrapper===e||n.aliasedElements&&n.aliasedElements.indexOf(e)>-1}).keySeq().toSet().toArray();if(1===n.length)return n[0]}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=n(0),o=new i.Map({"header-one":{element:"h1"},"header-two":{element:"h2"},"header-three":{element:"h3"},"header-four":{element:"h4"},"header-five":{element:"h5"},"header-six":{element:"h6"},"unordered-list-item":{element:"li",wrapper:"ul"},"ordered-list-item":{element:"li",wrapper:"ol"},blockquote:{element:"blockquote"},code:{element:"pre"},atomic:{element:"figure"},unstyled:{element:"p",aliasedElements:["div"]}});},function(e,t,n){function r(e,t,n){var r=i[e],o=void 0;if(r)o=n.add(r).toOrderedSet();else if(t instanceof HTMLElement){o=n;var u=t;o=o.withMutations(function(e){var t=u.style.color,n=u.style.backgroundColor,r=u.style.fontSize,i=u.style.fontFamily.replace(/^"|"$/g,"");t&&e.add("color-"+t.replace(/ /g,"")),n&&e.add("bgcolor-"+n.replace(/ /g,"")),r&&e.add("fontsize-"+r.replace(/px$/g,"")),i&&e.add("fontfamily-"+i);}).toOrderedSet();}return o}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i={code:"CODE",del:"STRIKETHROUGH",em:"ITALIC",strong:"BOLD",ins:"UNDERLINE",sub:"SUBSCRIPT",sup:"SUPERSCRIPT"};},function(e,t,n){function r(e){if(e.style.textAlign)return new i.Map({"text-align":e.style.textAlign})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=n(0);},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=function(e){var t=void 0;if(e instanceof HTMLAnchorElement){var n={};e.dataset&&void 0!==e.dataset.mention?(n.url=e.href,n.text=e.innerHTML,n.value=e.dataset.value,t=r.Entity.__create("MENTION","IMMUTABLE",n)):(n.url=e.getAttribute?e.getAttribute("href")||e.href:e.href,n.title=e.innerHTML,n.targetOption=e.target,t=r.Entity.__create("LINK","MUTABLE",n));}return t};t.default=i;}])});
});

var htmlToDraft = unwrapExports(htmlToDraftjs);
var htmlToDraftjs_1 = htmlToDraftjs.htmlToDraftjs;

var handlePastedText = function handlePastedText(text, html, editorState, onChange) {
  var selectedBlock = draftjsUtils_6(editorState);
  if (selectedBlock && selectedBlock.type === "code") {
    var contentState = require$$1.Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), text, editorState.getCurrentInlineStyle());
    onChange(require$$1.EditorState.push(editorState, contentState, "insert-characters"));
    return true;
  } else if (html) {
    var contentBlock = htmlToDraft(html);
    var _contentState = editorState.getCurrentContent();
    contentBlock.entityMap.forEach(function (value, key) {
      _contentState = _contentState.mergeEntityData(key, value);
    });
    _contentState = require$$1.Modifier.replaceWithFragment(_contentState, editorState.getSelection(), new require$$0.List(contentBlock.contentBlocks));
    onChange(require$$1.EditorState.push(editorState, _contentState, "insert-characters"));
    return true;
  }
  return false;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".styles_rdw-option-wrapper__2zViI {\n  border: 1px solid #F1F1F1;\n  padding: 5px;\n  min-width: 25px;\n  height: 20px;\n  border-radius: 2px;\n  margin: 0 4px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  background: white;\n  text-transform: capitalize;\n}\n.styles_rdw-option-wrapper__2zViI:hover {\n  box-shadow: 1px 1px 0px #BFBDBD;\n}\n.styles_rdw-option-wrapper__2zViI:active {\n  box-shadow: 1px 1px 0px #BFBDBD inset;\n}\n.styles_rdw-option-active__2lWPn {\n  box-shadow: 1px 1px 0px #BFBDBD inset;\n}\n.styles_rdw-option-disabled__1lsss {\n  opacity: 0.3;\n  cursor: default;\n}\n";
styleInject(css);

var Option = function (_Component) {
  inherits(Option, _Component);

  function Option() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Option);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Option.__proto__ || Object.getPrototypeOf(Option)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onClick = _this$props.onClick,
          value = _this$props.value;

      if (!disabled) {
        onClick(value);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Option, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          activeClassName = _props.activeClassName,
          active = _props.active,
          disabled = _props.disabled,
          title = _props.title;

      return React__default.createElement(
        'div',
        {
          className: classnames('rdw-option-wrapper', className, (_classNames = {}, defineProperty(_classNames, 'rdw-option-active ' + activeClassName, active), defineProperty(_classNames, 'rdw-option-disabled', disabled), _classNames)),
          onClick: this.onClick,
          'aria-selected': active,
          title: title
        },
        children
      );
    }
  }]);
  return Option;
}(React.Component);

Option.propTypes = {
  onClick: propTypes.func.isRequired,
  children: propTypes.any,
  value: propTypes.string,
  className: propTypes.string,
  activeClassName: propTypes.string,
  active: propTypes.bool,
  disabled: propTypes.bool,
  title: propTypes.string
};

var css$1 = ".styles_rdw-dropdown-wrapper__3W85T {\n  height: 30px;\n  background: white;\n  cursor: pointer;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  margin: 0 3px;\n  text-transform: capitalize;\n  background: white;\n}\n.styles_rdw-dropdown-wrapper__3W85T:focus {\n  outline: none;\n}\n.styles_rdw-dropdown-wrapper__3W85T:hover {\n  box-shadow: 1px 1px 0px #BFBDBD;\n  background-color: #FFFFFF;\n}\n.styles_rdw-dropdown-wrapper__3W85T:active {\n  box-shadow: 1px 1px 0px #BFBDBD inset;\n}\n.styles_rdw-dropdown-carettoopen__3Qiui {\n  height: 0px;\n  width: 0px;\n  position: absolute;\n  top: 35%;\n  right: 10%;\n  border-top: 6px solid black;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n}\n.styles_rdw-dropdown-carettoclose__2Un8X {\n  height: 0px;\n  width: 0px;\n  position: absolute;\n  top: 35%;\n  right: 10%;\n  border-bottom: 6px solid black;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n}\n.styles_rdw-dropdown-selectedtext__1ObKy {\n  display: flex;\n  position: relative;\n  height: 100%;\n  align-items: center;\n  padding: 0 5px;\n}\n.styles_rdw-dropdown-optionwrapper__1pxn6 {\n  z-index: 100;\n  position: relative;\n  border: 1px solid #F1F1F1;\n  width: 98%;\n  background: white;\n  border-radius: 2px;\n  margin: 0;\n  padding: 0;\n  max-height: 250px;\n  overflow-y: scroll;\n}\n.styles_rdw-dropdown-optionwrapper__1pxn6:hover {\n  box-shadow: 1px 1px 0px #BFBDBD;\n  background-color: #FFFFFF;\n}\n";
styleInject(css$1);

var Dropdown = function (_Component) {
  inherits(Dropdown, _Component);

  function Dropdown() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      highlighted: -1
    }, _this.onChange = function (value) {
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(value);
      }
      _this.toggleExpansion();
    }, _this.setHighlighted = function (highlighted) {
      _this.setState({
        highlighted: highlighted
      });
    }, _this.toggleExpansion = function () {
      var _this$props = _this.props,
          doExpand = _this$props.doExpand,
          doCollapse = _this$props.doCollapse,
          expanded = _this$props.expanded;

      if (expanded) {
        doCollapse();
      } else {
        doExpand();
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Dropdown, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.expanded && !props.expanded) {
        this.setState({
          highlighted: -1
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          expanded = _props.expanded,
          children = _props.children,
          className = _props.className,
          optionWrapperClassName = _props.optionWrapperClassName,
          ariaLabel = _props.ariaLabel,
          onExpandEvent = _props.onExpandEvent,
          title = _props.title;
      var highlighted = this.state.highlighted;

      var options = children.slice(1, children.length);
      return React__default.createElement(
        'div',
        {
          className: classnames('rdw-dropdown-wrapper', className),
          'aria-expanded': expanded,
          'aria-label': ariaLabel || 'rdw-dropdown'
        },
        React__default.createElement(
          'a',
          {
            className: 'rdw-dropdown-selectedtext',
            onClick: onExpandEvent,
            title: title
          },
          children[0],
          React__default.createElement('div', {
            className: classnames({
              'rdw-dropdown-carettoclose': expanded,
              'rdw-dropdown-carettoopen': !expanded
            })
          })
        ),
        expanded ? React__default.createElement(
          'ul',
          {
            className: classnames('rdw-dropdown-optionwrapper', optionWrapperClassName),
            onClick: stopPropagation
          },
          React__default.Children.map(options, function (option, index) {
            var temp = option && React__default.cloneElement(option, {
              onSelect: _this2.onChange,
              highlighted: highlighted === index,
              setHighlighted: _this2.setHighlighted,
              index: index
            });
            return temp;
          })
        ) : undefined
      );
    }
  }]);
  return Dropdown;
}(React.Component);

Dropdown.propTypes = {
  children: propTypes.any,
  onChange: propTypes.func,
  className: propTypes.string,
  expanded: propTypes.bool,
  doExpand: propTypes.func,
  doCollapse: propTypes.func,
  onExpandEvent: propTypes.func,
  optionWrapperClassName: propTypes.string,
  ariaLabel: propTypes.string,
  title: propTypes.string
};

var css$2 = ".styles_rdw-dropdownoption-default__3lCp1 {\n  min-height: 25px;\n  display: flex;\n  align-items: center;\n  padding: 0 5px;\n}\n.styles_rdw-dropdownoption-highlighted__Pwz0L {\n  background: #F1F1F1;\n}\n.styles_rdw-dropdownoption-active__24vk6 {\n  background: #f5f5f5;\n}\n.styles_rdw-dropdownoption-disabled__7Pjd- {\n  opacity: 0.3;\n  cursor: default;\n}\n";
styleInject(css$2);

var DropDownOption = function (_Component) {
  inherits(DropDownOption, _Component);

  function DropDownOption() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, DropDownOption);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = DropDownOption.__proto__ || Object.getPrototypeOf(DropDownOption)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          onClick = _this$props.onClick,
          value = _this$props.value,
          disabled = _this$props.disabled;

      if (!disabled) {
        if (onSelect) {
          onSelect(value);
        }
        if (onClick) {
          event.stopPropagation();
          onClick(value);
        }
      }
    }, _this.setHighlighted = function () {
      var _this$props2 = _this.props,
          setHighlighted = _this$props2.setHighlighted,
          index = _this$props2.index;

      setHighlighted(index);
    }, _this.resetHighlighted = function () {
      var setHighlighted = _this.props.setHighlighted;

      setHighlighted(-1);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(DropDownOption, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          children = _props.children,
          active = _props.active,
          disabled = _props.disabled,
          highlighted = _props.highlighted,
          className = _props.className,
          activeClassName = _props.activeClassName,
          disabledClassName = _props.disabledClassName,
          highlightedClassName = _props.highlightedClassName,
          title = _props.title;

      return React__default.createElement(
        'li',
        {
          className: classnames('rdw-dropdownoption-default', className, (_classNames = {}, defineProperty(_classNames, 'rdw-dropdownoption-active ' + activeClassName, active), defineProperty(_classNames, 'rdw-dropdownoption-highlighted ' + highlightedClassName, highlighted), defineProperty(_classNames, 'rdw-dropdownoption-disabled ' + disabledClassName, disabled), _classNames)),
          onMouseEnter: this.setHighlighted,
          onMouseLeave: this.resetHighlighted,
          onClick: this.onClick,
          title: title
        },
        children
      );
    }
  }]);
  return DropDownOption;
}(React.Component);
// todo: review classname use above.


DropDownOption.propTypes = {
  children: propTypes.any,
  value: propTypes.any,
  onClick: propTypes.func,
  onSelect: propTypes.func,
  setHighlighted: propTypes.func,
  index: propTypes.number,
  disabled: propTypes.bool,
  active: propTypes.bool,
  highlighted: propTypes.bool,
  className: propTypes.string,
  activeClassName: propTypes.string,
  disabledClassName: propTypes.string,
  highlightedClassName: propTypes.string,
  title: propTypes.string
};

var exports$2 = {
  Dropdown: Dropdown,
  DropdownOption: DropDownOption
};

module.exports = exports$2;

var css$3 = ".styles_rdw-inline-wrapper__1P4_m {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.styles_rdw-inline-dropdown__2HulI {\n  width: 50px;\n}\n.styles_rdw-inline-dropdownoption__3y2-H {\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n";
styleInject(css$3);

var Dropdown$1 = exports$2.Dropdown;
var DropdownOption = exports$2.DropdownOption;

var Inline = function (_Component) {
  inherits(Inline, _Component);

  function Inline() {
    classCallCheck(this, Inline);
    return possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
  }

  createClass(Inline, [{
    key: 'renderInFlatList',
    value: function renderInFlatList() {
      var _props = this.props,
          config = _props.config,
          currentState = _props.currentState,
          onChange = _props.onChange,
          translations = _props.translations;

      return React__default.createElement(
        'div',
        { className: classnames('rdw-inline-wrapper', config.className), 'aria-label': 'rdw-inline-control' },
        config.options.map(function (style, index) {
          return React__default.createElement(
            Option,
            {
              key: index,
              value: style,
              onClick: onChange,
              className: classnames(config[style].className),
              active: currentState[style] === true || style === 'MONOSPACE' && currentState.CODE,
              title: config[style].title || translations['components.controls.inline.' + style]
            },
            React__default.createElement('img', {
              alt: '',
              src: config[style].icon
            })
          );
        })
      );
    }
  }, {
    key: 'renderInDropDown',
    value: function renderInDropDown() {
      var _props2 = this.props,
          config = _props2.config,
          expanded = _props2.expanded,
          doExpand = _props2.doExpand,
          onExpandEvent = _props2.onExpandEvent,
          doCollapse = _props2.doCollapse,
          currentState = _props2.currentState,
          onChange = _props2.onChange,
          translations = _props2.translations;
      var className = config.className,
          dropdownClassName = config.dropdownClassName,
          title = config.title;

      return React__default.createElement(
        Dropdown$1,
        {
          className: classnames('rdw-inline-dropdown', className),
          optionWrapperClassName: classnames(dropdownClassName),
          onChange: onChange,
          expanded: expanded,
          doExpand: doExpand,
          doCollapse: doCollapse,
          onExpandEvent: onExpandEvent,
          'aria-label': 'rdw-inline-control',
          title: title
        },
        React__default.createElement('img', {
          src: getFirstIcon(config),
          alt: ''
        }),
        config.options.map(function (style, index) {
          return React__default.createElement(
            DropdownOption,
            {
              key: index,
              value: style,
              className: classnames('rdw-inline-dropdownoption', config[style].className),
              active: currentState[style] === true || style === 'MONOSPACE' && currentState.CODE,
              title: config[style].title || translations['components.controls.inline.' + style]
            },
            React__default.createElement('img', {
              src: config[style].icon,
              alt: ''
            })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var inDropdown = this.props.config.inDropdown;

      if (inDropdown) {
        return this.renderInDropDown();
      }
      return this.renderInFlatList();
    }
  }]);
  return Inline;
}(React.Component);

// todo: make subscript less low


Inline.propTypes = {
  expanded: propTypes.bool,
  doExpand: propTypes.func,
  doCollapse: propTypes.func,
  onExpandEvent: propTypes.func,
  config: propTypes.object,
  onChange: propTypes.func,
  currentState: propTypes.object,
  translations: propTypes.object
};

var Inline$1 = function (_Component) {
  inherits(Inline$$1, _Component);

  function Inline$$1() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Inline$$1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Inline$$1.__proto__ || Object.getPrototypeOf(Inline$$1)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentStyles: {}
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.toggleInlineStyle = function (style) {
      var newStyle = style === 'monospace' ? 'CODE' : style.toUpperCase();
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var newState = require$$1.RichUtils.toggleInlineStyle(editorState, newStyle);
      if (style === 'subscript' || style === 'superscript') {
        var removeStyle = style === 'subscript' ? 'SUPERSCRIPT' : 'SUBSCRIPT';
        var contentState = require$$1.Modifier.removeInlineStyle(newState.getCurrentContent(), newState.getSelection(), removeStyle);
        newState = require$$1.EditorState.push(newState, contentState, 'change-inline-style');
      }
      if (newState) {
        onChange(newState);
      }
    }, _this.changeKeys = function (style) {
      if (style) {
        var st = {};
        forEach(style, function (key, value) {
          st[key === 'CODE' ? 'monospace' : key.toLowerCase()] = value;
        });
        return st;
      }
      return undefined;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Inline$$1, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          currentStyles: this.changeKeys(draftjsUtils_8(editorState))
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        this.setState({
          currentStyles: this.changeKeys(draftjsUtils_8(properties.editorState))
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          config = _props2.config,
          translations = _props2.translations;
      var _state = this.state,
          expanded = _state.expanded,
          currentStyles = _state.currentStyles;

      var InlineComponent = config.component || Inline;
      return React__default.createElement(InlineComponent, {
        config: config,
        translations: translations,
        currentState: currentStyles,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        onChange: this.toggleInlineStyle
      });
    }
  }]);
  return Inline$$1;
}(React.Component);
// make subscript less low


Inline$1.propTypes = {
  onChange: propTypes.func.isRequired,
  editorState: propTypes.object.isRequired,
  modalHandler: propTypes.object,
  config: propTypes.object,
  translations: propTypes.object
};

var css$4 = ".styles_rdw-block-wrapper__nEfEV {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.styles_rdw-block-dropdown__3dLTo {\n  width: 110px;\n}\n";
styleInject(css$4);

var Dropdown$2 = exports$2.Dropdown;
var DropdownOption$1 = exports$2.DropdownOption;

var LayoutComponent = function (_Component) {
  inherits(LayoutComponent, _Component);

  function LayoutComponent(props) {
    classCallCheck(this, LayoutComponent);

    var _this = possibleConstructorReturn(this, (LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call(this, props));

    _this.getBlockTypes = function (translations) {
      return [{ label: 'Normal', displayName: translations['components.controls.blocktype.normal'] }, { label: 'H1', displayName: translations['components.controls.blocktype.h1'] }, { label: 'H2', displayName: translations['components.controls.blocktype.h2'] }, { label: 'H3', displayName: translations['components.controls.blocktype.h3'] }, { label: 'H4', displayName: translations['components.controls.blocktype.h4'] }, { label: 'H5', displayName: translations['components.controls.blocktype.h5'] }, { label: 'H6', displayName: translations['components.controls.blocktype.h6'] }, { label: 'Blockquote', displayName: translations['components.controls.blocktype.blockquote'] }, { label: 'Code', displayName: translations['components.controls.blocktype.code'] }];
    };

    _this.state = {
      blockTypes: _this.getBlockTypes(props.translations)
    };
    return _this;
  }

  createClass(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (this.props.translations !== properties.translations) {
        this.setState({
          blockTypes: this.getBlockTypes(properties.translations)
        });
      }
    }
  }, {
    key: 'renderFlat',
    value: function renderFlat(blocks) {
      var _props = this.props,
          className = _props.config.className,
          onChange = _props.onChange,
          blockType = _props.currentState.blockType;

      return React__default.createElement(
        'div',
        { className: classnames('rdw-inline-wrapper', className) },
        blocks.map(function (block, index) {
          return React__default.createElement(
            Option,
            {
              key: index,
              value: block.label,
              active: blockType === block.label,
              onClick: onChange
            },
            block.displayName
          );
        })
      );
    }
  }, {
    key: 'renderInDropdown',
    value: function renderInDropdown(blocks) {
      var _props2 = this.props,
          _props2$config = _props2.config,
          className = _props2$config.className,
          dropdownClassName = _props2$config.dropdownClassName,
          title = _props2$config.title,
          blockType = _props2.currentState.blockType,
          expanded = _props2.expanded,
          doExpand = _props2.doExpand,
          onExpandEvent = _props2.onExpandEvent,
          doCollapse = _props2.doCollapse,
          onChange = _props2.onChange,
          translations = _props2.translations;
      var blockTypes = this.state.blockTypes;

      var currentBlockData = blockTypes.filter(function (blk) {
        return blk.label === blockType;
      });
      var currentLabel = currentBlockData && currentBlockData[0] && currentBlockData[0].displayName;
      return React__default.createElement(
        'div',
        { className: 'rdw-block-wrapper', 'aria-label': 'rdw-block-control' },
        React__default.createElement(
          Dropdown$2,
          {
            className: classnames('rdw-block-dropdown', className),
            optionWrapperClassName: classnames(dropdownClassName),
            onChange: onChange,
            expanded: expanded,
            doExpand: doExpand,
            doCollapse: doCollapse,
            onExpandEvent: onExpandEvent,
            title: title || translations['components.controls.blocktype.blocktype']
          },
          React__default.createElement(
            'span',
            null,
            currentLabel || translations['components.controls.blocktype.blocktype']
          ),
          blocks.map(function (block, index) {
            return React__default.createElement(
              DropdownOption$1,
              {
                active: blockType === block.label,
                value: block.label,
                key: index
              },
              block.displayName
            );
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var config = this.props.config;
      var inDropdown = config.inDropdown;
      var blockTypes = this.state.blockTypes;

      var blocks = blockTypes.filter(function (_ref) {
        var label = _ref.label;
        return config.options.includes(label);
      });
      return inDropdown ? this.renderInDropdown(blocks) : this.renderFlat(blocks);
    }
  }]);
  return LayoutComponent;
}(React.Component);

LayoutComponent.propTypes = {
  expanded: propTypes.bool,
  onExpandEvent: propTypes.func,
  doExpand: propTypes.func,
  doCollapse: propTypes.func,
  onChange: propTypes.func,
  config: propTypes.object,
  currentState: propTypes.object,
  translations: propTypes.object
};

var BlockType = function (_Component) {
  inherits(BlockType, _Component);

  function BlockType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, BlockType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = BlockType.__proto__ || Object.getPrototypeOf(BlockType)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false,
      currentBlockType: 'unstyled'
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.blocksTypes = [{ label: 'Normal', style: 'unstyled' }, { label: 'H1', style: 'header-one' }, { label: 'H2', style: 'header-two' }, { label: 'H3', style: 'header-three' }, { label: 'H4', style: 'header-four' }, { label: 'H5', style: 'header-five' }, { label: 'H6', style: 'header-six' }, { label: 'Blockquote', style: 'blockquote' }, { label: 'Code', style: 'code' }], _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.toggleBlockType = function (blockType) {
      var blockTypeValue = _this.blocksTypes.find(function (bt) {
        return bt.label === blockType;
      }).style;
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var newState = require$$1.RichUtils.toggleBlockType(editorState, blockTypeValue);
      if (newState) {
        onChange(newState);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(BlockType, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          currentBlockType: draftjsUtils_7(editorState)
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        this.setState({
          currentBlockType: draftjsUtils_7(properties.editorState)
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          config = _props2.config,
          translations = _props2.translations;
      var _state = this.state,
          expanded = _state.expanded,
          currentBlockType = _state.currentBlockType;

      var BlockTypeComponent = config.component || LayoutComponent;
      var blockType = this.blocksTypes.find(function (bt) {
        return bt.style === currentBlockType;
      });
      return React__default.createElement(BlockTypeComponent, {
        config: config,
        translations: translations,
        currentState: { blockType: blockType && blockType.label },
        onChange: this.toggleBlockType,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse
      });
    }
  }]);
  return BlockType;
}(React.Component);

BlockType.propTypes = {
  onChange: propTypes.func.isRequired,
  editorState: propTypes.object,
  modalHandler: propTypes.object,
  config: propTypes.object,
  translations: propTypes.object
};

var css$5 = ".styles_rdw-fontsize-wrapper__1wR6G {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.styles_rdw-fontsize-dropdown__nOiqS {\n  min-width: 40px;\n}\n.styles_rdw-fontsize-option__2Bkf8 {\n  display: flex;\n  justify-content: center;\n}\n";
styleInject(css$5);

var Dropdown$3 = exports$2.Dropdown;
var DropdownOption$2 = exports$2.DropdownOption;

var LayoutComponent$1 = function (_Component) {
  inherits(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      defaultFontSize: undefined
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(LayoutComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var editorElm = document.getElementsByClassName('DraftEditor-root');
      if (editorElm && editorElm.length > 0) {
        var editorStyles = window.getComputedStyle(editorElm[0]);
        var defaultFontSize = editorStyles.getPropertyValue('font-size');
        defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
        this.setState({ // eslint-disable-line react/no-did-mount-set-state
          defaultFontSize: defaultFontSize
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$config = _props.config,
          icon = _props$config.icon,
          className = _props$config.className,
          dropdownClassName = _props$config.dropdownClassName,
          options = _props$config.options,
          title = _props$config.title,
          onChange = _props.onChange,
          expanded = _props.expanded,
          doCollapse = _props.doCollapse,
          onExpandEvent = _props.onExpandEvent,
          doExpand = _props.doExpand,
          translations = _props.translations;
      var currentFontSize = this.props.currentState.fontSize;
      var defaultFontSize = this.state.defaultFontSize;

      defaultFontSize = Number(defaultFontSize);
      currentFontSize = currentFontSize || options && options.indexOf(defaultFontSize) >= 0 && defaultFontSize;
      return React__default.createElement(
        'div',
        { className: 'rdw-fontsize-wrapper', 'aria-label': 'rdw-font-size-control' },
        React__default.createElement(
          Dropdown$3,
          {
            className: classnames('rdw-fontsize-dropdown', className),
            optionWrapperClassName: classnames(dropdownClassName),
            onChange: onChange,
            expanded: expanded,
            doExpand: doExpand,
            doCollapse: doCollapse,
            onExpandEvent: onExpandEvent,
            title: title || translations['components.controls.fontsize.fontsize']
          },
          currentFontSize ? React__default.createElement(
            'span',
            null,
            currentFontSize
          ) : React__default.createElement('img', { src: icon, alt: '' }),
          options.map(function (size, index) {
            return React__default.createElement(
              DropdownOption$2,
              {
                className: 'rdw-fontsize-option',
                active: currentFontSize === size,
                value: size,
                key: index
              },
              size
            );
          })
        )
      );
    }
  }]);
  return LayoutComponent;
}(React.Component);

LayoutComponent$1.propTypes = {
  expanded: propTypes.bool,
  onExpandEvent: propTypes.func,
  doExpand: propTypes.func,
  doCollapse: propTypes.func,
  onChange: propTypes.func,
  config: propTypes.object,
  currentState: propTypes.object,
  translations: propTypes.object
};

var FontSize = function (_Component) {
  inherits(FontSize, _Component);

  function FontSize() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, FontSize);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FontSize.__proto__ || Object.getPrototypeOf(FontSize)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: undefined,
      currentFontSize: undefined
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.toggleFontSize = function (fontSize) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var newState = draftjsUtils_9(editorState, 'fontSize', fontSize);
      if (newState) {
        onChange(newState);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(FontSize, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          currentFontSize: draftjsUtils_10(editorState, ['FONTSIZE']).FONTSIZE
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        this.setState({
          currentFontSize: draftjsUtils_10(properties.editorState, ['FONTSIZE']).FONTSIZE
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          config = _props2.config,
          translations = _props2.translations;
      var _state = this.state,
          expanded = _state.expanded,
          currentFontSize = _state.currentFontSize;

      var FontSizeComponent = config.component || LayoutComponent$1;
      var fontSize = currentFontSize && Number(currentFontSize.substring(9));
      return React__default.createElement(FontSizeComponent, {
        config: config,
        translations: translations,
        currentState: { fontSize: fontSize },
        onChange: this.toggleFontSize,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse
      });
    }
  }]);
  return FontSize;
}(React.Component);

FontSize.propTypes = {
  onChange: propTypes.func.isRequired,
  editorState: propTypes.object,
  modalHandler: propTypes.object,
  config: propTypes.object,
  translations: propTypes.object
};

var css$6 = ".styles_rdw-fontfamily-wrapper__21RBK {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.styles_rdw-fontfamily-dropdown__1We3y {\n  width: 115px;\n}\n.styles_rdw-fontfamily-placeholder__2QAsi {\n  white-space: nowrap;\n  max-width: 90px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.styles_rdw-fontfamily-optionwrapper__2E0Lw {\n  width: 140px;\n}\n";
styleInject(css$6);

var Dropdown$4 = exports$2.Dropdown;
var DropdownOption$3 = exports$2.DropdownOption;

var LayoutComponent$2 = function (_Component) {
  inherits(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      defaultFontFamily: undefined
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(LayoutComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var editorElm = document.getElementsByClassName('DraftEditor-root');
      if (editorElm && editorElm.length > 0) {
        var editorStyles = window.getComputedStyle(editorElm[0]);
        var defaultFontFamily = editorStyles.getPropertyValue('font-family');
        this.setState({ // eslint-disable-line react/no-did-mount-set-state
          defaultFontFamily: defaultFontFamily
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var defaultFontFamily = this.state.defaultFontFamily;
      var _props = this.props,
          _props$config = _props.config,
          className = _props$config.className,
          dropdownClassName = _props$config.dropdownClassName,
          options = _props$config.options,
          title = _props$config.title,
          translations = _props.translations,
          onChange = _props.onChange,
          expanded = _props.expanded,
          doCollapse = _props.doCollapse,
          onExpandEvent = _props.onExpandEvent,
          doExpand = _props.doExpand;
      var currentFontFamily = this.props.currentState.fontFamily;

      currentFontFamily = currentFontFamily || options && defaultFontFamily && options.some(function (opt) {
        return opt.toLowerCase() === defaultFontFamily.toLowerCase();
      }) && defaultFontFamily;
      return React__default.createElement(
        'div',
        { className: 'rdw-fontfamily-wrapper', 'aria-label': 'rdw-font-family-control' },
        React__default.createElement(
          Dropdown$4,
          {
            className: classnames('rdw-fontfamily-dropdown', className),
            optionWrapperClassName: classnames('rdw-fontfamily-optionwrapper', dropdownClassName),
            onChange: onChange,
            expanded: expanded,
            doExpand: doExpand,
            doCollapse: doCollapse,
            onExpandEvent: onExpandEvent,
            title: title || translations['components.controls.fontfamily.fontfamily']
          },
          React__default.createElement(
            'span',
            { className: 'rdw-fontfamily-placeholder' },
            currentFontFamily || translations['components.controls.fontfamily.fontfamily']
          ),
          options.map(function (family, index) {
            return React__default.createElement(
              DropdownOption$3,
              {
                active: currentFontFamily === family,
                value: family,
                key: index
              },
              family
            );
          })
        )
      );
    }
  }]);
  return LayoutComponent;
}(React.Component);

LayoutComponent$2.propTypes = {
  expanded: propTypes.bool,
  onExpandEvent: propTypes.func,
  doExpand: propTypes.func,
  doCollapse: propTypes.func,
  onChange: propTypes.func,
  config: propTypes.object,
  currentState: propTypes.object,
  translations: propTypes.object
};

var FontFamily = function (_Component) {
  inherits(FontFamily, _Component);

  function FontFamily() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, FontFamily);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FontFamily.__proto__ || Object.getPrototypeOf(FontFamily)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: undefined,
      currentFontFamily: undefined
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.toggleFontFamily = function (fontFamily) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var newState = draftjsUtils_9(editorState, 'fontFamily', fontFamily);
      if (newState) {
        onChange(newState);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(FontFamily, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          currentFontFamily: draftjsUtils_10(editorState, ['FONTFAMILY']).FONTFAMILY
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        this.setState({
          currentFontFamily: draftjsUtils_10(properties.editorState, ['FONTFAMILY']).FONTFAMILY
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          config = _props2.config,
          translations = _props2.translations;
      var _state = this.state,
          expanded = _state.expanded,
          currentFontFamily = _state.currentFontFamily;

      var FontFamilyComponent = config.component || LayoutComponent$2;
      var fontFamily = currentFontFamily && currentFontFamily.substring(11);
      return React__default.createElement(FontFamilyComponent, {
        translations: translations,
        config: config,
        currentState: { fontFamily: fontFamily },
        onChange: this.toggleFontFamily,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse
      });
    }
  }]);
  return FontFamily;
}(React.Component);

FontFamily.propTypes = {
  onChange: propTypes.func.isRequired,
  editorState: propTypes.object,
  modalHandler: propTypes.object,
  config: propTypes.object,
  translations: propTypes.object
};

var css$7 = ".styles_rdw-list-wrapper__2ooQ_ {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.styles_rdw-list-dropdown__3diZQ {\n  width: 50px;\n  z-index: 90;\n}\n.styles_rdw-list-dropdownOption__ntKvF {\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n";
styleInject(css$7);

var Dropdown$5 = exports$2.Dropdown;
var DropdownOption$4 = exports$2.DropdownOption;

var LayoutComponent$3 = function (_Component) {
  inherits(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.options = ['unordered', 'ordered', 'indent', 'outdent'], _this.toggleBlockType = function (blockType) {
      var onChange = _this.props.onChange;

      onChange(blockType);
    }, _this.indent = function () {
      var onChange = _this.props.onChange;

      onChange('indent');
    }, _this.outdent = function () {
      var onChange = _this.props.onChange;

      onChange('outdent');
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(LayoutComponent, [{
    key: 'renderInFlatList',


    // todo: evaluate refactoring this code to put a loop there and in other places also in code
    // hint: it will require moving click handlers
    value: function renderInFlatList() {
      var _props = this.props,
          config = _props.config,
          listType = _props.currentState.listType,
          translations = _props.translations,
          indentDisabled = _props.indentDisabled,
          outdentDisabled = _props.outdentDisabled;
      var options = config.options,
          unordered = config.unordered,
          ordered = config.ordered,
          indent = config.indent,
          outdent = config.outdent,
          className = config.className;

      return React__default.createElement(
        'div',
        { className: classnames('rdw-list-wrapper', className), 'aria-label': 'rdw-list-control' },
        options.indexOf('unordered') >= 0 && React__default.createElement(
          Option,
          {
            value: 'unordered',
            onClick: this.toggleBlockType,
            className: classnames(unordered.className),
            active: listType === 'unordered',
            title: unordered.title || translations['components.controls.list.unordered']
          },
          React__default.createElement('img', {
            src: unordered.icon,
            alt: ''
          })
        ),
        options.indexOf('ordered') >= 0 && React__default.createElement(
          Option,
          {
            value: 'ordered',
            onClick: this.toggleBlockType,
            className: classnames(ordered.className),
            active: listType === 'ordered',
            title: ordered.title || translations['components.controls.list.ordered']
          },
          React__default.createElement('img', {
            src: ordered.icon,
            alt: ''
          })
        ),
        options.indexOf('indent') >= 0 && React__default.createElement(
          Option,
          {
            onClick: this.indent,
            disabled: indentDisabled,
            className: classnames(indent.className),
            title: indent.title || translations['components.controls.list.indent']
          },
          React__default.createElement('img', {
            src: indent.icon,
            alt: ''
          })
        ),
        options.indexOf('outdent') >= 0 && React__default.createElement(
          Option,
          {
            onClick: this.outdent,
            disabled: outdentDisabled,
            className: classnames(outdent.className),
            title: outdent.title || translations['components.controls.list.outdent']
          },
          React__default.createElement('img', {
            src: outdent.icon,
            alt: ''
          })
        )
      );
    }
  }, {
    key: 'renderInDropDown',
    value: function renderInDropDown() {
      var _this2 = this;

      var _props2 = this.props,
          config = _props2.config,
          expanded = _props2.expanded,
          doCollapse = _props2.doCollapse,
          doExpand = _props2.doExpand,
          onExpandEvent = _props2.onExpandEvent,
          onChange = _props2.onChange,
          listType = _props2.currentState.listType,
          translations = _props2.translations;
      var options = config.options,
          className = config.className,
          dropdownClassName = config.dropdownClassName,
          title = config.title;

      return React__default.createElement(
        Dropdown$5,
        {
          className: classnames('rdw-list-dropdown', className),
          optionWrapperClassName: classnames(dropdownClassName),
          onChange: onChange,
          expanded: expanded,
          doExpand: doExpand,
          doCollapse: doCollapse,
          onExpandEvent: onExpandEvent,
          'aria-label': 'rdw-list-control',
          title: title || translations['components.controls.list.list']
        },
        React__default.createElement('img', {
          src: getFirstIcon(config),
          alt: ''
        }),
        this.options.filter(function (option) {
          return options.indexOf(option) >= 0;
        }).map(function (option, index) {
          return React__default.createElement(
            DropdownOption$4,
            {
              key: index,
              value: option,
              disabled: _this2.props[option + 'Disabled'],
              className: classnames('rdw-list-dropdownOption', config[option].className),
              active: listType === option,
              title: config[option].title || translations['components.controls.list.' + option]
            },
            React__default.createElement('img', {
              src: config[option].icon,
              alt: ''
            })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var inDropdown = this.props.config.inDropdown;

      if (inDropdown) {
        return this.renderInDropDown();
      }
      return this.renderInFlatList();
    }
  }]);
  return LayoutComponent;
}(React.Component);

LayoutComponent$3.propTypes = {
  expanded: propTypes.bool,
  doExpand: propTypes.func,
  doCollapse: propTypes.func,
  onExpandEvent: propTypes.func,
  config: propTypes.object,
  onChange: propTypes.func,
  currentState: propTypes.object,
  translations: propTypes.object,
  indentDisabled: propTypes.bool,
  outdentDisabled: propTypes.bool
};

var List = function (_Component) {
  inherits(List, _Component);

  function List() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, List);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = List.__proto__ || Object.getPrototypeOf(List)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false,
      currentBlock: undefined
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.onChange = function (value) {
      if (value === 'unordered') {
        _this.toggleBlockType('unordered-list-item');
      } else if (value === 'ordered') {
        _this.toggleBlockType('ordered-list-item');
      } else if (value === 'indent') {
        _this.adjustDepth(1);
      } else {
        _this.adjustDepth(-1);
      }
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.toggleBlockType = function (blockType) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          editorState = _this$props.editorState;

      var newState = require$$1.RichUtils.toggleBlockType(editorState, blockType);
      if (newState) {
        onChange(newState);
      }
    }, _this.adjustDepth = function (adjustment) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          editorState = _this$props2.editorState;

      var newState = draftjsUtils_1(editorState, adjustment, 4);
      if (newState) {
        onChange(newState);
      }
    }, _this.isIndentDisabled = function () {
      var editorState = _this.props.editorState;
      var currentBlock = _this.state.currentBlock;

      var previousBlock = draftjsUtils_11(editorState);
      if (!previousBlock || !draftjsUtils_12(currentBlock) || previousBlock.get('type') !== currentBlock.get('type') || previousBlock.get('depth') < currentBlock.get('depth')) {
        return true;
      }
      return false;
    }, _this.isOutdentDisabled = function () {
      var currentBlock = _this.state.currentBlock;

      return !currentBlock || !draftjsUtils_12(currentBlock) || currentBlock.get('depth') <= 0;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(List, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({ currentBlock: draftjsUtils_6(editorState) });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        var currentBlock = draftjsUtils_6(properties.editorState);
        this.setState({ currentBlock: draftjsUtils_6(properties.editorState) });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          config = _props2.config,
          translations = _props2.translations;
      var _state = this.state,
          expanded = _state.expanded,
          currentBlock = _state.currentBlock;

      var ListComponent = config.component || LayoutComponent$3;
      var listType = void 0;
      if (currentBlock.get('type') === 'unordered-list-item') {
        listType = 'unordered';
      } else if (currentBlock.get('type') === 'ordered-list-item') {
        listType = 'ordered';
      }
      var indentDisabled = this.isIndentDisabled();
      var outdentDisabled = this.isOutdentDisabled();
      return React__default.createElement(ListComponent, {
        config: config,
        translations: translations,
        currentState: { listType: listType },
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        onChange: this.onChange,
        indentDisabled: indentDisabled,
        outdentDisabled: outdentDisabled
      });
    }
  }]);
  return List;
}(React.Component);

List.propTypes = {
  onChange: propTypes.func.isRequired,
  editorState: propTypes.object.isRequired,
  modalHandler: propTypes.object,
  config: propTypes.object,
  translations: propTypes.object
};

var css$8 = ".styles_rdw-text-align-wrapper__3981N {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.styles_rdw-text-align-dropdown__1iQB- {\n  width: 50px;\n  z-index: 90;\n}\n.styles_rdw-text-align-dropdownOption__3ePHm {\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.styles_rdw-right-aligned-block__rsuYT {\n  text-align: right;\n}\n.styles_rdw-left-aligned-block__zUlT6 {\n  text-align: left !important;\n}\n.styles_rdw-center-aligned-block__23hhC {\n  text-align: center !important;\n}\n.styles_rdw-justify-aligned-block__2-1sa {\n  text-align: justify !important;\n}\n.styles_rdw-right-aligned-block__rsuYT > div {\n  display: inline-block;\n}\n.styles_rdw-left-aligned-block__zUlT6 > div {\n  display: inline-block;\n}\n.styles_rdw-center-aligned-block__23hhC > div {\n  display: inline-block;\n}\n.styles_rdw-justify-aligned-block__2-1sa > div {\n  display: inline-block;\n}\n";
styleInject(css$8);

var Dropdown$6 = exports$2.Dropdown;
var DropdownOption$5 = exports$2.DropdownOption;

var TextAlign = function (_Component) {
  inherits(TextAlign, _Component);

  function TextAlign() {
    classCallCheck(this, TextAlign);
    return possibleConstructorReturn(this, (TextAlign.__proto__ || Object.getPrototypeOf(TextAlign)).apply(this, arguments));
  }

  createClass(TextAlign, [{
    key: 'renderInFlatList',
    value: function renderInFlatList() {
      var _props = this.props,
          _props$config = _props.config,
          options = _props$config.options,
          left = _props$config.left,
          center = _props$config.center,
          right = _props$config.right,
          justify = _props$config.justify,
          className = _props$config.className,
          onChange = _props.onChange,
          textAlignment = _props.currentState.textAlignment,
          translations = _props.translations;

      return React__default.createElement(
        'div',
        { className: classnames('rdw-text-align-wrapper', className), 'aria-label': 'rdw-textalign-control' },
        options.indexOf('left') >= 0 && React__default.createElement(
          Option,
          {
            value: 'left',
            className: classnames(left.className),
            active: textAlignment === 'left',
            onClick: onChange,
            title: left.title || translations['components.controls.textalign.left']
          },
          React__default.createElement('img', {
            src: left.icon,
            alt: ''
          })
        ),
        options.indexOf('center') >= 0 && React__default.createElement(
          Option,
          {
            value: 'center',
            className: classnames(center.className),
            active: textAlignment === 'center',
            onClick: onChange,
            title: center.title || translations['components.controls.textalign.center']
          },
          React__default.createElement('img', {
            src: center.icon,
            alt: ''
          })
        ),
        options.indexOf('right') >= 0 && React__default.createElement(
          Option,
          {
            value: 'right',
            className: classnames(right.className),
            active: textAlignment === 'right',
            onClick: onChange,
            title: right.title || translations['components.controls.textalign.right']
          },
          React__default.createElement('img', {
            src: right.icon,
            alt: ''
          })
        ),
        options.indexOf('justify') >= 0 && React__default.createElement(
          Option,
          {
            value: 'justify',
            className: classnames(justify.className),
            active: textAlignment === 'justify',
            onClick: onChange,
            title: justify.title || translations['components.controls.textalign.justify']
          },
          React__default.createElement('img', {
            src: justify.icon,
            alt: ''
          })
        )
      );
    }
  }, {
    key: 'renderInDropDown',
    value: function renderInDropDown() {
      var _props2 = this.props,
          config = _props2.config,
          expanded = _props2.expanded,
          doExpand = _props2.doExpand,
          onExpandEvent = _props2.onExpandEvent,
          doCollapse = _props2.doCollapse,
          textAlignment = _props2.currentState.textAlignment,
          onChange = _props2.onChange,
          translations = _props2.translations;
      var options = config.options,
          left = config.left,
          center = config.center,
          right = config.right,
          justify = config.justify,
          className = config.className,
          dropdownClassName = config.dropdownClassName,
          title = config.title;

      return React__default.createElement(
        Dropdown$6,
        {
          className: classnames('rdw-text-align-dropdown', className),
          optionWrapperClassName: classnames(dropdownClassName),
          onChange: onChange,
          expanded: expanded,
          doExpand: doExpand,
          doCollapse: doCollapse,
          onExpandEvent: onExpandEvent,
          'aria-label': 'rdw-textalign-control',
          title: title || translations['components.controls.textalign.textalign']
        },
        React__default.createElement('img', {
          src: textAlignment && config[textAlignment] && config[textAlignment].icon || getFirstIcon(config),
          alt: ''
        }),
        options.indexOf('left') >= 0 && React__default.createElement(
          DropdownOption$5,
          {
            value: 'left',
            active: textAlignment === 'left',
            className: classnames('rdw-text-align-dropdownOption', left.className),
            title: left.title || translations['components.controls.textalign.left']
          },
          React__default.createElement('img', {
            src: left.icon,
            alt: ''
          })
        ),
        options.indexOf('center') >= 0 && React__default.createElement(
          DropdownOption$5,
          {
            value: 'center',
            active: textAlignment === 'center',
            className: classnames('rdw-text-align-dropdownOption', center.className),
            title: center.title || translations['components.controls.textalign.center']
          },
          React__default.createElement('img', {
            src: center.icon,
            alt: ''
          })
        ),
        options.indexOf('right') >= 0 && React__default.createElement(
          DropdownOption$5,
          {
            value: 'right',
            active: textAlignment === 'right',
            className: classnames('rdw-text-align-dropdownOption', right.className),
            title: right.title || translations['components.controls.textalign.right']
          },
          React__default.createElement('img', {
            src: right.icon,
            alt: ''
          })
        ),
        options.indexOf('justify') >= 0 && React__default.createElement(
          DropdownOption$5,
          {
            value: 'justify',
            active: textAlignment === 'justify',
            className: classnames('rdw-text-align-dropdownOption', justify.className),
            title: justify.title || translations['components.controls.textalign.justify']
          },
          React__default.createElement('img', {
            src: justify.icon,
            alt: ''
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var inDropdown = this.props.config.inDropdown;

      if (inDropdown) {
        return this.renderInDropDown();
      }
      return this.renderInFlatList();
    }
  }]);
  return TextAlign;
}(React.Component);

TextAlign.propTypes = {
  expanded: propTypes.bool,
  doExpand: propTypes.func,
  doCollapse: propTypes.func,
  onExpandEvent: propTypes.func,
  config: propTypes.object,
  onChange: propTypes.func,
  currentState: propTypes.object,
  translations: propTypes.object
};

var TextAlign$1 = function (_Component) {
  inherits(TextAlign$$1, _Component);

  function TextAlign$$1() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TextAlign$$1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TextAlign$$1.__proto__ || Object.getPrototypeOf(TextAlign$$1)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentTextAlignment: undefined
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.addBlockAlignmentData = function (value) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;
      var currentTextAlignment = _this.state.currentTextAlignment;

      if (currentTextAlignment !== value) {
        onChange(draftjsUtils_13(editorState, { 'text-align': value }));
      } else {
        onChange(draftjsUtils_13(editorState, { 'text-align': undefined }));
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TextAlign$$1, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState !== this.props.editorState) {
        this.setState({
          currentTextAlignment: draftjsUtils_14(properties.editorState).get('text-align')
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          config = _props.config,
          translations = _props.translations;
      var _state = this.state,
          expanded = _state.expanded,
          currentTextAlignment = _state.currentTextAlignment;

      var TextAlignmentComponent = config.component || TextAlign;
      return React__default.createElement(TextAlignmentComponent, {
        config: config,
        translations: translations,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        currentState: { textAlignment: currentTextAlignment },
        onChange: this.addBlockAlignmentData
      });
    }
  }]);
  return TextAlign$$1;
}(React.Component);

TextAlign$1.propTypes = {
  editorState: propTypes.object.isRequired,
  onChange: propTypes.func.isRequired,
  modalHandler: propTypes.object,
  config: propTypes.object,
  translations: propTypes.object
};

var css$9 = ".styles_rdw-colorpicker-wrapper__2abJ_ {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  position: relative;\n}\n.styles_rdw-colorpicker-modal__Z_ACa {\n  position: absolute;\n  top: 35px;\n  left: 5px;\n  display: flex;\n  flex-direction: column;\n  width: 175px;\n  height: 175px;\n  border: 1px solid #F1F1F1;\n  padding: 15px;\n  border-radius: 2px;\n  z-index: 100;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n}\n.styles_rdw-colorpicker-modal-header__2F8Ms {\n  display: flex;\n  padding-bottom: 5px;\n}\n.styles_rdw-colorpicker-modal-style-label__2RE29 {\n  font-size: 15px;\n  width: 50%;\n  text-align: center;\n  cursor: pointer;\n  padding: 0 10px 5px;\n}\n.styles_rdw-colorpicker-modal-style-label-active__1iPjw {\n  border-bottom: 2px solid #0a66b7;\n}\n.styles_rdw-colorpicker-modal-options__1pG_N {\n  margin: 5px auto;\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-wrap: wrap;\n  overflow: scroll;\n}\n.styles_rdw-colorpicker-cube__165RY {\n  width: 22px;\n  height: 22px;\n  border: 1px solid #F1F1F1;\n}\n.styles_rdw-colorpicker-option__rrvGG {\n  margin: 3px;\n  padding: 0;\n  min-height: 20px;\n  border: none;\n  width: 22px;\n  height: 22px;\n  min-width: 22px;\n  box-shadow: 1px 2px 1px #BFBDBD inset;\n}\n.styles_rdw-colorpicker-option__rrvGG:hover {\n  box-shadow: 1px 2px 1px #BFBDBD;\n}\n.styles_rdw-colorpicker-option__rrvGG:active {\n  box-shadow: -1px -2px 1px #BFBDBD;\n}\n.styles_rdw-colorpicker-option-active__3JzTN {\n  box-shadow: 0px 0px 2px 2px #BFBDBD;\n}\n";
styleInject(css$9);

var LayoutComponent$4 = function (_Component) {
  inherits(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentStyle: 'color'
    }, _this.onChange = function (color) {
      var onChange = _this.props.onChange;
      var currentStyle = _this.state.currentStyle;

      onChange(currentStyle, color);
    }, _this.setCurrentStyleColor = function () {
      _this.setState({
        currentStyle: 'color'
      });
    }, _this.setCurrentStyleBgcolor = function () {
      _this.setState({
        currentStyle: 'bgcolor'
      });
    }, _this.renderModal = function () {
      var _this$props = _this.props,
          _this$props$config = _this$props.config,
          popupClassName = _this$props$config.popupClassName,
          colors = _this$props$config.colors,
          _this$props$currentSt = _this$props.currentState,
          color = _this$props$currentSt.color,
          bgColor = _this$props$currentSt.bgColor,
          translations = _this$props.translations;
      var currentStyle = _this.state.currentStyle;

      var currentSelectedColor = currentStyle === 'color' ? color : bgColor;
      return React__default.createElement(
        'div',
        {
          className: classnames('rdw-colorpicker-modal', popupClassName),
          onClick: stopPropagation
        },
        React__default.createElement(
          'span',
          { className: 'rdw-colorpicker-modal-header' },
          React__default.createElement(
            'span',
            {
              className: classnames('rdw-colorpicker-modal-style-label', { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'color' }),
              onClick: _this.setCurrentStyleColor
            },
            translations['components.controls.colorpicker.text']
          ),
          React__default.createElement(
            'span',
            {
              className: classnames('rdw-colorpicker-modal-style-label', { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'bgcolor' }),
              onClick: _this.setCurrentStyleBgcolor
            },
            translations['components.controls.colorpicker.background']
          )
        ),
        React__default.createElement(
          'span',
          { className: 'rdw-colorpicker-modal-options' },
          colors.map(function (c, index) {
            return React__default.createElement(
              Option,
              {
                value: c,
                key: index,
                className: 'rdw-colorpicker-option',
                activeClassName: 'rdw-colorpicker-option-active',
                active: currentSelectedColor === c,
                onClick: _this.onChange
              },
              React__default.createElement('span', {
                style: { backgroundColor: c },
                className: 'rdw-colorpicker-cube'
              })
            );
          })
        )
      );
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (!this.props.expanded && props.expanded) {
        this.setState({
          currentStyle: 'color'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$config = _props.config,
          icon = _props$config.icon,
          className = _props$config.className,
          title = _props$config.title,
          expanded = _props.expanded,
          onExpandEvent = _props.onExpandEvent,
          translations = _props.translations;

      return React__default.createElement(
        'div',
        {
          className: 'rdw-colorpicker-wrapper',
          'aria-haspopup': 'true',
          'aria-expanded': expanded,
          'aria-label': 'rdw-color-picker',
          title: title || translations['components.controls.colorpicker.colorpicker']
        },
        React__default.createElement(
          Option,
          {
            onClick: onExpandEvent,
            className: classnames(className)
          },
          React__default.createElement('img', {
            src: icon,
            alt: ''
          })
        ),
        expanded ? this.renderModal() : undefined
      );
    }
  }]);
  return LayoutComponent;
}(React.Component);

LayoutComponent$4.propTypes = {
  expanded: propTypes.bool,
  onExpandEvent: propTypes.func,
  onChange: propTypes.func,
  config: propTypes.object,
  currentState: propTypes.object,
  translations: propTypes.object
};

var ColorPicker = function (_Component) {
  inherits(ColorPicker, _Component);

  function ColorPicker() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ColorPicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false,
      currentColor: undefined,
      currentBgColor: undefined
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.toggleColor = function (style, color) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var newState = draftjsUtils_9(editorState, style, color);
      if (newState) {
        onChange(newState);
      }
      _this.doCollapse();
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ColorPicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          currentColor: draftjsUtils_10(editorState, ['COLOR']).COLOR,
          currentBgColor: draftjsUtils_10(editorState, ['BGCOLOR']).BGCOLOR
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var newState = {};
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        newState.currentColor = draftjsUtils_10(properties.editorState, ['COLOR']).COLOR;
        newState.currentBgColor = draftjsUtils_10(properties.editorState, ['BGCOLOR']).BGCOLOR;
      }
      this.setState(newState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          config = _props2.config,
          translations = _props2.translations;
      var _state = this.state,
          currentColor = _state.currentColor,
          currentBgColor = _state.currentBgColor,
          expanded = _state.expanded;

      var ColorPickerComponent = config.component || LayoutComponent$4;
      var color = currentColor && currentColor.substring(6);
      var bgColor = currentBgColor && currentBgColor.substring(8);
      return React__default.createElement(ColorPickerComponent, {
        config: config,
        translations: translations,
        onChange: this.toggleColor,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        currentState: { color: color, bgColor: bgColor }
      });
    }
  }]);
  return ColorPicker;
}(React.Component);

ColorPicker.propTypes = {
  onChange: propTypes.func.isRequired,
  editorState: propTypes.object.isRequired,
  modalHandler: propTypes.object,
  config: propTypes.object,
  translations: propTypes.object
};

var regex=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

var regex$1=/[\0-\x1F\x7F-\x9F]/;

var regex$2=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;

var regex$3=/[!-#%-\*,-/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E49\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

var re = function (opts) {
  var re = {};

  // Use direct extract instead of `regenerate` to reduse browserified size
  re.src_Any = regex.source;
  re.src_Cc  = regex$1.source;
  re.src_Z   = regex$2.source;
  re.src_P   = regex$3.source;

  // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
  re.src_ZPCc = [ re.src_Z, re.src_P, re.src_Cc ].join('|');

  // \p{\Z\Cc} (white spaces + control)
  re.src_ZCc = [ re.src_Z, re.src_Cc ].join('|');

  // Experimental. List of chars, completely prohibited in links
  // because can separate it from other part of text
  var text_separators = '[><\uff5c]';

  // All possible word characters (everything without punctuation, spaces & controls)
  // Defined via punctuation & spaces to save space
  // Should be something like \p{\L\N\S\M} (\w but without `_`)
  re.src_pseudo_letter       = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
  // The same as abothe but without [0-9]
  // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

  ////////////////////////////////////////////////////////////////////////////////

  re.src_ip4 =

    '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

  // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
  re.src_auth    = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';

  re.src_port =

    '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

  re.src_host_terminator =

    '(?=$|' + text_separators + '|' + re.src_ZPCc + ')(?!-|_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';

  re.src_path =

    '(?:' +
      '[/?#]' +
        '(?:' +
          '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-]).|' +
          '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' +
          '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' +
          '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' +
          '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' +
          "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +
          "\\'(?=" + re.src_pseudo_letter + '|[-]).|' +  // allow `I'm_king` if no pair found
          '\\.{2,3}[a-zA-Z0-9%/]|' + // github has ... in commit range links. Restrict to
                                     // - english
                                     // - percent-encoded
                                     // - parts of file path
                                     // until more examples found.
          '\\.(?!' + re.src_ZCc + '|[.]).|' +
          (opts && opts['---'] ?
            '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
          :
            '\\-+|'
          ) +
          '\\,(?!' + re.src_ZCc + ').|' +      // allow `,,,` in paths
          '\\!(?!' + re.src_ZCc + '|[!]).|' +
          '\\?(?!' + re.src_ZCc + '|[?]).' +
        ')+' +
      '|\\/' +
    ')?';

  re.src_email_name =

    '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+';

  re.src_xn =

    'xn--[a-z0-9\\-]{1,59}';

  // More to read about domain names
  // http://serverfault.com/questions/638260/

  re.src_domain_root =

    // Allow letters & digits (http://test1)
    '(?:' +
      re.src_xn +
      '|' +
      re.src_pseudo_letter + '{1,63}' +
    ')';

  re.src_domain =

    '(?:' +
      re.src_xn +
      '|' +
      '(?:' + re.src_pseudo_letter + ')' +
      '|' +
      // don't allow `--` in domain names, because:
      // - that can conflict with markdown &mdash; / &ndash;
      // - nobody use those anyway
      '(?:' + re.src_pseudo_letter + '(?:-(?!-)|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' +
    ')';

  re.src_host =

    '(?:' +
    // Don't need IP check, because digits are already allowed in normal domain names
    //   src_ip4 +
    // '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain/*_root*/ + ')' +
    ')';

  re.tpl_host_fuzzy =

    '(?:' +
      re.src_ip4 +
    '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' +
    ')';

  re.tpl_host_no_ip_fuzzy =

    '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';

  re.src_host_strict =

    re.src_host + re.src_host_terminator;

  re.tpl_host_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_host_terminator;

  re.src_host_port_strict =

    re.src_host + re.src_port + re.src_host_terminator;

  re.tpl_host_port_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;

  re.tpl_host_port_no_ip_fuzzy_strict =

    re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;


  ////////////////////////////////////////////////////////////////////////////////
  // Main rules

  // Rude test fuzzy links by host, for quick deny
  re.tpl_host_fuzzy_test =

    'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';

  re.tpl_email_fuzzy =

      '(^|' + text_separators + '|\\(|' + re.src_ZCc + ')(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';

  re.tpl_link_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';

  re.tpl_link_no_ip_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';

  return re;
};

////////////////////////////////////////////////////////////////////////////////
// Helpers

// Merge objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

function _class(obj) { return Object.prototype.toString.call(obj); }
function isString(obj) { return _class(obj) === '[object String]'; }
function isObject(obj) { return _class(obj) === '[object Object]'; }
function isRegExp(obj) { return _class(obj) === '[object RegExp]'; }
function isFunction(obj) { return _class(obj) === '[object Function]'; }


function escapeRE(str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'); }

////////////////////////////////////////////////////////////////////////////////


var defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};


function isOptionsObj(obj) {
  return Object.keys(obj || {}).reduce(function (acc, k) {
    return acc || defaultOptions.hasOwnProperty(k);
  }, false);
}


var defaultSchemas = {
  'http:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.http) {
        // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.http =  new RegExp(
          '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
        );
      }
      if (self.re.http.test(tail)) {
        return tail.match(self.re.http)[0].length;
      }
      return 0;
    }
  },
  'https:':  'http:',
  'ftp:':    'http:',
  '//':      {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.no_http) {
      // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.no_http =  new RegExp(
          '^' +
          self.re.src_auth +
          // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' +
          self.re.src_port +
          self.re.src_host_terminator +
          self.re.src_path,

          'i'
        );
      }

      if (self.re.no_http.test(tail)) {
        // should not be `://` & `///`, that protects from errors in protocol name
        if (pos >= 3 && text[pos - 3] === ':') { return 0; }
        if (pos >= 3 && text[pos - 3] === '/') { return 0; }
        return tail.match(self.re.no_http)[0].length;
      }
      return 0;
    }
  },
  'mailto:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.mailto) {
        self.re.mailto =  new RegExp(
          '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
        );
      }
      if (self.re.mailto.test(tail)) {
        return tail.match(self.re.mailto)[0].length;
      }
      return 0;
    }
  }
};

/*eslint-disable max-len*/

// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

/*eslint-enable max-len*/

////////////////////////////////////////////////////////////////////////////////

function resetScanCache(self) {
  self.__index__ = -1;
  self.__text_cache__   = '';
}

function createValidator(re$$1) {
  return function (text, pos) {
    var tail = text.slice(pos);

    if (re$$1.test(tail)) {
      return tail.match(re$$1)[0].length;
    }
    return 0;
  };
}

function createNormalizer() {
  return function (match, self) {
    self.normalize(match);
  };
}

// Schemas compiler. Build regexps.
//
function compile(self) {

  // Load & clone RE patterns.
  var re$$1 = self.re = re(self.__opts__);

  // Define dynamic patterns
  var tlds = self.__tlds__.slice();

  self.onCompile();

  if (!self.__tlds_replaced__) {
    tlds.push(tlds_2ch_src_re);
  }
  tlds.push(re$$1.src_xn);

  re$$1.src_tlds = tlds.join('|');

  function untpl(tpl) { return tpl.replace('%TLDS%', re$$1.src_tlds); }

  re$$1.email_fuzzy      = RegExp(untpl(re$$1.tpl_email_fuzzy), 'i');
  re$$1.link_fuzzy       = RegExp(untpl(re$$1.tpl_link_fuzzy), 'i');
  re$$1.link_no_ip_fuzzy = RegExp(untpl(re$$1.tpl_link_no_ip_fuzzy), 'i');
  re$$1.host_fuzzy_test  = RegExp(untpl(re$$1.tpl_host_fuzzy_test), 'i');

  //
  // Compile each schema
  //

  var aliases = [];

  self.__compiled__ = {}; // Reset compiled data

  function schemaError(name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
  }

  Object.keys(self.__schemas__).forEach(function (name) {
    var val = self.__schemas__[name];

    // skip disabled methods
    if (val === null) { return; }

    var compiled = { validate: null, link: null };

    self.__compiled__[name] = compiled;

    if (isObject(val)) {
      if (isRegExp(val.validate)) {
        compiled.validate = createValidator(val.validate);
      } else if (isFunction(val.validate)) {
        compiled.validate = val.validate;
      } else {
        schemaError(name, val);
      }

      if (isFunction(val.normalize)) {
        compiled.normalize = val.normalize;
      } else if (!val.normalize) {
        compiled.normalize = createNormalizer();
      } else {
        schemaError(name, val);
      }

      return;
    }

    if (isString(val)) {
      aliases.push(name);
      return;
    }

    schemaError(name, val);
  });

  //
  // Compile postponed aliases
  //

  aliases.forEach(function (alias) {
    if (!self.__compiled__[self.__schemas__[alias]]) {
      // Silently fail on missed schemas to avoid errons on disable.
      // schemaError(alias, self.__schemas__[alias]);
      return;
    }

    self.__compiled__[alias].validate =
      self.__compiled__[self.__schemas__[alias]].validate;
    self.__compiled__[alias].normalize =
      self.__compiled__[self.__schemas__[alias]].normalize;
  });

  //
  // Fake record for guessed links
  //
  self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

  //
  // Build schema condition
  //
  var slist = Object.keys(self.__compiled__)
                      .filter(function (name) {
                        // Filter disabled & fake schemas
                        return name.length > 0 && self.__compiled__[name];
                      })
                      .map(escapeRE)
                      .join('|');
  // (?!_) cause 1.5x slowdown
  self.re.schema_test   = RegExp('(^|(?!_)(?:[><\uff5c]|' + re$$1.src_ZPCc + '))(' + slist + ')', 'i');
  self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re$$1.src_ZPCc + '))(' + slist + ')', 'ig');

  self.re.pretest       = RegExp(
                            '(' + self.re.schema_test.source + ')|' +
                            '(' + self.re.host_fuzzy_test.source + ')|' +
                            '@',
                            'i');

  //
  // Cleanup
  //

  resetScanCache(self);
}

/**
 * class Match
 *
 * Match result. Single element of array, returned by [[LinkifyIt#match]]
 **/
function Match(self, shift) {
  var start = self.__index__,
      end   = self.__last_index__,
      text  = self.__text_cache__.slice(start, end);

  /**
   * Match#schema -> String
   *
   * Prefix (protocol) for matched string.
   **/
  this.schema    = self.__schema__.toLowerCase();
  /**
   * Match#index -> Number
   *
   * First position of matched string.
   **/
  this.index     = start + shift;
  /**
   * Match#lastIndex -> Number
   *
   * Next position after matched string.
   **/
  this.lastIndex = end + shift;
  /**
   * Match#raw -> String
   *
   * Matched string.
   **/
  this.raw       = text;
  /**
   * Match#text -> String
   *
   * Notmalized text of matched string.
   **/
  this.text      = text;
  /**
   * Match#url -> String
   *
   * Normalized url of matched string.
   **/
  this.url       = text;
}

function createMatch(self, shift) {
  var match = new Match(self, shift);

  self.__compiled__[match.schema].normalize(match, self);

  return match;
}


/**
 * class LinkifyIt
 **/

/**
 * new LinkifyIt(schemas, options)
 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Creates new linkifier instance with optional additional schemas.
 * Can be called without `new` keyword for convenience.
 *
 * By default understands:
 *
 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
 * - "fuzzy" links and emails (example.com, foo@bar.com).
 *
 * `schemas` is an object, where each key/value describes protocol/rule:
 *
 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
 *   for example). `linkify-it` makes shure that prefix is not preceeded with
 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
 * - __value__ - rule to check tail after link prefix
 *   - _String_ - just alias to existing rule
 *   - _Object_
 *     - _validate_ - validator function (should return matched length on success),
 *       or `RegExp`.
 *     - _normalize_ - optional function to normalize text & url of matched result
 *       (for example, for @twitter mentions).
 *
 * `options`:
 *
 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
 *   like version numbers. Default `false`.
 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
 *
 **/
function LinkifyIt(schemas, options) {
  if (!(this instanceof LinkifyIt)) {
    return new LinkifyIt(schemas, options);
  }

  if (!options) {
    if (isOptionsObj(schemas)) {
      options = schemas;
      schemas = {};
    }
  }

  this.__opts__           = assign({}, defaultOptions, options);

  // Cache last tested result. Used to skip repeating steps on next `match` call.
  this.__index__          = -1;
  this.__last_index__     = -1; // Next scan position
  this.__schema__         = '';
  this.__text_cache__     = '';

  this.__schemas__        = assign({}, defaultSchemas, schemas);
  this.__compiled__       = {};

  this.__tlds__           = tlds_default;
  this.__tlds_replaced__  = false;

  this.re = {};

  compile(this);
}


/** chainable
 * LinkifyIt#add(schema, definition)
 * - schema (String): rule name (fixed pattern prefix)
 * - definition (String|RegExp|Object): schema definition
 *
 * Add new rule definition. See constructor description for details.
 **/
LinkifyIt.prototype.add = function add(schema, definition) {
  this.__schemas__[schema] = definition;
  compile(this);
  return this;
};


/** chainable
 * LinkifyIt#set(options)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Set recognition options for links without schema.
 **/
LinkifyIt.prototype.set = function set(options) {
  this.__opts__ = assign(this.__opts__, options);
  return this;
};


/**
 * LinkifyIt#test(text) -> Boolean
 *
 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
 **/
LinkifyIt.prototype.test = function test(text) {
  // Reset scan cache
  this.__text_cache__ = text;
  this.__index__      = -1;

  if (!text.length) { return false; }

  var m, ml, me, len, shift, next, re$$1, tld_pos, at_pos;

  // try to scan for link with schema - that's the most simple rule
  if (this.re.schema_test.test(text)) {
    re$$1 = this.re.schema_search;
    re$$1.lastIndex = 0;
    while ((m = re$$1.exec(text)) !== null) {
      len = this.testSchemaAt(text, m[2], re$$1.lastIndex);
      if (len) {
        this.__schema__     = m[2];
        this.__index__      = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break;
      }
    }
  }

  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
    // guess schemaless links
    tld_pos = text.search(this.re.host_fuzzy_test);
    if (tld_pos >= 0) {
      // if tld is located after found link - no need to check fuzzy pattern
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {

          shift = ml.index + ml[1].length;

          if (this.__index__ < 0 || shift < this.__index__) {
            this.__schema__     = '';
            this.__index__      = shift;
            this.__last_index__ = ml.index + ml[0].length;
          }
        }
      }
    }
  }

  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
    // guess schemaless emails
    at_pos = text.indexOf('@');
    if (at_pos >= 0) {
      // We can't skip this check, because this cases are possible:
      // 192.168.1.1@gmail.com, my.in@example.com
      if ((me = text.match(this.re.email_fuzzy)) !== null) {

        shift = me.index + me[1].length;
        next  = me.index + me[0].length;

        if (this.__index__ < 0 || shift < this.__index__ ||
            (shift === this.__index__ && next > this.__last_index__)) {
          this.__schema__     = 'mailto:';
          this.__index__      = shift;
          this.__last_index__ = next;
        }
      }
    }
  }

  return this.__index__ >= 0;
};


/**
 * LinkifyIt#pretest(text) -> Boolean
 *
 * Very quick check, that can give false positives. Returns true if link MAY BE
 * can exists. Can be used for speed optimization, when you need to check that
 * link NOT exists.
 **/
LinkifyIt.prototype.pretest = function pretest(text) {
  return this.re.pretest.test(text);
};


/**
 * LinkifyIt#testSchemaAt(text, name, position) -> Number
 * - text (String): text to scan
 * - name (String): rule (schema) name
 * - position (Number): text offset to check from
 *
 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
 * at given position. Returns length of found pattern (0 on fail).
 **/
LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
  // If not supported schema check requested - terminate
  if (!this.__compiled__[schema.toLowerCase()]) {
    return 0;
  }
  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
};


/**
 * LinkifyIt#match(text) -> Array|null
 *
 * Returns array of found link descriptions or `null` on fail. We strongly
 * recommend to use [[LinkifyIt#test]] first, for best speed.
 *
 * ##### Result match description
 *
 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
 *   protocol-neutral  links.
 * - __index__ - offset of matched text
 * - __lastIndex__ - index of next char after mathch end
 * - __raw__ - matched text
 * - __text__ - normalized text
 * - __url__ - link, generated from matched text
 **/
LinkifyIt.prototype.match = function match(text) {
  var shift = 0, result = [];

  // Try to take previous element from cache, if .test() called before
  if (this.__index__ >= 0 && this.__text_cache__ === text) {
    result.push(createMatch(this, shift));
    shift = this.__last_index__;
  }

  // Cut head if cache was used
  var tail = shift ? text.slice(shift) : text;

  // Scan string until end reached
  while (this.test(tail)) {
    result.push(createMatch(this, shift));

    tail = tail.slice(this.__last_index__);
    shift += this.__last_index__;
  }

  if (result.length) {
    return result;
  }

  return null;
};


/** chainable
 * LinkifyIt#tlds(list [, keepOld]) -> this
 * - list (Array): list of tlds
 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
 *
 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
 * to avoid false positives. By default this algorythm used:
 *
 * - hostname with any 2-letter root zones are ok.
 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
 *   are ok.
 * - encoded (`xn--...`) root zones are ok.
 *
 * If list is replaced, then exact match for 2-chars root zones will be checked.
 **/
LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
  list = Array.isArray(list) ? list : [ list ];

  if (!keepOld) {
    this.__tlds__ = list.slice();
    this.__tlds_replaced__ = true;
    compile(this);
    return this;
  }

  this.__tlds__ = this.__tlds__.concat(list)
                                  .sort()
                                  .filter(function (el, idx, arr) {
                                    return el !== arr[idx - 1];
                                  })
                                  .reverse();

  compile(this);
  return this;
};

/**
 * LinkifyIt#normalize(match)
 *
 * Default normalizer (if schema does not define it's own).
 **/
LinkifyIt.prototype.normalize = function normalize(match) {

  // Do minimal possible changes by default. Need to collect feedback prior
  // to move forward https://github.com/markdown-it/linkify-it/issues/1

  if (!match.schema) { match.url = 'http://' + match.url; }

  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
    match.url = 'mailto:' + match.url;
  }
};


/**
 * LinkifyIt#onCompile()
 *
 * Override to modify basic RegExp-s.
 **/
LinkifyIt.prototype.onCompile = function onCompile() {
};


var linkifyIt = LinkifyIt;

var css$a = ".styles_rdw-link-wrapper__3cfYc {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  position: relative;\n}\n.styles_rdw-link-dropdown__1Hi3q {\n  width: 50px;\n}\n.styles_rdw-link-dropdownOption__zwz_2 {\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.styles_rdw-link-dropdownPlaceholder___IW6R {\n  margin-left: 8px;\n}\n.styles_rdw-link-modal__jA2ci {\n  position: absolute;\n  top: 35px;\n  left: 5px;\n  display: flex;\n  flex-direction: column;\n  width: 235px;\n  height: 205px;\n  border: 1px solid #F1F1F1;\n  padding: 15px;\n  border-radius: 2px;\n  z-index: 100;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n}\n.styles_rdw-link-modal-label__1D7tf {\n  font-size: 15px;\n}\n.styles_rdw-link-modal-input__BGVou {\n  margin-top: 5px;\n  border-radius: 2px;\n  border: 1px solid #F1F1F1;\n  height: 25px;\n  margin-bottom: 15px;\n  padding: 0 5px;\n}\n.styles_rdw-link-modal-input__BGVou:focus {\n  outline: none;\n}\n.styles_rdw-link-modal-buttonsection__1kr_h {\n  margin: 0 auto;\n}\n.styles_rdw-link-modal-target-option__1VIuX {\n  margin-bottom: 20px;\n}\n.styles_rdw-link-modal-target-option__1VIuX > span {\n  margin-left: 5px;\n}\n.styles_rdw-link-modal-btn__1t8A6 {\n  margin-left: 10px;\n  width: 75px;\n  height: 30px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  cursor: pointer;\n  background: white;\n  text-transform: capitalize;\n}\n.styles_rdw-link-modal-btn__1t8A6:hover {\n  box-shadow: 1px 1px 0px #BFBDBD;\n}\n.styles_rdw-link-modal-btn__1t8A6:active {\n  box-shadow: 1px 1px 0px #BFBDBD inset;\n}\n.styles_rdw-link-modal-btn__1t8A6:focus {\n  outline: none !important;\n}\n.styles_rdw-link-modal-btn__1t8A6:disabled {\n  background: #ece9e9;\n}\n.styles_rdw-link-dropdownoption__1E3ZT {\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.styles_rdw-history-dropdown__2FN6o {\n  width: 50px;\n}\n";
styleInject(css$a);

var Dropdown$7 = exports$2.Dropdown;
var DropdownOption$6 = exports$2.DropdownOption;

var LayoutComponent$5 = function (_Component) {
  inherits(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      showModal: false,
      linkTarget: '',
      linkTitle: '',
      linkTargetOption: _this.props.config.defaultTargetOption
    }, _this.removeLink = function () {
      var onChange = _this.props.onChange;

      onChange('unlink');
    }, _this.addLink = function () {
      var onChange = _this.props.onChange;
      var _this$state = _this.state,
          linkTitle = _this$state.linkTitle,
          linkTarget = _this$state.linkTarget,
          linkTargetOption = _this$state.linkTargetOption;

      onChange('link', linkTitle, linkTarget, linkTargetOption);
    }, _this.updateValue = function (event) {
      _this.setState(defineProperty({}, '' + event.target.name, event.target.value));
    }, _this.updateTargetOption = function (event) {
      _this.setState({
        linkTargetOption: event.target.checked ? '_blank' : '_self'
      });
    }, _this.hideModal = function () {
      _this.setState({
        showModal: false
      });
    }, _this.signalExpandShowModal = function () {
      var _this$props = _this.props,
          onExpandEvent = _this$props.onExpandEvent,
          _this$props$currentSt = _this$props.currentState,
          link = _this$props$currentSt.link,
          selectionText = _this$props$currentSt.selectionText;
      var linkTargetOption = _this.state.linkTargetOption;

      onExpandEvent();
      _this.setState({
        showModal: true,
        linkTarget: link && link.target || '',
        linkTargetOption: link && link.targetOption || linkTargetOption,
        linkTitle: link && link.title || selectionText
      });
    }, _this.forceExpandAndShowModal = function () {
      var _this$props2 = _this.props,
          doExpand = _this$props2.doExpand,
          _this$props2$currentS = _this$props2.currentState,
          link = _this$props2$currentS.link,
          selectionText = _this$props2$currentS.selectionText;
      var linkTargetOption = _this.state.linkTargetOption;

      doExpand();
      _this.setState({
        showModal: true,
        linkTarget: link && link.target,
        linkTargetOption: link && link.targetOption || linkTargetOption,
        linkTitle: link && link.title || selectionText
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.expanded && !props.expanded) {
        this.setState({
          showModal: false,
          linkTarget: '',
          linkTitle: '',
          linkTargetOption: this.props.config.defaultTargetOption
        });
      }
    }
  }, {
    key: 'renderAddLinkModal',
    value: function renderAddLinkModal() {
      var _props = this.props,
          popupClassName = _props.config.popupClassName,
          doCollapse = _props.doCollapse,
          translations = _props.translations;
      var _state = this.state,
          linkTitle = _state.linkTitle,
          linkTarget = _state.linkTarget,
          linkTargetOption = _state.linkTargetOption;

      return React__default.createElement(
        'div',
        {
          className: classnames('rdw-link-modal', popupClassName),
          onClick: stopPropagation
        },
        React__default.createElement(
          'label',
          { className: 'rdw-link-modal-label', htmlFor: 'linkTitle' },
          translations['components.controls.link.linkTitle']
        ),
        React__default.createElement('input', {
          id: 'linkTitle',
          className: 'rdw-link-modal-input',
          onChange: this.updateValue,
          onBlur: this.updateValue,
          name: 'linkTitle',
          value: linkTitle
        }),
        React__default.createElement(
          'label',
          { className: 'rdw-link-modal-label', htmlFor: 'linkTarget' },
          translations['components.controls.link.linkTarget']
        ),
        React__default.createElement('input', {
          id: 'linkTarget',
          className: 'rdw-link-modal-input',
          onChange: this.updateValue,
          onBlur: this.updateValue,
          name: 'linkTarget',
          value: linkTarget
        }),
        React__default.createElement(
          'label',
          { className: 'rdw-link-modal-target-option', htmlFor: 'openLinkInNewWindow' },
          React__default.createElement('input', {
            id: 'openLinkInNewWindow',
            type: 'checkbox',
            defaultChecked: linkTargetOption === '_blank',
            value: '_blank',
            onChange: this.updateTargetOption
          }),
          React__default.createElement(
            'span',
            null,
            translations['components.controls.link.linkTargetOption']
          )
        ),
        React__default.createElement(
          'span',
          { className: 'rdw-link-modal-buttonsection' },
          React__default.createElement(
            'button',
            {
              className: 'rdw-link-modal-btn',
              onClick: this.addLink,
              disabled: !linkTarget || !linkTitle
            },
            translations['generic.add']
          ),
          React__default.createElement(
            'button',
            {
              className: 'rdw-link-modal-btn',
              onClick: doCollapse
            },
            translations['generic.cancel']
          )
        )
      );
    }
  }, {
    key: 'renderInFlatList',
    value: function renderInFlatList() {
      var _props2 = this.props,
          _props2$config = _props2.config,
          options = _props2$config.options,
          link = _props2$config.link,
          unlink = _props2$config.unlink,
          className = _props2$config.className,
          currentState = _props2.currentState,
          expanded = _props2.expanded,
          translations = _props2.translations;
      var showModal = this.state.showModal;

      return React__default.createElement(
        'div',
        { className: classnames('rdw-link-wrapper', className), 'aria-label': 'rdw-link-control' },
        options.indexOf('link') >= 0 && React__default.createElement(
          Option,
          {
            value: 'unordered-list-item',
            className: classnames(link.className),
            onClick: this.signalExpandShowModal,
            'aria-haspopup': 'true',
            'aria-expanded': showModal,
            title: link.title || translations['components.controls.link.link']
          },
          React__default.createElement('img', {
            src: link.icon,
            alt: ''
          })
        ),
        options.indexOf('unlink') >= 0 && React__default.createElement(
          Option,
          {
            disabled: !currentState.link,
            value: 'ordered-list-item',
            className: classnames(unlink.className),
            onClick: this.removeLink,
            title: unlink.title || translations['components.controls.link.unlink']
          },
          React__default.createElement('img', {
            src: unlink.icon,
            alt: ''
          })
        ),
        expanded && showModal ? this.renderAddLinkModal() : undefined
      );
    }
  }, {
    key: 'renderInDropDown',
    value: function renderInDropDown() {
      var _props3 = this.props,
          expanded = _props3.expanded,
          onExpandEvent = _props3.onExpandEvent,
          doCollapse = _props3.doCollapse,
          doExpand = _props3.doExpand,
          onChange = _props3.onChange,
          config = _props3.config,
          currentState = _props3.currentState,
          translations = _props3.translations;
      var options = config.options,
          link = config.link,
          unlink = config.unlink,
          className = config.className,
          dropdownClassName = config.dropdownClassName,
          title = config.title;
      var showModal = this.state.showModal;

      return React__default.createElement(
        'div',
        {
          className: 'rdw-link-wrapper',
          'aria-haspopup': 'true',
          'aria-label': 'rdw-link-control',
          'aria-expanded': expanded,
          title: title
        },
        React__default.createElement(
          Dropdown$7,
          {
            className: classnames('rdw-link-dropdown', className),
            optionWrapperClassName: classnames(dropdownClassName),
            onChange: onChange,
            expanded: expanded && !showModal,
            doExpand: doExpand,
            doCollapse: doCollapse,
            onExpandEvent: onExpandEvent
          },
          React__default.createElement('img', {
            src: getFirstIcon(config),
            alt: ''
          }),
          options.indexOf('link') >= 0 && React__default.createElement(
            DropdownOption$6,
            {
              onClick: this.forceExpandAndShowModal,
              className: classnames('rdw-link-dropdownoption', link.className),
              title: link.title || translations['components.controls.link.link']
            },
            React__default.createElement('img', {
              src: link.icon,
              alt: ''
            })
          ),
          options.indexOf('unlink') >= 0 && React__default.createElement(
            DropdownOption$6,
            {
              onClick: this.removeLink,
              disabled: !currentState.link,
              className: classnames('rdw-link-dropdownoption', unlink.className),
              title: unlink.title || translations['components.controls.link.unlink']
            },
            React__default.createElement('img', {
              src: unlink.icon,
              alt: ''
            })
          )
        ),
        expanded && showModal ? this.renderAddLinkModal() : undefined
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var inDropdown = this.props.config.inDropdown;

      if (inDropdown) {
        return this.renderInDropDown();
      }
      return this.renderInFlatList();
    }
  }]);
  return LayoutComponent;
}(React.Component);

LayoutComponent$5.propTypes = {
  expanded: propTypes.bool,
  doExpand: propTypes.func,
  doCollapse: propTypes.func,
  onExpandEvent: propTypes.func,
  config: propTypes.object,
  onChange: propTypes.func,
  currentState: propTypes.object,
  translations: propTypes.object
};

var linkify = linkifyIt();

var Link = function (_Component) {
  inherits(Link, _Component);

  function Link() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false,
      link: undefined,
      selectionText: undefined
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.onChange = function (action, title, target, targetOption) {
      if (action === 'link') {
        var links = linkify.match(target);
        var linkifiedTarget = links && links[0] ? links[0].url : '';
        _this.addLink(title, linkifiedTarget, targetOption);
      } else {
        _this.removeLink();
      }
    }, _this.getCurrentValues = function () {
      var editorState = _this.props.editorState;
      var currentEntity = _this.state.currentEntity;

      var contentState = editorState.getCurrentContent();
      var currentValues = {};
      if (currentEntity && contentState.getEntity(currentEntity).get('type') === 'LINK') {
        currentValues.link = {};
        var entityRange = currentEntity && draftjsUtils_15(editorState, currentEntity);
        currentValues.link.target = currentEntity && contentState.getEntity(currentEntity).get('data').url;
        currentValues.link.targetOption = currentEntity && contentState.getEntity(currentEntity).get('data').targetOption;
        currentValues.link.title = entityRange && entityRange.text;
      }
      currentValues.selectionText = draftjsUtils_16(editorState);
      return currentValues;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.removeLink = function () {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;
      var currentEntity = _this.state.currentEntity;

      var selection = editorState.getSelection();
      if (currentEntity) {
        var entityRange = draftjsUtils_15(editorState, currentEntity);
        selection = selection.merge({
          anchorOffset: entityRange.start,
          focusOffset: entityRange.end
        });
        onChange(require$$1.RichUtils.toggleLink(editorState, selection, null));
      }
    }, _this.addLink = function (linkTitle, linkTarget, linkTargetOption) {
      var _this$props2 = _this.props,
          editorState = _this$props2.editorState,
          onChange = _this$props2.onChange;
      var currentEntity = _this.state.currentEntity;

      var selection = editorState.getSelection();

      if (currentEntity) {
        var entityRange = draftjsUtils_15(editorState, currentEntity);
        selection = selection.merge({
          anchorOffset: entityRange.start,
          focusOffset: entityRange.end
        });
      }
      var entityKey = editorState.getCurrentContent().createEntity('LINK', 'MUTABLE', { url: linkTarget, targetOption: linkTargetOption }).getLastCreatedEntityKey();

      var contentState = require$$1.Modifier.replaceText(editorState.getCurrentContent(), selection, '' + linkTitle, editorState.getCurrentInlineStyle(), entityKey);
      var newEditorState = require$$1.EditorState.push(editorState, contentState, 'insert-characters');

      // insert a blank space after link
      selection = newEditorState.getSelection().merge({
        anchorOffset: selection.get('anchorOffset') + linkTitle.length,
        focusOffset: selection.get('anchorOffset') + linkTitle.length
      });
      newEditorState = require$$1.EditorState.acceptSelection(newEditorState, selection);
      contentState = require$$1.Modifier.insertText(newEditorState.getCurrentContent(), selection, ' ', newEditorState.getCurrentInlineStyle(), undefined);
      onChange(require$$1.EditorState.push(newEditorState, contentState, 'insert-characters'));
      _this.doCollapse();
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Link, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          currentEntity: draftjsUtils_17(editorState)
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var newState = {};
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        newState.currentEntity = draftjsUtils_17(properties.editorState);
      }
      this.setState(newState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          config = _props2.config,
          translations = _props2.translations;
      var expanded = this.state.expanded;

      var _getCurrentValues = this.getCurrentValues(),
          link = _getCurrentValues.link,
          selectionText = _getCurrentValues.selectionText;

      var LinkComponent = config.component || LayoutComponent$5;
      return React__default.createElement(LinkComponent, {
        config: config,
        translations: translations,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        currentState: {
          link: link,
          selectionText: selectionText
        },
        onChange: this.onChange
      });
    }
  }]);
  return Link;
}(React.Component);

Link.propTypes = {
  editorState: propTypes.object.isRequired,
  onChange: propTypes.func.isRequired,
  modalHandler: propTypes.object,
  config: propTypes.object,
  translations: propTypes.object
};

var css$b = ".styles_rdw-embedded-wrapper__crjO7 {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  position: relative;\n}\n.styles_rdw-embedded-modal__2aZQX {\n  position: absolute;\n  top: 35px;\n  left: 5px;\n  display: flex;\n  flex-direction: column;\n  width: 235px;\n  height: 180px;\n  border: 1px solid #F1F1F1;\n  padding: 15px;\n  border-radius: 2px;\n  z-index: 100;\n  background: white;\n  justify-content: space-between;\n  box-shadow: 3px 3px 5px #BFBDBD;\n}\n.styles_rdw-embedded-modal-header__2p1OS {\n  font-size: 15px;\n  display: flex;\n}\n.styles_rdw-embedded-modal-header-option__28vzF {\n  width: 50%;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n.styles_rdw-embedded-modal-header-label__1W4pk {\n  width: 95px;\n  border: 1px solid #f1f1f1;\n  margin-top: 5px;\n  background: #6EB8D4;\n  border-bottom: 2px solid #0a66b7;\n}\n.styles_rdw-embedded-modal-link-section__3wW4V {\n  display: flex;\n  flex-direction: column;\n}\n.styles_rdw-embedded-modal-link-input__6yOT0 {\n  width: 88%;\n  height: 35px;\n  margin: 10px 0;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  font-size: 15px;\n  padding: 0 5px;\n}\n.styles_rdw-embedded-modal-link-input-wrapper__3qMH7 {\n  display: flex;\n  align-items: center;\n}\n.styles_rdw-embedded-modal-link-input__6yOT0:focus {\n  outline: none;\n}\n.styles_rdw-embedded-modal-btn-section__jea1c {\n  display: flex;\n  justify-content: center;\n}\n.styles_rdw-embedded-modal-btn__3j8YC {\n  margin: 0 3px;\n  width: 75px;\n  height: 30px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  cursor: pointer;\n  background: white;\n  text-transform: capitalize;\n}\n.styles_rdw-embedded-modal-btn__3j8YC:hover {\n  box-shadow: 1px 1px 0px #BFBDBD;\n}\n.styles_rdw-embedded-modal-btn__3j8YC:active {\n  box-shadow: 1px 1px 0px #BFBDBD inset;\n}\n.styles_rdw-embedded-modal-btn__3j8YC:focus {\n  outline: none !important;\n}\n.styles_rdw-embedded-modal-btn__3j8YC:disabled {\n  background: #ece9e9;\n}\n.styles_rdw-embedded-modal-size__3vBgk {\n  align-items: center;\n  display: flex;\n  margin: 8px 0;\n  justify-content: space-between;\n}\n.styles_rdw-embedded-modal-size-input__2CPz3 {\n  width: 80%;\n  height: 20px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  font-size: 12px;\n}\n.styles_rdw-embedded-modal-size-input__2CPz3:focus {\n  outline: none;\n}\n";
styleInject(css$b);

var LayoutComponent$6 = function (_Component) {
  inherits(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      embeddedLink: '',
      height: _this.props.config.defaultSize.height,
      width: _this.props.config.defaultSize.width
    }, _this.onChange = function () {
      var onChange = _this.props.onChange;
      var _this$state = _this.state,
          embeddedLink = _this$state.embeddedLink,
          height = _this$state.height,
          width = _this$state.width;

      onChange(embeddedLink, height, width);
    }, _this.updateValue = function (event) {
      _this.setState(defineProperty({}, '' + event.target.name, event.target.value));
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.expanded && !props.expanded) {
        var _props$config$default = this.props.config.defaultSize,
            height = _props$config$default.height,
            width = _props$config$default.width;

        this.setState({
          embeddedLink: '',
          height: height,
          width: width
        });
      }
    }
  }, {
    key: 'rendeEmbeddedLinkModal',
    value: function rendeEmbeddedLinkModal() {
      var _state = this.state,
          embeddedLink = _state.embeddedLink,
          height = _state.height,
          width = _state.width;
      var _props = this.props,
          popupClassName = _props.config.popupClassName,
          doCollapse = _props.doCollapse,
          translations = _props.translations;

      return React__default.createElement(
        'div',
        {
          className: classnames('rdw-embedded-modal', popupClassName),
          onClick: stopPropagation
        },
        React__default.createElement(
          'div',
          { className: 'rdw-embedded-modal-header' },
          React__default.createElement(
            'span',
            { className: 'rdw-embedded-modal-header-option' },
            translations['components.controls.embedded.embeddedlink'],
            React__default.createElement('span', { className: 'rdw-embedded-modal-header-label' })
          )
        ),
        React__default.createElement(
          'div',
          { className: 'rdw-embedded-modal-link-section' },
          React__default.createElement(
            'span',
            { className: 'rdw-embedded-modal-link-input-wrapper' },
            React__default.createElement('input', {
              className: 'rdw-embedded-modal-link-input',
              placeholder: translations['components.controls.embedded.enterlink'],
              onChange: this.updateValue,
              onBlur: this.updateValue,
              value: embeddedLink,
              name: 'embeddedLink'
            }),
            React__default.createElement(
              'span',
              { className: 'rdw-image-mandatory-sign' },
              '*'
            )
          ),
          React__default.createElement(
            'div',
            { className: 'rdw-embedded-modal-size' },
            React__default.createElement(
              'span',
              null,
              React__default.createElement('input', {
                onChange: this.updateValue,
                onBlur: this.updateValue,
                value: height,
                name: 'height',
                className: 'rdw-embedded-modal-size-input',
                placeholder: 'Height'
              }),
              React__default.createElement(
                'span',
                { className: 'rdw-image-mandatory-sign' },
                '*'
              )
            ),
            React__default.createElement(
              'span',
              null,
              React__default.createElement('input', {
                onChange: this.updateValue,
                onBlur: this.updateValue,
                value: width,
                name: 'width',
                className: 'rdw-embedded-modal-size-input',
                placeholder: 'Width'
              }),
              React__default.createElement(
                'span',
                { className: 'rdw-image-mandatory-sign' },
                '*'
              )
            )
          )
        ),
        React__default.createElement(
          'span',
          { className: 'rdw-embedded-modal-btn-section' },
          React__default.createElement(
            'button',
            {
              type: 'button',
              className: 'rdw-embedded-modal-btn',
              onClick: this.onChange,
              disabled: !embeddedLink || !height || !width
            },
            translations['generic.add']
          ),
          React__default.createElement(
            'button',
            {
              type: 'button',
              className: 'rdw-embedded-modal-btn',
              onClick: doCollapse
            },
            translations['generic.cancel']
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          _props2$config = _props2.config,
          icon = _props2$config.icon,
          className = _props2$config.className,
          title = _props2$config.title,
          expanded = _props2.expanded,
          onExpandEvent = _props2.onExpandEvent,
          translations = _props2.translations;

      return React__default.createElement(
        'div',
        {
          className: 'rdw-embedded-wrapper',
          'aria-haspopup': 'true',
          'aria-expanded': expanded,
          'aria-label': 'rdw-embedded-control'
        },
        React__default.createElement(
          Option,
          {
            className: classnames(className),
            value: 'unordered-list-item',
            onClick: onExpandEvent,
            title: title || translations['components.controls.embedded.embedded']
          },
          React__default.createElement('img', {
            src: icon,
            alt: ''
          })
        ),
        expanded ? this.rendeEmbeddedLinkModal() : undefined
      );
    }
  }]);
  return LayoutComponent;
}(React.Component);

LayoutComponent$6.propTypes = {
  expanded: propTypes.bool,
  onExpandEvent: propTypes.func,
  onChange: propTypes.func,
  config: propTypes.object,
  translations: propTypes.object,
  doCollapse: propTypes.func
};

var Embedded = function (_Component) {
  inherits(Embedded, _Component);

  function Embedded() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Embedded);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Embedded.__proto__ || Object.getPrototypeOf(Embedded)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.addEmbeddedLink = function (embeddedLink, height, width) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var entityKey = editorState.getCurrentContent().createEntity('EMBEDDED_LINK', 'MUTABLE', { src: embeddedLink, height: height, width: width }).getLastCreatedEntityKey();
      var newEditorState = require$$1.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
      onChange(newEditorState);
      _this.doCollapse();
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Embedded, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          config = _props.config,
          translations = _props.translations;
      var expanded = this.state.expanded;

      var EmbeddedComponent = config.component || LayoutComponent$6;
      return React__default.createElement(EmbeddedComponent, {
        config: config,
        translations: translations,
        onChange: this.addEmbeddedLink,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse
      });
    }
  }]);
  return Embedded;
}(React.Component);

Embedded.propTypes = {
  editorState: propTypes.object.isRequired,
  onChange: propTypes.func.isRequired,
  modalHandler: propTypes.object,
  config: propTypes.object,
  translations: propTypes.object
};

var css$c = ".styles_rdw-emoji-wrapper__2VWdc {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  position: relative;\n}\n.styles_rdw-emoji-modal__2RjKS {\n  overflow: auto;\n  position: absolute;\n  top: 35px;\n  left: 5px;\n  display: flex;\n  flex-wrap: wrap;\n  width: 235px;\n  height: 180px;\n  border: 1px solid #F1F1F1;\n  padding: 15px;\n  border-radius: 2px;\n  z-index: 100;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n}\n.styles_rdw-emoji-icon__1fYYc {\n  margin: 2.5px;\n  height: 24px;\n  width: 24px;\n  cursor: pointer;\n  font-size: 22px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n";
styleInject(css$c);

var LayoutComponent$7 = function (_Component) {
  inherits(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (event) {
      var onChange = _this.props.onChange;

      onChange(event.target.innerHTML);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(LayoutComponent, [{
    key: 'renderEmojiModal',
    value: function renderEmojiModal() {
      var _this2 = this;

      var _props$config = this.props.config,
          popupClassName = _props$config.popupClassName,
          emojis = _props$config.emojis;

      return React__default.createElement(
        'div',
        {
          className: classnames('rdw-emoji-modal', popupClassName),
          onClick: stopPropagation
        },
        emojis.map(function (emoji, index) {
          return React__default.createElement(
            'span',
            {
              key: index,
              className: 'rdw-emoji-icon',
              alt: '',
              onClick: _this2.onChange
            },
            emoji
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$config2 = _props.config,
          icon = _props$config2.icon,
          className = _props$config2.className,
          title = _props$config2.title,
          expanded = _props.expanded,
          onExpandEvent = _props.onExpandEvent,
          translations = _props.translations;

      return React__default.createElement(
        'div',
        {
          className: 'rdw-emoji-wrapper',
          'aria-haspopup': 'true',
          'aria-label': 'rdw-emoji-control',
          'aria-expanded': expanded,
          title: title || translations['components.controls.emoji.emoji']
        },
        React__default.createElement(
          Option,
          {
            className: classnames(className),
            value: 'unordered-list-item',
            onClick: onExpandEvent
          },
          React__default.createElement('img', {
            src: icon,
            alt: ''
          })
        ),
        expanded ? this.renderEmojiModal() : undefined
      );
    }
  }]);
  return LayoutComponent;
}(React.Component);

LayoutComponent$7.propTypes = {
  expanded: propTypes.bool,
  onExpandEvent: propTypes.func,
  onChange: propTypes.func,
  config: propTypes.object,
  translations: propTypes.object
};

var Emoji = function (_Component) {
  inherits(Emoji, _Component);

  function Emoji() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Emoji);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Emoji.__proto__ || Object.getPrototypeOf(Emoji)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.addEmoji = function (emoji) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var contentState = require$$1.Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), emoji, editorState.getCurrentInlineStyle());
      onChange(require$$1.EditorState.push(editorState, contentState, 'insert-characters'));
      _this.doCollapse();
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Emoji, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          config = _props.config,
          translations = _props.translations;
      var expanded = this.state.expanded;

      var EmojiComponent = config.component || LayoutComponent$7;
      return React__default.createElement(EmojiComponent, {
        config: config,
        translations: translations,
        onChange: this.addEmoji,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        onCollpase: this.closeModal
      });
    }
  }]);
  return Emoji;
}(React.Component);

// todo: unit test cases


Emoji.propTypes = {
  editorState: propTypes.object.isRequired,
  onChange: propTypes.func.isRequired,
  modalHandler: propTypes.object,
  config: propTypes.object,
  translations: propTypes.object
};

var css$d = ".styles_rdw-spinner__3fq_M {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  width: 100%;\n}\n.styles_rdw-spinner__3fq_M > div {\n  width: 12px;\n  height: 12px;\n  background-color: #333;\n\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: styles_sk-bouncedelay__2is2_ 1.4s infinite ease-in-out both;\n  animation: styles_sk-bouncedelay__2is2_ 1.4s infinite ease-in-out both;\n}\n.styles_rdw-spinner__3fq_M .styles_rdw-bounce1__1TUsR {\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n.styles_rdw-spinner__3fq_M .styles_rdw-bounce2__LB1Wi {\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n@-webkit-keyframes styles_sk-bouncedelay__2is2_ {\n  0%, 80%, 100% { -webkit-transform: scale(0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n@keyframes styles_sk-bouncedelay__2is2_ {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 40% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n  }\n}\n";
styleInject(css$d);

var Spinner = (function () {
  return React__default.createElement(
    'div',
    { className: 'rdw-spinner' },
    React__default.createElement('div', { className: 'rdw-bounce1' }),
    React__default.createElement('div', { className: 'rdw-bounce2' }),
    React__default.createElement('div', { className: 'rdw-bounce3' })
  );
});

var css$e = ".styles_rdw-image-wrapper__2P_ik {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  position: relative;\n}\n.styles_rdw-image-modal__358GB {\n  position: absolute;\n  top: 35px;\n  left: 5px;\n  display: flex;\n  flex-direction: column;\n  width: 235px;\n  border: 1px solid #F1F1F1;\n  padding: 15px;\n  border-radius: 2px;\n  z-index: 100;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n}\n.styles_rdw-image-modal-header__1zXZD {\n  font-size: 15px;\n  margin: 10px 0;\n  display: flex;\n}\n.styles_rdw-image-modal-header-option__3KDZU {\n  width: 50%;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n.styles_rdw-image-modal-header-label__1w0Hh {\n  width: 80px;\n  background: #f1f1f1;\n  border: 1px solid #f1f1f1;\n  margin-top: 5px;\n}\n.styles_rdw-image-modal-header-label-highlighted__1siL8 {\n  background: #6EB8D4;\n  border-bottom: 2px solid #0a66b7;\n}\n.styles_rdw-image-modal-upload-option__34rnS {\n  width: 100%;\n  color: gray;\n  cursor: pointer;\n  display: flex;\n  border: none;\n  font-size: 15px;\n  align-items: center;\n  justify-content: center;\n  background-color: #f1f1f1;\n  outline: 2px dashed gray;\n  outline-offset: -10px;\n  margin: 10px 0;\n  padding: 9px 0;\n}\n.styles_rdw-image-modal-upload-option-highlighted__2oCkQ {\n  outline: 2px dashed #0a66b7;\n}\n.styles_rdw-image-modal-upload-option-label__3liaD {\n  cursor: pointer;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 15px;\n}\n.styles_rdw-image-modal-upload-option-label__3liaD span{\n  padding: 0 20px;\n}\n.styles_rdw-image-modal-upload-option-image-preview__xOuVO {\n  max-width: 100%;\n  max-height: 200px;\n}\n.styles_rdw-image-modal-upload-option-input__2BsE- {\n\twidth: 0.1px;\n\theight: 0.1px;\n\topacity: 0;\n\toverflow: hidden;\n\tposition: absolute;\n\tz-index: -1;\n}\n.styles_rdw-image-modal-url-section__2RjXN {\n  display: flex;\n  align-items: center;\n}\n.styles_rdw-image-modal-url-input__krb1b {\n  width: 90%;\n  height: 35px;\n  margin: 15px 0 12px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  font-size: 15px;\n  padding: 0 5px;\n}\n.styles_rdw-image-modal-btn-section__1Vn_i {\n  margin: 10px auto 0;\n}\n.styles_rdw-image-modal-url-input__krb1b:focus {\n  outline: none;\n}\n.styles_rdw-image-modal-btn__2wJg_ {\n  margin: 0 5px;\n  width: 75px;\n  height: 30px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  cursor: pointer;\n  background: white;\n  text-transform: capitalize;\n}\n.styles_rdw-image-modal-btn__2wJg_:hover {\n  box-shadow: 1px 1px 0px #BFBDBD;\n}\n.styles_rdw-image-modal-btn__2wJg_:active {\n  box-shadow: 1px 1px 0px #BFBDBD inset;\n}\n.styles_rdw-image-modal-btn__2wJg_:focus {\n  outline: none !important;\n}\n.styles_rdw-image-modal-btn__2wJg_:disabled {\n  background: #ece9e9;\n}\n.styles_rdw-image-modal-spinner__OG7P5 {\n  position: absolute;\n  top: -3px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n}\n.styles_rdw-image-modal-alt-input__Rzgyn {\n  width: 70%;\n  height: 20px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  font-size: 12px;\n  margin-left: 5px;\n}\n.styles_rdw-image-modal-alt-input__Rzgyn:focus {\n  outline: none;\n}\n.styles_rdw-image-modal-alt-lbl__98fYj {\n  font-size: 12px;\n}\n.styles_rdw-image-modal-size__1UTkX {\n  align-items: center;\n  display: flex;\n  margin: 8px 0;\n  justify-content: space-between;\n}\n.styles_rdw-image-modal-size-input__3UJGL {\n  width: 40%;\n  height: 20px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  font-size: 12px;\n}\n.styles_rdw-image-modal-size-input__3UJGL:focus {\n  outline: none;\n}\n.styles_rdw-image-mandatory-sign__mvhvA {\n  color: red;\n  margin-left: 3px;\n  margin-right: 3px;\n}\n";
styleInject(css$e);

var LayoutComponent$8 = function (_Component) {
  inherits(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      imgSrc: '',
      dragEnter: false,
      uploadHighlighted: _this.props.config.uploadEnabled && !!_this.props.config.uploadCallback,
      showImageLoading: false,
      height: _this.props.config.defaultSize.height,
      width: _this.props.config.defaultSize.width,
      alt: ''
    }, _this.onDragEnter = function (event) {
      _this.stopPropagation(event);
      _this.setState({
        dragEnter: true
      });
    }, _this.onImageDrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
      _this.setState({
        dragEnter: false
      });

      // Check if property name is files or items
      // IE uses 'files' instead of 'items'
      var data = void 0;
      var dataIsItems = void 0;
      if (event.dataTransfer.items) {
        data = event.dataTransfer.items;
        dataIsItems = true;
      } else {
        data = event.dataTransfer.files;
        dataIsItems = false;
      }
      for (var i = 0; i < data.length; i += 1) {
        if ((!dataIsItems || data[i].kind === 'file') && data[i].type.match('^image/')) {
          var file = dataIsItems ? data[i].getAsFile() : data[i];
          _this.uploadImage(file);
        }
      }
    }, _this.showImageUploadOption = function () {
      _this.setState({
        uploadHighlighted: true
      });
    }, _this.addImageFromState = function () {
      var _this$state = _this.state,
          imgSrc = _this$state.imgSrc,
          alt = _this$state.alt;
      var _this$state2 = _this.state,
          height = _this$state2.height,
          width = _this$state2.width;
      var onChange = _this.props.onChange;

      if (!isNaN(height)) {
        height += 'px';
      }
      if (!isNaN(width)) {
        width += 'px';
      }
      onChange(imgSrc, height, width, alt);
    }, _this.showImageURLOption = function () {
      _this.setState({
        uploadHighlighted: false
      });
    }, _this.toggleShowImageLoading = function () {
      var showImageLoading = !_this.state.showImageLoading;
      _this.setState({
        showImageLoading: showImageLoading
      });
    }, _this.updateValue = function (event) {
      _this.setState(defineProperty({}, '' + event.target.name, event.target.value));
    }, _this.selectImage = function (event) {
      if (event.target.files && event.target.files.length > 0) {
        _this.uploadImage(event.target.files[0]);
      }
    }, _this.uploadImage = function (file) {
      _this.toggleShowImageLoading();
      var uploadCallback = _this.props.config.uploadCallback;

      uploadCallback(file).then(function (_ref2) {
        var data = _ref2.data;

        _this.setState({
          showImageLoading: false,
          dragEnter: false,
          imgSrc: data.link || data.url
        });
        _this.fileUpload = false;
      }).catch(function () {
        _this.setState({
          showImageLoading: false,
          dragEnter: false
        });
      });
    }, _this.fileUploadClick = function (event) {
      _this.fileUpload = true;
      event.stopPropagation();
    }, _this.stopPropagation = function (event) {
      if (!_this.fileUpload) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        _this.fileUpload = false;
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.expanded && !props.expanded) {
        this.setState({
          imgSrc: '',
          dragEnter: false,
          uploadHighlighted: this.props.config.uploadEnabled && !!this.props.config.uploadCallback,
          showImageLoading: false,
          height: this.props.config.defaultSize.height,
          width: this.props.config.defaultSize.width,
          alt: ''
        });
      } else if (props.config.uploadCallback !== this.props.config.uploadCallback || props.config.uploadEnabled !== this.props.config.uploadEnabled) {
        this.setState({
          uploadHighlighted: props.config.uploadEnabled && !!props.config.uploadCallback
        });
      }
    }
  }, {
    key: 'renderAddImageModal',
    value: function renderAddImageModal() {
      var _state = this.state,
          imgSrc = _state.imgSrc,
          uploadHighlighted = _state.uploadHighlighted,
          showImageLoading = _state.showImageLoading,
          dragEnter = _state.dragEnter,
          height = _state.height,
          width = _state.width,
          alt = _state.alt;
      var _props = this.props,
          _props$config = _props.config,
          popupClassName = _props$config.popupClassName,
          uploadCallback = _props$config.uploadCallback,
          uploadEnabled = _props$config.uploadEnabled,
          urlEnabled = _props$config.urlEnabled,
          previewImage = _props$config.previewImage,
          inputAccept = _props$config.inputAccept,
          altConf = _props$config.alt,
          doCollapse = _props.doCollapse,
          translations = _props.translations;

      return React__default.createElement(
        'div',
        {
          className: classnames('rdw-image-modal', popupClassName),
          onClick: this.stopPropagation
        },
        React__default.createElement(
          'div',
          { className: 'rdw-image-modal-header' },
          uploadEnabled && uploadCallback && React__default.createElement(
            'span',
            {
              onClick: this.showImageUploadOption,
              className: 'rdw-image-modal-header-option'
            },
            translations['components.controls.image.fileUpload'],
            React__default.createElement('span', {
              className: classnames('rdw-image-modal-header-label', { 'rdw-image-modal-header-label-highlighted': uploadHighlighted })
            })
          ),
          urlEnabled && React__default.createElement(
            'span',
            {
              onClick: this.showImageURLOption,
              className: 'rdw-image-modal-header-option'
            },
            translations['components.controls.image.byURL'],
            React__default.createElement('span', {
              className: classnames('rdw-image-modal-header-label', { 'rdw-image-modal-header-label-highlighted': !uploadHighlighted })
            })
          )
        ),
        uploadHighlighted ? React__default.createElement(
          'div',
          { onClick: this.fileUploadClick },
          React__default.createElement(
            'div',
            {
              onDragEnter: this.onDragEnter,
              onDragOver: this.stopPropagation,
              onDrop: this.onImageDrop,
              className: classnames('rdw-image-modal-upload-option', { 'rdw-image-modal-upload-option-highlighted': dragEnter })
            },
            React__default.createElement(
              'label',
              {
                htmlFor: 'file',
                className: 'rdw-image-modal-upload-option-label'
              },
              previewImage && imgSrc ? React__default.createElement('img', {
                src: imgSrc,
                alt: imgSrc,
                className: 'rdw-image-modal-upload-option-image-preview'
              }) : imgSrc || translations['components.controls.image.dropFileText']
            )
          ),
          React__default.createElement('input', {
            type: 'file',
            id: 'file',
            accept: inputAccept,
            onChange: this.selectImage,
            className: 'rdw-image-modal-upload-option-input'
          })
        ) : React__default.createElement(
          'div',
          { className: 'rdw-image-modal-url-section' },
          React__default.createElement('input', {
            className: 'rdw-image-modal-url-input',
            placeholder: translations['components.controls.image.enterlink'],
            name: 'imgSrc',
            onChange: this.updateValue,
            onBlur: this.updateValue,
            value: imgSrc
          }),
          React__default.createElement(
            'span',
            { className: 'rdw-image-mandatory-sign' },
            '*'
          )
        ),
        altConf.present && React__default.createElement(
          'div',
          { className: 'rdw-image-modal-size' },
          React__default.createElement(
            'span',
            { className: 'rdw-image-modal-alt-lbl' },
            'Alt Text'
          ),
          React__default.createElement('input', {
            onChange: this.updateValue,
            onBlur: this.updateValue,
            value: alt,
            name: 'alt',
            className: 'rdw-image-modal-alt-input',
            placeholder: 'alt'
          }),
          React__default.createElement(
            'span',
            { className: 'rdw-image-mandatory-sign' },
            altConf.mandatory && '*'
          )
        ),
        React__default.createElement(
          'div',
          { className: 'rdw-image-modal-size' },
          '\u2195\xA0',
          React__default.createElement('input', {
            onChange: this.updateValue,
            onBlur: this.updateValue,
            value: height,
            name: 'height',
            className: 'rdw-image-modal-size-input',
            placeholder: 'Height'
          }),
          React__default.createElement(
            'span',
            { className: 'rdw-image-mandatory-sign' },
            '*'
          ),
          '\xA0\u2194\xA0',
          React__default.createElement('input', {
            onChange: this.updateValue,
            onBlur: this.updateValue,
            value: width,
            name: 'width',
            className: 'rdw-image-modal-size-input',
            placeholder: 'Width'
          }),
          React__default.createElement(
            'span',
            { className: 'rdw-image-mandatory-sign' },
            '*'
          )
        ),
        React__default.createElement(
          'span',
          { className: 'rdw-image-modal-btn-section' },
          React__default.createElement(
            'button',
            {
              className: 'rdw-image-modal-btn',
              onClick: this.addImageFromState,
              disabled: !imgSrc || !height || !width || altConf.mandatory && !alt
            },
            translations['generic.add']
          ),
          React__default.createElement(
            'button',
            {
              className: 'rdw-image-modal-btn',
              onClick: doCollapse
            },
            translations['generic.cancel']
          )
        ),
        showImageLoading ? React__default.createElement(
          'div',
          { className: 'rdw-image-modal-spinner' },
          React__default.createElement(Spinner, null)
        ) : undefined
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          _props2$config = _props2.config,
          icon = _props2$config.icon,
          className = _props2$config.className,
          title = _props2$config.title,
          expanded = _props2.expanded,
          onExpandEvent = _props2.onExpandEvent,
          translations = _props2.translations;

      return React__default.createElement(
        'div',
        {
          className: 'rdw-image-wrapper',
          'aria-haspopup': 'true',
          'aria-expanded': expanded,
          'aria-label': 'rdw-image-control'
        },
        React__default.createElement(
          Option,
          {
            className: classnames(className),
            value: 'unordered-list-item',
            onClick: onExpandEvent,
            title: title || translations['components.controls.image.image']
          },
          React__default.createElement('img', {
            src: icon,
            alt: ''
          })
        ),
        expanded ? this.renderAddImageModal() : undefined
      );
    }
  }]);
  return LayoutComponent;
}(React.Component);

LayoutComponent$8.propTypes = {
  expanded: propTypes.bool,
  onExpandEvent: propTypes.func,
  doCollapse: propTypes.func,
  onChange: propTypes.func,
  config: propTypes.object,
  translations: propTypes.object
};

var ImageControl = function (_Component) {
  inherits(ImageControl, _Component);

  function ImageControl() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ImageControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ImageControl.__proto__ || Object.getPrototypeOf(ImageControl)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.addImage = function (src, height, width, alt) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange,
          config = _this$props.config;

      var entityData = { src: src, height: height, width: width };
      if (config.alt.present) {
        entityData.alt = alt;
      }
      var entityKey = editorState.getCurrentContent().createEntity('IMAGE', 'MUTABLE', entityData).getLastCreatedEntityKey();
      var newEditorState = require$$1.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
      onChange(newEditorState);
      _this.doCollapse();
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ImageControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          config = _props.config,
          translations = _props.translations;
      var expanded = this.state.expanded;

      var ImageComponent = config.component || LayoutComponent$8;
      return React__default.createElement(ImageComponent, {
        config: config,
        translations: translations,
        onChange: this.addImage,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse
      });
    }
  }]);
  return ImageControl;
}(React.Component);

ImageControl.propTypes = {
  editorState: propTypes.object.isRequired,
  onChange: propTypes.func.isRequired,
  modalHandler: propTypes.object,
  config: propTypes.object,
  translations: propTypes.object
};

var css$f = ".styles_rdw-remove-wrapper__2Y1Ai {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  position: relative;\n}\n";
styleInject(css$f);

var RemoveComponent = function RemoveComponent(_ref) {
  var config = _ref.config,
      onChange = _ref.onChange,
      translations = _ref.translations;
  var icon = config.icon,
      className = config.className,
      title = config.title;

  return React__default.createElement(
    'div',
    { className: 'rdw-remove-wrapper', 'aria-label': 'rdw-remove-control' },
    React__default.createElement(
      Option,
      {
        className: classnames(className),
        onClick: onChange,
        title: title || translations['components.controls.remove.remove']
      },
      React__default.createElement('img', {
        src: icon,
        alt: ''
      })
    )
  );
};

RemoveComponent.propTypes = {
  onChange: propTypes.func,
  config: propTypes.object,
  translations: propTypes.object
};

var Remove = function (_Component) {
  inherits(Remove, _Component);

  function Remove() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Remove);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Remove.__proto__ || Object.getPrototypeOf(Remove)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.removeInlineStyles = function () {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      onChange(_this.removeAllInlineStyles(editorState));
    }, _this.removeAllInlineStyles = function (editorState) {
      var contentState = editorState.getCurrentContent();
      ['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'MONOSPACE', 'SUPERSCRIPT', 'SUBSCRIPT'].forEach(function (style) {
        contentState = require$$1.Modifier.removeInlineStyle(contentState, editorState.getSelection(), style);
      });
      var customStyles = draftjsUtils_10(editorState, ['FONTSIZE', 'FONTFAMILY', 'COLOR', 'BGCOLOR']);
      forEach(customStyles, function (key, value) {
        if (value) {
          contentState = require$$1.Modifier.removeInlineStyle(contentState, editorState.getSelection(), value);
        }
      });

      return require$$1.EditorState.push(editorState, contentState, 'change-inline-style');
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Remove, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          config = _props.config,
          translations = _props.translations;
      var expanded = this.state.expanded;

      var RemoveComponent$$1 = config.component || RemoveComponent;
      return React__default.createElement(RemoveComponent$$1, {
        config: config,
        translations: translations,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        onChange: this.removeInlineStyles
      });
    }
  }]);
  return Remove;
}(React.Component);

// todo: unit test coverage


Remove.propTypes = {
  onChange: propTypes.func.isRequired,
  editorState: propTypes.object.isRequired,
  config: propTypes.object,
  translations: propTypes.object,
  modalHandler: propTypes.object
};

var css$g = ".styles_rdw-history-wrapper__1oSed {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.styles_rdw-history-dropdownoption__16x1p {\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.styles_rdw-history-dropdown__1Hdu9 {\n  width: 50px;\n}\n";
styleInject(css$g);

var Dropdown$8 = exports$2.Dropdown;
var DropdownOption$7 = exports$2.DropdownOption;

var History = function (_Component) {
  inherits(History, _Component);

  function History() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, History);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = History.__proto__ || Object.getPrototypeOf(History)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (obj) {
      var onChange = _this.props.onChange;

      onChange(obj);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(History, [{
    key: 'renderInDropDown',
    value: function renderInDropDown() {
      var _props = this.props,
          config = _props.config,
          expanded = _props.expanded,
          doExpand = _props.doExpand,
          onExpandEvent = _props.onExpandEvent,
          doCollapse = _props.doCollapse,
          _props$currentState = _props.currentState,
          undoDisabled = _props$currentState.undoDisabled,
          redoDisabled = _props$currentState.redoDisabled,
          translations = _props.translations;
      var options = config.options,
          undo = config.undo,
          redo = config.redo,
          className = config.className,
          dropdownClassName = config.dropdownClassName,
          title = config.title;

      return React__default.createElement(
        Dropdown$8,
        {
          className: classnames('rdw-history-dropdown', className),
          optionWrapperClassName: classnames(dropdownClassName),
          expanded: expanded,
          doExpand: doExpand,
          doCollapse: doCollapse,
          onExpandEvent: onExpandEvent,
          'aria-label': 'rdw-history-control',
          title: title || translations['components.controls.history.history']
        },
        React__default.createElement('img', {
          src: getFirstIcon(config),
          alt: ''
        }),
        options.indexOf('undo') >= 0 && React__default.createElement(
          DropdownOption$7,
          {
            value: 'undo',
            onClick: this.onChange,
            disabled: undoDisabled,
            className: classnames('rdw-history-dropdownoption', undo.className),
            title: undo.title || translations['components.controls.history.undo']
          },
          React__default.createElement('img', {
            src: undo.icon,
            alt: ''
          })
        ),
        options.indexOf('redo') >= 0 && React__default.createElement(
          DropdownOption$7,
          {
            value: 'redo',
            onClick: this.onChange,
            disabled: redoDisabled,
            className: classnames('rdw-history-dropdownoption', redo.className),
            title: redo.title || translations['components.controls.history.redo']
          },
          React__default.createElement('img', {
            src: redo.icon,
            alt: ''
          })
        )
      );
    }
  }, {
    key: 'renderInFlatList',
    value: function renderInFlatList() {
      var _props2 = this.props,
          _props2$config = _props2.config,
          options = _props2$config.options,
          undo = _props2$config.undo,
          redo = _props2$config.redo,
          className = _props2$config.className,
          _props2$currentState = _props2.currentState,
          undoDisabled = _props2$currentState.undoDisabled,
          redoDisabled = _props2$currentState.redoDisabled,
          translations = _props2.translations;

      return React__default.createElement(
        'div',
        { className: classnames('rdw-history-wrapper', className), 'aria-label': 'rdw-history-control' },
        options.indexOf('undo') >= 0 && React__default.createElement(
          Option,
          {
            value: 'undo',
            onClick: this.onChange,
            className: classnames(undo.className),
            disabled: undoDisabled,
            title: undo.title || translations['components.controls.history.undo']
          },
          React__default.createElement('img', {
            src: undo.icon,
            alt: ''
          })
        ),
        options.indexOf('redo') >= 0 && React__default.createElement(
          Option,
          {
            value: 'redo',
            onClick: this.onChange,
            className: classnames(redo.className),
            disabled: redoDisabled,
            title: redo.title || translations['components.controls.history.redo']
          },
          React__default.createElement('img', {
            src: redo.icon,
            alt: ''
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var config = this.props.config;

      if (config.inDropdown) {
        return this.renderInDropDown();
      }
      return this.renderInFlatList();
    }
  }]);
  return History;
}(React.Component);

History.propTypes = {
  expanded: propTypes.bool,
  doExpand: propTypes.func,
  doCollapse: propTypes.func,
  onExpandEvent: propTypes.func,
  config: propTypes.object,
  onChange: propTypes.func,
  currentState: propTypes.object,
  translations: propTypes.object
};

var History$1 = function (_Component) {
  inherits(History$$1, _Component);

  function History$$1() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, History$$1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = History$$1.__proto__ || Object.getPrototypeOf(History$$1)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false,
      undoDisabled: false,
      redoDisabled: false
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.onChange = function (action) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var newState = require$$1.EditorState[action](editorState);
      if (newState) {
        onChange(newState);
      }
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(History$$1, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          undoDisabled: editorState.getUndoStack().size === 0,
          redoDisabled: editorState.getRedoStack().size === 0
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        this.setState({
          undoDisabled: properties.editorState.getUndoStack().size === 0,
          redoDisabled: properties.editorState.getRedoStack().size === 0
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          config = _props2.config,
          translations = _props2.translations;
      var _state = this.state,
          undoDisabled = _state.undoDisabled,
          redoDisabled = _state.redoDisabled,
          expanded = _state.expanded;

      var HistoryComponent = config.component || History;
      return React__default.createElement(HistoryComponent, {
        config: config,
        translations: translations,
        currentState: { undoDisabled: undoDisabled, redoDisabled: redoDisabled },
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        onChange: this.onChange
      });
    }
  }]);
  return History$$1;
}(React.Component);

History$1.propTypes = {
  onChange: propTypes.func.isRequired,
  editorState: propTypes.object,
  modalHandler: propTypes.object,
  config: propTypes.object,
  translations: propTypes.object
};

var exports$3 = {
  inline: Inline$1,
  blockType: BlockType,
  fontSize: FontSize,
  fontFamily: FontFamily,
  list: List,
  textAlign: TextAlign$1,
  colorPicker: ColorPicker,
  link: Link,
  embedded: Embedded,
  emoji: Emoji,
  image: ImageControl,
  remove: Remove,
  history: History$1
};

module.exports = exports$3;

var openlink = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2215px%22%20height%3D%2215px%22%20viewBox%3D%220%200%2015%2015%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Eopenlink%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22openlink%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.0715845%2C0%20L8.91533451%2C0%20C8.40565141%2C0%207.99103873%2C0.414665493%207.99103873%2C0.924295775%20C7.99103873%2C1.43392606%208.40565141%2C1.84859155%208.91533451%2C1.84859155%20L11.8401761%2C1.84859155%20L6.96121479%2C6.7275%20C6.7865493%2C6.90205986%206.69042254%2C7.13413732%206.69042254%2C7.38110915%20C6.69042254%2C7.62808099%206.78649648%2C7.86010563%206.96110915%2C8.03450704%20C7.13572183%2C8.20927817%207.36774648%2C8.30545775%207.61471831%2C8.30545775%20C7.86158451%2C8.30545775%208.09371479%2C8.20933099%208.26838028%2C8.03466549%20L13.1472887%2C3.15570423%20L13.1472887%2C6.08054577%20C13.1472887%2C6.59017606%2013.5619542%2C7.00484155%2014.0715845%2C7.00484155%20C14.5812148%2C7.00484155%2014.9958803%2C6.59017606%2014.9958803%2C6.08054577%20L14.9958803%2C0.924295775%20C14.9958803%2C0.414665493%2014.5812148%2C0%2014.0715845%2C0%20L14.0715845%2C0%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M10.6234331%2C13.4113732%20L1.58450704%2C13.4113732%20L1.58450704%2C4.37244718%20L8.38262324%2C4.37244718%20L9.96713028%2C2.78794014%20L0.792253521%2C2.78794014%20C0.35471831%2C2.78794014%200%2C3.14265845%200%2C3.58019366%20L0%2C14.2036268%20C0%2C14.641162%200.35471831%2C14.9958803%200.792253521%2C14.9958803%20L11.4156866%2C14.9958803%20C11.8532218%2C14.9958803%2012.2079401%2C14.641162%2012.2079401%2C14.2036268%20L12.2079401%2C5.02875%20L10.6234331%2C6.61325704%20L10.6234331%2C13.4113732%20L10.6234331%2C13.4113732%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var css$h = ".styles_rdw-link-decorator-wrapper__bF3_U {\n  position: relative;\n}\n.styles_rdw-link-decorator-icon__vEEy1 {\n  position: absolute;\n  left: 40%;\n  top: 0;\n  cursor: pointer;\n  background-color: white;\n}\n";
styleInject(css$h);

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}

function getLinkComponent(config) {
  var _class, _temp2;

  var showOpenOptionOnHover = config.showOpenOptionOnHover;
  return _temp2 = _class = function (_Component) {
    inherits(Link, _Component);

    function Link() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, Link);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        showPopOver: false
      }, _this.openLink = function () {
        var _this$props = _this.props,
            entityKey = _this$props.entityKey,
            contentState = _this$props.contentState;

        var _contentState$getEnti = contentState.getEntity(entityKey).getData(),
            url = _contentState$getEnti.url;

        var linkTab = window.open(url, 'blank'); // eslint-disable-line no-undef
        // linkTab can be null when the window failed to open.
        if (linkTab) {
          linkTab.focus();
        }
      }, _this.toggleShowPopOver = function () {
        var showPopOver = !_this.state.showPopOver;
        _this.setState({
          showPopOver: showPopOver
        });
      }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            children = _props.children,
            entityKey = _props.entityKey,
            contentState = _props.contentState;

        var _contentState$getEnti2 = contentState.getEntity(entityKey).getData(),
            url = _contentState$getEnti2.url,
            targetOption = _contentState$getEnti2.targetOption;

        var showPopOver = this.state.showPopOver;

        return React__default.createElement(
          'span',
          {
            className: 'rdw-link-decorator-wrapper',
            onMouseEnter: this.toggleShowPopOver,
            onMouseLeave: this.toggleShowPopOver
          },
          React__default.createElement(
            'a',
            { href: url, target: targetOption },
            children
          ),
          showPopOver && showOpenOptionOnHover ? React__default.createElement('img', {
            src: openlink,
            alt: '',
            onClick: this.openLink,
            className: 'rdw-link-decorator-icon'
          }) : undefined
        );
      }
    }]);
    return Link;
  }(React.Component), _class.propTypes = {
    entityKey: propTypes.string.isRequired,
    children: propTypes.array,
    contentState: propTypes.object
  }, _temp2;
}

var getLinkDecorator = (function (config) {
  return {
    strategy: findLinkEntities,
    component: getLinkComponent(config)
  };
});

var css$i = ".styles_rdw-mention-link__2J4f8 {\n  text-decoration: none;\n  color: #1236ff;\n  background-color: #f0fbff;\n  padding: 1px 2px;\n  border-radius: 2px;\n}\n";
styleInject(css$i);

var Mention = function Mention(className) {
  classCallCheck(this, Mention);

  _initialiseProps.call(this);

  this.className = className;
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.getMentionComponent = function () {
    var className = _this.className;
    var MentionComponent = function MentionComponent(_ref) {
      var entityKey = _ref.entityKey,
          children = _ref.children,
          contentState = _ref.contentState;

      var _contentState$getEnti = contentState.getEntity(entityKey).getData(),
          url = _contentState$getEnti.url,
          value = _contentState$getEnti.value;

      return React__default.createElement(
        'a',
        { href: url || value, className: classnames('rdw-mention-link', className) },
        children
      );
    };
    MentionComponent.propTypes = {
      entityKey: propTypes.number,
      children: propTypes.array,
      contentState: propTypes.object
    };
    return MentionComponent;
  };

  this.getMentionDecorator = function () {
    return {
      strategy: _this.findMentionEntities,
      component: _this.getMentionComponent()
    };
  };
};

Mention.prototype.findMentionEntities = function (contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
  }, callback);
};

module.exports = Mention;

function addMention(editorState, onChange, separator, trigger, suggestion) {
  var value = suggestion.value,
      url = suggestion.url;

  var entityKey = editorState.getCurrentContent().createEntity('MENTION', 'IMMUTABLE', { text: '' + trigger + value, value: value, url: url }).getLastCreatedEntityKey();
  var selectedBlock = draftjsUtils_6(editorState);
  var selectedBlockText = selectedBlock.getText();
  var focusOffset = editorState.getSelection().focusOffset;
  var mentionIndex = (selectedBlockText.lastIndexOf(separator + trigger, focusOffset) || 0) + 1;
  var spaceAlreadyPresent = false;
  if (selectedBlockText.length === mentionIndex + 1) {
    focusOffset = selectedBlockText.length;
  }
  if (selectedBlockText[focusOffset] === ' ') {
    spaceAlreadyPresent = true;
  }
  var updatedSelection = editorState.getSelection().merge({
    anchorOffset: mentionIndex,
    focusOffset: focusOffset
  });
  var newEditorState = require$$1.EditorState.acceptSelection(editorState, updatedSelection);
  var contentState = require$$1.Modifier.replaceText(newEditorState.getCurrentContent(), updatedSelection, '' + trigger + value, newEditorState.getCurrentInlineStyle(), entityKey);
  newEditorState = require$$1.EditorState.push(newEditorState, contentState, 'insert-characters');

  if (!spaceAlreadyPresent) {
    // insert a blank space after mention
    updatedSelection = newEditorState.getSelection().merge({
      anchorOffset: mentionIndex + value.length + trigger.length,
      focusOffset: mentionIndex + value.length + trigger.length
    });
    newEditorState = require$$1.EditorState.acceptSelection(newEditorState, updatedSelection);
    contentState = require$$1.Modifier.insertText(newEditorState.getCurrentContent(), updatedSelection, ' ', newEditorState.getCurrentInlineStyle(), undefined);
  }
  onChange(require$$1.EditorState.push(newEditorState, contentState, 'insert-characters'));
}

var css$j = ".styles_rdw-suggestion-wrapper__3o4V4 {\n  position: relative;\n}\n.styles_rdw-suggestion-dropdown__3tHPB {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  border: 1px solid #F1F1F1;\n  min-width: 100px;\n  max-height: 150px;\n  overflow: auto;\n  background: white;\n  z-index: 100;\n}\n.styles_rdw-suggestion-option__2Tpvt {\n  padding: 7px 5px;\n  border-bottom: 1px solid #f1f1f1;\n}\n.styles_rdw-suggestion-option-active__1mrlR {\n  background-color: #F1F1F1;\n}\n";
styleInject(css$j);

var Suggestion = function Suggestion(config) {
  classCallCheck(this, Suggestion);

  _initialiseProps$1.call(this);

  var separator = config.separator,
      trigger = config.trigger,
      getSuggestions = config.getSuggestions,
      onChange = config.onChange,
      getEditorState = config.getEditorState,
      getWrapperRef = config.getWrapperRef,
      caseSensitive = config.caseSensitive,
      dropdownClassName = config.dropdownClassName,
      optionClassName = config.optionClassName,
      modalHandler = config.modalHandler;

  this.config = {
    separator: separator,
    trigger: trigger,
    getSuggestions: getSuggestions,
    onChange: onChange,
    getEditorState: getEditorState,
    getWrapperRef: getWrapperRef,
    caseSensitive: caseSensitive,
    dropdownClassName: dropdownClassName,
    optionClassName: optionClassName,
    modalHandler: modalHandler
  };
};

var _initialiseProps$1 = function _initialiseProps() {
  var _this3 = this;

  this.findSuggestionEntities = function (contentBlock, callback) {
    if (_this3.config.getEditorState()) {
      var _config = _this3.config,
          separator = _config.separator,
          trigger = _config.trigger,
          getSuggestions = _config.getSuggestions,
          getEditorState = _config.getEditorState;

      var selection = getEditorState().getSelection();
      if (selection.get('anchorKey') === contentBlock.get('key') && selection.get('anchorKey') === selection.get('focusKey')) {
        var text = contentBlock.getText();
        text = text.substr(0, selection.get('focusOffset') === text.length - 1 ? text.length : selection.get('focusOffset') + 1);
        var index = text.lastIndexOf(separator + trigger);
        var preText = separator + trigger;
        if ((index === undefined || index < 0) && text[0] === trigger) {
          index = 0;
          preText = trigger;
        }
        if (index >= 0) {
          var mentionText = text.substr(index + preText.length, text.length);
          var suggestionPresent = getSuggestions().some(function (suggestion) {
            if (suggestion.value) {
              if (_this3.config.caseSensitive) {
                return suggestion.value.indexOf(mentionText) >= 0;
              }
              return suggestion.value.toLowerCase().indexOf(mentionText && mentionText.toLowerCase()) >= 0;
            }
            return false;
          });
          if (suggestionPresent) {
            callback(index === 0 ? 0 : index + 1, text.length);
          }
        }
      }
    }
  };

  this.getSuggestionComponent = getSuggestionComponent.bind(this);

  this.getSuggestionDecorator = function () {
    return {
      strategy: _this3.findSuggestionEntities,
      component: _this3.getSuggestionComponent()
    };
  };
};

function getSuggestionComponent() {
  var _class, _temp2;

  var config = this.config;

  return _temp2 = _class = function (_Component) {
    inherits(SuggestionComponent, _Component);

    function SuggestionComponent() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, SuggestionComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = SuggestionComponent.__proto__ || Object.getPrototypeOf(SuggestionComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        style: { left: 15 },
        activeOption: -1,
        showSuggestions: true
      }, _this.onEditorKeyDown = function (event) {
        var activeOption = _this.state.activeOption;

        var newState = {};
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          if (activeOption === _this.filteredSuggestions.length - 1) {
            newState.activeOption = 0;
          } else {
            newState.activeOption = activeOption + 1;
          }
        } else if (event.key === 'ArrowUp') {
          if (activeOption <= 0) {
            newState.activeOption = _this.filteredSuggestions.length - 1;
          } else {
            newState.activeOption = activeOption - 1;
          }
        } else if (event.key === 'Escape') {
          newState.showSuggestions = false;
          SuggestionHandler.close();
        } else if (event.key === 'Enter') {
          _this.addMention();
        }
        _this.setState(newState);
      }, _this.onOptionMouseEnter = function (event) {
        var index = event.target.getAttribute('data-index');
        _this.setState({
          activeOption: index
        });
      }, _this.onOptionMouseLeave = function () {
        _this.setState({
          activeOption: -1
        });
      }, _this.setSuggestionReference = function (ref) {
        _this.suggestion = ref;
      }, _this.setDropdownReference = function (ref) {
        _this.dropdown = ref;
      }, _this.closeSuggestionDropdown = function () {
        _this.setState({
          showSuggestions: false
        });
      }, _this.filteredSuggestions = [], _this.filterSuggestions = function (props) {
        var mentionText = props.children[0].props.text.substr(1);
        var suggestions = config.getSuggestions();
        _this.filteredSuggestions = suggestions && suggestions.filter(function (suggestion) {
          if (!mentionText || mentionText.length === 0) {
            return true;
          }
          if (config.caseSensitive) {
            return suggestion.value.indexOf(mentionText) >= 0;
          }
          return suggestion.value.toLowerCase().indexOf(mentionText && mentionText.toLowerCase()) >= 0;
        });
      }, _this.addMention = function () {
        var activeOption = _this.state.activeOption;

        var editorState = config.getEditorState();
        var onChange = config.onChange,
            separator = config.separator,
            trigger = config.trigger;

        var selectedMention = _this.filteredSuggestions[activeOption];
        if (selectedMention) {
          addMention(editorState, onChange, separator, trigger, selectedMention);
        }
      }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(SuggestionComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var editorRect = config.getWrapperRef().getBoundingClientRect();
        var suggestionRect = this.suggestion.getBoundingClientRect();
        var dropdownRect = this.dropdown.getBoundingClientRect();
        var left = void 0;
        var right = void 0;
        var bottom = void 0;
        if (editorRect.width < suggestionRect.left - editorRect.left + dropdownRect.width) {
          right = 15;
        } else {
          left = 15;
        }
        if (editorRect.bottom < dropdownRect.bottom) {
          bottom = 0;
        }
        this.setState({ // eslint-disable-line react/no-did-mount-set-state
          style: { left: left, right: right, bottom: bottom }
        });
        KeyDownHandler.registerCallBack(this.onEditorKeyDown);
        SuggestionHandler.open();
        config.modalHandler.setSuggestionCallback(this.closeSuggestionDropdown);
        this.filterSuggestions(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(props) {
        if (this.props.children !== props.children) {
          this.filterSuggestions(props);
          this.setState({
            showSuggestions: true
          });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        KeyDownHandler.deregisterCallBack(this.onEditorKeyDown);
        SuggestionHandler.close();
        config.modalHandler.removeSuggestionCallback();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var children = this.props.children;
        var _state = this.state,
            activeOption = _state.activeOption,
            showSuggestions = _state.showSuggestions;
        var dropdownClassName = config.dropdownClassName,
            optionClassName = config.optionClassName;

        return React__default.createElement(
          'span',
          {
            className: 'rdw-suggestion-wrapper',
            ref: this.setSuggestionReference,
            onClick: config.modalHandler.onSuggestionClick,
            'aria-haspopup': 'true',
            'aria-label': 'rdw-suggestion-popup'
          },
          React__default.createElement(
            'span',
            null,
            children
          ),
          showSuggestions && React__default.createElement(
            'span',
            {
              className: classnames('rdw-suggestion-dropdown', dropdownClassName),
              contentEditable: 'false',
              suppressContentEditableWarning: true,
              style: this.state.style,
              ref: this.setDropdownReference
            },
            this.filteredSuggestions.map(function (suggestion, index) {
              return React__default.createElement(
                'span',
                {
                  key: index,
                  spellCheck: false,
                  onClick: _this2.addMention,
                  'data-index': index,
                  onMouseEnter: _this2.onOptionMouseEnter,
                  onMouseLeave: _this2.onOptionMouseLeave,
                  className: classnames('rdw-suggestion-option', optionClassName, { 'rdw-suggestion-option-active': index === activeOption })
                },
                suggestion.text
              );
            })
          )
        );
      }
    }]);
    return SuggestionComponent;
  }(React.Component), _class.propTypes = {
    children: propTypes.array
  }, _temp2;
}

module.exports = Suggestion;

var getDecorators = function getDecorators(config) {
  return [new Mention(config.mentionClassName).getMentionDecorator(), new Suggestion(config).getSuggestionDecorator()];
};

var exports$4 = getDecorators;

module.exports = exports$4;

var css$k = ".styles_rdw-hashtag-link__1n6w2 {\n  text-decoration: none;\n  color: #1236ff;\n  background-color: #f0fbff;\n  padding: 1px 2px;\n  border-radius: 2px;\n}\n";
styleInject(css$k);

var Hashtag = function Hashtag(config) {
  var _this = this;

  classCallCheck(this, Hashtag);

  this.getHashtagComponent = function () {
    var className = _this.className;

    var HashtagComponent = function HashtagComponent(_ref) {
      var children = _ref.children;

      var text = children[0].props.text;
      return React__default.createElement(
        'a',
        { href: text, className: classnames('rdw-hashtag-link', className) },
        children
      );
    };
    HashtagComponent.propTypes = {
      children: propTypes.object
    };
    return HashtagComponent;
  };

  this.findHashtagEntities = function (contentBlock, callback) {
    var text = contentBlock.getText();
    var startIndex = 0;
    var counter = 0;

    for (; text.length > 0 && startIndex >= 0;) {
      if (text[0] === _this.hashCharacter) {
        startIndex = 0;
        counter = 0;
        text = text.substr(_this.hashCharacter.length);
      } else {
        startIndex = text.indexOf(_this.separator + _this.hashCharacter);
        if (startIndex >= 0) {
          text = text.substr(startIndex + (_this.separator + _this.hashCharacter).length);
          counter += startIndex + _this.separator.length;
        }
      }
      if (startIndex >= 0) {
        var endIndex = text.indexOf(_this.separator) >= 0 ? text.indexOf(_this.separator) : text.length;
        var hashtagText = text.substr(0, endIndex);
        if (hashtagText && hashtagText.length > 0) {
          callback(counter, counter + hashtagText.length + _this.hashCharacter.length);
          counter += _this.hashCharacter.length;
        }
      }
    }
  };

  this.getHashtagDecorator = function () {
    return {
      strategy: _this.findHashtagEntities,
      component: _this.getHashtagComponent()
    };
  };

  this.className = config.className;
  this.hashCharacter = config.hashCharacter || '#';
  this.separator = config.separator || ' ';
};

var getDecorator = function getDecorator(config) {
  return new Hashtag(config).getHashtagDecorator();
};

var exports$5 = getDecorator;

module.exports = exports$5;

var Embed = function Embed(_ref) {
  var block = _ref.block,
      contentState = _ref.contentState;

  var entity = contentState.getEntity(block.getEntityAt(0));

  var _entity$getData = entity.getData(),
      src = _entity$getData.src,
      height = _entity$getData.height,
      width = _entity$getData.width;

  return React__default.createElement('iframe', { height: height, width: width, src: src, frameBorder: '0', allowFullScreen: true, title: 'Wysiwyg Embedded Content' });
};

Embed.propTypes = {
  block: propTypes.object,
  contentState: propTypes.object
};

var css$l = ".styles_rdw-image-alignment-options-popup__1ruIr {\n  position: absolute;;\n  background: white;\n  display: flex;\n  padding: 5px 2px;\n  border-radius: 2px;\n  border: 1px solid #F1F1F1;\n  width: 105px;\n  cursor: pointer;\n  z-index: 100;\n}\n.styles_rdw-alignment-option-left__UGnzg {\n  justify-content: flex-start;\n}\n.styles_rdw-image-alignment-option__1aVzX {\n  height: 15px;\n  width: 15px;\n  min-width: 15px;\n}\n.styles_rdw-image-alignment__BStBO {\n  position: relative;\n}\n.styles_rdw-image-imagewrapper__3kNAy {\n  position: relative;\n}\n.styles_rdw-image-center__1LQ5r {\n  display: flex;\n  justify-content: center;\n}\n.styles_rdw-image-left__Evna0 {\n  display: flex;\n}\n.styles_rdw-image-right__1XEF0 {\n  display: flex;\n  justify-content: flex-end;\n}\n.styles_rdw-image-alignment-options-popup-right__27Xye {\n  right: 0;\n}\n";
styleInject(css$l);

var getImageComponent = function getImageComponent(config) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    inherits(Image, _Component);

    function Image() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, Image);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Image.__proto__ || Object.getPrototypeOf(Image)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        hovered: false
      }, _this.setEntityAlignmentLeft = function () {
        _this.setEntityAlignment('left');
      }, _this.setEntityAlignmentRight = function () {
        _this.setEntityAlignment('right');
      }, _this.setEntityAlignmentCenter = function () {
        _this.setEntityAlignment('none');
      }, _this.setEntityAlignment = function (alignment) {
        var _this$props = _this.props,
            block = _this$props.block,
            contentState = _this$props.contentState;

        var entityKey = block.getEntityAt(0);
        contentState.mergeEntityData(entityKey, { alignment: alignment });
        config.onChange(require$$1.EditorState.push(config.getEditorState(), contentState, 'change-block-data'));
        _this.setState({
          dummy: true
        });
      }, _this.toggleHovered = function () {
        var hovered = !_this.state.hovered;
        _this.setState({
          hovered: hovered
        });
      }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(Image, [{
      key: 'renderAlignmentOptions',
      value: function renderAlignmentOptions(alignment) {
        return React__default.createElement(
          'div',
          {
            className: classnames('rdw-image-alignment-options-popup', {
              'rdw-image-alignment-options-popup-right': alignment === 'right'
            })
          },
          React__default.createElement(
            Option,
            {
              onClick: this.setEntityAlignmentLeft,
              className: 'rdw-image-alignment-option'
            },
            'L'
          ),
          React__default.createElement(
            Option,
            {
              onClick: this.setEntityAlignmentCenter,
              className: 'rdw-image-alignment-option'
            },
            'C'
          ),
          React__default.createElement(
            Option,
            {
              onClick: this.setEntityAlignmentRight,
              className: 'rdw-image-alignment-option'
            },
            'R'
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            block = _props.block,
            contentState = _props.contentState;
        var hovered = this.state.hovered;
        var isReadOnly = config.isReadOnly,
            isImageAlignmentEnabled = config.isImageAlignmentEnabled;

        var entity = contentState.getEntity(block.getEntityAt(0));

        var _entity$getData = entity.getData(),
            src = _entity$getData.src,
            alignment = _entity$getData.alignment,
            height = _entity$getData.height,
            width = _entity$getData.width,
            alt = _entity$getData.alt;

        return React__default.createElement(
          'span',
          {
            onMouseEnter: this.toggleHovered,
            onMouseLeave: this.toggleHovered,
            className: classnames('rdw-image-alignment', {
              'rdw-image-left': alignment === 'left',
              'rdw-image-right': alignment === 'right',
              'rdw-image-center': !alignment || alignment === 'none'
            })
          },
          React__default.createElement(
            'span',
            { className: 'rdw-image-imagewrapper' },
            React__default.createElement('img', {
              src: src,
              alt: alt,
              style: {
                height: height,
                width: width
              }
            }),
            !isReadOnly() && hovered && isImageAlignmentEnabled() ? this.renderAlignmentOptions(alignment) : undefined
          )
        );
      }
    }]);
    return Image;
  }(React.Component), _class.propTypes = {
    block: propTypes.object,
    contentState: propTypes.object
  }, _temp2;
};

var getBlockRenderFunc = function getBlockRenderFunc(config, customBlockRenderer) {
  return function (block) {
    if (typeof customBlockRenderer === 'function') {
      var renderedComponent = customBlockRenderer(block, config, config.getEditorState);
      if (renderedComponent) return renderedComponent;
    }
    if (block.getType() === 'atomic') {
      var contentState = config.getEditorState().getCurrentContent();
      var entity = contentState.getEntity(block.getEntityAt(0));
      if (entity && entity.type === 'IMAGE') {
        return {
          component: getImageComponent(config),
          editable: false
        };
      } else if (entity && entity.type === 'EMBEDDED_LINK') {
        return {
          component: Embed,
          editable: false
        };
      }
    }
    return undefined;
  };
};

var bold = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2212px%22%20height%3D%2213px%22%20viewBox%3D%220%200%2012%2013%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Ebold%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22bold%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Page-1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22bold%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Calque_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M6.2364%2C0%20C7.8876%2C0%209.1764%2C0.297916667%2010.1016%2C0.892666667%20C11.0268%2C1.4885%2011.49%2C2.37791667%2011.49%2C3.562%20C11.49%2C4.16325%2011.3172%2C4.70058333%2010.974%2C5.17291667%20C10.6308%2C5.64633333%2010.1304%2C6.00275%209.4752%2C6.24%20C10.3176%2C6.40683333%2010.9488%2C6.76325%2011.37%2C7.31141667%20C11.7888%2C7.86066667%2012%2C8.49441667%2012%2C9.21375%20C12%2C10.4585%2011.556%2C11.401%2010.6704%2C12.0390833%20C9.7836%2C12.6804167%208.526%2C13%206.9012%2C13%20L0%2C13%20L0%2C10.8333333%20L1.494%2C10.8333333%20L1.494%2C2.16666667%20L0%2C2.16666667%20L0%2C0%20L1.494%2C0%20L6.2364%2C0%20L6.2364%2C0%20L6.2364%2C0%20Z%20M4.308%2C5.44591667%20L6.3324%2C5.44591667%20C7.0836%2C5.44591667%207.662%2C5.30291667%208.0664%2C5.01691667%20C8.4708%2C4.73091667%208.6736%2C4.31491667%208.6736%2C3.76675%20C8.6736%2C3.1655%208.4696%2C2.72241667%208.0616%2C2.43641667%20C7.6536%2C2.15041667%207.0464%2C2.0085%206.2364%2C2.0085%20L4.308%2C2.0085%20L4.308%2C5.44591667%20L4.308%2C5.44591667%20L4.308%2C5.44591667%20Z%20M4.308%2C7.24966667%20L4.308%2C10.9990833%20L6.9012%2C10.9990833%20C7.6476%2C10.9990833%208.2152%2C10.8485%208.6076%2C10.5484167%20C8.9988%2C10.2483333%209.1956%2C9.80308333%209.1956%2C9.21375%20C9.1956%2C8.57783333%209.0276%2C8.09033333%208.6952%2C7.7545%20C8.3604%2C7.41866667%207.8324%2C7.24966667%207.1136%2C7.24966667%20L4.308%2C7.24966667%20L4.308%2C7.24966667%20L4.308%2C7.24966667%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var italic = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20id%3D%22Calque_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2016%2016%22%20enable-background%3D%22new%200%200%2016%2016%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%20%3Cpath%20d%3D%22M7%2C3V2h4v1H9.753l-3%2C10H8v1H4v-1h1.247l3-10H7z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E";

var underline = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20id%3D%22Calque_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2016%2016%22%20enable-background%3D%22new%200%200%2016%2016%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%20%3Cpath%20d%3D%22M6.045%2C2v0.992L4.785%2C3v5.172c0%2C0.859%2C0.243%2C1.512%2C0.727%2C1.957s1.124%2C0.668%2C1.918%2C0.668c0.836%2C0%2C1.509-0.221%2C2.019-0.664%20%20c0.511-0.442%2C0.766-1.096%2C0.766-1.961V3l-1.26-0.008V2h2.784H13v0.992L11.739%2C3v5.172c0%2C1.234-0.398%2C2.181-1.195%2C2.84%20%20C9.747%2C11.671%2C8.709%2C12%2C7.43%2C12c-1.242%2C0-2.248-0.329-3.017-0.988c-0.769-0.659-1.152-1.605-1.152-2.84V3L2%2C2.992V2h1.261H6.045z%22%20%20%2F%3E%3C%2Fg%3E%3Crect%20x%3D%222%22%20y%3D%2213%22%20width%3D%2211%22%20height%3D%221%22%2F%3E%3C%2Fsvg%3E";

var strikethrough = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2215px%22%20height%3D%2213px%22%20viewBox%3D%220%200%2015%2013%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Estrikethrough%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22strikethrough%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Page-1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22strikethrough%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M4.04006836%2C5.95438409%20L10.2546386%2C5.95438409%20C10.0483301%2C5.81956818%209.78342776%2C5.67325909%209.45999026%2C5.51578182%20C8.88032224%2C5.25714091%208.39765625%2C5.07150682%208.01284179%2C4.95908637%20C6.82523437%2C4.61050909%206.04734375%2C4.24769091%205.67928711%2C3.87095682%20C5.31123047%2C3.49416363%205.1272461%2C3.10055909%205.1272461%2C2.68999545%20C5.1272461%2C2.19502045%205.31413086%2C1.78445682%205.68769531%2C1.45833409%20C6.06688476%2C1.12662727%206.57433594%2C0.960611368%207.21001953%2C0.960611368%20C7.89032226%2C0.960611368%208.47582031%2C1.216475%208.96660153%2C1.72823182%20C9.26206059%2C2.04306818%209.54940429%2C2.6195%209.82810544%2C3.45749773%20L9.94541012%2C3.47427955%20L10.6480078%2C3.52486137%20L10.7484961%2C3.49962955%20C10.7763574%2C3.34770682%2010.7903906%2C3.22134091%2010.7903906%2C3.11997045%20C10.7903906%2C2.78253182%2010.7513086%2C2.26808637%2010.673086%2C1.57633863%20C10.6115332%2C1.12659773%2010.5531739%2C0.794654545%2010.4974511%2C0.580922727%20C9.87864256%2C0.378565909%209.38496097%2C0.243543182%209.01693359%2C0.176120455%20C8.36455078%2C0.0692545455%207.89875976%2C0.0158068182%207.62023438%2C0.0158068182%20C6.17024414%2C0.0158068182%205.07459961%2C0.373040909%204.33286133%2C1.087125%20C3.58564453%2C1.80691137%203.21208008%2C2.67590227%203.21208008%2C3.69377273%20C3.21208008%2C4.20544091%203.34590821%2C4.73400909%203.61362304%2C5.27953637%20C3.74170899%2C5.53268182%203.88391601%2C5.75764091%204.04006836%2C5.95438409%20L4.04006836%2C5.95438409%20L4.04006836%2C5.95438409%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M8.28076172%2C8.11389091%20C8.85512691%2C8.35007727%209.23721679%2C8.54986363%209.42670897%2C8.71277727%20C9.87846679%2C9.12337045%2010.1042578%2C9.56480906%2010.1042578%2C10.0370932%20C10.1042578%2C10.4195887%209.97309571%2C10.7822887%209.71103512%2C11.1253409%20C9.46019532%2C11.4626318%209.12011718%2C11.7047863%208.690625%2C11.8507113%20C8.27261719%2C12.0028705%207.88493164%2C12.0785955%207.52821289%2C12.0785955%20C7.1211914%2C12.0785955%206.75316406%2C12.0166091%206.42416015%2C11.8929613%20C6.07845703%2C11.7747795%205.78566406%2C11.6147023%205.54583985%2C11.4121091%20C5.2949414%2C11.2040205%205.0718164%2C10.9397363%204.87666992%2C10.6191091%20C4.84875%2C10.5742887%204.81385742%2C10.4982682%204.77205078%2C10.3915205%20C4.73030274%2C10.2845363%204.66743164%2C10.1272068%204.58387696%2C9.91923632%20C4.50020508%2C9.71105906%204.41665039%2C9.51145%204.33297851%2C9.32029094%20L3.47982422%2C9.33716132%20L3.47982422%2C9.70831132%20L3.46309571%2C10.0206363%20C3.45758789%2C10.2341909%203.45758789%2C10.4253795%203.46309571%2C10.5941137%20C3.47416992%2C10.8639818%203.47982422%2C11.3026727%203.47982422%2C11.9101568%20L3.47982422%2C12.0198591%20C3.47982422%2C12.0986273%203.50208985%2C12.1603182%203.54665039%2C12.2054932%20C3.63029297%2C12.2727091%203.83103515%2C12.3515955%204.14890625%2C12.4415909%20L5.31987304%2C12.7789705%20C5.77148437%2C12.9084091%206.31523437%2C12.9731137%206.95091797%2C12.9731137%20C7.636875%2C12.9731137%208.20256836%2C12.9140523%208.64890625%2C12.7958705%20C9.05604494%2C12.6944409%209.48222653%2C12.5088955%209.92871097%2C12.2391455%20C10.3301367%2C11.9802977%2010.6341211%2C11.7527091%2010.840459%2C11.5556409%20C11.1078515%2C11.2802182%2011.3060742%2C10.9878068%2011.4343067%2C10.6783182%20C11.6631153%2C10.1103955%2011.7772851%2C9.51425679%2011.7772851%2C8.89019773%20C11.7772851%2C8.592025%2011.7579492%2C8.33347273%2011.7190429%2C8.11406818%20L8.28076172%2C8.11406818%20L8.28076172%2C8.11389091%20L8.28076172%2C8.11389091%20L8.28076172%2C8.11389091%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.9138672%2C6.57014091%20C14.8635351%2C6.51958863%2014.7995801%2C6.49432727%2014.7213867%2C6.49432727%20L0.267626953%2C6.49432727%20C0.189521485%2C6.49432727%200.125449219%2C6.51958863%200.075234375%2C6.57014091%20C0.0251660156%2C6.62069318%200%2C6.68539773%200%2C6.76428409%20L0%2C7.30399091%20C0%2C7.38287727%200.0250488281%2C7.44746363%200.075234375%2C7.49813409%20C0.125449219%2C7.54868637%200.189638672%2C7.57377045%200.267626953%2C7.57377045%20L14.7213867%2C7.57377045%20C14.7995801%2C7.57377045%2014.8635644%2C7.54868637%2014.9138672%2C7.49813409%20C14.9639942%2C7.44746363%2014.9890429%2C7.38287727%2014.9890429%2C7.30399091%20L14.9890429%2C6.76428409%20C14.9890429%2C6.68539773%2014.9639942%2C6.62069318%2014.9138672%2C6.57014091%20L14.9138672%2C6.57014091%20L14.9138672%2C6.57014091%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var monospace = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2213px%22%20height%3D%2215px%22%20viewBox%3D%220%200%2013%2015%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Ecode%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22code%22%20fill%3D%22%23444444%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Page-1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22code%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M1.02142857%2C2.90625%20C1.20714286%2C4.125%201.39285714%2C4.40625%201.39285714%2C5.625%20C1.39285714%2C6.375%200%2C7.03125%200%2C7.03125%20L0%2C7.96875%20C0%2C7.96875%201.39285714%2C8.625%201.39285714%2C9.375%20C1.39285714%2C10.59375%201.20714286%2C10.875%201.02142857%2C12.09375%20C0.742857143%2C14.0625%201.76428571%2C15%202.69285714%2C15%20L4.64285714%2C15%20L4.64285714%2C13.125%20C4.64285714%2C13.125%202.97142857%2C13.3125%202.97142857%2C12.1875%20C2.97142857%2C11.34375%203.15714286%2C11.34375%203.34285714%2C9.46875%20C3.43571429%2C8.625%202.87857143%2C7.96875%202.32142857%2C7.5%20C2.87857143%2C7.03125%203.43571429%2C6.46875%203.34285714%2C5.625%20C3.06428571%2C3.75%202.97142857%2C3.75%202.97142857%2C2.90625%20C2.97142857%2C1.78125%204.64285714%2C1.875%204.64285714%2C1.875%20L4.64285714%2C0%20L2.69285714%2C0%20C1.67142857%2C0%200.742857143%2C0.9375%201.02142857%2C2.90625%20L1.02142857%2C2.90625%20L1.02142857%2C2.90625%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M11.9785714%2C2.90625%20C11.7928571%2C4.125%2011.6071429%2C4.40625%2011.6071429%2C5.625%20C11.6071429%2C6.375%2013%2C7.03125%2013%2C7.03125%20L13%2C7.96875%20C13%2C7.96875%2011.6071429%2C8.625%2011.6071429%2C9.375%20C11.6071429%2C10.59375%2011.7928571%2C10.875%2011.9785714%2C12.09375%20C12.2571429%2C14.0625%2011.2357143%2C15%2010.3071429%2C15%20L8.35714286%2C15%20L8.35714286%2C13.125%20C8.35714286%2C13.125%2010.0285714%2C13.3125%2010.0285714%2C12.1875%20C10.0285714%2C11.34375%209.84285714%2C11.34375%209.65714286%2C9.46875%20C9.56428571%2C8.625%2010.1214286%2C7.96875%2010.6785714%2C7.5%20C10.1214286%2C7.03125%209.56428571%2C6.46875%209.65714286%2C5.625%20C9.84285714%2C3.75%2010.0285714%2C3.75%2010.0285714%2C2.90625%20C10.0285714%2C1.78125%208.35714286%2C1.875%208.35714286%2C1.875%20L8.35714286%2C0%20L10.3071429%2C0%20C11.3285714%2C0%2012.2571429%2C0.9375%2011.9785714%2C2.90625%20L11.9785714%2C2.90625%20L11.9785714%2C2.90625%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var fontSize = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2214px%22%20height%3D%2214px%22%20viewBox%3D%220%200%2014%2014%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Efont-size%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22font-size%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Page-1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22font-size%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M11.9209571%2C3.119025%20C12.0024663%2C3.22240625%2012.1256319%2C3.28251875%2012.2557976%2C3.28251875%20L13.2258343%2C3.28251875%20C13.3400674%2C3.28251875%2013.4496196%2C3.2361%2013.530227%2C3.15363125%20C13.6108343%2C3.0711625%2013.6558835%2C2.9593375%2013.6552822%2C2.84291875%20L13.6567852%2C0.43386875%20C13.6540369%2C0.1941625%2013.462546%2C0.00126875%2013.2273374%2C0.00126875%20L0.429447852%2C0.00126875%20C0.192263804%2C0.00126875%200%2C0.19718125%200%2C0.43876875%20L0%2C2.84501875%20C0%2C3.08660625%200.192263804%2C3.28251875%200.429447852%2C3.28251875%20L1.39982822%2C3.28251875%20C1.53033742%2C3.28251875%201.65371779%2C3.2221%201.73518405%2C3.118325%20L2.46515951%2C2.1888125%20L5.53966258%2C2.1888125%20L5.53966258%2C13.5478438%20C5.53966258%2C13.7893875%205.73192638%2C13.9853438%205.96911043%2C13.9853438%20L7.68690184%2C13.9853438%20C7.924%2C13.9853438%208.1163497%2C13.7893875%208.1163497%2C13.5478438%20L8.1163497%2C2.18885625%20L11.1874601%2C2.18885625%20L11.9209571%2C3.119025%20L11.9209571%2C3.119025%20L11.9209571%2C3.119025%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M13.8976626%2C11.26335%20C13.7848466%2C11.1142062%2013.590908%2C11.0553625%2013.4163804%2C11.1171375%20L12.8685767%2C11.3112562%20L12.8686626%2C9.617125%20C12.8686626%2C9.5011%2012.8234417%2C9.3898%2012.7429202%2C9.307725%20C12.6623987%2C9.22569375%2012.5531043%2C9.17958125%2012.4392148%2C9.17958125%20L12.0101963%2C9.17958125%20C11.7730981%2C9.17958125%2011.5807485%2C9.37553755%2011.5807485%2C9.61708123%20L11.5807485%2C11.3112562%20L11.0328589%2C11.1171375%20C10.8584172%2C11.0551875%2010.6645644%2C11.1142062%2010.5517485%2C11.26335%20C10.4388466%2C11.41245%2010.4324049%2C11.6183812%2010.5356442%2C11.7747%20L11.8683497%2C13.7921438%20C11.9481841%2C13.9129812%2012.0818283%2C13.9854312%2012.2246626%2C13.9854312%20C12.3675828%2C13.9854312%2012.5011841%2C13.9129812%2012.5809755%2C13.7921438%20L13.9137669%2C11.7747%20C14.0169631%2C11.6183812%2014.0104785%2C11.41245%2013.8976626%2C11.26335%20L13.8976626%2C11.26335%20L13.8976626%2C11.26335%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var indent = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2217px%22%20height%3D%2214px%22%20viewBox%3D%220%200%2017%2014%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Eindent%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22indent%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Layer_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-path%22%20x%3D%225.71648352%22%20y%3D%223.21082621%22%20width%3D%2211.2835165%22%20height%3D%221.1965812%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-path%22%20x%3D%220%22%20y%3D%220.0199430199%22%20width%3D%2217%22%20height%3D%221.1965812%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-path%22%20x%3D%220%22%20y%3D%2212.7834758%22%20width%3D%2217%22%20height%3D%221.1965812%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-path%22%20x%3D%225.71648352%22%20y%3D%229.59259259%22%20width%3D%2211.2835165%22%20height%3D%221.1965812%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-path%22%20x%3D%225.71648352%22%20y%3D%226.4017094%22%20width%3D%2211.2835165%22%20height%3D%221.1965812%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20points%3D%220.186813187%209.49140171%202.5205956%207%200.186813187%204.50859829%22%3E%3C%2Fpolygon%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var outdent = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2216px%22%20height%3D%2214px%22%20viewBox%3D%220%200%2016%2014%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Eoutdent%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22outdent%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Layer_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-path%22%20x%3D%225.3961663%22%20y%3D%223.1934359%22%20width%3D%2210.5733042%22%20height%3D%221.1965812%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-path%22%20x%3D%220.0394923414%22%20y%3D%220.00255270655%22%20width%3D%2215.9299781%22%20height%3D%221.1965812%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-path%22%20x%3D%220.0394923414%22%20y%3D%2212.7660855%22%20width%3D%2215.9299781%22%20height%3D%221.1965812%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-path%22%20x%3D%225.3961663%22%20y%3D%229.57520228%22%20width%3D%2210.5733042%22%20height%3D%221.1965812%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Crect%20id%3D%22Rectangle-path%22%20x%3D%225.3961663%22%20y%3D%226.38431909%22%20width%3D%2210.5733042%22%20height%3D%221.1965812%22%3E%3C%2Frect%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20points%3D%222.1868884%204.49120798%200%206.98260969%202.1868884%209.4740114%22%3E%3C%2Fpolygon%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var ordered = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2213px%22%20height%3D%2213px%22%20viewBox%3D%220%200%2013%2013%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Elist-ordered%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22list-ordered%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Page-1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22list-ordered%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M4.20193416%2C1.46573801%20L12.3524043%2C1.46573801%20C12.6899969%2C1.46573801%2012.9636897%2C1.14356826%2012.9636897%2C0.746180812%20C12.9636897%2C0.348793358%2012.6899969%2C0.0266236163%2012.3524043%2C0.0266236163%20L4.20193416%2C0.0266236163%20C3.8643417%2C0.0266236163%203.5906489%2C0.348793358%203.5906489%2C0.746180812%20C3.5906489%2C1.14356826%203.8643417%2C1.46573801%204.20193416%2C1.46573801%20L4.20193416%2C1.46573801%20L4.20193416%2C1.46573801%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M12.3524043%2C5.78308118%20L4.20193416%2C5.78308118%20C3.8643417%2C5.78308118%203.5906489%2C6.10525092%203.5906489%2C6.50263837%20C3.5906489%2C6.90002583%203.8643417%2C7.22219557%204.20193416%2C7.22219557%20L12.3524043%2C7.22219557%20C12.6899969%2C7.22219557%2012.9636897%2C6.90002583%2012.9636897%2C6.50263837%20C12.9636897%2C6.10520295%2012.6900377%2C5.78308118%2012.3524043%2C5.78308118%20L12.3524043%2C5.78308118%20L12.3524043%2C5.78308118%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M12.3524043%2C11.5395387%20L4.20193416%2C11.5395387%20C3.8643417%2C11.5395387%203.5906489%2C11.8617085%203.5906489%2C12.259096%20C3.5906489%2C12.6564834%203.8643417%2C12.9786531%204.20193416%2C12.9786531%20L12.3524043%2C12.9786531%20C12.6899969%2C12.9786531%2012.9636897%2C12.6564834%2012.9636897%2C12.259096%20C12.9636897%2C11.8617085%2012.6900377%2C11.5395387%2012.3524043%2C11.5395387%20L12.3524043%2C11.5395387%20L12.3524043%2C11.5395387%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M0.767203762%2C1.24895941%20L0.767203762%2C3.05092251%20C0.767203762%2C3.24635425%200.902501568%2C3.39371956%201.08197492%2C3.39371956%20C1.2584326%2C3.39371956%201.39662383%2C3.24314023%201.39662383%2C3.05092251%20L1.39662383%2C0.356228782%20C1.39662383%2C0.166265682%201.26430094%2C0.0174132841%201.09538244%2C0.0174132841%20C0.946799369%2C0.0174132841%200.872467084%2C0.134749077%200.848056426%2C0.173317343%20C0.847037617%2C0.174948339%200.846018809%2C0.176579336%200.845%2C0.178306273%20L0.579050156%2C0.621169742%20C0.527416928%2C0.687273063%200.481489028%2C0.793%200.481489028%2C0.894409596%20C0.481448276%2C1.08773063%200.609166144%2C1.2454096%200.767203762%2C1.24895941%20L0.767203762%2C1.24895941%20L0.767203762%2C1.24895941%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M0.35169279%2C8.19076749%20L1.55005643%2C8.19076749%20C1.70691223%2C8.19076749%201.83454859%2C8.02809963%201.83454859%2C7.82815867%20C1.83454859%2C7.63032841%201.70695297%2C7.46938745%201.55005643%2C7.46938745%20L0.679912226%2C7.46938745%20L0.679912226%2C7.46348709%20C0.679912226%2C7.35579336%200.889705329%2C7.18151661%201.05829781%2C7.04149077%20C1.3936489%2C6.7629262%201.81099373%2C6.41629151%201.81099373%2C5.81512546%20C1.81099373%2C5.24461255%201.43542006%2C4.81446125%200.937344831%2C4.81446125%20C0.460420063%2C4.81446125%200.100821317%2C5.20033579%200.100821317%2C5.7120369%20C0.100821317%2C6.00897417%200.265012539%2C6.11436531%200.40560815%2C6.11436531%20C0.60684326%2C6.11436531%200.727103449%2C5.93797786%200.727103449%2C5.76753875%20C0.727103449%2C5.66157196%200.750250783%2C5.53991882%200.930620693%2C5.53991882%20C1.174279%2C5.53991882%201.1812884%2C5.79406642%201.1812884%2C5.82304059%20C1.1812884%2C6.05147602%200.929438872%2C6.26504059%200.685862069%2C6.47155351%20C0.384783699%2C6.72680443%200.043523511%2C7.01616236%200.043523511%2C7.46358303%20L0.043523511%2C7.84792251%20C0.0434827586%2C8.05299631%200.202865203%2C8.19076749%200.35169279%2C8.19076749%20L0.35169279%2C8.19076749%20L0.35169279%2C8.19076749%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M1.77052664%2C10.543096%20C1.77052664%2C9.95104427%201.47352351%2C9.61150921%200.955724139%2C9.61150921%20C0.276789969%2C9.61150921%200.097398119%2C10.182262%200.097398119%2C10.4840443%20C0.097398119%2C10.8353801%200.31929467%2C10.8733247%200.414695925%2C10.8733247%20C0.600485893%2C10.8733247%200.725269592%2C10.7263912%200.725269592%2C10.5076937%20C0.725269592%2C10.4235535%200.75069906%2C10.3269889%200.948877744%2C10.3269889%20C1.09130721%2C10.3269889%201.14929781%2C10.3511661%201.14929781%2C10.5940885%20C1.14929781%2C10.8314465%201.10601881%2C10.8573025%200.935551723%2C10.8573025%20C0.771808777%2C10.8573025%200.648369906%2C11.009417%200.648369906%2C11.2110849%20C0.648369906%2C11.4105941%200.773316615%2C11.5610775%200.93897492%2C11.5610775%20C1.16413166%2C11.5610775%201.20936677%2C11.6692989%201.20936677%2C11.8439594%20L1.20936677%2C11.9187454%20C1.20936677%2C12.2126125%201.11200941%2C12.2683063%200.932332291%2C12.2683063%20C0.684435736%2C12.2683063%200.665159875%2C12.1180627%200.665159875%2C12.0720111%20C0.665159875%2C11.8978303%200.567068965%2C11.7220664%200.347902822%2C11.7220664%20C0.155551724%2C11.7220664%200.0407115988%2C11.8631476%200.0407115988%2C12.0995461%20C0.0407115988%2C12.5301291%200.354341693%2C12.9877675%200.935551723%2C12.9877675%20C1.5001348%2C12.9877675%201.83723824%2C12.5881255%201.83723824%2C11.9187454%20L1.83723824%2C11.8439594%20C1.83723824%2C11.5695203%201.76266144%2C11.3419483%201.62271787%2C11.178321%20C1.7185674%2C11.0150775%201.77052664%2C10.7972435%201.77052664%2C10.543096%20L1.77052664%2C10.543096%20L1.77052664%2C10.543096%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var unordered = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2216px%22%20height%3D%2214px%22%20viewBox%3D%220%200%2016%2014%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Elist-unordered%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22list-unordered%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M1.72081633%2C3.42708333%20C2.67102041%2C3.42708333%203.44163265%2C2.65902778%203.44163265%2C1.71921296%20C3.44163265%2C0.779398148%202.67102041%2C0.00810185185%201.72081633%2C0.00810185185%20C0.770612245%2C0.00810185185%200%2C0.776157407%200%2C1.71597222%20C0%2C2.65578704%200.773877551%2C3.42708333%201.72081633%2C3.42708333%20L1.72081633%2C3.42708333%20Z%20M1.72081633%2C0.802083333%20C2.23020408%2C0.802083333%202.64163265%2C1.21365741%202.64163265%2C1.71597222%20C2.64163265%2C2.21828704%202.22693878%2C2.62986111%201.72081633%2C2.62986111%20C1.21469388%2C2.62986111%200.8%2C2.21828704%200.8%2C1.71597222%20C0.8%2C1.21365741%201.21469388%2C0.802083333%201.72081633%2C0.802083333%20L1.72081633%2C0.802083333%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M1.72081633%2C8.70300926%20C2.67102041%2C8.70300926%203.44163265%2C7.9349537%203.44163265%2C6.99513889%20C3.44163265%2C6.05532407%202.67102041%2C5.28726852%201.72081633%2C5.28726852%20C0.770612245%2C5.28726852%200%2C6.05208333%200%2C6.99513889%20C0%2C7.93819444%200.773877551%2C8.70300926%201.72081633%2C8.70300926%20L1.72081633%2C8.70300926%20Z%20M1.72081633%2C6.08125%20C2.23020408%2C6.08125%202.64163265%2C6.49282407%202.64163265%2C6.99513889%20C2.64163265%2C7.4974537%202.22693878%2C7.90902778%201.72081633%2C7.90902778%20C1.21469388%2C7.90902778%200.8%2C7.50069444%200.8%2C6.99513889%20C0.8%2C6.48958333%201.21469388%2C6.08125%201.72081633%2C6.08125%20L1.72081633%2C6.08125%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M1.72081633%2C13.9821759%20C2.67102041%2C13.9821759%203.44163265%2C13.2141204%203.44163265%2C12.2743056%20C3.44163265%2C11.33125%202.6677551%2C10.5664352%201.72081633%2C10.5664352%20C0.773877551%2C10.5664352%200%2C11.3344907%200%2C12.2743056%20C0%2C13.2141204%200.773877551%2C13.9821759%201.72081633%2C13.9821759%20L1.72081633%2C13.9821759%20Z%20M1.72081633%2C11.3571759%20C2.23020408%2C11.3571759%202.64163265%2C11.76875%202.64163265%2C12.2710648%20C2.64163265%2C12.7766204%202.22693878%2C13.1849537%201.72081633%2C13.1849537%20C1.21469388%2C13.1849537%200.8%2C12.7733796%200.8%2C12.2710648%20C0.8%2C11.76875%201.21469388%2C11.3571759%201.72081633%2C11.3571759%20L1.72081633%2C11.3571759%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M5.74367347%2C2.11458333%20L15.5885714%2C2.11458333%20C15.8106122%2C2.11458333%2015.9902041%2C1.93634259%2015.9902041%2C1.71597222%20C15.9902041%2C1.49560185%2015.8106122%2C1.31736111%2015.5885714%2C1.31736111%20L5.74367347%2C1.31736111%20C5.52163265%2C1.31736111%205.34204082%2C1.49560185%205.34204082%2C1.71597222%20C5.34204082%2C1.93634259%205.52163265%2C2.11458333%205.74367347%2C2.11458333%20L5.74367347%2C2.11458333%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M5.74367347%2C7.39375%20L15.5885714%2C7.39375%20C15.8106122%2C7.39375%2015.9902041%2C7.21550926%2015.9902041%2C6.99513889%20C15.9902041%2C6.77476852%2015.8106122%2C6.59652778%2015.5885714%2C6.59652778%20L5.74367347%2C6.59652778%20C5.52163265%2C6.59652778%205.34204082%2C6.77476852%205.34204082%2C6.99513889%20C5.34204082%2C7.21550926%205.52163265%2C7.39375%205.74367347%2C7.39375%20L5.74367347%2C7.39375%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M5.74367347%2C12.6696759%20L15.5885714%2C12.6696759%20C15.8106122%2C12.6696759%2015.9902041%2C12.4914352%2015.9902041%2C12.2710648%20C15.9902041%2C12.0506944%2015.8106122%2C11.8724537%2015.5885714%2C11.8724537%20L5.74367347%2C11.8724537%20C5.52163265%2C11.8724537%205.34204082%2C12.0506944%205.34204082%2C12.2710648%20C5.34204082%2C12.4914352%205.52163265%2C12.6696759%205.74367347%2C12.6696759%20L5.74367347%2C12.6696759%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var left = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2215px%22%20height%3D%2215px%22%20viewBox%3D%220%200%2015%2015%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Ealign-left%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22align-left%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M8.49326087%2C14.8871739%20L0.326086957%2C14.8871739%20C0.146086957%2C14.8871739%200%2C14.741087%200%2C14.561087%20C0%2C14.381087%200.146086957%2C14.235%200.326086957%2C14.235%20L8.49326087%2C14.235%20C8.67326087%2C14.235%208.81934783%2C14.381087%208.81934783%2C14.561087%20C8.81934783%2C14.741087%208.67391304%2C14.8871739%208.49326087%2C14.8871739%20L8.49326087%2C14.8871739%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.6178261%2C10.1615217%20L0.326086957%2C10.1615217%20C0.146086957%2C10.1615217%200%2C10.0154348%200%2C9.83543478%20C0%2C9.65543478%200.146086957%2C9.50934783%200.326086957%2C9.50934783%20L14.6178261%2C9.50934783%20C14.7978261%2C9.50934783%2014.943913%2C9.65543478%2014.943913%2C9.83543478%20C14.943913%2C10.0154348%2014.7978261%2C10.1615217%2014.6178261%2C10.1615217%20L14.6178261%2C10.1615217%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M8.49326087%2C5.43521739%20L0.326086957%2C5.43521739%20C0.146086957%2C5.43521739%200%2C5.28913043%200%2C5.10913043%20C0%2C4.92913043%200.146086957%2C4.78304348%200.326086957%2C4.78304348%20L8.49326087%2C4.78304348%20C8.67326087%2C4.78304348%208.81934783%2C4.92913043%208.81934783%2C5.10913043%20C8.81934783%2C5.28913043%208.67391304%2C5.43521739%208.49326087%2C5.43521739%20L8.49326087%2C5.43521739%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.6178261%2C0.708913043%20L0.326086957%2C0.708913043%20C0.146086957%2C0.708913043%200%2C0.562826087%200%2C0.382826087%20C0%2C0.202826087%200.146086957%2C0.0567391304%200.326086957%2C0.0567391304%20L14.6178261%2C0.0567391304%20C14.7978261%2C0.0567391304%2014.943913%2C0.202826087%2014.943913%2C0.382826087%20C14.943913%2C0.562826087%2014.7978261%2C0.708913043%2014.6178261%2C0.708913043%20L14.6178261%2C0.708913043%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var center = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2215px%22%20height%3D%2215px%22%20viewBox%3D%220%200%2015%2015%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Ealign-center%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22align-center%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M11.5558696%2C14.8871739%20L3.38804348%2C14.8871739%20C3.20804348%2C14.8871739%203.06195652%2C14.741087%203.06195652%2C14.561087%20C3.06195652%2C14.381087%203.20804348%2C14.235%203.38804348%2C14.235%20L11.5552174%2C14.235%20C11.7352174%2C14.235%2011.8813043%2C14.381087%2011.8813043%2C14.561087%20C11.8813043%2C14.741087%2011.7358696%2C14.8871739%2011.5558696%2C14.8871739%20L11.5558696%2C14.8871739%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.6178261%2C10.1615217%20L0.326086957%2C10.1615217%20C0.146086957%2C10.1615217%200%2C10.0154348%200%2C9.83543478%20C0%2C9.65543478%200.146086957%2C9.50934783%200.326086957%2C9.50934783%20L14.6178261%2C9.50934783%20C14.7978261%2C9.50934783%2014.943913%2C9.65543478%2014.943913%2C9.83543478%20C14.943913%2C10.0154348%2014.7978261%2C10.1615217%2014.6178261%2C10.1615217%20L14.6178261%2C10.1615217%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M11.5558696%2C5.43521739%20L3.38804348%2C5.43521739%20C3.20804348%2C5.43521739%203.06195652%2C5.28913043%203.06195652%2C5.10913043%20C3.06195652%2C4.92913043%203.20804348%2C4.78304348%203.38804348%2C4.78304348%20L11.5552174%2C4.78304348%20C11.7352174%2C4.78304348%2011.8813043%2C4.92913043%2011.8813043%2C5.10913043%20C11.8813043%2C5.28913043%2011.7358696%2C5.43521739%2011.5558696%2C5.43521739%20L11.5558696%2C5.43521739%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.6178261%2C0.708913043%20L0.326086957%2C0.708913043%20C0.146086957%2C0.708913043%200%2C0.562826087%200%2C0.382826087%20C0%2C0.202826087%200.146086957%2C0.0567391304%200.326086957%2C0.0567391304%20L14.6178261%2C0.0567391304%20C14.7978261%2C0.0567391304%2014.943913%2C0.202826087%2014.943913%2C0.382826087%20C14.943913%2C0.562826087%2014.7978261%2C0.708913043%2014.6178261%2C0.708913043%20L14.6178261%2C0.708913043%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var right = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2215px%22%20height%3D%2215px%22%20viewBox%3D%220%200%2015%2015%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Ealign-right%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22align-right%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.6178261%2C14.8871739%20L6.45065217%2C14.8871739%20C6.27065217%2C14.8871739%206.12456522%2C14.741087%206.12456522%2C14.561087%20C6.12456522%2C14.381087%206.27065217%2C14.235%206.45065217%2C14.235%20L14.6178261%2C14.235%20C14.7978261%2C14.235%2014.943913%2C14.381087%2014.943913%2C14.561087%20C14.943913%2C14.741087%2014.7978261%2C14.8871739%2014.6178261%2C14.8871739%20L14.6178261%2C14.8871739%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.6178261%2C10.1615217%20L0.326086957%2C10.1615217%20C0.146086957%2C10.1615217%200%2C10.0154348%200%2C9.83543478%20C0%2C9.65543478%200.146086957%2C9.50934783%200.326086957%2C9.50934783%20L14.6178261%2C9.50934783%20C14.7978261%2C9.50934783%2014.943913%2C9.65543478%2014.943913%2C9.83543478%20C14.943913%2C10.0154348%2014.7978261%2C10.1615217%2014.6178261%2C10.1615217%20L14.6178261%2C10.1615217%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.6178261%2C5.43521739%20L6.45065217%2C5.43521739%20C6.27065217%2C5.43521739%206.12456522%2C5.28913043%206.12456522%2C5.10913043%20C6.12456522%2C4.92913043%206.27065217%2C4.78304348%206.45065217%2C4.78304348%20L14.6178261%2C4.78304348%20C14.7978261%2C4.78304348%2014.943913%2C4.92913043%2014.943913%2C5.10913043%20C14.943913%2C5.28913043%2014.7978261%2C5.43521739%2014.6178261%2C5.43521739%20L14.6178261%2C5.43521739%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.6178261%2C0.708913043%20L0.326086957%2C0.708913043%20C0.146086957%2C0.708913043%200%2C0.562826087%200%2C0.382826087%20C0%2C0.202826087%200.146086957%2C0.0567391304%200.326086957%2C0.0567391304%20L14.6178261%2C0.0567391304%20C14.7978261%2C0.0567391304%2014.943913%2C0.202826087%2014.943913%2C0.382826087%20C14.943913%2C0.562826087%2014.7978261%2C0.708913043%2014.6178261%2C0.708913043%20L14.6178261%2C0.708913043%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var justify = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2215px%22%20height%3D%2215px%22%20viewBox%3D%220%200%2015%2015%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Ealign-justify%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22align-justify%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.6191304%2C14.8878261%20L0.326086957%2C14.8878261%20C0.146086957%2C14.8878261%200%2C14.7417391%200%2C14.5617391%20C0%2C14.3817391%200.146086957%2C14.2356522%200.326086957%2C14.2356522%20L14.6191304%2C14.2356522%20C14.7991304%2C14.2356522%2014.9452174%2C14.3817391%2014.9452174%2C14.5617391%20C14.9452174%2C14.7417391%2014.7991304%2C14.8878261%2014.6191304%2C14.8878261%20L14.6191304%2C14.8878261%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.6191304%2C10.1621739%20L0.326086957%2C10.1621739%20C0.146086957%2C10.1621739%200%2C10.016087%200%2C9.83608696%20C0%2C9.65608696%200.146086957%2C9.51%200.326086957%2C9.51%20L14.6191304%2C9.51%20C14.7991304%2C9.51%2014.9452174%2C9.65608696%2014.9452174%2C9.83608696%20C14.9452174%2C10.016087%2014.7991304%2C10.1621739%2014.6191304%2C10.1621739%20L14.6191304%2C10.1621739%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.6191304%2C5.43586957%20L0.326086957%2C5.43586957%20C0.146086957%2C5.43586957%200%2C5.28978261%200%2C5.10978261%20C0%2C4.92978261%200.146086957%2C4.78369565%200.326086957%2C4.78369565%20L14.6191304%2C4.78369565%20C14.7991304%2C4.78369565%2014.9452174%2C4.92978261%2014.9452174%2C5.10978261%20C14.9452174%2C5.28978261%2014.7991304%2C5.43586957%2014.6191304%2C5.43586957%20L14.6191304%2C5.43586957%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.6191304%2C0.709565217%20L0.326086957%2C0.709565217%20C0.146086957%2C0.709565217%200%2C0.563478261%200%2C0.383478261%20C0%2C0.203478261%200.146086957%2C0.0573913043%200.326086957%2C0.0573913043%20L14.6191304%2C0.0573913043%20C14.7991304%2C0.0573913043%2014.9452174%2C0.203478261%2014.9452174%2C0.383478261%20C14.9452174%2C0.563478261%2014.7991304%2C0.709565217%2014.6191304%2C0.709565217%20L14.6191304%2C0.709565217%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var color = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2215px%22%20height%3D%2215px%22%20viewBox%3D%220%200%2015%2015%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Ecolor%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22color%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.4063871%2C0.585258065%20C13.6262903%2C-0.194870968%2012.3614516%2C-0.195096774%2011.5808387%2C0.585%20L11.0415806%2C1.12425806%20C10.7519032%2C0.834612903%2010.2827097%2C0.834612903%209.99306452%2C1.12425806%20C9.70335484%2C1.41367742%209.70335484%2C1.8833871%209.99306452%2C2.17280645%20L10.1677742%2C2.3476129%20L4.34235484%2C8.17345161%20L4.34183871%2C8.17345161%20L2.31974194%2C10.1957419%20C2.15903226%2C10.3564516%202.06429032%2C10.5714194%202.05409677%2C10.7984516%20L2.04925806%2C10.9063226%20L2.04925806%2C10.9078065%20L1.96767742%2C12.7369677%20C1.96432258%2C12.8219032%201.99616129%2C12.9042258%202.05603226%2C12.9643226%20C2.11251613%2C13.0210645%202.18974194%2C13.0526452%202.26990323%2C13.0526452%20C2.27425806%2C13.0526452%202.27858065%2C13.0526452%202.28345161%2C13.0523871%20L3.25325806%2C13.0094516%20L3.25377419%2C13.0094516%20L3.84467742%2C12.9831613%20L4.113%2C12.9713548%20C4.40987097%2C12.9580645%204.69183871%2C12.8339677%204.90232258%2C12.6237419%20L12.6732258%2C4.85306452%20L12.8185806%2C4.9983871%20C12.9634194%2C5.14316129%2013.1531613%2C5.21558065%2013.3428387%2C5.21558065%20C13.5325484%2C5.21558065%2013.7223226%2C5.14316129%2013.867129%2C4.9983871%20C14.1568065%2C4.70893548%2014.1568065%2C4.23922581%2013.867129%2C3.94983871%20L14.4063548%2C3.41054839%20C15.1865161%2C2.63045161%2015.1865161%2C1.3656129%2014.4063871%2C0.585258065%20L14.4063871%2C0.585258065%20Z%20M8.79480645%2C7.33322581%20L6.06577419%2C7.84806452%20L10.5173226%2C3.39632258%20L11.6248065%2C4.50329032%20L8.79480645%2C7.33322581%20L8.79480645%2C7.33322581%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M2.08064516%2C13.6732903%20C0.931709677%2C13.6732903%200%2C13.9682903%200%2C14.3324839%20C0%2C14.6964839%200.931709677%2C14.9914516%202.08064516%2C14.9914516%20C3.22958065%2C14.9914516%204.16083871%2C14.6965161%204.16083871%2C14.3324839%20C4.16083871%2C13.9682581%203.22958065%2C13.6732903%202.08064516%2C13.6732903%20L2.08064516%2C13.6732903%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var eraser = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2215%22%20height%3D%2215%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M8.1%2014l6.4-7.2c0.6-0.7%200.6-1.8-0.1-2.5l-2.7-2.7c-0.3-0.4-0.8-0.6-1.3-0.6h-1.8c-0.5%200-1%200.2-1.4%200.6l-6.7%207.6c-0.6%200.7-0.6%201.9%200.1%202.5l2.7%202.7c0.3%200.4%200.8%200.6%201.3%200.6h11.4v-1h-7.9zM6.8%2013.9c0%200%200-0.1%200%200l-2.7-2.7c-0.4-0.4-0.4-0.9%200-1.3l3.4-3.9h-1l-3%203.3c-0.6%200.7-0.6%201.7%200.1%202.4l2.3%202.3h-1.3c-0.2%200-0.4-0.1-0.6-0.2l-2.8-2.8c-0.3-0.3-0.3-0.8%200-1.1l3.5-3.9h1.8l3.5-4h1l-3.5%204%203.1%203.7-3.5%204c-0.1%200.1-0.2%200.1-0.3%200.2z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E";

var link = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2215px%22%20height%3D%2215px%22%20viewBox%3D%220%200%2015%2015%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Elink%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22link%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M13.967%2C0.95%20C13.3555%2C0.3385%2012.53975%2C0.00175%2011.66975%2C0.00175%20C10.8%2C0.00175%209.984%2C0.3385%209.3725%2C0.95%20L7.105%2C3.2175%20C6.28625%2C4.03625%206%2C5.1865%206.23975%2C6.24%20C6.0045%2C6.187%205.76225%2C6.15675%205.51475%2C6.15675%20C4.645%2C6.15675%203.829%2C6.4935%203.21775%2C7.105%20L0.95%2C9.37275%20C-0.3165%2C10.63925%20-0.3165%2C12.70075%200.95%2C13.96725%20C1.5615%2C14.57875%202.37725%2C14.9155%203.24725%2C14.9155%20C4.11725%2C14.9155%204.933%2C14.57875%205.5445%2C13.96725%20L7.812%2C11.69975%20C8.63075%2C10.881%208.917%2C9.73075%208.67725%2C8.67725%20C8.9125%2C8.73025%209.15475%2C8.7605%209.40225%2C8.7605%20C10.27225%2C8.7605%2011.08825%2C8.42375%2011.6995%2C7.81225%20L13.96725%2C5.54475%20C15.234%2C4.278%2015.234%2C2.21675%2013.967%2C0.95%20L13.967%2C0.95%20Z%20M7.105%2C10.9925%20L4.8375%2C13.26%20C4.415%2C13.6825%203.85%2C13.91525%203.24725%2C13.91525%20C2.6445%2C13.91525%202.07975%2C13.6825%201.657%2C13.26%20C0.78025%2C12.383%200.78025%2C10.9565%201.657%2C10.0795%20L3.92475%2C7.812%20C4.34725%2C7.3895%204.912%2C7.15675%205.51475%2C7.15675%20C5.94575%2C7.15675%206.35625%2C7.2775%206.71025%2C7.49975%20L4.77225%2C9.43775%20C4.577%2C9.633%204.577%2C9.9495%204.77225%2C10.14475%20C4.86975%2C10.2425%204.99775%2C10.29125%205.12575%2C10.29125%20C5.25375%2C10.29125%205.38175%2C10.2425%205.47925%2C10.14475%20L7.4175%2C8.2065%20C7.963%2C9.075%207.86%2C10.23725%207.105%2C10.9925%20L7.105%2C10.9925%20Z%20M13.26%2C4.8375%20L10.99225%2C7.105%20C10.56975%2C7.5275%2010.005%2C7.76025%209.402%2C7.76025%20C8.971%2C7.76025%208.56075%2C7.6395%208.20675%2C7.41725%20L10.14475%2C5.47925%20C10.34%2C5.284%2010.34%2C4.9675%2010.14475%2C4.77225%20C9.94975%2C4.577%209.63275%2C4.577%209.43775%2C4.77225%20L7.4995%2C6.7105%20C6.954%2C5.842%207.057%2C4.68%207.812%2C3.92475%20L10.0795%2C1.65725%20C10.502%2C1.23475%2011.067%2C1.002%2011.66975%2C1.002%20C12.27275%2C1.002%2012.83725%2C1.23475%2013.26%2C1.65725%20C13.68275%2C2.07975%2013.91525%2C2.6445%2013.91525%2C3.2475%20C13.91525%2C3.85025%2013.6825%2C4.415%2013.26%2C4.8375%20L13.26%2C4.8375%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var unlink = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2215px%22%20height%3D%2215px%22%20viewBox%3D%220%200%2015%2015%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Eunlink%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22unlink%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M13.9562727%2C1.03663636%20C12.5740909%2C-0.345545455%2010.3249091%2C-0.345%208.94245455%2C1.03663636%20L6.43554545%2C3.54354545%20C6.22254545%2C3.75654545%206.22254545%2C4.10181818%206.43554545%2C4.31481818%20C6.64854545%2C4.52781818%206.99381818%2C4.52781818%207.20681818%2C4.31481818%20L9.71372727%2C1.80790909%20C10.1749091%2C1.347%2010.7912727%2C1.09281818%2011.4490909%2C1.09281818%20C12.1071818%2C1.09281818%2012.7235455%2C1.347%2013.1847273%2C1.80818182%20C13.6459091%2C2.26936364%2013.9000909%2C2.88572727%2013.9000909%2C3.54381818%20C13.9000909%2C4.20163636%2013.6459091%2C4.818%2013.1847273%2C5.27918182%20L9.90681818%2C8.55790909%20C8.94954545%2C9.51463636%207.39254545%2C9.51463636%206.43527273%2C8.55790909%20C6.22227273%2C8.34490909%205.877%2C8.34490909%205.664%2C8.55790909%20C5.451%2C8.77090909%205.451%2C9.11645455%205.664%2C9.32918182%20C6.35509091%2C10.0202727%207.263%2C10.3658182%208.17090909%2C10.3658182%20C9.07881818%2C10.3658182%209.98672727%2C10.0202727%2010.6778182%2C9.32918182%20L13.9562727%2C6.05072727%20C14.6236364%2C5.38363636%2014.9912727%2C4.49318182%2014.9912727%2C3.54381818%20C14.9912727%2C2.59418182%2014.6236364%2C1.704%2013.9562727%2C1.03663636%20L13.9562727%2C1.03663636%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M7.39963636%2C11.0645455%20L5.27836364%2C13.1858182%20C4.81718182%2C13.647%204.20081818%2C13.9011818%203.54272727%2C13.9011818%20C2.88490909%2C13.9011818%202.26827273%2C13.647%201.80709091%2C13.1858182%20C0.850090909%2C12.2288182%200.850090909%2C10.6715455%201.80709091%2C9.71454545%20L4.89272727%2C6.62890909%20C5.35390909%2C6.168%205.97027273%2C5.91381818%206.62836364%2C5.91381818%20C7.28618182%2C5.91381818%207.90254545%2C6.168%208.36372727%2C6.62890909%20C8.57672727%2C6.84190909%208.922%2C6.84190909%209.135%2C6.62890909%20C9.348%2C6.41590909%209.348%2C6.07063636%209.135%2C5.85763636%20C7.75309091%2C4.47572727%205.50390909%2C4.47545455%204.12118182%2C5.85763636%20L1.03554545%2C8.94354545%20C0.368454545%2C9.61063636%200.000818181818%2C10.5010909%200.000818181818%2C11.4504545%20C0.000818181818%2C12.3995455%200.368454545%2C13.29%201.03581818%2C13.9570909%20C1.70290909%2C14.6244545%202.59336364%2C14.9920909%203.54245455%2C14.9920909%20C4.49181818%2C14.9920909%205.38227273%2C14.6244545%206.04936364%2C13.9570909%20L8.17063636%2C11.8358182%20C8.38363636%2C11.6228182%208.38363636%2C11.2775455%208.17063636%2C11.0645455%20C7.95763636%2C10.8515455%207.61263636%2C10.8515455%207.39963636%2C11.0645455%20L7.39963636%2C11.0645455%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M9.27354545%2C12.0019091%20C8.97245455%2C12.0019091%208.72809091%2C12.2462727%208.72809091%2C12.5473636%20L8.72809091%2C14.1837273%20C8.72809091%2C14.4848182%208.97245455%2C14.7291818%209.27354545%2C14.7291818%20C9.57463636%2C14.7291818%209.819%2C14.4848182%209.819%2C14.1837273%20L9.819%2C12.5473636%20C9.819%2C12.246%209.57490909%2C12.0019091%209.27354545%2C12.0019091%20L9.27354545%2C12.0019091%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M11.2295455%2C11.6162727%20C11.0165455%2C11.4032727%2010.6712727%2C11.4032727%2010.4582727%2C11.6162727%20C10.2452727%2C11.8292727%2010.2452727%2C12.1745455%2010.4582727%2C12.3875455%20L11.6151818%2C13.5444545%20C11.7218182%2C13.6510909%2011.8611818%2C13.7042727%2012.0008182%2C13.7042727%20C12.1404545%2C13.7042727%2012.2798182%2C13.6510909%2012.3864545%2C13.5444545%20C12.5994545%2C13.3314545%2012.5994545%2C12.9861818%2012.3864545%2C12.7731818%20L11.2295455%2C11.6162727%20L11.2295455%2C11.6162727%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M12.5367273%2C9.82009091%20L10.9003636%2C9.82009091%20C10.5992727%2C9.82009091%2010.3549091%2C10.0644545%2010.3549091%2C10.3655455%20C10.3549091%2C10.6666364%2010.5992727%2C10.911%2010.9003636%2C10.911%20L12.5367273%2C10.911%20C12.8378182%2C10.911%2013.0821818%2C10.6666364%2013.0821818%2C10.3655455%20C13.0821818%2C10.0644545%2012.8380909%2C9.82009091%2012.5367273%2C9.82009091%20L12.5367273%2C9.82009091%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M4.90990909%2C3.54736364%20C5.211%2C3.54736364%205.45536364%2C3.303%205.45536364%2C3.00190909%20L5.45536364%2C1.36554545%20C5.45536364%2C1.06445455%205.211%2C0.820090909%204.90990909%2C0.820090909%20C4.60881818%2C0.820090909%204.36445455%2C1.06445455%204.36445455%2C1.36554545%20L4.36445455%2C3.00190909%20C4.36445455%2C3.303%204.60881818%2C3.54736364%204.90990909%2C3.54736364%20L4.90990909%2C3.54736364%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M2.88790909%2C3.933%20C2.99454545%2C4.03963636%203.13390909%2C4.09281818%203.27354545%2C4.09281818%20C3.41318182%2C4.09281818%203.55254545%2C4.03963636%203.65918182%2C3.933%20C3.87218182%2C3.72%203.87218182%2C3.37472727%203.65918182%2C3.16172727%20L2.50227273%2C2.00454545%20C2.28927273%2C1.79154545%201.944%2C1.79154545%201.731%2C2.00454545%20C1.518%2C2.21754545%201.518%2C2.56281818%201.731%2C2.77581818%20L2.88790909%2C3.933%20L2.88790909%2C3.933%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M1.62763636%2C5.72918182%20L3.264%2C5.72918182%20C3.56509091%2C5.72918182%203.80945455%2C5.48481818%203.80945455%2C5.18372727%20C3.80945455%2C4.88263636%203.56509091%2C4.63827273%203.264%2C4.63827273%20L1.62763636%2C4.63827273%20C1.32654545%2C4.63827273%201.08218182%2C4.88263636%201.08218182%2C5.18372727%20C1.08218182%2C5.48481818%201.32654545%2C5.72918182%201.62763636%2C5.72918182%20L1.62763636%2C5.72918182%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var emoji = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20width%3D%2216.999982833862305%22%20height%3D%2216.999980926513672%22%20viewBox%3D%2215.7289%2022.0824%2017%2017%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%20%20%3Cg%20transform%3D%22matrix%280.1655159890651703%2C%200%2C%200%2C%200.1655159890651703%2C%2016.585067749023438%2C%2022.938426971435547%29%22%3E%20%20%20%20%3Cpath%20d%3D%22M%2079.285%2013.084%20C%2061.031%20-5.172%2031.332%20-5.172%2013.081%2013.08%20C%20-5.173%2031.331%20-5.171%2061.031%2013.083%2079.286%20C%2031.332%2097.537%2061.031%2097.537%2079.283%2079.283%20C%2097.536%2061.031%2097.535%2031.333%2079.285%2013.084%20Z%20M%2074.177%2074.178%20C%2058.741%2089.614%2033.625%2089.616%2018.187%2074.18%20C%202.748%2058.742%202.75%2033.622%2018.187%2018.186%20C%2033.623%202.751%2058.74%202.749%2074.179%2018.188%20C%2089.615%2033.623%2089.613%2058.743%2074.177%2074.178%20Z%20M%2028.721%2033.513%20C%2028.721%2030.492%2031.171%2028.042%2034.192%2028.042%20C%2037.213%2028.042%2039.663%2030.491%2039.663%2033.513%20C%2039.663%2036.536%2037.213%2038.986%2034.192%2038.986%20C%2031.171%2038.986%2028.721%2036.536%2028.721%2033.513%20Z%20M%2053.53%2033.513%20C%2053.53%2030.492%2055.982%2028.042%2059.004%2028.042%20C%2062.024%2028.042%2064.474%2030.491%2064.474%2033.513%20C%2064.474%2036.536%2062.025%2038.986%2059.004%2038.986%20C%2055.982%2038.986%2053.53%2036.536%2053.53%2033.513%20Z%20M%2066.465%2055.922%20C%2063.075%2063.764%2055.134%2068.83%2046.236%2068.83%20C%2037.147%2068.83%2029.159%2063.738%2025.885%2055.857%20C%2025.324%2054.508%2025.964%2052.959%2027.314%2052.397%20C%2027.646%2052.26%2027.99%2052.196%2028.329%2052.196%20C%2029.367%2052.196%2030.352%2052.808%2030.774%2053.827%20C%2033.224%2059.727%2039.293%2063.537%2046.236%2063.537%20C%2053.021%2063.537%2059.054%2059.724%2061.606%2053.821%20C%2062.187%2052.48%2063.745%2051.861%2065.087%2052.442%20C%2066.427%2053.024%2067.046%2054.581%2066.465%2055.922%20Z%22%2F%3E%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var embedded = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20width%3D%2216.999937057495117%22%20height%3D%2216.999937057495117%22%20viewBox%3D%225.81276e-7%203.05420e-8%2016.9999%2016.9999%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%3E%20%20%20%20%3Cg%3E%20%20%20%20%20%20%3Cpath%20d%3D%22M202.042%2C199.238c-6.938-2.103-14.268%2C1.82-16.371%2C8.759l-55.138%2C182.045c-2.102%2C6.938%2C1.82%2C14.268%2C8.759%2C16.37%26%2310%3B%26%239%3B%26%239%3B%26%239%3Bc1.27%2C0.385%2C2.549%2C0.568%2C3.811%2C0.568c5.633%2C0%2C10.841-3.656%2C12.56-9.326l55.138-182.045%26%2310%3B%26%239%3B%26%239%3B%26%239%3BC212.901%2C208.668%2C208.981%2C201.338%2C202.042%2C199.238z%22%2F%3E%20%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%3E%20%20%20%20%3Cg%3E%20%20%20%20%20%20%3Cpath%20d%3D%22M268.994%2C199.238c-6.93-2.103-14.268%2C1.82-16.37%2C8.759l-55.138%2C182.045c-2.102%2C6.938%2C1.82%2C14.268%2C8.759%2C16.37%26%2310%3B%26%239%3B%26%239%3B%26%239%3Bc1.269%2C0.385%2C2.549%2C0.568%2C3.811%2C0.568c5.633%2C0%2C10.841-3.656%2C12.56-9.326l55.138-182.045%26%2310%3B%26%239%3B%26%239%3B%26%239%3BC279.857%2C208.668%2C275.935%2C201.338%2C268.994%2C199.238z%22%2F%3E%20%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%3E%20%20%20%20%3Cg%3E%20%20%20%20%20%20%3Cpath%20d%3D%22M498.872%2C0H13.128C5.878%2C0%2C0%2C5.879%2C0%2C13.128v485.744C0%2C506.121%2C5.878%2C512%2C13.128%2C512h485.744%26%2310%3B%26%239%3B%26%239%3B%26%239%3Bc7.249%2C0%2C13.128-5.879%2C13.128-13.128V13.128C512%2C5.879%2C506.121%2C0%2C498.872%2C0z%20M105.026%2C26.256h301.949v52.513H105.026V26.256z%26%2310%3B%26%239%3B%26%239%3B%26%239%3B%20M26.256%2C26.256h52.513v52.513H26.256V26.256z%20M485.744%2C485.744H26.256V105.026h459.487V485.744z%20M485.744%2C78.769h-52.513V26.256%26%2310%3B%26%239%3B%26%239%3B%26%239%3Bh52.513V78.769z%22%2F%3E%20%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%3E%20%20%20%20%3Cg%3E%20%20%20%20%20%20%3Ccircle%20cx%3D%2293.867%22%20cy%3D%22245.064%22%20r%3D%2213.128%22%2F%3E%20%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%3E%20%20%20%20%3Cg%3E%20%20%20%20%20%20%3Ccircle%20cx%3D%2293.867%22%20cy%3D%22360.592%22%20r%3D%2213.128%22%2F%3E%20%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%3E%20%20%20%20%3Cg%3E%20%20%20%20%20%20%3Cpath%20d%3D%22M429.292%2C380.718H307.2c-7.249%2C0-13.128%2C5.879-13.128%2C13.128c0%2C7.249%2C5.879%2C13.128%2C13.128%2C13.128h122.092%26%2310%3B%26%239%3B%26%239%3B%26%239%3Bc7.249%2C0%2C13.128-5.879%2C13.128-13.128C442.421%2C386.597%2C436.542%2C380.718%2C429.292%2C380.718z%22%2F%3E%20%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03320299834012985%2C%200%2C%200%2C%200.03320299834012985%2C%20-2.842170943040401e-14%2C%200%29%22%2F%3E%3C%2Fsvg%3E";

var image = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2215px%22%20height%3D%2214px%22%20viewBox%3D%220%200%2015%2014%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Eimage%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22image%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Group%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M14.7413793%2C0%20L0.25862069%2C0%20C0.115862069%2C0%200%2C0.136043478%200%2C0.304347826%20L0%2C13.6956522%20C0%2C13.8639565%200.115862069%2C14%200.25862069%2C14%20L14.7413793%2C14%20C14.8841379%2C14%2015%2C13.8639565%2015%2C13.6956522%20L15%2C0.304347826%20C15%2C0.136043478%2014.8841379%2C0%2014.7413793%2C0%20L14.7413793%2C0%20Z%20M14.4827586%2C13.3913043%20L0.517241379%2C13.3913043%20L0.517241379%2C0.608695652%20L14.4827586%2C0.608695652%20L14.4827586%2C13.3913043%20L14.4827586%2C13.3913043%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M4.13793103%2C6.73765217%20C4.93215517%2C6.73765217%205.57818966%2C5.9773913%205.57818966%2C5.04304348%20C5.57818966%2C4.10808696%204.93215517%2C3.34782609%204.13793103%2C3.34782609%20C3.3437069%2C3.34782609%202.69767241%2C4.10808696%202.69767241%2C5.04273913%20C2.69767241%2C5.9773913%203.3437069%2C6.73765217%204.13793103%2C6.73765217%20L4.13793103%2C6.73765217%20Z%20M4.13793103%2C3.95652174%20C4.64689655%2C3.95652174%205.06094828%2C4.44408696%205.06094828%2C5.04273913%20C5.06094828%2C5.6413913%204.64689655%2C6.12895652%204.13793103%2C6.12895652%20C3.62896552%2C6.12895652%203.21491379%2C5.64169565%203.21491379%2C5.04304348%20C3.21491379%2C4.4443913%203.62896552%2C3.95652174%204.13793103%2C3.95652174%20L4.13793103%2C3.95652174%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M1.81034483%2C12.173913%20C1.87086207%2C12.173913%201.93189655%2C12.1489565%201.98103448%2C12.0981304%20L6.19991379%2C7.72708696%20L8.86422414%2C10.8621739%20C8.96534483%2C10.9811739%209.1287931%2C10.9811739%209.22991379%2C10.8621739%20C9.33103448%2C10.7431739%209.33103448%2C10.5508261%209.22991379%2C10.4318261%20L7.98672414%2C8.96882609%20L10.3611207%2C5.90891304%20L13.2734483%2C9.05069565%20C13.3787069%2C9.16421739%2013.5424138%2C9.15569565%2013.6388793%2C9.03182609%20C13.7353448%2C8.90795652%2013.7283621%2C8.71530435%2013.6228448%2C8.60178261%20L10.5193966%2C5.25395652%20C10.4687069%2C5.19947826%2010.4012069%2C5.1723913%2010.3331897%2C5.17421739%20C10.2646552%2C5.17786957%2010.2%2C5.21347826%2010.1537069%2C5.27313043%20L7.62077586%2C8.53786957%20L6.39413793%2C7.09434783%20C6.29741379%2C6.98082609%206.14275862%2C6.97504348%206.04034483%2C7.08095652%20L1.63939655%2C11.641%20C1.53206897%2C11.752087%201.52172414%2C11.9444348%201.61612069%2C12.0707391%20C1.66732759%2C12.1392174%201.7387069%2C12.173913%201.81034483%2C12.173913%20L1.81034483%2C12.173913%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var undo = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2214px%22%20height%3D%2217px%22%20viewBox%3D%220%200%2014%2017%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Eundo%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22undo%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M7%2C14.875%20C9.67231731%2C14.875%2011.8461538%2C12.7302773%2011.8461538%2C10.09375%20C11.8461538%2C7.45722266%209.67231731%2C5.3125%207%2C5.3125%20L7%2C8.5%20L1.61538462%2C4.25%20L7%2C0%20L7%2C3.1875%20C10.8596923%2C3.1875%2014%2C6.2857832%2014%2C10.09375%20C14%2C13.90175%2010.8596923%2C17%207%2C17%20C3.14034135%2C17%200%2C13.90175%200%2C10.09375%20L2.15384615%2C10.09375%20C2.15384615%2C12.7302773%204.32768269%2C14.875%207%2C14.875%20L7%2C14.875%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var redo = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%3Csvg%20width%3D%2213px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2013%2016%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%20%20%20%20%20%20%3Ctitle%3Eredo%3C%2Ftitle%3E%20%20%20%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%20%20%20%3Cdefs%3E%3C%2Fdefs%3E%20%20%20%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%20id%3D%22redo%22%20fill%3D%22%23000000%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Capa_1%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M6.50352152%2C13.977251%20C4.02687342%2C13.977251%202.01216962%2C11.9621399%202.01216962%2C9.48457613%20C2.01216962%2C7.00714403%204.02687342%2C4.99186831%206.50352152%2C4.99186831%20L6.50352152%2C7.98702881%20L11.493843%2C3.99354733%20L6.50352152%2C0%20L6.50352152%2C2.99516049%20C2.92648101%2C2.99516049%200.0161265823%2C5.90650206%200.0161265823%2C9.48460905%20C0.0161265823%2C13.0629136%202.92648101%2C15.9740905%206.50352152%2C15.9740905%20C10.080562%2C15.9740905%2012.9908177%2C13.0629136%2012.9908177%2C9.48460905%20L10.9949063%2C9.48460905%20C10.9949392%2C11.9621399%208.98016962%2C13.977251%206.50352152%2C13.977251%20L6.50352152%2C13.977251%20Z%22%20id%3D%22Shape%22%3E%3C%2Fpath%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var subscript = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20width%3D%2216.999845504760742%22%20height%3D%2214.999852180480957%22%20viewBox%3D%220.00000233043%201.68767e-7%2016.9998%2014.9999%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%3E%20%20%20%20%3Cpath%20d%3D%22M343.273%2C340.824h-81.179l-92.379-108.377L79.429%2C340.824H0l130.864-148.187L6.295%2C52.792H86.43l86.797%2C101.388%26%2310%3B%26%239%3B%26%239%3Bl87.461-101.388h76.639L211.352%2C192.637L343.273%2C340.824z%20M393.154%2C401.06l52.86-40.034c18.542-12.731%2C30.724-24.559%2C36.563-35.464%26%2310%3B%26%239%3B%26%239%3Bc5.84-10.9%2C8.748-22.621%2C8.748-35.176c0-20.504-6.856-37.055-20.558-49.653c-13.701-12.602-31.723-18.896-54.048-18.896%26%2310%3B%26%239%3B%26%239%3Bc-21.521%2C0-38.751%2C6.372-51.636%2C19.112c-12.922%2C12.75-19.37%2C31.96-19.37%2C57.648h41.523c0-15.327%2C2.713-25.925%2C8.133-31.801%26%2310%3B%26%239%3B%26%239%3Bc5.426-5.875%2C12.862-8.818%2C22.331-8.818c9.463%2C0%2C16.94%2C2.99%2C22.484%2C8.961c5.509%2C5.97%2C8.27%2C13.394%2C8.27%2C22.26%26%2310%3B%26%239%3B%26%239%3Bc0%2C8.854-2.554%2C16.869-7.69%2C24.039c-5.13%2C7.17-19.381%2C19.263-42.776%2C36.286c-20.02%2C14.635-47.091%2C28.431-55.218%2C41.363%26%2310%3B%26%239%3B%26%239%3Bl0.407%2C48.103h148.603v-37.936h-98.627V401.06z%22%2F%3E%20%20%3C%2Fg%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.034568000584840775%2C%200%2C%200%2C%200.03416900336742401%2C%200%2C%200%29%22%2F%3E%3C%2Fsvg%3E";

var superscript = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20width%3D%2216.99993133544922%22%20height%3D%2215.000198364257812%22%20viewBox%3D%22-0.00000412796%202.26253e-7%2016.9999%2015.0002%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%3E%20%20%20%20%3Cpath%20d%3D%22M211.357%2C311.56l131.922%2C148.188h-81.178l-92.38-108.379L79.435%2C459.748H0L130.861%2C311.56L6.301%2C171.714h80.135%26%2310%3B%26%239%3B%26%239%3Bl86.794%2C101.391l87.47-101.391h76.639L211.357%2C311.56z%20M391.736%2C211.36l54.373-40.033c18.542-12.741%2C30.724-24.56%2C36.563-35.468%26%2310%3B%26%239%3B%26%239%3Bc5.834-10.902%2C8.748-22.618%2C8.748-35.172c0-20.508-6.856-37.061-20.552-49.656c-13.707-12.602-31.729-18.897-54.054-18.897%26%2310%3B%26%239%3B%26%239%3Bc-21.527%2C0-38.745%2C6.375-51.637%2C19.115C352.258%2C63.996%2C345.81%2C83.206%2C345.81%2C108.9h41.523c0-15.33%2C2.719-25.928%2C8.145-31.806%26%2310%3B%26%239%3B%26%239%3Bc5.426-5.879%2C12.861-8.819%2C22.331-8.819c9.457%2C0%2C16.929%2C2.991%2C22.473%2C8.964c5.521%2C5.967%2C8.275%2C13.388%2C8.275%2C22.257%26%2310%3B%26%239%3B%26%239%3Bc0%2C8.854-2.554%2C16.866-7.685%2C24.039s-19.387%2C19.272-42.782%2C36.298c-20.014%2C14.635-47.097%2C28.422-55.218%2C41.364l0.407%2C48.093%26%2310%3B%26%239%3B%26%239%3Bh148.603v-37.93H391.736z%22%2F%3E%20%20%3C%2Fg%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%20%20%3Cg%20transform%3D%22matrix%280.03456100076436997%2C%200%2C%200%2C%200.03262700140476227%2C%200%2C%200%29%22%2F%3E%3C%2Fsvg%3E";

/**
* This is default toolbar configuration,
* whatever user passes in toolbar property is deeply merged with this to over-ride defaults.
*/
var defaultToolbar = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
    bold: { icon: bold, className: undefined, title: undefined },
    italic: { icon: italic, className: undefined, title: undefined },
    underline: { icon: underline, className: undefined, title: undefined },
    strikethrough: { icon: strikethrough, className: undefined, title: undefined },
    monospace: { icon: monospace, className: undefined, title: undefined },
    superscript: { icon: superscript, className: undefined, title: undefined },
    subscript: { icon: subscript, className: undefined, title: undefined }
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: undefined
  },
  fontSize: {
    icon: fontSize,
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: undefined
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: undefined
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered', 'indent', 'outdent'],
    unordered: { icon: unordered, className: undefined, title: undefined },
    ordered: { icon: ordered, className: undefined, title: undefined },
    indent: { icon: indent, className: undefined, title: undefined },
    outdent: { icon: outdent, className: undefined, title: undefined },
    title: undefined
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['left', 'center', 'right', 'justify'],
    left: { icon: left, className: undefined, title: undefined },
    center: { icon: center, className: undefined, title: undefined },
    right: { icon: right, className: undefined, title: undefined },
    justify: { icon: justify, className: undefined, title: undefined },
    title: undefined
  },
  colorPicker: {
    icon: color,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)', 'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)', 'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)', 'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)', 'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)', 'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
    title: undefined
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
    link: { icon: link, className: undefined, title: undefined },
    unlink: { icon: unlink, className: undefined, title: undefined }
  },
  emoji: {
    icon: emoji,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: ['😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓', '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃', '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕', '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥', '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸', '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈', '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅', '✅', '❎', '💯'],
    title: undefined
  },
  embedded: {
    icon: embedded,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    defaultSize: {
      height: 'auto',
      width: 'auto'
    },
    title: undefined
  },
  image: {
    icon: image,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    previewImage: false,
    alignmentEnabled: true,
    uploadCallback: undefined,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto'
    },
    title: undefined
  },
  remove: { icon: eraser, className: undefined, component: undefined, title: undefined },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo'],
    undo: { icon: undo, className: undefined, title: undefined },
    redo: { icon: redo, className: undefined, title: undefined },
    title: undefined
  }
};

/**
 * - add option property to color-picker, emoji.
 */

var en = {

  // Generic
  'generic.add': 'Add',
  'generic.cancel': 'Cancel',

  // BlockType
  'components.controls.blocktype.h1': 'H1',
  'components.controls.blocktype.h2': 'H2',
  'components.controls.blocktype.h3': 'H3',
  'components.controls.blocktype.h4': 'H4',
  'components.controls.blocktype.h5': 'H5',
  'components.controls.blocktype.h6': 'H6',
  'components.controls.blocktype.blockquote': 'Blockquote',
  'components.controls.blocktype.code': 'Code',
  'components.controls.blocktype.blocktype': 'Block Type',
  'components.controls.blocktype.normal': 'Normal',

  // Color Picker
  'components.controls.colorpicker.colorpicker': 'Color Picker',
  'components.controls.colorpicker.text': 'Text',
  'components.controls.colorpicker.background': 'Highlight',

  // Embedded
  'components.controls.embedded.embedded': 'Embedded',
  'components.controls.embedded.embeddedlink': 'Embedded Link',
  'components.controls.embedded.enterlink': 'Enter link',

  // Emoji
  'components.controls.emoji.emoji': 'Emoji',

  // FontFamily
  'components.controls.fontfamily.fontfamily': 'Font',

  // FontSize
  'components.controls.fontsize.fontsize': 'Font Size',

  // History
  'components.controls.history.history': 'History',
  'components.controls.history.undo': 'Undo',
  'components.controls.history.redo': 'Redo',

  // Image
  'components.controls.image.image': 'Image',
  'components.controls.image.fileUpload': 'File Upload',
  'components.controls.image.byURL': 'URL',
  'components.controls.image.dropFileText': 'Drop the file or click to upload',

  // Inline
  'components.controls.inline.bold': 'Bold',
  'components.controls.inline.italic': 'Italic',
  'components.controls.inline.underline': 'Underline',
  'components.controls.inline.strikethrough': 'Strikethrough',
  'components.controls.inline.monospace': 'Monospace',
  'components.controls.inline.superscript': 'Superscript',
  'components.controls.inline.subscript': 'Subscript',

  // Link
  'components.controls.link.linkTitle': 'Link Title',
  'components.controls.link.linkTarget': 'Link Target',
  'components.controls.link.linkTargetOption': 'Open link in new window',
  'components.controls.link.link': 'Link',
  'components.controls.link.unlink': 'Unlink',

  // List
  'components.controls.list.list': 'List',
  'components.controls.list.unordered': 'Unordered',
  'components.controls.list.ordered': 'Ordered',
  'components.controls.list.indent': 'Indent',
  'components.controls.list.outdent': 'Outdent',

  // Remove
  'components.controls.remove.remove': 'Remove',

  // TextAlign
  'components.controls.textalign.textalign': 'Text Align',
  'components.controls.textalign.left': 'Left',
  'components.controls.textalign.center': 'Center',
  'components.controls.textalign.right': 'Right',
  'components.controls.textalign.justify': 'Justify'
};

var fr = {
  // Generic
  'generic.add': 'Ok',
  'generic.cancel': 'Annuler',

  // BlockType
  'components.controls.blocktype.h1': 'Titre 1',
  'components.controls.blocktype.h2': 'Titre 2',
  'components.controls.blocktype.h3': 'Titre 3',
  'components.controls.blocktype.h4': 'Titre 4',
  'components.controls.blocktype.h5': 'Titre 5',
  'components.controls.blocktype.h6': 'Titre 6',
  'components.controls.blocktype.blockquote': 'Citation',
  'components.controls.blocktype.code': 'Code',
  'components.controls.blocktype.blocktype': 'Type bloc',
  'components.controls.blocktype.normal': 'Normal',

  // Color Picker
  'components.controls.colorpicker.colorpicker': 'Palette de couleur',
  'components.controls.colorpicker.text': 'Texte',
  'components.controls.colorpicker.background': 'Fond',

  // Embedded
  'components.controls.embedded.embedded': 'Embedded',
  'components.controls.embedded.embeddedlink': 'Lien iFrame',
  'components.controls.embedded.enterlink': 'Entrer le lien',

  // Emoji
  'components.controls.emoji.emoji': 'Emoji',

  // FontFamily
  'components.controls.fontfamily.fontfamily': 'Police',

  // FontSize
  'components.controls.fontsize.fontsize': 'Taille de police',

  // History
  'components.controls.history.history': 'Historique',
  'components.controls.history.undo': 'Précédent',
  'components.controls.history.redo': 'Suivant',

  // Image
  'components.controls.image.image': 'Image',
  'components.controls.image.fileUpload': 'Téléchargement',
  'components.controls.image.byURL': 'URL',
  'components.controls.image.dropFileText': 'Glisser une image ou cliquer pour télécharger',

  // Inline
  'components.controls.inline.bold': 'Gras',
  'components.controls.inline.italic': 'Italique',
  'components.controls.inline.underline': 'Souligner',
  'components.controls.inline.strikethrough': 'Barrer',
  'components.controls.inline.monospace': 'Monospace',
  'components.controls.inline.superscript': 'Exposant',
  'components.controls.inline.subscript': 'Indice',

  // Link
  'components.controls.link.linkTitle': 'Titre du lien',
  'components.controls.link.linkTarget': 'Cible du lien',
  'components.controls.link.linkTargetOption': 'Ouvrir le lien dans une nouvelle fenêtre',
  'components.controls.link.link': 'Lier',
  'components.controls.link.unlink': 'Délier',

  // List
  'components.controls.list.list': 'Liste',
  'components.controls.list.unordered': 'Désordonnée',
  'components.controls.list.ordered': 'Ordonnée',
  'components.controls.list.indent': 'Augmenter le retrait',
  'components.controls.list.outdent': 'Diminuer le retrat',

  // Remove
  'components.controls.remove.remove': 'Supprimer',

  // TextAlign
  'components.controls.textalign.textalign': 'Alignement du texte',
  'components.controls.textalign.left': 'Gauche',
  'components.controls.textalign.center': 'Centre',
  'components.controls.textalign.right': 'Droite',
  'components.controls.textalign.justify': 'Justifier'
};

var zh = {

  // Generic
  'generic.add': '添加',
  'generic.cancel': '取消',

  // BlockType
  'components.controls.blocktype.h1': '标题1',
  'components.controls.blocktype.h2': '标题2',
  'components.controls.blocktype.h3': '标题3',
  'components.controls.blocktype.h4': '标题4',
  'components.controls.blocktype.h5': '标题5',
  'components.controls.blocktype.h6': '标题6',
  'components.controls.blocktype.blockquote': '引用',
  'components.controls.blocktype.code': '源码',
  'components.controls.blocktype.blocktype': '样式',
  'components.controls.blocktype.normal': '正文',

  // Color Picker
  'components.controls.colorpicker.colorpicker': '选色器',
  'components.controls.colorpicker.text': '文字',
  'components.controls.colorpicker.background': '背景',

  // Embedded
  'components.controls.embedded.embedded': '内嵌',
  'components.controls.embedded.embeddedlink': '内嵌网页',
  'components.controls.embedded.enterlink': '输入网页地址',

  // Emoji
  'components.controls.emoji.emoji': '表情符号',

  // FontFamily
  'components.controls.fontfamily.fontfamily': '字体',

  // FontSize
  'components.controls.fontsize.fontsize': '字号',

  // History
  'components.controls.history.history': '历史',
  'components.controls.history.undo': '撤销',
  'components.controls.history.redo': '恢复',

  // Image
  'components.controls.image.image': '图片',
  'components.controls.image.fileUpload': '来自文件',
  'components.controls.image.byURL': '在线图片',
  'components.controls.image.dropFileText': '点击或者拖拽文件上传',

  // Inline
  'components.controls.inline.bold': '粗体',
  'components.controls.inline.italic': '斜体',
  'components.controls.inline.underline': '下划线',
  'components.controls.inline.strikethrough': '删除线',
  'components.controls.inline.monospace': '等宽字体',
  'components.controls.inline.superscript': '上标',
  'components.controls.inline.subscript': '下标',

  // Link
  'components.controls.link.linkTitle': '超链接',
  'components.controls.link.linkTarget': '输入链接地址',
  'components.controls.link.linkTargetOption': '在新窗口中打开链接',
  'components.controls.link.link': '链接',
  'components.controls.link.unlink': '删除链接',

  // List
  'components.controls.list.list': '列表',
  'components.controls.list.unordered': '项目符号',
  'components.controls.list.ordered': '编号',
  'components.controls.list.indent': '增加缩进量',
  'components.controls.list.outdent': '减少缩进量',

  // Remove
  'components.controls.remove.remove': '清除格式',

  // TextAlign
  'components.controls.textalign.textalign': '文本对齐',
  'components.controls.textalign.left': '文本左对齐',
  'components.controls.textalign.center': '居中',
  'components.controls.textalign.right': '文本右对齐',
  'components.controls.textalign.justify': '两端对齐'
};

var ru = {

  // Generic
  'generic.add': 'Добавить',
  'generic.cancel': 'Отменить',

  // BlockType
  'components.controls.blocktype.h1': 'Заголовок 1',
  'components.controls.blocktype.h2': 'Заголовок 2',
  'components.controls.blocktype.h3': 'Заголовок 3',
  'components.controls.blocktype.h4': 'Заголовок 4',
  'components.controls.blocktype.h5': 'Заголовок 5',
  'components.controls.blocktype.h6': 'Заголовок 6',
  'components.controls.blocktype.blockquote': 'Цитата',
  'components.controls.blocktype.code': 'Код',
  'components.controls.blocktype.blocktype': 'Форматирование',
  'components.controls.blocktype.normal': 'Обычный',

  // Color Picker
  'components.controls.colorpicker.colorpicker': 'Выбор цвета',
  'components.controls.colorpicker.text': 'Текст',
  'components.controls.colorpicker.background': 'Фон',

  // Embedded
  'components.controls.embedded.embedded': 'Встраивание',
  'components.controls.embedded.embeddedlink': 'Ссылка в iFrame',
  'components.controls.embedded.enterlink': 'Вставьте ссылку',

  // Emoji
  'components.controls.emoji.emoji': 'Эмодзи',

  // FontFamily
  'components.controls.fontfamily.fontfamily': 'Шрифт',

  // FontSize
  'components.controls.fontsize.fontsize': 'Размер шрифта',

  // History
  'components.controls.history.history': 'История',
  'components.controls.history.undo': 'Отменить',
  'components.controls.history.redo': 'Вернуть',

  // Image
  'components.controls.image.image': 'Изображение',
  'components.controls.image.fileUpload': 'Файлы',
  'components.controls.image.byURL': 'URL',
  'components.controls.image.dropFileText': 'Переместите в эту область файлы или кликните для загрузки',

  // Inline
  'components.controls.inline.bold': 'Жирный',
  'components.controls.inline.italic': 'Курсив',
  'components.controls.inline.underline': 'Подчеркивание',
  'components.controls.inline.strikethrough': 'Зачеркивание',
  'components.controls.inline.monospace': 'Monospace',
  'components.controls.inline.superscript': 'Верхний индекс',
  'components.controls.inline.subscript': 'Нижний индекс',

  // Link
  'components.controls.link.linkTitle': 'Текст',
  'components.controls.link.linkTarget': 'Адрес ссылки',
  'components.controls.link.linkTargetOption': 'Открывать в новом окне',
  'components.controls.link.link': 'Ссылка',
  'components.controls.link.unlink': 'Убрать ссылку',

  // List
  'components.controls.list.list': 'Список',
  'components.controls.list.unordered': 'Неупорядоченный',
  'components.controls.list.ordered': 'Упорядоченный',
  'components.controls.list.indent': 'Отступ',
  'components.controls.list.outdent': 'Выступ',

  // Remove
  'components.controls.remove.remove': 'Удалить',

  // TextAlign
  'components.controls.textalign.textalign': 'Выравнивание текста',
  'components.controls.textalign.left': 'Слева',
  'components.controls.textalign.center': 'По центру',
  'components.controls.textalign.right': 'Справа',
  'components.controls.textalign.justify': 'Выравнить'
};

var pt = {

  // Generic
  'generic.add': 'Ok',
  'generic.cancel': 'Cancelar',

  // BlockType
  'components.controls.blocktype.h1': 'Título 1',
  'components.controls.blocktype.h2': 'Título 2',
  'components.controls.blocktype.h3': 'Título 3',
  'components.controls.blocktype.h4': 'Título 4',
  'components.controls.blocktype.h5': 'Título 5',
  'components.controls.blocktype.h6': 'Título 6',
  'components.controls.blocktype.blockquote': 'Citação',
  'components.controls.blocktype.code': 'Code',
  'components.controls.blocktype.blocktype': 'Estilo',
  'components.controls.blocktype.normal': 'Normal',

  // Color Picker
  'components.controls.colorpicker.colorpicker': 'Paleta de cores',
  'components.controls.colorpicker.text': 'Texto',
  'components.controls.colorpicker.background': 'Fundo',

  // Embedded
  'components.controls.embedded.embedded': 'Embarcado',
  'components.controls.embedded.embeddedlink': 'Link embarcado',
  'components.controls.embedded.enterlink': 'Coloque o link',

  // Emoji
  'components.controls.emoji.emoji': 'Emoji',

  // FontFamily
  'components.controls.fontfamily.fontfamily': 'Fonte',

  // FontSize
  'components.controls.fontsize.fontsize': 'Tamanho da Fonte',

  // History
  'components.controls.history.history': 'Histórico',
  'components.controls.history.undo': 'Desfazer',
  'components.controls.history.redo': 'Refazer',

  // Image
  'components.controls.image.image': 'Imagem',
  'components.controls.image.fileUpload': 'Carregar arquivo',
  'components.controls.image.byURL': 'URL',
  'components.controls.image.dropFileText': 'Arraste uma imagem aqui ou clique para carregar',

  // Inline
  'components.controls.inline.bold': 'Negrito',
  'components.controls.inline.italic': 'Itálico',
  'components.controls.inline.underline': 'Sublinhado',
  'components.controls.inline.strikethrough': 'Strikethrough',
  'components.controls.inline.monospace': 'Monospace',
  'components.controls.inline.superscript': 'Sobrescrito',
  'components.controls.inline.subscript': 'Subscrito',

  // Link
  'components.controls.link.linkTitle': 'Título do link',
  'components.controls.link.linkTarget': 'Alvo do link',
  'components.controls.link.linkTargetOption': 'Abrir link em outra janela',
  'components.controls.link.link': 'Adicionar Link',
  'components.controls.link.unlink': 'Remover link',

  // List
  'components.controls.list.list': 'Lista',
  'components.controls.list.unordered': 'Sem ordenção',
  'components.controls.list.ordered': 'Ordenada',
  'components.controls.list.indent': 'Aumentar recuo',
  'components.controls.list.outdent': 'Diminuir recuo',

  // Remove
  'components.controls.remove.remove': 'Remover',

  // TextAlign
  'components.controls.textalign.textalign': 'Alinhamento do texto',
  'components.controls.textalign.left': 'À Esquerda',
  'components.controls.textalign.center': 'Centralizado',
  'components.controls.textalign.right': 'À Direita',
  'components.controls.textalign.justify': 'Justificado'
};

var ko = {

  // Generic
  'generic.add': '입력',
  'generic.cancel': '취소',

  // BlockType
  'components.controls.blocktype.h1': '제목1',
  'components.controls.blocktype.h2': '제목2',
  'components.controls.blocktype.h3': '제목3',
  'components.controls.blocktype.h4': '제목4',
  'components.controls.blocktype.h5': '제목5',
  'components.controls.blocktype.h6': '제목6',
  'components.controls.blocktype.blockquote': '인용',
  'components.controls.blocktype.code': 'Code',
  'components.controls.blocktype.blocktype': '블록',
  'components.controls.blocktype.normal': '표준',

  // Color Picker
  'components.controls.colorpicker.colorpicker': '색상 선택',
  'components.controls.colorpicker.text': '글꼴색',
  'components.controls.colorpicker.background': '배경색',

  // Embedded
  'components.controls.embedded.embedded': '임베드',
  'components.controls.embedded.embeddedlink': '임베드 링크',
  'components.controls.embedded.enterlink': '주소를 입력하세요',

  // Emoji
  'components.controls.emoji.emoji': '이모지',

  // FontFamily
  'components.controls.fontfamily.fontfamily': '글꼴',

  // FontSize
  'components.controls.fontsize.fontsize': '글꼴 크기',

  // History
  'components.controls.history.history': '히스토리',
  'components.controls.history.undo': '실행 취소',
  'components.controls.history.redo': '다시 실행',

  // Image
  'components.controls.image.image': '이미지',
  'components.controls.image.fileUpload': '파일 업로드',
  'components.controls.image.byURL': '주소',
  'components.controls.image.dropFileText': '클릭하거나 파일을 드롭하여 업로드하세요',

  // Inline
  'components.controls.inline.bold': '굵게',
  'components.controls.inline.italic': '기울임꼴',
  'components.controls.inline.underline': '밑줄',
  'components.controls.inline.strikethrough': '취소선',
  'components.controls.inline.monospace': '고정 너비',
  'components.controls.inline.superscript': '위 첨자',
  'components.controls.inline.subscript': '아래 첨자',

  // Link
  'components.controls.link.linkTitle': '링크 제목',
  'components.controls.link.linkTarget': '링크 타겟',
  'components.controls.link.linkTargetOption': '새창으로 열기',
  'components.controls.link.link': '링크',
  'components.controls.link.unlink': '링크 제거',

  // List
  'components.controls.list.list': '리스트',
  'components.controls.list.unordered': '일반 리스트',
  'components.controls.list.ordered': '순서 리스트',
  'components.controls.list.indent': '들여쓰기',
  'components.controls.list.outdent': '내어쓰기',

  // Remove
  'components.controls.remove.remove': '삭제',

  // TextAlign
  'components.controls.textalign.textalign': '텍스트 정렬',
  'components.controls.textalign.left': '왼쪽',
  'components.controls.textalign.center': '중앙',
  'components.controls.textalign.right': '오른쪽',
  'components.controls.textalign.justify': '양쪽'
};

var it = {

  // Generic
  'generic.add': 'Aggiungi',
  'generic.cancel': 'Annulla',

  // BlockType
  'components.controls.blocktype.h1': 'H1',
  'components.controls.blocktype.h2': 'H2',
  'components.controls.blocktype.h3': 'H3',
  'components.controls.blocktype.h4': 'H4',
  'components.controls.blocktype.h5': 'H5',
  'components.controls.blocktype.h6': 'H6',
  'components.controls.blocktype.blockquote': 'Citazione',
  'components.controls.blocktype.code': 'Codice',
  'components.controls.blocktype.blocktype': 'Stili',
  'components.controls.blocktype.normal': 'Normale',

  // Color Picker
  'components.controls.colorpicker.colorpicker': 'Colore testo',
  'components.controls.colorpicker.text': 'Testo',
  'components.controls.colorpicker.background': 'Evidenziazione',

  // Embedded
  'components.controls.embedded.embedded': 'Incorpora',
  'components.controls.embedded.embeddedlink': 'Incorpora link',
  'components.controls.embedded.enterlink': 'Inserisci link',

  // Emoji
  'components.controls.emoji.emoji': 'Emoji',

  // FontFamily
  'components.controls.fontfamily.fontfamily': 'Carattere',

  // FontSize
  'components.controls.fontsize.fontsize': 'Dimensione carattere',

  // History
  'components.controls.history.history': 'Modifiche',
  'components.controls.history.undo': 'Annulla',
  'components.controls.history.redo': 'Ripristina',

  // Image
  'components.controls.image.image': 'Immagine',
  'components.controls.image.fileUpload': 'Carica immagine',
  'components.controls.image.byURL': 'URL',
  'components.controls.image.dropFileText': 'Trascina il file o clicca per caricare',

  // Inline
  'components.controls.inline.bold': 'Grassetto',
  'components.controls.inline.italic': 'Corsivo',
  'components.controls.inline.underline': 'Sottolineato',
  'components.controls.inline.strikethrough': 'Barrato',
  'components.controls.inline.monospace': 'Monospace',
  'components.controls.inline.superscript': 'Apice',
  'components.controls.inline.subscript': 'Pedice',

  // Link
  'components.controls.link.linkTitle': 'Testo',
  'components.controls.link.linkTarget': 'Link',
  'components.controls.link.linkTargetOption': 'Apri link in una nuova finestra',
  'components.controls.link.link': 'Inserisci link',
  'components.controls.link.unlink': 'Rimuovi link',

  // List
  'components.controls.list.list': 'Lista',
  'components.controls.list.unordered': 'Elenco puntato',
  'components.controls.list.ordered': 'Elenco numerato',
  'components.controls.list.indent': 'Indent',
  'components.controls.list.outdent': 'Outdent',

  // Remove
  'components.controls.remove.remove': 'Rimuovi formattazione',

  // TextAlign
  'components.controls.textalign.textalign': 'Allineamento del testo',
  'components.controls.textalign.left': 'Allinea a sinistra',
  'components.controls.textalign.center': 'Allinea al centro',
  'components.controls.textalign.right': 'Allinea a destra',
  'components.controls.textalign.justify': 'Giustifica'
};

var nl = {

  // Generic
  'generic.add': 'Toevoegen',
  'generic.cancel': 'Annuleren',

  // BlockType
  'components.controls.blocktype.h1': 'H1',
  'components.controls.blocktype.h2': 'H2',
  'components.controls.blocktype.h3': 'H3',
  'components.controls.blocktype.h4': 'H4',
  'components.controls.blocktype.h5': 'H5',
  'components.controls.blocktype.h6': 'H6',
  'components.controls.blocktype.blockquote': 'Blockquote',
  'components.controls.blocktype.code': 'Code',
  'components.controls.blocktype.blocktype': 'Blocktype',
  'components.controls.blocktype.normal': 'Normaal',

  // Color Picker
  'components.controls.colorpicker.colorpicker': 'Kleurkiezer',
  'components.controls.colorpicker.text': 'Tekst',
  'components.controls.colorpicker.background': 'Achtergrond',

  // Embedded
  'components.controls.embedded.embedded': 'Ingevoegd',
  'components.controls.embedded.embeddedlink': 'Ingevoegde link',
  'components.controls.embedded.enterlink': 'Voeg link toe',

  // Emoji
  'components.controls.emoji.emoji': 'Emoji',

  // FontFamily
  'components.controls.fontfamily.fontfamily': 'Lettertype',

  // FontSize
  'components.controls.fontsize.fontsize': 'Lettergrootte',

  // History
  'components.controls.history.history': 'Geschiedenis',
  'components.controls.history.undo': 'Ongedaan maken',
  'components.controls.history.redo': 'Opnieuw',

  // Image
  'components.controls.image.image': 'Afbeelding',
  'components.controls.image.fileUpload': 'Bestand uploaden',
  'components.controls.image.byURL': 'URL',
  'components.controls.image.dropFileText': 'Drop het bestand hier of klik om te uploaden',

  // Inline
  'components.controls.inline.bold': 'Dikgedrukt',
  'components.controls.inline.italic': 'Schuingedrukt',
  'components.controls.inline.underline': 'Onderstrepen',
  'components.controls.inline.strikethrough': 'Doorstrepen',
  'components.controls.inline.monospace': 'Monospace',
  'components.controls.inline.superscript': 'Superscript',
  'components.controls.inline.subscript': 'Subscript',

  // Link
  'components.controls.link.linkTitle': 'Linktitel',
  'components.controls.link.linkTarget': 'Link bestemming',
  'components.controls.link.linkTargetOption': 'Open link in een nieuw venster',
  'components.controls.link.link': 'Link',
  'components.controls.link.unlink': 'Unlink',

  // List
  'components.controls.list.list': 'Lijst',
  'components.controls.list.unordered': 'Ongeordend',
  'components.controls.list.ordered': 'Geordend',
  'components.controls.list.indent': 'Inspringen',
  'components.controls.list.outdent': 'Inspringen verkleinen',

  // Remove
  'components.controls.remove.remove': 'Verwijderen',

  // TextAlign
  'components.controls.textalign.textalign': 'Tekst uitlijnen',
  'components.controls.textalign.left': 'Links',
  'components.controls.textalign.center': 'Gecentreerd',
  'components.controls.textalign.right': 'Rechts',
  'components.controls.textalign.justify': 'Uitgelijnd'
};

var de = {

  // Generic
  'generic.add': 'Hinzufügen',
  'generic.cancel': 'Abbrechen',

  // BlockType
  'components.controls.blocktype.h1': 'Überschrift 1',
  'components.controls.blocktype.h2': 'Überschrift 2',
  'components.controls.blocktype.h3': 'Überschrift 3',
  'components.controls.blocktype.h4': 'Überschrift 4',
  'components.controls.blocktype.h5': 'Überschrift 5',
  'components.controls.blocktype.h6': 'Überschrift 6',
  'components.controls.blocktype.blockquote': 'Zitat',
  'components.controls.blocktype.code': 'Quellcode',
  'components.controls.blocktype.blocktype': 'Blocktyp',
  'components.controls.blocktype.normal': 'Normal',

  // Color Picker
  'components.controls.colorpicker.colorpicker': 'Farbauswahl',
  'components.controls.colorpicker.text': 'Text',
  'components.controls.colorpicker.background': 'Hintergrund',

  // Embedded
  'components.controls.embedded.embedded': 'Eingebettet',
  'components.controls.embedded.embeddedlink': 'Eingebetteter Link',
  'components.controls.embedded.enterlink': 'Link eingeben',

  // Emoji
  'components.controls.emoji.emoji': 'Emoji',

  // FontFamily
  'components.controls.fontfamily.fontfamily': 'Schriftart',

  // FontSize
  'components.controls.fontsize.fontsize': 'Schriftgröße',

  // History
  'components.controls.history.history': 'Historie',
  'components.controls.history.undo': 'Zurücknehmen',
  'components.controls.history.redo': 'Wiederholen',

  // Image
  'components.controls.image.image': 'Bild',
  'components.controls.image.fileUpload': 'Datei-Upload',
  'components.controls.image.byURL': 'URL',
  'components.controls.image.dropFileText': 'Dateien ziehen und ablegen, oder klicken zum Hochladen',

  // Inline
  'components.controls.inline.bold': 'Fett',
  'components.controls.inline.italic': 'Kursiv',
  'components.controls.inline.underline': 'Unterstreichen',
  'components.controls.inline.strikethrough': 'Durchstreichen',
  'components.controls.inline.monospace': 'Monospace',
  'components.controls.inline.superscript': 'Hochgestellt',
  'components.controls.inline.subscript': 'Tiefgestellt',

  // Link
  'components.controls.link.linkTitle': 'Link-Titel',
  'components.controls.link.linkTarget': 'Link-Ziel',
  'components.controls.link.linkTargetOption': 'Link in neuem Fenster öffnen',
  'components.controls.link.link': 'Link',
  'components.controls.link.unlink': 'Aufheben',

  // List
  'components.controls.list.list': 'Liste',
  'components.controls.list.unordered': 'Aufzählung',
  'components.controls.list.ordered': 'Nummerierte Liste',
  'components.controls.list.indent': 'Einzug vergrößern',
  'components.controls.list.outdent': 'Einzug reduzieren',

  // Remove
  'components.controls.remove.remove': 'Entfernen',

  // TextAlign
  'components.controls.textalign.textalign': 'Textausrichtung',
  'components.controls.textalign.left': 'Linksbündig',
  'components.controls.textalign.center': 'Zentrieren',
  'components.controls.textalign.right': 'Rechtsbündig',
  'components.controls.textalign.justify': 'Blocksatz'
};

var da = {

  // Generic
  'generic.add': 'Tilføj',
  'generic.cancel': 'Annuller',

  // BlockType
  'components.controls.blocktype.h1': 'Overskrift 1',
  'components.controls.blocktype.h2': 'Overskrift 2',
  'components.controls.blocktype.h3': 'Overskrift 3',
  'components.controls.blocktype.h4': 'Overskrift 4',
  'components.controls.blocktype.h5': 'Overskrift 5',
  'components.controls.blocktype.h6': 'Overskrift 6',
  'components.controls.blocktype.blockquote': 'Blokcitat',
  'components.controls.blocktype.code': 'Kode',
  'components.controls.blocktype.blocktype': 'Blok Type',
  'components.controls.blocktype.normal': 'Normal',

  // Color Picker
  'components.controls.colorpicker.colorpicker': 'Farver',
  'components.controls.colorpicker.text': 'Tekst',
  'components.controls.colorpicker.background': 'Baggrund',

  // Embedded
  'components.controls.embedded.embedded': 'Indlejre',
  'components.controls.embedded.embeddedlink': 'Indlejre Link',
  'components.controls.embedded.enterlink': 'Indtast link',

  // Emoji
  'components.controls.emoji.emoji': 'Emoji',

  // FontFamily
  'components.controls.fontfamily.fontfamily': 'Fonttype',

  // FontSize
  'components.controls.fontsize.fontsize': 'Fontstørrelser',

  // History
  'components.controls.history.history': 'Historie',
  'components.controls.history.undo': 'Fortryd',
  'components.controls.history.redo': 'Gendan',

  // Image
  'components.controls.image.image': 'Billede',
  'components.controls.image.fileUpload': 'Filoverførsel',
  'components.controls.image.byURL': 'URL',
  'components.controls.image.dropFileText': 'Drop filen eller klik for at uploade',

  // Inline
  'components.controls.inline.bold': 'Fed',
  'components.controls.inline.italic': 'Kursiv',
  'components.controls.inline.underline': 'Understrege',
  'components.controls.inline.strikethrough': 'Gennemstreget',
  'components.controls.inline.monospace': 'Monospace',
  'components.controls.inline.superscript': 'Hævet',
  'components.controls.inline.subscript': 'Sænket',

  // Link
  'components.controls.link.linkTitle': 'Link Titel',
  'components.controls.link.linkTarget': 'Link Mål',
  'components.controls.link.linkTargetOption': 'Åbn link i nyt vindue',
  'components.controls.link.link': 'Link',
  'components.controls.link.unlink': 'Fjern link',

  // List
  'components.controls.list.list': 'Liste',
  'components.controls.list.unordered': 'Uordnet',
  'components.controls.list.ordered': 'Ordnet',
  'components.controls.list.indent': 'Indrykning',
  'components.controls.list.outdent': 'Udrykning',

  // Remove
  'components.controls.remove.remove': 'Fjern',

  // TextAlign
  'components.controls.textalign.textalign': 'Tekstjustering',
  'components.controls.textalign.left': 'Venstre',
  'components.controls.textalign.center': 'Center',
  'components.controls.textalign.right': 'Højre',
  'components.controls.textalign.justify': 'Margener'
};

var zh_tw = {

    // Generic
    'generic.add': '新增',
    'generic.cancel': '取消',

    // BlockType
    'components.controls.blocktype.h1': '標題1',
    'components.controls.blocktype.h2': '標題2',
    'components.controls.blocktype.h3': '標題3',
    'components.controls.blocktype.h4': '標題4',
    'components.controls.blocktype.h5': '標題5',
    'components.controls.blocktype.h6': '標題6',
    'components.controls.blocktype.blockquote': '引用',
    'components.controls.blocktype.code': '程式碼',
    'components.controls.blocktype.blocktype': '樣式',
    'components.controls.blocktype.normal': '正文',

    // Color Picker
    'components.controls.colorpicker.colorpicker': '選色器',
    'components.controls.colorpicker.text': '文字',
    'components.controls.colorpicker.background': '背景',

    // Embedded
    'components.controls.embedded.embedded': '內嵌',
    'components.controls.embedded.embeddedlink': '內嵌網頁',
    'components.controls.embedded.enterlink': '輸入網頁地址',

    // Emoji
    'components.controls.emoji.emoji': '表情符號',

    // FontFamily
    'components.controls.fontfamily.fontfamily': '字體',

    // FontSize
    'components.controls.fontsize.fontsize': '字體大小',

    // History
    'components.controls.history.history': '歷史紀錄',
    'components.controls.history.undo': '復原',
    'components.controls.history.redo': '重做',

    // Image
    'components.controls.image.image': '圖片',
    'components.controls.image.fileUpload': '檔案上傳',
    'components.controls.image.byURL': '網址',
    'components.controls.image.dropFileText': '點擊或拖曳檔案上傳',

    // Inline
    'components.controls.inline.bold': '粗體',
    'components.controls.inline.italic': '斜體',
    'components.controls.inline.underline': '底線',
    'components.controls.inline.strikethrough': '刪除線',
    'components.controls.inline.monospace': '等寬字體',
    'components.controls.inline.superscript': '上標',
    'components.controls.inline.subscript': '下標',

    // Link
    'components.controls.link.linkTitle': '超連結',
    'components.controls.link.linkTarget': '輸入連結位址',
    'components.controls.link.linkTargetOption': '在新視窗打開連結',
    'components.controls.link.link': '連結',
    'components.controls.link.unlink': '刪除連結',

    // List
    'components.controls.list.list': '列表',
    'components.controls.list.unordered': '項目符號',
    'components.controls.list.ordered': '編號',
    'components.controls.list.indent': '增加縮排',
    'components.controls.list.outdent': '減少縮排',

    // Remove
    'components.controls.remove.remove': '清除格式',

    // TextAlign
    'components.controls.textalign.textalign': '文字對齊',
    'components.controls.textalign.left': '文字向左對齊',
    'components.controls.textalign.center': '文字置中',
    'components.controls.textalign.right': '文字向右對齊',
    'components.controls.textalign.justify': '兩端對齊'
};

var pl = {

  // Generic
  'generic.add': 'Dodaj',
  'generic.cancel': 'Anuluj',

  // BlockType
  'components.controls.blocktype.h1': 'Nagłówek 1',
  'components.controls.blocktype.h2': 'Nagłówek 2',
  'components.controls.blocktype.h3': 'Nagłówek 3',
  'components.controls.blocktype.h4': 'Nagłówek 4',
  'components.controls.blocktype.h5': 'Nagłówek 5',
  'components.controls.blocktype.h6': 'Nagłówek 6',
  'components.controls.blocktype.blockquote': 'Cytat',
  'components.controls.blocktype.code': 'Kod',
  'components.controls.blocktype.blocktype': 'Format',
  'components.controls.blocktype.normal': 'Normalny',

  // Color Picker
  'components.controls.colorpicker.colorpicker': 'Kolor',
  'components.controls.colorpicker.text': 'Tekst',
  'components.controls.colorpicker.background': 'Tło',

  // Embedded
  'components.controls.embedded.embedded': 'Osadź',
  'components.controls.embedded.embeddedlink': 'Osadź odnośnik',
  'components.controls.embedded.enterlink': 'Wprowadź odnośnik',

  // Emoji
  'components.controls.emoji.emoji': 'Emoji',

  // FontFamily
  'components.controls.fontfamily.fontfamily': 'Krój czcionki',

  // FontSize
  'components.controls.fontsize.fontsize': 'Rozmiar czcionki',

  // History
  'components.controls.history.history': 'Historia',
  'components.controls.history.undo': 'Cofnij',
  'components.controls.history.redo': 'Ponów',

  // Image
  'components.controls.image.image': 'Obrazek',
  'components.controls.image.fileUpload': 'Prześlij plik',
  'components.controls.image.byURL': 'URL',
  'components.controls.image.dropFileText': 'Upuść plik lub kliknij, aby przesłać',

  // Inline
  'components.controls.inline.bold': 'Pogrubienie',
  'components.controls.inline.italic': 'Kursywa',
  'components.controls.inline.underline': 'Podkreślenie',
  'components.controls.inline.strikethrough': 'Przekreślenie',
  'components.controls.inline.monospace': 'Monospace',
  'components.controls.inline.superscript': 'Indeks górny',
  'components.controls.inline.subscript': 'Indeks dolny',

  // Link
  'components.controls.link.linkTitle': 'Tytuł odnośnika',
  'components.controls.link.linkTarget': 'Adres odnośnika',
  'components.controls.link.linkTargetOption': 'Otwórz odnośnik w nowej karcie',
  'components.controls.link.link': 'Wstaw odnośnik',
  'components.controls.link.unlink': 'Usuń odnośnik',

  // List
  'components.controls.list.list': 'Lista',
  'components.controls.list.unordered': 'Lista nieuporządkowana',
  'components.controls.list.ordered': 'Lista uporządkowana',
  'components.controls.list.indent': 'Zwiększ wcięcie',
  'components.controls.list.outdent': 'Zmniejsz wcięcie',

  // Remove
  'components.controls.remove.remove': 'Usuń',

  // TextAlign
  'components.controls.textalign.textalign': 'Wyrównaj tekst',
  'components.controls.textalign.left': 'Do lewej',
  'components.controls.textalign.center': 'Do środka',
  'components.controls.textalign.right': 'Do prawej',
  'components.controls.textalign.justify': 'Wyjustuj'
};

var es = {

  // Generic
  'generic.add': 'Añadir',
  'generic.cancel': 'Cancelar',

  // BlockType
  'components.controls.blocktype.h1': 'H1',
  'components.controls.blocktype.h2': 'H2',
  'components.controls.blocktype.h3': 'H3',
  'components.controls.blocktype.h4': 'H4',
  'components.controls.blocktype.h5': 'H5',
  'components.controls.blocktype.h6': 'H6',
  'components.controls.blocktype.blockquote': 'Blockquote',
  'components.controls.blocktype.code': 'Código',
  'components.controls.blocktype.blocktype': 'Tipo de bloque',
  'components.controls.blocktype.normal': 'Normal',

  // Color Picker
  'components.controls.colorpicker.colorpicker': 'Seleccionar color',
  'components.controls.colorpicker.text': 'Texto',
  'components.controls.colorpicker.background': 'Subrayado',

  // Embedded
  'components.controls.embedded.embedded': 'Adjuntar',
  'components.controls.embedded.embeddedlink': 'Adjuntar Link',
  'components.controls.embedded.enterlink': 'Introducir link',

  // Emoji
  'components.controls.emoji.emoji': 'Emoji',

  // FontFamily
  'components.controls.fontfamily.fontfamily': 'Fuente',

  // FontSize
  'components.controls.fontsize.fontsize': 'Tamaño de fuente',

  // History
  'components.controls.history.history': 'Histórico',
  'components.controls.history.undo': 'Deshacer',
  'components.controls.history.redo': 'Rehacer',

  // Image
  'components.controls.image.image': 'Imagen',
  'components.controls.image.fileUpload': 'Subir archivo',
  'components.controls.image.byURL': 'URL',
  'components.controls.image.dropFileText': 'Arrastra el archivo o haz click para subirlo',

  // Inline
  'components.controls.inline.bold': 'Negrita',
  'components.controls.inline.italic': 'Cursiva',
  'components.controls.inline.underline': 'Subrayado',
  'components.controls.inline.strikethrough': 'Tachado',
  'components.controls.inline.monospace': 'Monospace',
  'components.controls.inline.superscript': 'Sobreíndice',
  'components.controls.inline.subscript': 'Subíndice',

  // Link
  'components.controls.link.linkTitle': 'Título del enlace',
  'components.controls.link.linkTarget': 'Objetivo del enlace',
  'components.controls.link.linkTargetOption': 'Abrir en nueva ventana',
  'components.controls.link.link': 'Enlazar',
  'components.controls.link.unlink': 'Desenlazar',

  // List
  'components.controls.list.list': 'Lista',
  'components.controls.list.unordered': 'Desordenada',
  'components.controls.list.ordered': 'Ordenada',
  'components.controls.list.indent': 'Indentada',
  'components.controls.list.outdent': 'Dentada',

  // Remove
  'components.controls.remove.remove': 'Eliminar',

  // TextAlign
  'components.controls.textalign.textalign': 'Alineación del texto',
  'components.controls.textalign.left': 'Izquierda',
  'components.controls.textalign.center': 'Centrado',
  'components.controls.textalign.right': 'Derecha',
  'components.controls.textalign.justify': 'Justificado'
};

var ja = {

  // Generic
  'generic.add': '追加',
  'generic.cancel': 'キャンセル',

  // BlockType
  'components.controls.blocktype.h1': '見出し1',
  'components.controls.blocktype.h2': '見出し2',
  'components.controls.blocktype.h3': '見出し3',
  'components.controls.blocktype.h4': '見出し4',
  'components.controls.blocktype.h5': '見出し5',
  'components.controls.blocktype.h6': '見出し6',
  'components.controls.blocktype.blockquote': '引用',
  'components.controls.blocktype.code': 'コード',
  'components.controls.blocktype.blocktype': 'スタイル',
  'components.controls.blocktype.normal': '標準テキスト',

  // Color Picker
  'components.controls.colorpicker.colorpicker': 'テキストの色',
  'components.controls.colorpicker.text': 'テキスト',
  'components.controls.colorpicker.background': 'ハイライト',

  // Embedded
  'components.controls.embedded.embedded': '埋め込み',
  'components.controls.embedded.embeddedlink': '埋め込みリンク',
  'components.controls.embedded.enterlink': 'リンクを入力してください',

  // Emoji
  'components.controls.emoji.emoji': '絵文字',

  // FontFamily
  'components.controls.fontfamily.fontfamily': 'フォント',

  // FontSize
  'components.controls.fontsize.fontsize': 'フォントサイズ',

  // History
  'components.controls.history.history': '履歴',
  'components.controls.history.undo': '元に戻す',
  'components.controls.history.redo': 'やり直し',

  // Image
  'components.controls.image.image': '画像',
  'components.controls.image.fileUpload': 'ファイルをアップロード',
  'components.controls.image.byURL': 'URL',
  'components.controls.image.dropFileText': 'ここに画像をドラッグするか、クリックしてください',

  // Inline
  'components.controls.inline.bold': '太字',
  'components.controls.inline.italic': '斜体',
  'components.controls.inline.underline': '下線',
  'components.controls.inline.strikethrough': '取り消し線',
  'components.controls.inline.monospace': '等幅フォント',
  'components.controls.inline.superscript': '上付き文字',
  'components.controls.inline.subscript': '下付き文字',

  // Link
  'components.controls.link.linkTitle': 'リンクタイトル',
  'components.controls.link.linkTarget': 'リンク対象',
  'components.controls.link.linkTargetOption': '新しいウィンドウで開く',
  'components.controls.link.link': 'リンク',
  'components.controls.link.unlink': 'リンクを解除',

  // List
  'components.controls.list.list': 'リスト',
  'components.controls.list.unordered': '箇条書き',
  'components.controls.list.ordered': '番号付き',
  'components.controls.list.indent': 'インデント増',
  'components.controls.list.outdent': 'インデント減',

  // Remove
  'components.controls.remove.remove': '書式をクリア',

  // TextAlign
  'components.controls.textalign.textalign': '整列',
  'components.controls.textalign.left': '左揃え',
  'components.controls.textalign.center': '中央揃え',
  'components.controls.textalign.right': '右揃え',
  'components.controls.textalign.justify': '両端揃え'
};

var exports$6 = {
  en: en,
  fr: fr,
  zh: zh,
  ru: ru,
  pt: pt,
  ko: ko,
  it: it,
  nl: nl,
  de: de,
  da: da,
  zh_tw: zh_tw,
  pl: pl,
  es: es,
  ja: ja
};

module.exports = exports$6;

var css$m = ".styles_rdw-editor-main__38CMd {\n  height: 100%;\n  overflow: auto;\n  box-sizing: border-box;\n}\n.styles_rdw-editor-toolbar__2kYhf {\n  padding: 6px 5px 0;\n  border-radius: 2px;\n  border: 1px solid #F1F1F1;\n  display: flex;\n  justify-content: flex-start;\n  background: white;\n  flex-wrap: wrap;\n  font-size: 15px;\n  margin-bottom: 5px;\n  user-select: none;\n}\n.styles_public-DraftStyleDefault-block__1XRmq {\n  margin: 1em 0;\n}\n.styles_rdw-editor-wrapper__eSweN:focus {\n  outline: none;\n}\n.styles_rdw-editor-wrapper__eSweN {\n  box-sizing: content-box;\n}\n.styles_rdw-editor-main__38CMd blockquote {\n  border-left: 5px solid #f1f1f1;\n  padding-left: 5px;\n}\n.styles_rdw-editor-main__38CMd pre {\n  background: #f1f1f1;\n  border-radius: 3px;\n  padding: 1px 10px;\n}";
styleInject(css$m);

var css$n = "/**\n * Draft v0.9.1\n *\n * Copyright (c) 2013-present, Facebook, Inc.\n * All rights reserved.\n *\n * This source code is licensed under the BSD-style license found in the\n * LICENSE file in the root directory of this source tree. An additional grant\n * of patent rights can be found in the PATENTS file in the same directory.\n */\n.Draft_DraftEditor-editorContainer__hKFaU,.Draft_DraftEditor-root__1WYTw,.Draft_public-DraftEditor-content__VXUWm{height:inherit;text-align:initial}.Draft_public-DraftEditor-content__VXUWm[contenteditable=true]{-webkit-user-modify:read-write-plaintext-only}.Draft_DraftEditor-root__1WYTw{position:relative}.Draft_DraftEditor-editorContainer__hKFaU{background-color:rgba(255,255,255,0);border-left:.1px solid transparent;position:relative;z-index:1}.Draft_public-DraftEditor-block__2cafY{position:relative}.Draft_DraftEditor-alignLeft__3lNbs .Draft_public-DraftStyleDefault-block__3Lu8-{text-align:left}.Draft_DraftEditor-alignLeft__3lNbs .Draft_public-DraftEditorPlaceholder-root__36nUp{left:0;text-align:left}.Draft_DraftEditor-alignCenter__1hvvX .Draft_public-DraftStyleDefault-block__3Lu8-{text-align:center}.Draft_DraftEditor-alignCenter__1hvvX .Draft_public-DraftEditorPlaceholder-root__36nUp{margin:0 auto;text-align:center;width:100%}.Draft_DraftEditor-alignRight__1151X .Draft_public-DraftStyleDefault-block__3Lu8-{text-align:right}.Draft_DraftEditor-alignRight__1151X .Draft_public-DraftEditorPlaceholder-root__36nUp{right:0;text-align:right}.Draft_public-DraftEditorPlaceholder-root__36nUp{color:#9197a3;position:absolute;z-index:0}.Draft_public-DraftEditorPlaceholder-hasFocus__3Qh7K{color:#bdc1c9}.Draft_DraftEditorPlaceholder-hidden__3DJc8{display:none}.Draft_public-DraftStyleDefault-block__3Lu8-{position:relative;white-space:pre-wrap}.Draft_public-DraftStyleDefault-ltr__2W1_3{direction:ltr;text-align:left}.Draft_public-DraftStyleDefault-rtl__1tJFw{direction:rtl;text-align:right}.Draft_public-DraftStyleDefault-listLTR__rDjox{direction:ltr}.Draft_public-DraftStyleDefault-listRTL__gxCuZ{direction:rtl}.Draft_public-DraftStyleDefault-ol__3K1jn,.Draft_public-DraftStyleDefault-ul__2cCb1{margin:16px 0;padding:0}.Draft_public-DraftStyleDefault-depth0__3Uz6x.Draft_public-DraftStyleDefault-listLTR__rDjox{margin-left:1.5em}.Draft_public-DraftStyleDefault-depth0__3Uz6x.Draft_public-DraftStyleDefault-listRTL__gxCuZ{margin-right:1.5em}.Draft_public-DraftStyleDefault-depth1__MF_WX.Draft_public-DraftStyleDefault-listLTR__rDjox{margin-left:3em}.Draft_public-DraftStyleDefault-depth1__MF_WX.Draft_public-DraftStyleDefault-listRTL__gxCuZ{margin-right:3em}.Draft_public-DraftStyleDefault-depth2__1U5jR.Draft_public-DraftStyleDefault-listLTR__rDjox{margin-left:4.5em}.Draft_public-DraftStyleDefault-depth2__1U5jR.Draft_public-DraftStyleDefault-listRTL__gxCuZ{margin-right:4.5em}.Draft_public-DraftStyleDefault-depth3__1VV0y.Draft_public-DraftStyleDefault-listLTR__rDjox{margin-left:6em}.Draft_public-DraftStyleDefault-depth3__1VV0y.Draft_public-DraftStyleDefault-listRTL__gxCuZ{margin-right:6em}.Draft_public-DraftStyleDefault-depth4__3V6pq.Draft_public-DraftStyleDefault-listLTR__rDjox{margin-left:7.5em}.Draft_public-DraftStyleDefault-depth4__3V6pq.Draft_public-DraftStyleDefault-listRTL__gxCuZ{margin-right:7.5em}.Draft_public-DraftStyleDefault-unorderedListItem__2Ljzs{list-style-type:square;position:relative}.Draft_public-DraftStyleDefault-unorderedListItem__2Ljzs.Draft_public-DraftStyleDefault-depth0__3Uz6x{list-style-type:disc}.Draft_public-DraftStyleDefault-unorderedListItem__2Ljzs.Draft_public-DraftStyleDefault-depth1__MF_WX{list-style-type:circle}.Draft_public-DraftStyleDefault-orderedListItem__qqqcC{list-style-type:none;position:relative}.Draft_public-DraftStyleDefault-orderedListItem__qqqcC.Draft_public-DraftStyleDefault-listLTR__rDjox:before{left:-36px;position:absolute;text-align:right;width:30px}.Draft_public-DraftStyleDefault-orderedListItem__qqqcC.Draft_public-DraftStyleDefault-listRTL__gxCuZ:before{position:absolute;right:-36px;text-align:left;width:30px}.Draft_public-DraftStyleDefault-orderedListItem__qqqcC:before{content:counter(ol0) \". \";counter-increment:ol0}.Draft_public-DraftStyleDefault-orderedListItem__qqqcC.Draft_public-DraftStyleDefault-depth1__MF_WX:before{content:counter(ol1) \". \";counter-increment:ol1}.Draft_public-DraftStyleDefault-orderedListItem__qqqcC.Draft_public-DraftStyleDefault-depth2__1U5jR:before{content:counter(ol2) \". \";counter-increment:ol2}.Draft_public-DraftStyleDefault-orderedListItem__qqqcC.Draft_public-DraftStyleDefault-depth3__1VV0y:before{content:counter(ol3) \". \";counter-increment:ol3}.Draft_public-DraftStyleDefault-orderedListItem__qqqcC.Draft_public-DraftStyleDefault-depth4__3V6pq:before{content:counter(ol4) \". \";counter-increment:ol4}.Draft_public-DraftStyleDefault-depth0__3Uz6x.Draft_public-DraftStyleDefault-reset__2KxZW{counter-reset:ol0}.Draft_public-DraftStyleDefault-depth1__MF_WX.Draft_public-DraftStyleDefault-reset__2KxZW{counter-reset:ol1}.Draft_public-DraftStyleDefault-depth2__1U5jR.Draft_public-DraftStyleDefault-reset__2KxZW{counter-reset:ol2}.Draft_public-DraftStyleDefault-depth3__1VV0y.Draft_public-DraftStyleDefault-reset__2KxZW{counter-reset:ol3}.Draft_public-DraftStyleDefault-depth4__3V6pq.Draft_public-DraftStyleDefault-reset__2KxZW{counter-reset:ol4}\n";
styleInject(css$n);

var WysiwygEditor = function (_Component) {
  inherits(WysiwygEditor, _Component);

  function WysiwygEditor(props) {
    classCallCheck(this, WysiwygEditor);

    var _this = possibleConstructorReturn(this, (WysiwygEditor.__proto__ || Object.getPrototypeOf(WysiwygEditor)).call(this, props));

    _initialiseProps$2.call(_this);

    var toolbar = mergeRecursive(defaultToolbar, props.toolbar);
    _this.state = {
      editorState: undefined,
      editorFocused: false,
      toolbar: toolbar
    };
    var wrapperId = props.wrapperId ? props.wrapperId : Math.floor(Math.random() * 10000);
    _this.wrapperId = "rdw-wrapper-" + wrapperId;
    _this.modalHandler = new ModalHandler();
    _this.focusHandler = new FocusHandler();
    _this.blockRendererFn = getBlockRenderFunc({
      isReadOnly: _this.isReadOnly,
      isImageAlignmentEnabled: _this.isImageAlignmentEnabled,
      getEditorState: _this.getEditorState,
      onChange: _this.onChange
    }, props.customBlockRenderFunc);
    _this.editorProps = _this.filterEditorProps(props);
    _this.customStyleMap = draftjsUtils_4();
    return _this;
  }

  createClass(WysiwygEditor, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.compositeDecorator = this.getCompositeDecorator();
      var editorState = this.createEditorState(this.compositeDecorator);
      draftjsUtils_5(editorState);
      this.setState({
        editorState: editorState
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.modalHandler.init(this.wrapperId);
    }
    // todo: change decorators depending on properties recceived in componentWillReceiveProps.

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var newState = {};
      if (this.props.toolbar !== props.toolbar) {
        var toolbar = mergeRecursive(defaultToolbar, props.toolbar);
        newState.toolbar = toolbar;
      }
      if (hasProperty(props, "editorState") && this.props.editorState !== props.editorState) {
        if (props.editorState) {
          newState.editorState = require$$1.EditorState.set(props.editorState, {
            decorator: this.compositeDecorator
          });
        } else {
          newState.editorState = require$$1.EditorState.createEmpty(this.compositeDecorator);
        }
      } else if (hasProperty(props, "contentState") && this.props.contentState !== props.contentState) {
        if (props.contentState) {
          var newEditorState = this.changeEditorState(props.contentState);
          if (newEditorState) {
            newState.editorState = newEditorState;
          }
        } else {
          newState.editorState = require$$1.EditorState.createEmpty(this.compositeDecorator);
        }
      }
      if (props.editorState !== this.props.editorState || props.contentState !== this.props.contentState) {
        draftjsUtils_5(newState.editorState);
      }
      this.setState(newState);
      this.editorProps = this.filterEditorProps(props);
      this.customStyleMap = draftjsUtils_4();
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          editorState = _state.editorState,
          editorFocused = _state.editorFocused,
          toolbar = _state.toolbar;
      var _props = this.props,
          locale = _props.locale,
          _props$localization = _props.localization,
          newLocale = _props$localization.locale,
          translations = _props$localization.translations,
          toolbarCustomButtons = _props.toolbarCustomButtons,
          toolbarOnFocus = _props.toolbarOnFocus,
          toolbarClassName = _props.toolbarClassName,
          toolbarHidden = _props.toolbarHidden,
          editorClassName = _props.editorClassName,
          wrapperClassName = _props.wrapperClassName,
          toolbarStyle = _props.toolbarStyle,
          editorStyle = _props.editorStyle,
          wrapperStyle = _props.wrapperStyle,
          uploadCallback = _props.uploadCallback,
          ariaLabel = _props.ariaLabel;


      var controlProps = {
        modalHandler: this.modalHandler,
        editorState: editorState,
        onChange: this.onChange,
        translations: _extends({}, exports$6[locale || newLocale], translations)
      };
      var toolbarShow = editorFocused || this.focusHandler.isInputFocused() || !toolbarOnFocus;
      return React__default.createElement(
        "div",
        {
          id: this.wrapperId,
          className: classnames(wrapperClassName, "rdw-editor-wrapper"),
          style: wrapperStyle,
          onClick: this.modalHandler.onEditorClick,
          onBlur: this.onWrapperBlur,
          "aria-label": "rdw-wrapper"
        },
        !toolbarHidden && React__default.createElement(
          "div",
          {
            className: classnames("rdw-editor-toolbar", toolbarClassName),
            style: _extends({
              visibility: toolbarShow ? "visible" : "hidden"
            }, toolbarStyle),
            onMouseDown: this.preventDefault,
            "aria-label": "rdw-toolbar",
            "aria-hidden": (!editorFocused && toolbarOnFocus).toString(),
            onFocus: this.onToolbarFocus
          },
          toolbar.options.map(function (opt, index) {
            var Control = exports$3[opt];
            var config = toolbar[opt];
            if (opt === "image" && uploadCallback) {
              config.uploadCallback = uploadCallback;
            }
            return React__default.createElement(Control, _extends({ key: index }, controlProps, { config: config }));
          }),
          toolbarCustomButtons && toolbarCustomButtons.map(function (button, index) {
            return React__default.cloneElement(button, _extends({ key: index }, controlProps));
          })
        ),
        React__default.createElement(
          "div",
          {
            ref: this.setWrapperReference,
            className: classnames(editorClassName, "rdw-editor-main"),
            style: editorStyle,
            onClick: this.focusEditor,
            onFocus: this.onEditorFocus,
            onBlur: this.onEditorBlur,
            onKeyDown: KeyDownHandler.onKeyDown,
            onMouseDown: this.onEditorMouseDown
          },
          React__default.createElement(require$$1.Editor, _extends({
            ref: this.setEditorReference,
            onTab: this.onTab,
            onUpArrow: this.onUpDownArrow,
            onDownArrow: this.onUpDownArrow,
            editorState: editorState,
            onChange: this.onChange,
            blockStyleFn: blockStyleFn,
            customStyleMap: draftjsUtils_4(),
            handleReturn: this.handleReturn,
            handlePastedText: this.handlePastedText,
            blockRendererFn: this.blockRendererFn,
            handleKeyCommand: this.handleKeyCommand,
            ariaLabel: ariaLabel || "rdw-editor",
            blockRenderMap: draftjsUtils_3
          }, this.editorProps))
        )
      );
    }
  }]);
  return WysiwygEditor;
}(React.Component);
// todo: evaluate draftjs-utils to move some methods here
// todo: move color near font-family


WysiwygEditor.propTypes = {
  onChange: propTypes.func,
  onEditorStateChange: propTypes.func,
  onContentStateChange: propTypes.func,
  // initialContentState is deprecated
  initialContentState: propTypes.object,
  defaultContentState: propTypes.object,
  contentState: propTypes.object,
  editorState: propTypes.object,
  defaultEditorState: propTypes.object,
  toolbarOnFocus: propTypes.bool,
  spellCheck: propTypes.bool, // eslint-disable-line react/no-unused-prop-types
  stripPastedStyles: propTypes.bool, // eslint-disable-line react/no-unused-prop-types
  toolbar: propTypes.object,
  toolbarCustomButtons: propTypes.array,
  toolbarClassName: propTypes.string,
  toolbarHidden: propTypes.bool,
  locale: propTypes.string,
  localization: propTypes.object,
  editorClassName: propTypes.string,
  wrapperClassName: propTypes.string,
  toolbarStyle: propTypes.object,
  editorStyle: propTypes.object,
  wrapperStyle: propTypes.object,
  uploadCallback: propTypes.func,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  onTab: propTypes.func,
  mention: propTypes.object,
  hashtag: propTypes.object,
  textAlignment: propTypes.string, // eslint-disable-line react/no-unused-prop-types
  readOnly: propTypes.bool,
  tabIndex: propTypes.number, // eslint-disable-line react/no-unused-prop-types
  placeholder: propTypes.string, // eslint-disable-line react/no-unused-prop-types
  ariaLabel: propTypes.string,
  ariaOwneeID: propTypes.string, // eslint-disable-line react/no-unused-prop-types
  ariaActiveDescendantID: propTypes.string, // eslint-disable-line react/no-unused-prop-types
  ariaAutoComplete: propTypes.string, // eslint-disable-line react/no-unused-prop-types
  ariaDescribedBy: propTypes.string, // eslint-disable-line react/no-unused-prop-types
  ariaExpanded: propTypes.string, // eslint-disable-line react/no-unused-prop-types
  ariaHasPopup: propTypes.string, // eslint-disable-line react/no-unused-prop-types
  customBlockRenderFunc: propTypes.func,
  wrapperId: propTypes.number,
  customDecorators: propTypes.array,
  editorRef: propTypes.func
};
WysiwygEditor.defaultProps = {
  toolbarOnFocus: false,
  toolbarHidden: false,
  stripPastedStyles: false,
  localization: { locale: "en", translations: {} },
  customDecorators: []
};

var _initialiseProps$2 = function _initialiseProps() {
  var _this2 = this;

  this.onEditorBlur = function () {
    _this2.setState({
      editorFocused: false
    });
  };

  this.onEditorFocus = function (event) {
    var onFocus = _this2.props.onFocus;

    _this2.setState({
      editorFocused: true
    });
    var editFocused = _this2.focusHandler.isEditorFocused();
    if (onFocus && editFocused) {
      onFocus(event);
    }
  };

  this.onEditorMouseDown = function () {
    _this2.focusHandler.onEditorMouseDown();
  };

  this.onTab = function (event) {
    var onTab = _this2.props.onTab;

    if (!onTab || !onTab(event)) {
      var editorState = draftjsUtils_1(_this2.state.editorState, event.shiftKey ? -1 : 1, 4);
      if (editorState && editorState !== _this2.state.editorState) {
        _this2.onChange(editorState);
        event.preventDefault();
      }
    }
  };

  this.onUpDownArrow = function (event) {
    if (SuggestionHandler.isOpen()) {
      event.preventDefault();
    }
  };

  this.onToolbarFocus = function (event) {
    var onFocus = _this2.props.onFocus;

    if (onFocus && _this2.focusHandler.isToolbarFocused()) {
      onFocus(event);
    }
  };

  this.onWrapperBlur = function (event) {
    var onBlur = _this2.props.onBlur;

    if (onBlur && _this2.focusHandler.isEditorBlur(event)) {
      onBlur(event, _this2.getEditorState());
    }
  };

  this.onChange = function (editorState) {
    var _props2 = _this2.props,
        readOnly = _props2.readOnly,
        onEditorStateChange = _props2.onEditorStateChange;

    if (!readOnly && !(draftjsUtils_7(editorState) === "atomic" && editorState.getSelection().isCollapsed)) {
      if (onEditorStateChange) {
        onEditorStateChange(editorState, _this2.props.wrapperId);
      }
      if (!hasProperty(_this2.props, "editorState")) {
        _this2.setState({ editorState: editorState }, _this2.afterChange(editorState));
      } else {
        _this2.afterChange(editorState);
      }
    }
  };

  this.setWrapperReference = function (ref) {
    _this2.wrapper = ref;
  };

  this.setEditorReference = function (ref) {
    if (_this2.props.editorRef) {
      _this2.props.editorRef(ref);
    }
    _this2.editor = ref;
  };

  this.getCompositeDecorator = function () {
    var decorators = [].concat(toConsumableArray(_this2.props.customDecorators), [getLinkDecorator({
      showOpenOptionOnHover: _this2.state.toolbar.link.showOpenOptionOnHover
    })]);
    if (_this2.props.mention) {
      decorators.push.apply(decorators, toConsumableArray(exports$4(_extends({}, _this2.props.mention, {
        onChange: _this2.onChange,
        getEditorState: _this2.getEditorState,
        getSuggestions: _this2.getSuggestions,
        getWrapperRef: _this2.getWrapperRef,
        modalHandler: _this2.modalHandler
      }))));
    }
    if (_this2.props.hashtag) {
      decorators.push(exports$5(_this2.props.hashtag));
    }
    return new require$$1.CompositeDecorator(decorators);
  };

  this.getWrapperRef = function () {
    return _this2.wrapper;
  };

  this.getEditorState = function () {
    return _this2.state.editorState;
  };

  this.getSuggestions = function () {
    return _this2.props.mention && _this2.props.mention.suggestions;
  };

  this.afterChange = function (editorState) {
    setTimeout(function () {
      var _props3 = _this2.props,
          onChange = _props3.onChange,
          onContentStateChange = _props3.onContentStateChange;

      if (onChange) {
        onChange(require$$1.convertToRaw(editorState.getCurrentContent()));
      }
      if (onContentStateChange) {
        onContentStateChange(require$$1.convertToRaw(editorState.getCurrentContent()));
      }
    });
  };

  this.isReadOnly = function () {
    return _this2.props.readOnly;
  };

  this.isImageAlignmentEnabled = function () {
    return _this2.state.toolbar.image.alignmentEnabled;
  };

  this.createEditorState = function (compositeDecorator) {
    var editorState = void 0;
    if (hasProperty(_this2.props, "editorState")) {
      if (_this2.props.editorState) {
        editorState = require$$1.EditorState.set(_this2.props.editorState, {
          decorator: compositeDecorator
        });
      }
    } else if (hasProperty(_this2.props, "defaultEditorState")) {
      if (_this2.props.defaultEditorState) {
        editorState = require$$1.EditorState.set(_this2.props.defaultEditorState, {
          decorator: compositeDecorator
        });
      }
    } else if (hasProperty(_this2.props, "contentState")) {
      if (_this2.props.contentState) {
        var contentState = require$$1.convertFromRaw(_this2.props.contentState);
        editorState = require$$1.EditorState.createWithContent(contentState, compositeDecorator);
        editorState = require$$1.EditorState.moveSelectionToEnd(editorState);
      }
    } else if (hasProperty(_this2.props, "defaultContentState") || hasProperty(_this2.props, "initialContentState")) {
      var _contentState = _this2.props.defaultContentState || _this2.props.initialContentState;
      if (_contentState) {
        _contentState = require$$1.convertFromRaw(_contentState);
        editorState = require$$1.EditorState.createWithContent(_contentState, compositeDecorator);
        editorState = require$$1.EditorState.moveSelectionToEnd(editorState);
      }
    }
    if (!editorState) {
      editorState = require$$1.EditorState.createEmpty(compositeDecorator);
    }
    return editorState;
  };

  this.filterEditorProps = function (props) {
    return filter(props, ["onChange", "onEditorStateChange", "onContentStateChange", "initialContentState", "defaultContentState", "contentState", "editorState", "defaultEditorState", "locale", "localization", "toolbarOnFocus", "toolbar", "toolbarCustomButtons", "toolbarClassName", "editorClassName", "toolbarHidden", "wrapperClassName", "toolbarStyle", "editorStyle", "wrapperStyle", "uploadCallback", "onFocus", "onBlur", "onTab", "mention", "hashtag", "ariaLabel", "customBlockRenderFunc", "customDecorators", "handlePastedText"]);
  };

  this.changeEditorState = function (contentState) {
    var newContentState = require$$1.convertFromRaw(contentState);
    var editorState = _this2.state.editorState;

    editorState = require$$1.EditorState.push(editorState, newContentState, "insert-characters");
    editorState = require$$1.EditorState.moveSelectionToEnd(editorState);
    return editorState;
  };

  this.focusEditor = function () {
    setTimeout(function () {
      _this2.editor.focus();
    });
  };

  this.handleKeyCommand = function (command) {
    var _state2 = _this2.state,
        editorState = _state2.editorState,
        inline = _state2.toolbar.inline;

    if (inline && inline.options.indexOf(command) >= 0) {
      var newState = require$$1.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        _this2.onChange(newState);
        return true;
      }
    }
    return false;
  };

  this.handleReturn = function (event) {
    if (SuggestionHandler.isOpen()) {
      return true;
    }
    var editorState = draftjsUtils_2(_this2.state.editorState, event);
    if (editorState) {
      _this2.onChange(editorState);
      return true;
    }
    return false;
  };

  this.handlePastedText = function (text, html) {
    var editorState = _this2.state.editorState;


    if (_this2.props.handlePastedText) {
      return _this2.props.handlePastedText(text, html, editorState, _this2.onChange);
    }
    if (!_this2.props.stripPastedStyles) {
      return handlePastedText(text, html, editorState, _this2.onChange);
    }
    return false;
  };

  this.preventDefault = function (event) {
    if (event.target.tagName === "INPUT" || event.target.tagName === "LABEL") {
      _this2.focusHandler.onInputMouseDown();
    } else {
      event.preventDefault();
    }
  };
};

module.exports = {
  Editor: WysiwygEditor
};
//# sourceMappingURL=react-draft-wysiwyg.js.map
