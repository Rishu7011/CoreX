import "./Sidebar.css";
import { useContext, useEffect } from "react";
import {MyContext} from "../MyContext.jsx";
import { v4 as uuidv4 } from 'uuid';
function Sidebar() {
   const {allThreads,setAllThreads,currThreadId,setNewChat,setPrompt,setReply,setCurrentThreadId,setPrevChats} = useContext(MyContext);
   const createNewChat = () => {
      setNewChat(true);
      setPrompt("");
      setReply(null);
      setCurrentThreadId(uuidv4());
      setPrevChats([]);
   }
   const changeThread = async(newThreadId) => {
      setCurrentThreadId(newThreadId);

      try{
         console.log("Fetching chats for thread:", newThreadId);
         const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
         const data = await response.json();
         setPrevChats(data);
         setNewChat(false);
         setReply(null);
      }catch(err){
         console.log(err);
      }
   }
   const deleteThread = async(threadId) => {
      try{
         const response = await fetch(`http://localhost:8080/api/thread/${threadId}`,{
            method: "DELETE"
         });
         if(response.ok){
            setAllThreads((prev) => prev.filter((thread) => thread.id !== threadId));
         }
         if(threadId === currThreadId){
            createNewChat();
         }
      }
      catch(err){
         console.log(err);
      }
   }
   const getAllThreads = async () => {
      try{
         const response = await fetch("http://localhost:8080/api/thread");
         const data = await response.json();
         const filteredData = data.map((thread) => ({
            id: thread.threadId,
            title: thread.title,
            createdAt: thread.createdAt,
            updatedAt: thread.updatedAt
         }));
         setAllThreads(filteredData);

      }catch(err){
         console.log(err);
      }
   }
   useEffect(() => {
      getAllThreads();
   }, [currThreadId])
    return ( 
        <>
        <section className="sidebar">
           {/* new chat Button */}
           <button onClick={createNewChat}>
            <img className="logo"  src="https://imgs.search.brave.com/OC4-UKgf1zeU4NZ8XcZs8i0AEfcUMfY8dTp4jnF5dMk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jaGF0/Z3B0YWlodWIuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIz/LzA2L0NoYXRHcHQt/TG9nby13aXRoLUJs/YWNrLUJhY2tncm91/bmQucG5n"></img>
            <span><i className="fa-solid fa-pen-to-square"></i></span>
           </button>

           {/* history */}
           <ul className="history">
            {
               allThreads && allThreads?.map((thread,idx) => (
                  <li key={idx}
                  onClick={() => {
                     changeThread(thread.id);
                  }}
                  >
                     <p>{thread.title}</p>
                     <i onClick={(e) => {
                         e.stopPropagation();
                         deleteThread(thread.id);
                     }} className="fa-solid fa-trash"></i>

                  </li>
               ))
            }
           </ul>

           {/* {Created by} */}
           <div className="created-by">
            <p>by Rishabh Negi</p>
            <p>Contact:<a href="https://www.linkedin.com/in/rishabh-negi-877360286/">linkedin</a></p>
           </div>
        </section>
        </>
     );
}

export default Sidebar;