"use strict";

exports.__esModule = true;
exports.stringToDate = stringToDate;
exports.dateToString = dateToString;

var _string = require("../../utils/format/string");

// 字符串转 Date
// 只处理 YYYY-MM-DD 或者 YYYY-MM-DD HH:MM 格式
function stringToDate(timeString) {
  if (!timeString) {
    return null;
  }

  return new Date(timeString.replace(/-/g, '/'));
} // Date 转字符串
// type: date or datetime


function dateToString(date, type) {
  if (type === void 0) {
    type = 'date';
  }

  if (!date) {
    return '';
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var timeString = year + "-" + (0, _string.padZero)(month) + "-" + (0, _string.padZero)(day);

  if (type === 'datetime') {
    var hours = date.getHours();
    var minute = date.getMinutes();
    timeString += " " + (0, _string.padZero)(hours) + ":" + (0, _string.padZero)(minute);
  }

  return timeString;
}