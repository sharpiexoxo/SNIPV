import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const OutputSyntaxHandler = ({ snippet }) => {
  const [codeLang, setCodeLang] = useState("");

  useEffect(() => {
    setCodeLang(snippet.folder.language.fileExtension?.syntaxHighlight);
  }, [snippet]);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div>
          <Text textTransform="uppercase" fontWeight="semibold" color="Orange">
            Output
          </Text>
        </div>
        {/*         <div className="px-4 bg-[#F5A524] rounded-t-2xl">
          <Text color="white" weight="semibold">{snippet.folder.language.fileExtension?.label}</Text>
        </div> */}
      </div>

      <div className="outputSyntaxStyle">
        <SyntaxHighlighter
          // language={codeLang}
          style={oneLight}
          className="p-0"
          // showLineNumbers={true}
          // wrapLongLinesLines={true}
          /*           lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }} */
        >
          {snippet.output}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default OutputSyntaxHandler;
