const toString = Object.prototype.toString

// 判断数据类型
function is(v, type) {
  return toString.call(v) === `[object ${ type }]`
}

function isDef(v) {
  return typeof v !== 'undefined'
}

function isNumber(v) {
  return is(v, 'Number')
}

function isString(v) {
  return is(v, 'String')
}

function isArray(v) {
  return v && Array.isArray(v)
}


function isEmpty(v) {
  if (v === null) {
    return true
  }
  if (isArray(v) || isString(v)) {
    return v.length === 0
  }

  if (v instanceof Map || v instanceof Set) {
    return v.size === 0
  }

  if (isObject(v)) {
    return Object.keys(v).length === 0
  }

  return false
}

function isClass(v) {
  return typeof v === 'function' && /^class\s/.test(Function.prototype.toString.call(v));
}

function isFunction(v) {
  return typeof v === 'function'
}

function isObject(v) {
  return v !== null && is(v, 'Object')
}


module.exports = {
  is,
  isDef,
  isNumber,
  isString,
  isArray,
  isEmpty,
  isClass,
  isFunction,
  isObject
}