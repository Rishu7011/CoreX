import './App.css'
import Sidebar from "./Sidebar/Sidebar.jsx"
import ChatWindow from "./ChatWindow/ChatWindow.jsx"
import {MyContext} from "../src/MyContext.jsx"
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [prompt, setPrompt]= useState("");
  const [reply, setReply] = useState(null);
  const [currentThreadId, setCurrentThreadId] = useState(uuidv4());
  const [prevChats, setPrevChats]= useState([]);
  const [newChat, setNewChat] = useState(true);
  const providerValues = {
    prompt,setPrompt,
    reply,setReply,
    currentThreadId,setCurrentThreadId,
    prevChats,setPrevChats,
    newChat,setNewChat
  };

  return (
    <div className='app'>
      
      <MyContext.Provider value={providerValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
     
    </div>
  )
}

export default App
