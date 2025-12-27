import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css";
import prism from 'prismjs';
import Editor from "react-simple-code-editor";
import axios from 'axios';
import Markdown from "react-markdown";
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";

import './App.css'

function App() {

  const [code, setCode] = useState(`function sum(){
    return 1+1;
  }`)
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState('');

  useEffect(()=>{
    prism.highlightAll();
  },[])

  async function reviewCode() {
  setIsLoading(true); // Start loading
  try {
    // 2. Use Environment Variable for the URL
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    
    const response = await axios.post(`${API_URL}/ai/get-review`, 
      { code }, 
      { timeout: 30000 } // 3. Add a timeout (30s) so the user isn't stuck forever
    );
    setReview(response.data);
  } catch (error) {
   
    console.error("Error fetching review:", error);
  } finally {
    setIsLoading(false); // Stop loading regardless of success/fail
  }
}

  return (
    <>
     <main>
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
          />
          </div>
          <button 
          className="review"
          onClick={reviewCode}
          >Review Code</button>
        
      </div>
      <div className="right">
        { isLoading? (<h3>Processing Your Code...</h3>): <Markdown rehypePlugins={( rehypeHighlight)}>{review}</Markdown> }

      </div>
     </main>
    </>
  )
}


export default App
