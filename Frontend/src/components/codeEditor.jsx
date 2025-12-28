import { useEffect } from "react";
import Editor from "react-simple-code-editor";
import prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css";

const CodeEditor = ({ code, setCode, reviewCode, isLoading }) => {
   useEffect(()=>{
    prism.highlightAll();
  },[])

return (
<div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.js, 'js')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
            onKeyDown={(e) => { if ((e.ctrlKey||e.metaKey) && e.key === 'Enter') reviewCode(); }}
          />
          </div>
          <button 
          className="review"
          onClick={reviewCode}
          disabled={isLoading}
          >Review Code</button>
        
      </div>
      )
};

export default CodeEditor;