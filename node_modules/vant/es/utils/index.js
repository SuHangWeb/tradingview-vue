import Vue from 'vue';
export { createNamespace } from './create';
export { addUnit } from './format/unit';
export var inBrowser = typeof window !== 'undefined';
export var isServer = Vue.prototype.$isServer; // eslint-disable-next-line @typescript-eslint/no-empty-function

export function noop() {}
export function isDef(val) {
  return val !== undefined && val !== null;
}
export function isFunction(val) {
  return typeof val === 'function';
}
export function isObject(val) {
  return val !== null && typeof val === 'object';
}
export function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
export function get(object, path) {
  var keys = path.split('.');
  var result = object;
  keys.forEach(function (key) {
    result = isDef(result[key]) ? result[key] : '';
  });
  return result;
}