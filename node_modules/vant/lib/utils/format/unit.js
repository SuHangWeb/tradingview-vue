"use strict";

exports.__esModule = true;
exports.addUnit = addUnit;
exports.unitToPx = unitToPx;

var _ = require("..");

var _number = require("../validate/number");

function addUnit(value) {
  if (!(0, _.isDef)(value)) {
    return undefined;
  }

  value = String(value);
  return (0, _number.isNumeric)(value) ? value + "px" : value;
} // cache


var rootFontSize;

function getRootFontSize() {
  if (!rootFontSize) {
    var doc = document.documentElement;
    var fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }

  return rootFontSize;
}

function convertRem(value) {
  value = value.replace(/rem/g, '');
  return +value * getRootFontSize();
}

function convertVw(value) {
  value = value.replace(/vw/g, '');
  return +value * window.innerWidth / 100;
}

function unitToPx(value) {
  if (typeof value === 'number') {
    return value;
  }

  if (_.inBrowser) {
    if (value.indexOf('rem') !== -1) {
      return convertRem(value);
    }

    if (value.indexOf('vw') !== -1) {
      return convertVw(value);
    }
  }

  return parseFloat(value);
}