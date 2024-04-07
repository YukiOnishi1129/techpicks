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
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="h-auto w-full"
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
                {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
                <code className="hljs">{parse(highlightCode.value)}</code>
              </pre>
            );
          }
          if (domNode.name === "h2")
            return (
              <h2 className="pb-4 pt-8 text-2xl font-bold tracking-wide">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </h2>
            );
          if (domNode.name === "h3")
            return (
              <h3 className="pb-4 pt-8 text-xl font-bold tracking-wide">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </h3>
            );
          if (domNode.name === "h4")
            return (
              <h4 className="pb-4 pt-8 text-lg font-bold tracking-wide">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </h4>
            );
          if (domNode.name === "blockquote")
            return (
              <blockquote className="border-l-4 border-gray-500 py-2 pl-4">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </blockquote>
            );
          if (domNode.name === "p")
            return (
              <p className="py-2 text-lg tracking-wide">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </p>
            );
          if (domNode.name === "ul") {
            return (
              <ul className="list-disc py-2 pl-8">
                {domToReact(
                  (domNode as Element).children as DOMNode[],
                  options
                )}
              </ul>
            );
          }
          if (domNode.name === "ol") {
            return (
              <ol className="list-decimal py-2 pl-8">
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
              <code className="rounded bg-gray-200 text-lg">
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
