import dayjs, { Dayjs, locale, extend } from "dayjs";
import ja from "dayjs/locale/ja";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

locale(ja);
extend(utc);
extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const getDayjsTz = (date?: Dayjs | Date | string | null) => {
  if (!!date) {
    const convertedDate = new Date(date as Date);
    return dayjs.tz(convertedDate);
  }
  return dayjs.tz();
};

export const getCurrentDate = () => {
  return getDayjsTz();
};

export const convertUnixTime = (targetDate: dayjs.Dayjs) => {
  return targetDate.unix();
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
    return `${diffHour}時間前  (${convertedTargetDate.format("YYYY年M月DD日 H時m分")})`;
  }
  const date = diffDates(currentUnixTime, targetDateUnixTime);
  return `${date % 24}日前  (${convertedTargetDate.format("YYYY年M月DD日 H時m分")})`;
};
