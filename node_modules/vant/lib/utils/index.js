"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.noop = noop;
exports.isDef = isDef;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.get = get;
exports.isServer = exports.inBrowser = exports.addUnit = exports.createNamespace = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _create = require("./create");

exports.createNamespace = _create.createNamespace;

var _unit = require("./format/unit");

exports.addUnit = _unit.addUnit;
var inBrowser = typeof window !== 'undefined';
exports.inBrowser = inBrowser;
var isServer = _vue.default.prototype.$isServer; // eslint-disable-next-line @typescript-eslint/no-empty-function

exports.isServer = isServer;

function noop() {}

function isDef(val) {
  return val !== undefined && val !== null;
}

function isFunction(val) {
  return typeof val === 'function';
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

function get(object, path) {
  var keys = path.split('.');
  var result = object;
  keys.forEach(function (key) {
    result = isDef(result[key]) ? result[key] : '';
  });
  return result;
}