import { locale, unix } from "dayjs";
import ja from "dayjs/locale/ja";

locale(ja);

export const formatDate = (timestamp: number) => {
  return unix(timestamp).format("YYYY/MM/DD HH:mm:ss");
};
