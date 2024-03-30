import dayjs, { locale, unix } from "dayjs";
import ja from "dayjs/locale/ja";

locale(ja);

export const getCurrentDate = () => {
  return dayjs();
};

export const convertUnixTime = (targetDate: dayjs.Dayjs) => {
  return targetDate.unix();
};

export const formatDate = (timestamp: number) => {
  return unix(timestamp).format("YYYY/MM/DD HH:mm:ss");
};

export const formatShowDateTime = (timestamp: number) => {
  return unix(timestamp).format("YYYY年M月DD日 H時m分");
};

export const diffHours = (nowUnixTime: number, targetUnixTime: number) => {
  const diff = nowUnixTime - targetUnixTime;
  return Math.floor(diff / 60 / 60);
};

export const diffDates = (nowUnixTime: number, targetUnixTime: number) => {
  const diff = nowUnixTime - targetUnixTime;
  return Math.floor(diff / 60 / 60 / 24);
};

export const showDiffDateToCurrentDate = (targetDate: number) => {
  const currentUnixTime = convertUnixTime(getCurrentDate());
  const diffHour = diffHours(currentUnixTime, targetDate);

  if (diffHour < 24) {
    return `${diffHour}時間前  (${formatShowDateTime(targetDate)})`;
  }
  const date = diffDates(currentUnixTime, targetDate);
  return `${date % 24}日前  (${formatShowDateTime(targetDate)})`;
};
