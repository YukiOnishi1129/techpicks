import dayjs, { Dayjs, locale, extend } from "dayjs";
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

export const getCurrentDate = () => {
  return getDayjsTz();
};

// 24時間前の日付を取得
export const get24HoursAgoDate = () => {
  return getDayjsTz().subtract(24, "hour");
};

export const getDateStartTime = (date: Dayjs) => {
  return date.startOf("day");
};

export const getDateEndTime = (date: Dayjs) => {
  return date.endOf("day");
};

export const convertUnixTime = (targetDate: dayjs.Dayjs) => {
  return targetDate.unix();
};
export const formatDateUTC = (date: Dayjs) => {
  return date.utc().format("YYYY-MM-DD HH:mm:ss");
};

export const formatDate = (date?: Dayjs | Date | string | null) => {
  return getDayjsTz(date).format("YYYY/MM/DD HH:mm:ss");
};

export const formatShowDateTime = (date?: Dayjs | Date | string | null) => {
  return getDayjsTz(date).format("YYYY年M月D日 H時m分");
};

export const diffHours = (nowUnixTime: number, targetUnixTime: number) => {
  const diff = nowUnixTime - targetUnixTime;
  return Math.floor(diff / 60 / 60);
};

export const diffDates = (nowUnixTime: number, targetUnixTime: number) => {
  const diff = nowUnixTime - targetUnixTime;
  return Math.floor(diff / 60 / 60 / 24);
};

export const showDiffDateToCurrentDate = (targetDate: Date) => {
  const convertedTargetDate = getDayjsTz(targetDate);
  const targetDateUnixTime = convertUnixTime(convertedTargetDate);
  const currentUnixTime = convertUnixTime(getDayjsTz());
  const diffHour = diffHours(currentUnixTime, targetDateUnixTime);

  if (diffHour < 24) {
    return `${diffHour} hour ago  (${convertedTargetDate.format("MMM DD 'YYYY")})`;
  }
  const date = diffDates(currentUnixTime, targetDateUnixTime);

  if (date / 24 < 1) {
    return `${date} days ago  (${convertedTargetDate.format("MMM DD 'YYYY")})`;
  }

  return `${date} days ago  (${convertedTargetDate.format("MMM DD 'YYYY")})`;
};
