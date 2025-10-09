import './App.css'
import Sidebar from "./Sidebar/Sidebar.jsx"
import ChatWindow from "./ChatWindow/ChatWindow.jsx"
import Login from "./LogIn/Login.jsx"
import { MyContext } from "../src/MyContext.jsx"
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currentThreadId, setCurrentThreadId] = useState(uuidv4());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currentThreadId, setCurrentThreadId,
    allThreads, setAllThreads,
    prevChats, setPrevChats,
    user, setUser,
    newChat, setNewChat,
    loggedIn, setLoggedIn
  };

  return (
    <MyContext.Provider value={providerValues}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<div className='app'>
            <Sidebar />
            <ChatWindow />
          </div>}

        />
      </Routes>
    </MyContext.Provider>
  )
}

export default App
