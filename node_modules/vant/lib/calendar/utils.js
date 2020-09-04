"use strict";

exports.__esModule = true;
exports.formatMonthTitle = formatMonthTitle;
exports.compareMonth = compareMonth;
exports.compareDay = compareDay;
exports.getDayByOffset = getDayByOffset;
exports.getPrevDay = getPrevDay;
exports.getNextDay = getNextDay;
exports.calcDateNum = calcDateNum;
exports.copyDate = copyDate;
exports.copyDates = copyDates;
exports.ROW_HEIGHT = exports.t = exports.bem = exports.createComponent = void 0;

var _utils = require("../utils");

var _createNamespace = (0, _utils.createNamespace)('calendar'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

exports.t = t;
exports.bem = bem;
exports.createComponent = createComponent;
var ROW_HEIGHT = 64;
exports.ROW_HEIGHT = ROW_HEIGHT;

function formatMonthTitle(date) {
  return t('monthTitle', date.getFullYear(), date.getMonth() + 1);
}

function compareMonth(date1, date2) {
  var year1 = date1.getFullYear();
  var year2 = date2.getFullYear();
  var month1 = date1.getMonth();
  var month2 = date2.getMonth();

  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }

  return year1 > year2 ? 1 : -1;
}

function compareDay(day1, day2) {
  var compareMonthResult = compareMonth(day1, day2);

  if (compareMonthResult === 0) {
    var date1 = day1.getDate();
    var date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }

  return compareMonthResult;
}

function getDayByOffset(date, offset) {
  date = new Date(date);
  date.setDate(date.getDate() + offset);
  return date;
}

function getPrevDay(date) {
  return getDayByOffset(date, -1);
}

function getNextDay(date) {
  return getDayByOffset(date, 1);
}

function calcDateNum(date) {
  var day1 = date[0].getTime();
  var day2 = date[1].getTime();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}

function copyDate(dates) {
  return new Date(dates);
}

function copyDates(dates) {
  if (Array.isArray(dates)) {
    return dates.map(function (date) {
      if (date === null) {
        return date;
      }

      return copyDate(date);
    });
  }

  return copyDate(dates);
}