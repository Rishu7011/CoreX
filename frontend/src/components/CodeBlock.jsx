import React from "react";
import CopyButton from "./CopyButton";
const CodeBlock = ({ code, language }) => (
  <div className="code-block">
    <div className="code-block-header">
      <span className="code-language">{language || "code"}</span>
      <CopyButton text={code} />
    </div>
    <pre className="code-content"><code>{code}</code></pre>
  </div>
);
export default CodeBlock;