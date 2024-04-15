export const checkJapaneseText = (text: string): boolean => {
  const gmi = "gmi";
  const regeIncludeHiragana = "^(?=.*[\u3041-\u3096]).*$";
  const regeIncludeKatakana = "^(?=.*[\u30A1-\u30FA]).*$";
  const regeIncludeKanji = "^(?=.*[\u4E00-\u9FFF]).*$";
  const regeHiragana = new RegExp(regeIncludeHiragana, gmi);
  const regeKatakana = new RegExp(regeIncludeKatakana, gmi);
  const regeKanji = new RegExp(regeIncludeKanji, gmi);

  return (
    regeHiragana.test(text) || regeKatakana.test(text) || regeKanji.test(text)
  );
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
