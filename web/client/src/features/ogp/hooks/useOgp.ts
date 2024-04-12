const ogs = require("open-graph-scraper");

type OgpResponseType = {
  ogTitle: string;
};

export const useOgp = () => {
  const getOgpData = async (url: string) => {
    const options = { url: url };
    try {
      const { result } = await ogs(options);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch OGP data");
    }
  };

  return { getOgpData };
};
