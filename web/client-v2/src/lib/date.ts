import dayjs, { locale, extend, Dayjs, unix } from "dayjs";
import en from "dayjs/locale/en";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

locale(en);
extend(utc);
extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const getDayjsTz = (date?: Dayjs | Date | string | null) => {
  if (!!date) {
    const convertedDate = new Date(date as Date);
    return dayjs(convertedDate).tz();
  }
  return dayjs().tz();
};

export const convertUnixTimeToDayjs = (unixTime: number) => {
  return unix(unixTime);
};

export const convertUnixTime = (targetDate: dayjs.Dayjs) => {
  return targetDate.unix();
};

export const diffHours = (nowUnixTime: number, targetUnixTime: number) => {
  const diff = nowUnixTime - targetUnixTime;
  return Math.floor(diff / 60 / 60);
};

export const diffDates = (nowUnixTime: number, targetUnixTime: number) => {
  const diff = nowUnixTime - targetUnixTime;
  return Math.floor(diff / 60 / 60 / 24);
};

export const showDiffDateToCurrentDate = (targetDateUnix: number) => {
  const currentUnixTime = convertUnixTime(getDayjsTz());
  const targetUnixTimeDay = convertUnixTimeToDayjs(currentUnixTime);
  const diffHour = diffHours(currentUnixTime, targetDateUnix);

  if (diffHour < 24) {
    return `${diffHour} hour ago  (${targetUnixTimeDay.format("MMM DD 'YYYY")})`;
  }
  const date = diffDates(currentUnixTime, targetDateUnix);

  if (date / 24 < 1) {
    return `${date} days ago  (${targetUnixTimeDay.format("MMM DD 'YYYY")})`;
  }

  return `${date} days ago  (${targetUnixTimeDay.format("MMM DD 'YYYY")})`;
};
