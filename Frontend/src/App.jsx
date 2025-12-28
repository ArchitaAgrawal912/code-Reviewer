import { useState, useEffect } from 'react'
import axios from 'axios';
import CodeEditor from './components/codeEditor.jsx';
import ReviewDisplay from './components/ReviewDisplay.jsx';
import Sidebar from './components/sidebar.jsx';
import './App.css'

function App() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const [code, setCode] = useState(`function sum(){\nreturn 1+1;\n}`);
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState('');
  const [history, setHistory] = useState([]);
  const [improvedCode, setImprovedCode] = useState('');
  
  //Fetch the history in SideBar
  const fetchHistory =async()=>{
    try{
      const res=await axios.get(`${API_URL}/ai/history`);
      console.log("History from Server:", res.data);
      setHistory(res.data);
    }catch(error){
      console.log("Error fetching Load History", error);
    }
  };
  useEffect(()=>{
    fetchHistory();
  },[]);

  

  async function reviewCode() {
  setIsLoading(true); // Start loading
  try {
    
    const response = await axios.post(`${API_URL}/ai/get-review`, 
      { code }, 
      { timeout: 30000 } // Add a timeout (30s) so the user isn't stuck forever
    );
    setReview(response.data.reviewText);
    setImprovedCode(response.data.improvedCode);
  } catch (error) {
    console.error("Error fetching review:", error);
  } finally {
    setIsLoading(false); // Stop loading regardless of success/fail
  }
}
 // Handle clicking a history item
  const handleSelectReview = (item) => {
    setCode(item.code);
    setReview(item.reviewText);
    setImprovedCode(item.improvedCode || "// No improved code available");
  };

  const handleNewChat = () => {
    setCode(`function sum(){\n  return 1+1;\n}`); // Reset to default or empty string ""
    setReview(""); // Clear the AI review output
};


  return (
    <>
     <main>
      <Sidebar history={history} 
      onSelectReview={handleSelectReview} 
      onNewChat={handleNewChat}
      />
      <CodeEditor 
      code={code}
      setCode={setCode}
      reviewCode={reviewCode}
      isLoading={isLoading}
      />
      <ReviewDisplay 
  review={review} 
  improvedCode={improvedCode}
  originalCode={code}         
  isLoading={isLoading} 
/>
     </main>
    </>
  )
}


export default App
