import dayjs, { ManipulateType, OpUnitType, QUnitType } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";
import 'dayjs/locale/zh';

dayjs.locale('zh');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.tz.setDefault("Asia/Shanghai");

// console.log(dayjs.tz.guess());

function getFormattedNow(): string {
  return getNow("YYYY-MM-DD HH:mm:ss");
}

function getNow(format: string): string {
  return dayjs().format(format);
}

function getUTCDateTimeNow(): string {
  return dayjs.utc().format();
}

function format(date: Date, format: string) {
  if (date == null) {
    return null;
  }

  return dayjs(date).format(format);
}

function isSameDay(date1: Date, date2: Date) {
  return dayjs(date1).isSame(dayjs(date2), "day");
}

function add(date: Date, value: number, unit?: ManipulateType) {
  return dayjs(date).add(value, unit);
}

function offsetDay(date: Date, value: number) {
  return add(date, value, "day");
}

function beginOfDay(date: Date) {
  return dayjs(date).startOf("day");
}

/** 返回指定单位下两个日期时间之间的差异 https://day.js.org/docs/zh-CN/display/difference */
function diff(date1: Date, date2: Date, unit?: QUnitType | OpUnitType) {
  return dayjs(date1).diff(date2, unit);
}

function toDayjs(date: dayjs.ConfigType, format?: dayjs.OptionType) {
  return dayjs(date, format);
}

export default {
  getUTCDateTimeNow,
  getFormattedNow,
  getNow,
  format,
  isSameDay,
  add,
  offsetDay,
  beginOfDay,
  diff,
  toDayjs,
};
