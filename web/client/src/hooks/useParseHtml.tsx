import parse, { HTMLReactParserOptions } from "html-react-parser";
import { useCallback, useMemo } from "react";

export const useParseHtml = () => {
  const options: HTMLReactParserOptions = useMemo(() => {
    return {
      replace(domNode) {
        // @ts-ignore
        if (domNode.name === "img") return <></>;
        // @ts-ignore
        if (domNode.name === "strong") return <p></p>;
      },
    };
  }, []);

  const convertParseHtml = useCallback(
    (description: string) => {
      return parse(description, options);
    },
    [options]
  );

  return { convertParseHtml };
};
