import { createNamespace } from '../utils';

var _createNamespace = createNamespace('calendar'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

export { createComponent, bem, t };
export var ROW_HEIGHT = 64;
export function formatMonthTitle(date) {
  return t('monthTitle', date.getFullYear(), date.getMonth() + 1);
}
export function compareMonth(date1, date2) {
  var year1 = date1.getFullYear();
  var year2 = date2.getFullYear();
  var month1 = date1.getMonth();
  var month2 = date2.getMonth();

  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }

  return year1 > year2 ? 1 : -1;
}
export function compareDay(day1, day2) {
  var compareMonthResult = compareMonth(day1, day2);

  if (compareMonthResult === 0) {
    var date1 = day1.getDate();
    var date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }

  return compareMonthResult;
}
export function getDayByOffset(date, offset) {
  date = new Date(date);
  date.setDate(date.getDate() + offset);
  return date;
}
export function getPrevDay(date) {
  return getDayByOffset(date, -1);
}
export function getNextDay(date) {
  return getDayByOffset(date, 1);
}
export function calcDateNum(date) {
  var day1 = date[0].getTime();
  var day2 = date[1].getTime();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}
export function copyDate(dates) {
  return new Date(dates);
}
export function copyDates(dates) {
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