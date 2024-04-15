export const checkJapaneseText = (text: string): boolean => {
  return text.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/)
    ? true
    : false;
};

export const checkJapaneseArticle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}): boolean => {
  return checkJapaneseText(title) || checkJapaneseText(description);
};
