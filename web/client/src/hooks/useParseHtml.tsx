import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
} from "html-react-parser";
import { useCallback, useMemo } from "react";

export const useParseHtml = () => {
  const options: HTMLReactParserOptions = useMemo(() => {
    return {
      replace(domNode: DOMNode) {
        if (domNode instanceof Element && domNode.name && domNode.children) {
          if (domNode.name === "img" || domNode.name === "iframe") return <></>;
          if (domNode.name === "strong")
            return (
              <p>
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </p>
            );
          if (domNode.name === "pre") return <></>;
          if (domNode.name === "h2")
            return (
              <h2 className="text-2xl font-bold tracking-wide pb-4 pt-8">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </h2>
            );
          if (domNode.name === "h3")
            return (
              <h3 className="text-xl font-bold tracking-wide pb-4 pt-8">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </h3>
            );
          if (domNode.name === "blockquote")
            return (
              <blockquote className="border-l-4 border-gray-500 pl-4 py-2">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </blockquote>
            );
          if (domNode.name === "p")
            return (
              <p className="text-lg tracking-wide py-2">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </p>
            );
          if (domNode.name === "ul") {
            return (
              <ul className="list-disc pl-8 py-2">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </ul>
            );
          }
          if (domNode.name === "code") {
            return (
              <code className="bg-gray-200 text-lg rounded-basic">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </code>
            );
          }
        }
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
