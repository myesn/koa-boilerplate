import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
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
  return dayjs(date).format(format);
}

export default { getUTCDateTimeNow, getFormattedNow, getNow, format };
