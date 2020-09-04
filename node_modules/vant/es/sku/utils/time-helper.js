import { padZero } from '../../utils/format/string'; // 字符串转 Date
// 只处理 YYYY-MM-DD 或者 YYYY-MM-DD HH:MM 格式

export function stringToDate(timeString) {
  if (!timeString) {
    return null;
  }

  return new Date(timeString.replace(/-/g, '/'));
} // Date 转字符串
// type: date or datetime

export function dateToString(date, type) {
  if (type === void 0) {
    type = 'date';
  }

  if (!date) {
    return '';
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var timeString = year + "-" + padZero(month) + "-" + padZero(day);

  if (type === 'datetime') {
    var hours = date.getHours();
    var minute = date.getMinutes();
    timeString += " " + padZero(hours) + ":" + padZero(minute);
  }

  return timeString;
}