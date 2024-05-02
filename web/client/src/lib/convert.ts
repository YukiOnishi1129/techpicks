export const diffStringArray = ({
  originArray,
  compareArray,
}: {
  originArray: string[];
  compareArray: string[];
}) => {
  return originArray.filter((origin) => !compareArray.includes(origin));
};
