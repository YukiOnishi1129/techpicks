import dayjs, { Dayjs, locale, unix } from "dayjs";
import ja from "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.locale(ja);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const getDayjsTz = (date?: Dayjs | Date | string | null) => {
  return dayjs.tz(date);
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
  // const targetDateUnixTime = targetDate.getTime();

  const targetDateUnixTime = convertUnixTime(getDayjsTz(targetDate.toString()));
  const currentUnixTime = convertUnixTime(getDayjsTz());
  const diffHour = diffHours(currentUnixTime, targetDateUnixTime);

  if (diffHour < 24) {
    return `${diffHour}時間前  (${getDayjsTz(targetDate.toString()).format("YYYY年M月DD日 H時m分")})`;
  }
  const date = diffDates(currentUnixTime, targetDateUnixTime);
  return `${date % 24}日前  (${getDayjsTz(targetDate.toString())})`;
};
