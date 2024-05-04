const ogs = require("open-graph-scraper");

export const useOgp = () => {
  const getOgpData = async (url: string) => {
    const options = { url: url };
    try {
      const { result } = await ogs(options);
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch OGP data: ${error}`);
    }
  };

  return { getOgpData };
};
