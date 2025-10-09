import './App.css';
import Sidebar from "./Sidebar/Sidebar.jsx";
import ChatWindow from "./ChatWindow/ChatWindow.jsx";
import { MyContext } from "../src/MyContext.jsx";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './LogIn/Login.jsx';

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currentThreadId, setCurrentThreadId] = useState(uuidv4());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currentThreadId, setCurrentThreadId,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    newChat, setNewChat
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={providerValues}>
        <Routes>

          {/* ✅ Main Chat Page */}
          <Route path="/" element={
            <div className='app'>
              <Sidebar />
              <ChatWindow />
            </div>
          } />

          {/* ✅ Login Page */}
          <Route path="/login" element={<Login />} />

        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
