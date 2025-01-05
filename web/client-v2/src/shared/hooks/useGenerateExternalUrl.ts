export const useGenerateExternalUrl = (url: string) => {
  let newUrl: URL | undefined = undefined;
  try {
    newUrl = new URL(url);
  } catch (e) {
    console.log(`Invalid URL at ShareLinks components: ${url}`);
  }
  return newUrl;
};
