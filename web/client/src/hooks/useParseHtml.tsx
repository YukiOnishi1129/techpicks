import hljs, { AutoHighlightResult } from "highlight.js";
import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
  Text,
} from "html-react-parser";
import { useCallback, useMemo } from "react";
import "highlight.js/styles/hybrid.css";

export const useParseHtml = () => {
  const options: HTMLReactParserOptions = useMemo(() => {
    return {
      replace(domNode: DOMNode) {
        if (domNode instanceof Element && domNode.name && domNode.children) {
          if (domNode.name === "iframe") return <></>;
          if (domNode.name === "img" && domNode?.attribs) {
            return (
              <img
                className="w-full h-auto"
                src={domNode.attribs.src}
                alt={domNode.attribs.alt}
              />
            );
          }
          if (domNode.name === "strong")
            return (
              <strong>
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </strong>
            );
          if (domNode.name === "pre") {
            let code = "";
            domNode.children[0] instanceof Element &&
              domNode.children[0].children.forEach((child) => {
                if (
                  child instanceof Element &&
                  child.children[0] instanceof Text
                ) {
                  code += child.children[0].data;
                }
                if (child instanceof Text) {
                  code += child.data;
                }
              });

            const highlightCode: AutoHighlightResult = hljs.highlightAuto(code);
            return (
              <pre>
                <code className="hljs">{parse(highlightCode.value)}</code>
              </pre>
            );
          }
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
          if (domNode.name === "h4")
            return (
              <h4 className="text-lg font-bold tracking-wide pb-4 pt-8">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </h4>
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
          if (domNode.name === "ol") {
            return (
              <ol className="list-decimal pl-8 py-2">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </ol>
            );
          }
          if (domNode.name === "a") {
            return (
              <a
                className="text-blue-500 hover:underline"
                href={domNode.attribs.href}
                target="_blank"
              >
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </a>
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
