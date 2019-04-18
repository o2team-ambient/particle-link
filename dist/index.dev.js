(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ATAmbient = factory());
}(this, (function () { 'use strict';

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

  var css = "@charset \"UTF-8\";\n/* 自定义样式 */\n.o2team_ambient_main {\n  z-index: 999;\n  pointer-events: none; }\n";
  styleInject(css);

  const id = 'particle-link';
  const ID = id.toUpperCase();
  const O2_AMBIENT_MAIN = `O2_AMBIENT_${ID}_MAIN`;
  const O2_AMBIENT_INIT = `O2_AMBIENT_${ID}_INIT`;
  const O2_AMBIENT_CONFIG = `O2_AMBIENT_${ID}_CONFIG`;
  const O2_AMBIENT_CLASSNAME = `o2_ambient_${id}`;

  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
  // MIT license
  (function () {
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];

    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
      window.cancelAnimationFrame = window[`${vendors[x]}CancelAnimationFrame`] || window[`${vendors[x]}CancelRequestAnimationFrame`];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  })();

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var _arrayEach = arrayEach;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  var _createBaseFor = createBaseFor;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = _createBaseFor();

  var _baseFor = baseFor;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /** Built-in value references. */
  var Symbol = _root.Symbol;

  var _Symbol = Symbol;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$1.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  var isArray_1 = isArray;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
  });

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  var isLength_1 = isLength;

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike_1(value) &&
      isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  });

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

  var isTypedArray_1 = isTypedArray;

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$2.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             _isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = _overArg(Object.keys, Object);

  var _nativeKeys = nativeKeys;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeys = baseKeys;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag$1 = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
  }

  var keys_1 = keys;

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && _baseFor(object, iteratee, keys_1);
  }

  var _baseForOwn = baseForOwn;

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike_1(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length,
          index = fromRight ? length : -1,
          iterable = Object(collection);

      while ((fromRight ? index-- : ++index < length)) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  var _createBaseEach = createBaseEach;

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach = _createBaseEach(_baseForOwn);

  var _baseEach = baseEach;

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  var identity_1 = identity;

  /**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */
  function castFunction(value) {
    return typeof value == 'function' ? value : identity_1;
  }

  var _castFunction = castFunction;

  /**
   * Iterates over elements of `collection` and invokes `iteratee` for each element.
   * The iteratee is invoked with three arguments: (value, index|key, collection).
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * **Note:** As with other "Collections" methods, objects with a "length"
   * property are iterated like arrays. To avoid this behavior use `_.forIn`
   * or `_.forOwn` for object iteration.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias each
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   * @see _.forEachRight
   * @example
   *
   * _.forEach([1, 2], function(value) {
   *   console.log(value);
   * });
   * // => Logs `1` then `2`.
   *
   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
   */
  function forEach(collection, iteratee) {
    var func = isArray_1(collection) ? _arrayEach : _baseEach;
    return func(collection, _castFunction(iteratee));
  }

  var forEach_1 = forEach;

  /* -----------------------------------------------
  /* Author : Vincent Garreau  - vincentgarreau.com
  /* MIT license: http://opensource.org/licenses/MIT
  /* Demo / Generator : vincentgarreau.com/particles.js
  /* GitHub : github.com/VincentGarreau/particles.js
  /* How to use? : Check the GitHub README
  /* v2.0.0
  /* ----------------------------------------------- */
  var pJS = function (tag_id, params) {
    var canvas_el = document.querySelector('#' + tag_id + ' > .particles-js-canvas-el');
    /* particles.js variables with default values */

    this.pJS = {
      canvas: {
        el: canvas_el,
        w: canvas_el.offsetWidth,
        h: canvas_el.offsetHeight
      },
      particles: {
        number: {
          value: 400,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#fff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#ff0000'
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: '',
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 1,
          random: false,
          anim: {
            enable: false,
            speed: 2,
            opacity_min: 0,
            sync: false
          }
        },
        size: {
          value: 20,
          random: false,
          anim: {
            enable: false,
            speed: 20,
            size_min: 0,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 100,
          color: '#fff',
          opacity: 1,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 3000,
            rotateY: 3000
          }
        },
        array: []
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 100,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 200,
            size: 80,
            duration: 0.4
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        },
        mouse: {}
      },
      retina_detect: false,
      fn: {
        interact: {},
        modes: {},
        vendors: {}
      },
      tmp: {}
    };
    var pJS = this.pJS;
    /* params settings */

    if (params) {
      Object.deepExtend(pJS, params);
    }

    pJS.tmp.obj = {
      size_value: pJS.particles.size.value,
      size_anim_speed: pJS.particles.size.anim.speed,
      move_speed: pJS.particles.move.speed,
      line_linked_distance: pJS.particles.line_linked.distance,
      line_linked_width: pJS.particles.line_linked.width,
      mode_grab_distance: pJS.interactivity.modes.grab.distance,
      mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
      mode_bubble_size: pJS.interactivity.modes.bubble.size,
      mode_repulse_distance: pJS.interactivity.modes.repulse.distance
    };

    pJS.fn.retinaInit = function () {
      if (pJS.retina_detect && window.devicePixelRatio > 1) {
        pJS.canvas.pxratio = window.devicePixelRatio;
        pJS.tmp.retina = true;
      } else {
        pJS.canvas.pxratio = 1;
        pJS.tmp.retina = false;
      }

      pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
      pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;
      pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
      pJS.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
      pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
      pJS.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
      pJS.interactivity.modes.grab.distance = pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio;
      pJS.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
      pJS.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
      pJS.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
      pJS.interactivity.modes.repulse.distance = pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio;
    };
    /* ---------- pJS functions - canvas ------------ */


    pJS.fn.canvasInit = function () {
      pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
    };

    pJS.fn.canvasSize = function () {
      pJS.canvas.el.width = pJS.canvas.w;
      pJS.canvas.el.height = pJS.canvas.h;

      if (pJS && pJS.interactivity.events.resize) {
        window.addEventListener('resize', function () {
          pJS.canvas.w = pJS.canvas.el.offsetWidth;
          pJS.canvas.h = pJS.canvas.el.offsetHeight;
          /* resize canvas */

          if (pJS.tmp.retina) {
            pJS.canvas.w *= pJS.canvas.pxratio;
            pJS.canvas.h *= pJS.canvas.pxratio;
          }

          pJS.canvas.el.width = pJS.canvas.w;
          pJS.canvas.el.height = pJS.canvas.h;
          /* repaint canvas on anim disabled */

          if (!pJS.particles.move.enable) {
            pJS.fn.particlesEmpty();
            pJS.fn.particlesCreate();
            pJS.fn.particlesDraw();
            pJS.fn.vendors.densityAutoParticles();
          }
          /* density particles enabled */


          pJS.fn.vendors.densityAutoParticles();
        });
      }
    };

    pJS.fn.canvasPaint = function () {
      pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
    };

    pJS.fn.canvasClear = function () {
      pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
    };
    /* --------- pJS functions - particles ----------- */


    pJS.fn.particle = function (color, opacity, position) {
      /* size */
      this.radius = (pJS.particles.size.random ? Math.random() : 1) * pJS.particles.size.value;

      if (pJS.particles.size.anim.enable) {
        this.size_status = false;
        this.vs = pJS.particles.size.anim.speed / 100;

        if (!pJS.particles.size.anim.sync) {
          this.vs = this.vs * Math.random();
        }
      }
      /* position */


      this.x = position ? position.x : Math.random() * pJS.canvas.w;
      this.y = position ? position.y : Math.random() * pJS.canvas.h;
      /* check position  - into the canvas */

      if (this.x > pJS.canvas.w - this.radius * 2) this.x = this.x - this.radius;else if (this.x < this.radius * 2) this.x = this.x + this.radius;
      if (this.y > pJS.canvas.h - this.radius * 2) this.y = this.y - this.radius;else if (this.y < this.radius * 2) this.y = this.y + this.radius;
      /* check position - avoid overlap */

      if (pJS.particles.move.bounce) {
        pJS.fn.vendors.checkOverlap(this, position);
      }
      /* color */


      this.color = {};

      if (typeof color.value == 'object') {
        if (color.value instanceof Array) {
          var color_selected = color.value[Math.floor(Math.random() * pJS.particles.color.value.length)];
          this.color.rgb = hexToRgb(color_selected);
        } else {
          if (color.value.r != undefined && color.value.g != undefined && color.value.b != undefined) {
            this.color.rgb = {
              r: color.value.r,
              g: color.value.g,
              b: color.value.b
            };
          }

          if (color.value.h != undefined && color.value.s != undefined && color.value.l != undefined) {
            this.color.hsl = {
              h: color.value.h,
              s: color.value.s,
              l: color.value.l
            };
          }
        }
      } else if (color.value == 'random') {
        this.color.rgb = {
          r: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
          g: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
          b: Math.floor(Math.random() * (255 - 0 + 1)) + 0
        };
      } else if (typeof color.value == 'string') {
        this.color = color;
        this.color.rgb = hexToRgb(this.color.value);
      }
      /* opacity */


      this.opacity = (pJS.particles.opacity.random ? Math.random() : 1) * pJS.particles.opacity.value;

      if (pJS.particles.opacity.anim.enable) {
        this.opacity_status = false;
        this.vo = pJS.particles.opacity.anim.speed / 100;

        if (!pJS.particles.opacity.anim.sync) {
          this.vo = this.vo * Math.random();
        }
      }
      /* animation - velocity for speed */


      var velbase = {};

      switch (pJS.particles.move.direction) {
        case 'top':
          velbase = {
            x: 0,
            y: -1
          };
          break;

        case 'top-right':
          velbase = {
            x: 0.5,
            y: -0.5
          };
          break;

        case 'right':
          velbase = {
            x: 1,
            y: -0
          };
          break;

        case 'bottom-right':
          velbase = {
            x: 0.5,
            y: 0.5
          };
          break;

        case 'bottom':
          velbase = {
            x: 0,
            y: 1
          };
          break;

        case 'bottom-left':
          velbase = {
            x: -0.5,
            y: 1
          };
          break;

        case 'left':
          velbase = {
            x: -1,
            y: 0
          };
          break;

        case 'top-left':
          velbase = {
            x: -0.5,
            y: -0.5
          };
          break;

        default:
          velbase = {
            x: 0,
            y: 0
          };
          break;
      }

      if (pJS.particles.move.straight) {
        this.vx = velbase.x;
        this.vy = velbase.y;

        if (pJS.particles.move.random) {
          this.vx = this.vx * Math.random();
          this.vy = this.vy * Math.random();
        }
      } else {
        this.vx = velbase.x + Math.random() - 0.5;
        this.vy = velbase.y + Math.random() - 0.5;
      } // var theta = 2.0 * Math.PI * Math.random();
      // this.vx = Math.cos(theta);
      // this.vy = Math.sin(theta);


      this.vx_i = this.vx;
      this.vy_i = this.vy;
      /* if shape is image */

      var shape_type = pJS.particles.shape.type;

      if (typeof shape_type == 'object') {
        if (shape_type instanceof Array) {
          var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
          this.shape = shape_selected;
        }
      } else {
        this.shape = shape_type;
      }

      if (this.shape == 'image') {
        var sh = pJS.particles.shape;
        this.img = {
          src: sh.image.src,
          ratio: sh.image.width / sh.image.height
        };
        if (!this.img.ratio) this.img.ratio = 1;

        if (pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg != undefined) {
          pJS.fn.vendors.createSvgImg(this);

          if (pJS.tmp.pushing) {
            this.img.loaded = false;
          }
        }
      }
    };

    pJS.fn.particle.prototype.draw = function () {
      var p = this;

      if (p.radius_bubble != undefined) {
        var radius = p.radius_bubble;
      } else {
        var radius = p.radius;
      }

      if (p.opacity_bubble != undefined) {
        var opacity = p.opacity_bubble;
      } else {
        var opacity = p.opacity;
      }

      if (p.color.rgb) {
        var color_value = 'rgba(' + p.color.rgb.r + ',' + p.color.rgb.g + ',' + p.color.rgb.b + ',' + opacity + ')';
      } else {
        var color_value = 'hsla(' + p.color.hsl.h + ',' + p.color.hsl.s + '%,' + p.color.hsl.l + '%,' + opacity + ')';
      }

      pJS.canvas.ctx.fillStyle = color_value;
      pJS.canvas.ctx.beginPath();

      switch (p.shape) {
        case 'circle':
          pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
          break;

        case 'edge':
          pJS.canvas.ctx.rect(p.x - radius, p.y - radius, radius * 2, radius * 2);
          break;

        case 'triangle':
          pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius, p.y + radius / 1.66, radius * 2, 3, 2);
          break;

        case 'polygon':
          pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius / (pJS.particles.shape.polygon.nb_sides / 3.5), // startX
          p.y - radius / (2.66 / 3.5), // startY
          radius * 2.66 / (pJS.particles.shape.polygon.nb_sides / 3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          1 // sideCountDenominator
          );
          break;

        case 'star':
          pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius * 2 / (pJS.particles.shape.polygon.nb_sides / 4), // startX
          p.y - radius / (2 * 2.66 / 3.5), // startY
          radius * 2 * 2.66 / (pJS.particles.shape.polygon.nb_sides / 3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          2 // sideCountDenominator
          );
          break;

        case 'image':
          var draw = function () {
            pJS.canvas.ctx.drawImage(img_obj, p.x - radius, p.y - radius, radius * 2, radius * 2 / p.img.ratio);
          };

          if (pJS.tmp.img_type == 'svg') {
            var img_obj = p.img.obj;
          } else {
            var img_obj = pJS.tmp.img_obj;
          }

          if (img_obj) {
            draw();
          }

          break;
      }

      pJS.canvas.ctx.closePath();

      if (pJS.particles.shape.stroke.width > 0) {
        pJS.canvas.ctx.strokeStyle = pJS.particles.shape.stroke.color;
        pJS.canvas.ctx.lineWidth = pJS.particles.shape.stroke.width;
        pJS.canvas.ctx.stroke();
      }

      pJS.canvas.ctx.fill();
    };

    pJS.fn.particlesCreate = function () {
      for (var i = 0; i < pJS.particles.number.value; i++) {
        pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value));
      }
    };

    pJS.fn.particlesUpdate = function () {
      for (var i = 0; i < pJS.particles.array.length; i++) {
        /* the particle */
        var p = pJS.particles.array[i]; // var d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
        // var f = -BANG_SIZE / d;
        // if ( d < BANG_SIZE ) {
        //     var t = Math.atan2( dy, dx );
        //     p.vx = f * Math.cos(t);
        //     p.vy = f * Math.sin(t);
        // }

        /* move the particle */

        if (pJS.particles.move.enable) {
          var ms = pJS.particles.move.speed / 2;
          p.x += p.vx * ms;
          p.y += p.vy * ms;
        }
        /* change opacity status */


        if (pJS.particles.opacity.anim.enable) {
          if (p.opacity_status == true) {
            if (p.opacity >= pJS.particles.opacity.value) p.opacity_status = false;
            p.opacity += p.vo;
          } else {
            if (p.opacity <= pJS.particles.opacity.anim.opacity_min) p.opacity_status = true;
            p.opacity -= p.vo;
          }

          if (p.opacity < 0) p.opacity = 0;
        }
        /* change size */


        if (pJS.particles.size.anim.enable) {
          if (p.size_status == true) {
            if (p.radius >= pJS.particles.size.value) p.size_status = false;
            p.radius += p.vs;
          } else {
            if (p.radius <= pJS.particles.size.anim.size_min) p.size_status = true;
            p.radius -= p.vs;
          }

          if (p.radius < 0) p.radius = 0;
        }
        /* change particle position if it is out of canvas */


        if (pJS.particles.move.out_mode == 'bounce') {
          var new_pos = {
            x_left: p.radius,
            x_right: pJS.canvas.w,
            y_top: p.radius,
            y_bottom: pJS.canvas.h
          };
        } else {
          var new_pos = {
            x_left: -p.radius,
            x_right: pJS.canvas.w + p.radius,
            y_top: -p.radius,
            y_bottom: pJS.canvas.h + p.radius
          };
        }

        if (p.x - p.radius > pJS.canvas.w) {
          p.x = new_pos.x_left;
          p.y = Math.random() * pJS.canvas.h;
        } else if (p.x + p.radius < 0) {
          p.x = new_pos.x_right;
          p.y = Math.random() * pJS.canvas.h;
        }

        if (p.y - p.radius > pJS.canvas.h) {
          p.y = new_pos.y_top;
          p.x = Math.random() * pJS.canvas.w;
        } else if (p.y + p.radius < 0) {
          p.y = new_pos.y_bottom;
          p.x = Math.random() * pJS.canvas.w;
        }
        /* out of canvas modes */


        switch (pJS.particles.move.out_mode) {
          case 'bounce':
            if (p.x + p.radius > pJS.canvas.w) p.vx = -p.vx;else if (p.x - p.radius < 0) p.vx = -p.vx;
            if (p.y + p.radius > pJS.canvas.h) p.vy = -p.vy;else if (p.y - p.radius < 0) p.vy = -p.vy;
            break;
        }
        /* events */


        if (isInArray('grab', pJS.interactivity.events.onhover.mode)) {
          pJS.fn.modes.grabParticle(p);
        }

        if (isInArray('bubble', pJS.interactivity.events.onhover.mode) || isInArray('bubble', pJS.interactivity.events.onclick.mode)) {
          pJS.fn.modes.bubbleParticle(p);
        }

        if (isInArray('repulse', pJS.interactivity.events.onhover.mode) || isInArray('repulse', pJS.interactivity.events.onclick.mode)) {
          pJS.fn.modes.repulseParticle(p);
        }
        /* interaction auto between particles */


        if (pJS.particles.line_linked.enable || pJS.particles.move.attract.enable) {
          for (var j = i + 1; j < pJS.particles.array.length; j++) {
            var p2 = pJS.particles.array[j];
            /* link particles */

            if (pJS.particles.line_linked.enable) {
              pJS.fn.interact.linkParticles(p, p2);
            }
            /* attract particles */


            if (pJS.particles.move.attract.enable) {
              pJS.fn.interact.attractParticles(p, p2);
            }
            /* bounce particles */


            if (pJS.particles.move.bounce) {
              pJS.fn.interact.bounceParticles(p, p2);
            }
          }
        }
      }
    };

    pJS.fn.particlesDraw = function () {
      /* clear canvas */
      pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
      /* update each particles param */

      pJS.fn.particlesUpdate();
      /* draw each particle */

      for (var i = 0; i < pJS.particles.array.length; i++) {
        var p = pJS.particles.array[i];
        p.draw();
      }
    };

    pJS.fn.particlesEmpty = function () {
      pJS.particles.array = [];
    };

    pJS.fn.particlesRefresh = function () {
      /* init all */
      cancelRequestAnimFrame(pJS.fn.checkAnimFrame);
      cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
      pJS.tmp.source_svg = undefined;
      pJS.tmp.img_obj = undefined;
      pJS.tmp.count_svg = 0;
      pJS.fn.particlesEmpty();
      pJS.fn.canvasClear();
      /* restart */

      pJS.fn.vendors.start();
    };
    /* ---------- pJS functions - particles interaction ------------ */


    pJS.fn.interact.linkParticles = function (p1, p2) {
      var dx = p1.x - p2.x,
          dy = p1.y - p2.y,
          dist = Math.sqrt(dx * dx + dy * dy);
      /* draw a line between p1 and p2 if the distance between them is under the config distance */

      if (dist <= pJS.particles.line_linked.distance) {
        var opacity_line = pJS.particles.line_linked.opacity - dist / (1 / pJS.particles.line_linked.opacity) / pJS.particles.line_linked.distance;

        if (opacity_line > 0) {
          /* style */
          var color_line = pJS.particles.line_linked.color_rgb_line;
          pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + opacity_line + ')';
          pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width; //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */

          /* path */

          pJS.canvas.ctx.beginPath();
          pJS.canvas.ctx.moveTo(p1.x, p1.y);
          pJS.canvas.ctx.lineTo(p2.x, p2.y);
          pJS.canvas.ctx.stroke();
          pJS.canvas.ctx.closePath();
        }
      }
    };

    pJS.fn.interact.attractParticles = function (p1, p2) {
      /* condensed particles */
      var dx = p1.x - p2.x,
          dy = p1.y - p2.y,
          dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= pJS.particles.line_linked.distance) {
        var ax = dx / (pJS.particles.move.attract.rotateX * 1000),
            ay = dy / (pJS.particles.move.attract.rotateY * 1000);
        p1.vx -= ax;
        p1.vy -= ay;
        p2.vx += ax;
        p2.vy += ay;
      }
    };

    pJS.fn.interact.bounceParticles = function (p1, p2) {
      var dx = p1.x - p2.x,
          dy = p1.y - p2.y,
          dist = Math.sqrt(dx * dx + dy * dy),
          dist_p = p1.radius + p2.radius;

      if (dist <= dist_p) {
        p1.vx = -p1.vx;
        p1.vy = -p1.vy;
        p2.vx = -p2.vx;
        p2.vy = -p2.vy;
      }
    };
    /* ---------- pJS functions - modes events ------------ */


    pJS.fn.modes.pushParticles = function (nb, pos) {
      pJS.tmp.pushing = true;

      for (var i = 0; i < nb; i++) {
        pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value, {
          'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w,
          'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h
        }));

        if (i == nb - 1) {
          if (!pJS.particles.move.enable) {
            pJS.fn.particlesDraw();
          }

          pJS.tmp.pushing = false;
        }
      }
    };

    pJS.fn.modes.removeParticles = function (nb) {
      pJS.particles.array.splice(0, nb);

      if (!pJS.particles.move.enable) {
        pJS.fn.particlesDraw();
      }
    };

    pJS.fn.modes.bubbleParticle = function (p) {
      /* on hover event */
      if (pJS.interactivity.events.onhover.enable && isInArray('bubble', pJS.interactivity.events.onhover.mode)) {
        var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
            dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
            dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse),
            ratio = 1 - dist_mouse / pJS.interactivity.modes.bubble.distance;

        function init() {
          p.opacity_bubble = p.opacity;
          p.radius_bubble = p.radius;
        }
        /* mousemove - check ratio */


        if (dist_mouse <= pJS.interactivity.modes.bubble.distance) {
          if (ratio >= 0 && pJS.interactivity.status == 'mousemove') {
            /* size */
            if (pJS.interactivity.modes.bubble.size != pJS.particles.size.value) {
              if (pJS.interactivity.modes.bubble.size > pJS.particles.size.value) {
                var size = p.radius + pJS.interactivity.modes.bubble.size * ratio;

                if (size >= 0) {
                  p.radius_bubble = size;
                }
              } else {
                var dif = p.radius - pJS.interactivity.modes.bubble.size,
                    size = p.radius - dif * ratio;

                if (size > 0) {
                  p.radius_bubble = size;
                } else {
                  p.radius_bubble = 0;
                }
              }
            }
            /* opacity */


            if (pJS.interactivity.modes.bubble.opacity != pJS.particles.opacity.value) {
              if (pJS.interactivity.modes.bubble.opacity > pJS.particles.opacity.value) {
                var opacity = pJS.interactivity.modes.bubble.opacity * ratio;

                if (opacity > p.opacity && opacity <= pJS.interactivity.modes.bubble.opacity) {
                  p.opacity_bubble = opacity;
                }
              } else {
                var opacity = p.opacity - (pJS.particles.opacity.value - pJS.interactivity.modes.bubble.opacity) * ratio;

                if (opacity < p.opacity && opacity >= pJS.interactivity.modes.bubble.opacity) {
                  p.opacity_bubble = opacity;
                }
              }
            }
          }
        } else {
          init();
        }
        /* mouseleave */


        if (pJS.interactivity.status == 'mouseleave') {
          init();
        }
      }
      /* on click event */
      else if (pJS.interactivity.events.onclick.enable && isInArray('bubble', pJS.interactivity.events.onclick.mode)) {
          if (pJS.tmp.bubble_clicking) {
            var dx_mouse = p.x - pJS.interactivity.mouse.click_pos_x,
                dy_mouse = p.y - pJS.interactivity.mouse.click_pos_y,
                dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse),
                time_spent = (new Date().getTime() - pJS.interactivity.mouse.click_time) / 1000;

            if (time_spent > pJS.interactivity.modes.bubble.duration) {
              pJS.tmp.bubble_duration_end = true;
            }

            if (time_spent > pJS.interactivity.modes.bubble.duration * 2) {
              pJS.tmp.bubble_clicking = false;
              pJS.tmp.bubble_duration_end = false;
            }
          }

          function process(bubble_param, particles_param, p_obj_bubble, p_obj, id) {
            if (bubble_param != particles_param) {
              if (!pJS.tmp.bubble_duration_end) {
                if (dist_mouse <= pJS.interactivity.modes.bubble.distance) {
                  if (p_obj_bubble != undefined) var obj = p_obj_bubble;else var obj = p_obj;

                  if (obj != bubble_param) {
                    var value = p_obj - time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration;
                    if (id == 'size') p.radius_bubble = value;
                    if (id == 'opacity') p.opacity_bubble = value;
                  }
                } else {
                  if (id == 'size') p.radius_bubble = undefined;
                  if (id == 'opacity') p.opacity_bubble = undefined;
                }
              } else {
                if (p_obj_bubble != undefined) {
                  var value_tmp = p_obj - time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration,
                      dif = bubble_param - value_tmp;
                  value = bubble_param + dif;
                  if (id == 'size') p.radius_bubble = value;
                  if (id == 'opacity') p.opacity_bubble = value;
                }
              }
            }
          }

          if (pJS.tmp.bubble_clicking) {
            /* size */
            process(pJS.interactivity.modes.bubble.size, pJS.particles.size.value, p.radius_bubble, p.radius, 'size');
            /* opacity */

            process(pJS.interactivity.modes.bubble.opacity, pJS.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity');
          }
        }
    };

    pJS.fn.modes.repulseParticle = function (p) {
      if (pJS.interactivity.events.onhover.enable && isInArray('repulse', pJS.interactivity.events.onhover.mode) && pJS.interactivity.status == 'mousemove') {
        var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
            dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
            dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        var normVec = {
          x: dx_mouse / dist_mouse,
          y: dy_mouse / dist_mouse
        },
            repulseRadius = pJS.interactivity.modes.repulse.distance,
            velocity = 100,
            repulseFactor = clamp(1 / repulseRadius * (-1 * Math.pow(dist_mouse / repulseRadius, 2) + 1) * repulseRadius * velocity, 0, 50);
        var pos = {
          x: p.x + normVec.x * repulseFactor,
          y: p.y + normVec.y * repulseFactor
        };

        if (pJS.particles.move.out_mode == 'bounce') {
          if (pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w) p.x = pos.x;
          if (pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h) p.y = pos.y;
        } else {
          p.x = pos.x;
          p.y = pos.y;
        }
      } else if (pJS.interactivity.events.onclick.enable && isInArray('repulse', pJS.interactivity.events.onclick.mode)) {
        if (!pJS.tmp.repulse_finish) {
          pJS.tmp.repulse_count++;

          if (pJS.tmp.repulse_count == pJS.particles.array.length) {
            pJS.tmp.repulse_finish = true;
          }
        }

        if (pJS.tmp.repulse_clicking) {
          var repulseRadius = Math.pow(pJS.interactivity.modes.repulse.distance / 6, 3);
          var dx = pJS.interactivity.mouse.click_pos_x - p.x,
              dy = pJS.interactivity.mouse.click_pos_y - p.y,
              d = dx * dx + dy * dy;
          var force = -repulseRadius / d * 1;

          function process() {
            var f = Math.atan2(dy, dx);
            p.vx = force * Math.cos(f);
            p.vy = force * Math.sin(f);

            if (pJS.particles.move.out_mode == 'bounce') {
              var pos = {
                x: p.x + p.vx,
                y: p.y + p.vy
              };
              if (pos.x + p.radius > pJS.canvas.w) p.vx = -p.vx;else if (pos.x - p.radius < 0) p.vx = -p.vx;
              if (pos.y + p.radius > pJS.canvas.h) p.vy = -p.vy;else if (pos.y - p.radius < 0) p.vy = -p.vy;
            }
          } // default


          if (d <= repulseRadius) {
            process();
          } // bang - slow motion mode
          // if(!pJS.tmp.repulse_finish){
          //   if(d <= repulseRadius){
          //     process();
          //   }
          // }else{
          //   process();
          // }

        } else {
          if (pJS.tmp.repulse_clicking == false) {
            p.vx = p.vx_i;
            p.vy = p.vy_i;
          }
        }
      }
    };

    pJS.fn.modes.grabParticle = function (p) {
      if (pJS.interactivity.events.onhover.enable && pJS.interactivity.status == 'mousemove') {
        var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
            dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
            dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        /* draw a line between the cursor and the particle if the distance between them is under the config distance */

        if (dist_mouse <= pJS.interactivity.modes.grab.distance) {
          var opacity_line = pJS.interactivity.modes.grab.line_linked.opacity - dist_mouse / (1 / pJS.interactivity.modes.grab.line_linked.opacity) / pJS.interactivity.modes.grab.distance;

          if (opacity_line > 0) {
            /* style */
            var color_line = pJS.particles.line_linked.color_rgb_line;
            pJS.canvas.ctx.strokeStyle = 'rgba(' + color_line.r + ',' + color_line.g + ',' + color_line.b + ',' + opacity_line + ')';
            pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width; //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */

            /* path */

            pJS.canvas.ctx.beginPath();
            pJS.canvas.ctx.moveTo(p.x, p.y);
            pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
            pJS.canvas.ctx.stroke();
            pJS.canvas.ctx.closePath();
          }
        }
      }
    };
    /* ---------- pJS functions - vendors ------------ */


    pJS.fn.vendors.eventsListeners = function () {
      /* events target element */
      if (pJS.interactivity.detect_on == 'window') {
        pJS.interactivity.el = window;
      } else {
        pJS.interactivity.el = pJS.canvas.el;
      }
      /* detect mouse pos - on hover / click event */


      if (pJS.interactivity.events.onhover.enable || pJS.interactivity.events.onclick.enable) {
        /* el on mousemove */
        pJS.interactivity.el.addEventListener('mousemove', function (e) {
          if (pJS.interactivity.el == window) {
            var pos_x = e.clientX,
                pos_y = e.clientY;
          } else {
            var pos_x = e.offsetX || e.clientX,
                pos_y = e.offsetY || e.clientY;
          }

          pJS.interactivity.mouse.pos_x = pos_x;
          pJS.interactivity.mouse.pos_y = pos_y;

          if (pJS.tmp.retina) {
            pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
            pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
          }

          pJS.interactivity.status = 'mousemove';
        });
        /* el on onmouseleave */

        pJS.interactivity.el.addEventListener('mouseleave', function (e) {
          pJS.interactivity.mouse.pos_x = null;
          pJS.interactivity.mouse.pos_y = null;
          pJS.interactivity.status = 'mouseleave';
        });
      }
      /* on click event */


      if (pJS.interactivity.events.onclick.enable) {
        pJS.interactivity.el.addEventListener('click', function () {
          pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
          pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
          pJS.interactivity.mouse.click_time = new Date().getTime();

          if (pJS.interactivity.events.onclick.enable) {
            switch (pJS.interactivity.events.onclick.mode) {
              case 'push':
                if (pJS.particles.move.enable) {
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                } else {
                  if (pJS.interactivity.modes.push.particles_nb == 1) {
                    pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                  } else if (pJS.interactivity.modes.push.particles_nb > 1) {
                    pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb);
                  }
                }

                break;

              case 'remove':
                pJS.fn.modes.removeParticles(pJS.interactivity.modes.remove.particles_nb);
                break;

              case 'bubble':
                pJS.tmp.bubble_clicking = true;
                break;

              case 'repulse':
                pJS.tmp.repulse_clicking = true;
                pJS.tmp.repulse_count = 0;
                pJS.tmp.repulse_finish = false;
                setTimeout(function () {
                  pJS.tmp.repulse_clicking = false;
                }, pJS.interactivity.modes.repulse.duration * 1000);
                break;
            }
          }
        });
      }
    };

    pJS.fn.vendors.densityAutoParticles = function () {
      if (pJS.particles.number.density.enable) {
        /* calc area */
        var area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;

        if (pJS.tmp.retina) {
          area = area / (pJS.canvas.pxratio * 2);
        }
        /* calc number of particles based on density area */


        var nb_particles = area * pJS.particles.number.value / pJS.particles.number.density.value_area;
        /* add or remove X particles */

        var missing_particles = pJS.particles.array.length - nb_particles;
        if (missing_particles < 0) pJS.fn.modes.pushParticles(Math.abs(missing_particles));else pJS.fn.modes.removeParticles(missing_particles);
      }
    };

    pJS.fn.vendors.checkOverlap = function (p1, position) {
      for (var i = 0; i < pJS.particles.array.length; i++) {
        var p2 = pJS.particles.array[i];
        var dx = p1.x - p2.x,
            dy = p1.y - p2.y,
            dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= p1.radius + p2.radius) {
          p1.x = position ? position.x : Math.random() * pJS.canvas.w;
          p1.y = position ? position.y : Math.random() * pJS.canvas.h;
          pJS.fn.vendors.checkOverlap(p1);
        }
      }
    };

    pJS.fn.vendors.createSvgImg = function (p) {
      /* set color to svg element */
      var svgXml = pJS.tmp.source_svg,
          rgbHex = /#([0-9A-F]{3,6})/gi,
          coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
        if (p.color.rgb) {
          var color_value = 'rgba(' + p.color.rgb.r + ',' + p.color.rgb.g + ',' + p.color.rgb.b + ',' + p.opacity + ')';
        } else {
          var color_value = 'hsla(' + p.color.hsl.h + ',' + p.color.hsl.s + '%,' + p.color.hsl.l + '%,' + p.opacity + ')';
        }

        return color_value;
      });
      /* prepare to create img with colored svg */

      var svg = new Blob([coloredSvgXml], {
        type: 'image/svg+xml;charset=utf-8'
      }),
          DOMURL = window.URL || window.webkitURL || window,
          url = DOMURL.createObjectURL(svg);
      /* create particle img obj */

      var img = new Image();
      img.addEventListener('load', function () {
        p.img.obj = img;
        p.img.loaded = true;
        DOMURL.revokeObjectURL(url);
        pJS.tmp.count_svg++;
      });
      img.src = url;
    };

    pJS.fn.vendors.destroypJS = function () {
      cancelAnimationFrame(pJS.fn.drawAnimFrame);
      canvas_el.remove();
      pJSDom = null;
    };

    pJS.fn.vendors.drawShape = function (c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator) {
      // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
      var sideCount = sideCountNumerator * sideCountDenominator;
      var decimalSides = sideCountNumerator / sideCountDenominator;
      var interiorAngleDegrees = 180 * (decimalSides - 2) / decimalSides;
      var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians

      c.save();
      c.beginPath();
      c.translate(startX, startY);
      c.moveTo(0, 0);

      for (var i = 0; i < sideCount; i++) {
        c.lineTo(sideLength, 0);
        c.translate(sideLength, 0);
        c.rotate(interiorAngle);
      } //c.stroke();


      c.fill();
      c.restore();
    };

    pJS.fn.vendors.exportImg = function () {
      window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
    };

    pJS.fn.vendors.loadImg = function (type) {
      pJS.tmp.img_error = undefined;

      if (pJS.particles.shape.image.src != '') {
        if (type == 'svg') {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', pJS.particles.shape.image.src);

          xhr.onreadystatechange = function (data) {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                pJS.tmp.source_svg = data.currentTarget.response;
                pJS.fn.vendors.checkBeforeDraw();
              } else {
                console.log('Error pJS - Image not found');
                pJS.tmp.img_error = true;
              }
            }
          };

          xhr.send();
        } else {
          var img = new Image();
          img.addEventListener('load', function () {
            pJS.tmp.img_obj = img;
            pJS.fn.vendors.checkBeforeDraw();
          });
          img.src = pJS.particles.shape.image.src;
        }
      } else {
        console.log('Error pJS - No image.src');
        pJS.tmp.img_error = true;
      }
    };

    pJS.fn.vendors.draw = function () {
      if (pJS.particles.shape.type == 'image') {
        if (pJS.tmp.img_type == 'svg') {
          if (pJS.tmp.count_svg >= pJS.particles.number.value) {
            pJS.fn.particlesDraw();
            if (!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
          } else {
            //console.log('still loading...');
            if (!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
          }
        } else {
          if (pJS.tmp.img_obj != undefined) {
            pJS.fn.particlesDraw();
            if (!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
          } else {
            if (!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
          }
        }
      } else {
        pJS.fn.particlesDraw();
        if (!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
      }
    };

    pJS.fn.vendors.checkBeforeDraw = function () {
      // if shape is image
      if (pJS.particles.shape.type == 'image') {
        if (pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg == undefined) {
          pJS.tmp.checkAnimFrame = requestAnimFrame(check);
        } else {
          //console.log('images loaded! cancel check');
          cancelRequestAnimFrame(pJS.tmp.checkAnimFrame);

          if (!pJS.tmp.img_error) {
            pJS.fn.vendors.init();
            pJS.fn.vendors.draw();
          }
        }
      } else {
        pJS.fn.vendors.init();
        pJS.fn.vendors.draw();
      }
    };

    pJS.fn.vendors.init = function () {
      /* init canvas + particles */
      pJS.fn.retinaInit();
      pJS.fn.canvasInit();
      pJS.fn.canvasSize();
      pJS.fn.canvasPaint();
      pJS.fn.particlesCreate();
      pJS.fn.vendors.densityAutoParticles();
      /* particles.line_linked - convert hex colors to rgb */

      pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);
    };

    pJS.fn.vendors.start = function () {
      if (isInArray('image', pJS.particles.shape.type)) {
        pJS.tmp.img_type = pJS.particles.shape.image.src.substr(pJS.particles.shape.image.src.length - 3);
        pJS.fn.vendors.loadImg(pJS.tmp.img_type);
      } else {
        pJS.fn.vendors.checkBeforeDraw();
      }
    };
    /* ---------- pJS - start ------------ */


    pJS.fn.vendors.eventsListeners();
    pJS.fn.vendors.start();
  };
  /* ---------- global functions - vendors ------------ */


  Object.deepExtend = function (destination, source) {
    for (var property in source) {
      if (source[property] && source[property].constructor && source[property].constructor === Object) {
        destination[property] = destination[property] || {};
        Object.deepExtend(destination[property], source[property]);
      } else {
        destination[property] = source[property];
      }
    }

    return destination;
  };

  window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  }();

  window.cancelRequestAnimFrame = function () {
    return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
  }();

  function hexToRgb(hex) {
    // By Tim Down - http://stackoverflow.com/a/5624139/3493650
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
  }

  function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }
  /* ---------- particles.js functions - start ------------ */


  window.pJSDom = [];

  window.particlesJS = function (tag_id, params) {
    //console.log(params);

    /* no string id? so it's object params, and set the id with default id */
    if (typeof tag_id != 'string') {
      params = tag_id;
      tag_id = 'particles-js';
    }
    /* no id? set the id to default id */


    if (!tag_id) {
      tag_id = 'particles-js';
    }
    /* pJS elements */


    var pJS_tag = document.getElementById(tag_id),
        pJS_canvas_class = 'particles-js-canvas-el',
        exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);
    /* remove canvas if exists into the pJS target tag */

    if (exist_canvas.length) {
      while (exist_canvas.length > 0) {
        pJS_tag.removeChild(exist_canvas[0]);
      }
    }
    /* create canvas element */


    var canvas_el = document.createElement('canvas');
    canvas_el.className = pJS_canvas_class;
    /* set size canvas */

    canvas_el.style.width = "100%";
    canvas_el.style.height = "100%";
    /* append canvas */

    var canvas = document.getElementById(tag_id).appendChild(canvas_el);
    /* launch particle.js */

    if (canvas != null) {
      pJSDom.push(new pJS(tag_id, params));
    }
  };

  window.particlesJS.load = function (tag_id, path_config_json, callback) {
    /* load json config */
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path_config_json);

    xhr.onreadystatechange = function (data) {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var params = JSON.parse(data.currentTarget.response);
          window.particlesJS(tag_id, params);
          if (callback) callback();
        } else {
          console.log('Error pJS - XMLHttpRequest status: ' + xhr.status);
          console.log('Error pJS - File config not found');
        }
      }
    };

    xhr.send();
  };

  class Particle {
    constructor() {
      this.isInited = false;
      this.reset();
      this.init();
    }

    init() {
      this.isInited = true;
      this.initDOM();
      this.create();
    }

    create() {
      particlesJS(this.className, {
        'particles': {
          'number': {
            'value': this.particleNumber,
            'density': {
              'enable': true,
              'value_area': 800
            }
          },
          'color': {
            'value': this.color
          },
          'shape': {
            'type': 'circle',
            'stroke': {
              'width': 0,
              'color': '#000000'
            },
            'polygon': {
              'nb_sides': 5
            }
          },
          'opacity': {
            'value': 0.5,
            'random': false,
            'anim': {
              'enable': false,
              'speed': 1,
              'opacity_min': 0.1,
              'sync': false
            }
          },
          'size': {
            'value': this.maxSize,
            'random': true,
            'anim': {
              'enable': false,
              'speed': 40,
              'size_min': 0.1,
              'sync': false
            }
          },
          'line_linked': {
            'enable': true,
            'distance': 150,
            'color': '#ffffff',
            'opacity': 0.4,
            'width': 1
          },
          'move': {
            'enable': true,
            'speed': 6,
            'direction': 'none',
            'random': false,
            'straight': false,
            'out_mode': 'out',
            'bounce': false,
            'attract': {
              'enable': false,
              'rotateX': 600,
              'rotateY': 1200
            }
          }
        },
        'interactivity': {
          'detect_on': 'window',
          'events': {
            'onhover': {
              'enable': true,
              'mode': 'grab'
            },
            'onclick': {
              'enable': false,
              'mode': 'push'
            },
            'resize': true
          },
          'modes': {
            'grab': {
              'distance': 140,
              'line_linked': {
                'opacity': 1
              }
            },
            'bubble': {
              'distance': 400,
              'size': 40,
              'duration': 2,
              'opacity': 8,
              'speed': 3
            },
            'repulse': {
              'distance': 200,
              'duration': 0.4
            },
            'push': {
              'particles_nb': 4
            },
            'remove': {
              'particles_nb': 2
            }
          }
        },
        'retina_detect': true
      });
    }

    initDOM() {
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '0';
      container.style.top = '0';
      container.style.width = `${this.width}px`;
      container.style.height = `${this.height}px`;
      container.style.zIndex = 999;
      container.style.pointerEvents = 'none';
      container.id = this.className;
      this.parent.appendChild(container);
      this.container = container;
    }

    reset() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.parent = document.querySelector('.o2team_ambient_main');
      this.particleNumber = window[O2_AMBIENT_CONFIG].particleNumber;
      this.className = O2_AMBIENT_CLASSNAME;
      this.color = window[O2_AMBIENT_CONFIG].color;
      this.maxSize = window[O2_AMBIENT_CONFIG].maxSize; // this.maxRadius = 5

      this.isInited && this.create();
    }

    bindEvents() {
      this.windowResizeHandleSelf = this.windowResizeHandle.bind(this);
      window.addEventListener('resize', this.windowResizeHandleSelf, false);
    }

    unbindEvents() {
      window.removeEventListener('resize', this.windowResizeHandleSelf, false);
    }

    windowResizeHandle(e) {
      const devicePixelRatio = this.devicePixelRatio;
      this.width = window.innerWidth * devicePixelRatio;
      this.height = window.innerHeight * devicePixelRatio;
      this.container.style.width = `${this.width / devicePixelRatio}px`;
      this.container.style.height = `${this.height / devicePixelRatio}px`;
    }

    destroy() {
      this.unbindEvents();
      forEach_1(window.pJSDom, pJSDomItem => {
        pJSDomItem.pJS.fn.vendors.destroypJS();
      });
      window.pJSDom = [];
    }

  }

  let wrapper = document.querySelector('.o2team_ambient_main');

  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'o2team_ambient_main');
    wrapper.setAttribute('id', 'o2team_ambient_main');
    document.body.insertAdjacentElement('beforeend', wrapper);
  }

  wrapper.addEventListener('click', () => {
    wrapper.style.display = 'none';
  }); // 初始化函数

  function initAmbient() {
    let ambient = new Particle(); // 主函数暴露

    window[O2_AMBIENT_MAIN] = ambient;
  } // 初始化函数

  window[O2_AMBIENT_INIT] = initAmbient;

  window[O2_AMBIENT_CONFIG] = {
    particleNumber: 25,
    color: '#ffffff',
    maxSize: 3
  };

  function rollup_index (opts) {
    opts && Object.keys(window[O2_AMBIENT_CONFIG]).forEach(key => {
      if (typeof opts[key] === 'undefined') return;
      window[O2_AMBIENT_CONFIG][key] = opts[key];
    });
    initAmbient();
  }

  return rollup_index;

})));
