import { CATEGORY_TYPE_LIST } from "../constants/category";

export const useCategory = () => {
  const showCategoryTypeName = (type: number) => {
    return CATEGORY_TYPE_LIST.find((item) => item.id === type)?.name;
  };

  return {
    showCategoryTypeName,
  };
};
