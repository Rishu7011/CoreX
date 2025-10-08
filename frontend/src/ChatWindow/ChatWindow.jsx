import "./ChatWindow.css"
import Chat from "../Chat/Chat.jsx"
import { MyContext } from "../MyContext.jsx";
import { useContext, useState } from "react";
import {ScaleLoader} from 'react-spinners';

function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currentThreadId, setCurrentThreadId } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const getReply = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currentThreadId,
            })

        }
        try {
            setLoading(true);
            const response =await fetch("http://localhost:8080/api/chat", options)
            const res = await response.json(); 
            setReply(res.reply);
            console.log("Received reply:", res.reply);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching reply:", error);
        }
    }
    return (
        <>
            <div className="chatWindow">
                <div className="navbar">
                    <span >BYTEBUDDY  <i className="fa-solid fa-chevron-down"></i></span>
                    <div className="userIconDiv"><span ><i className="userIcon fa-solid fa-circle-user"></i></span></div>
                </div>
                <Chat></Chat>
                {loading && <div className="loaderDiv"><ScaleLoader color="#fff"></ScaleLoader></div>}
                <div className="chatInput">
                    <div className="inputBox">
                        <input placeholder="Ask anything"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (prompt===""){
                                    return;
                                }
                                if (e.key === "Enter") {
                                    getReply();
                                }
                            }}
                        />
                        <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                    </div>
                    <p className="info">
                        BYTEBUDDY can make mistakes. check important info. See cookie Preferences.
                    </p>
                </div>
            </div>
        </>
    );
}

export default ChatWindow;