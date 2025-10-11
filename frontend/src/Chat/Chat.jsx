import "./Chat.css"
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/atom-one-dark.css';

function Chat() {
    const { newChat, prevChats, reply , loggedIn , setLoggedIn } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        //latestReply is the last message in prevChats with role "assistant"
        if (reply === null) {
            setLatestReply(null);
            return;
        }
        if (!prevChats?.length) return;
        const content = reply.split(" "); //individual words
        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx).join(" "));
            idx++;
            if (idx > content.length) clearInterval(interval);
        }, 40);
        return () => clearInterval(interval);
    }, [prevChats, reply])
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? match[2] : null;
    };
    useEffect(() => {
        const authToken = getCookie("authToken");
        if (!authToken) {
            setLoggedIn(false);
            return;
        }
        setLoggedIn(true);
    }, [setLoggedIn])
    const getUserData = async () => {
        const authToken = getCookie("authToken");
        if (!authToken) {
            setLoggedIn(false);
            return;
        }
        setLoggedIn(true);
        try {
            const response = await fetch("https://corex-1.onrender.com/userData", {
                method: "GET",
                headers: {
                    "Authorization": `${authToken}`,
                },
            });
            const data = await response.json();
            if (response.ok && data.user) {
                setUser(data.user); // ✅ store only the user object
            } else {
                console.error("Error fetching user data:", data);

                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        getUserData();
    }, [])
    
    return (
        <>
            {newChat && <h1>{loggedIn ? (<p>Good to see you, {user?.name}.</p>) :(<p>Start a New Chat</p>)}</h1>}
            <div className="chats">
                {
                    prevChats?.slice(0, -1).map((chat, idx) => (
                        <div key={idx} className={chat.role === "user" ? "userDiv" : "gptDiv"}>
                            {
                                chat.role === "user" ?
                                    <p className="userMessage">{chat.content}</p> :
                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                            }
                        </div>
                    ))
                }
                {
                    prevChats.length > 0 && (
                        <>
                            {
                                latestReply === null ? (<div className="gptDiv" key={"non-typing"}>
                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length - 1].content}</ReactMarkdown>
                                </div>) :
                                    (<div className="gptDiv" key={"typing"}>
                                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                                    </div>)
                            }</>
                    )
                }

            </div>
        </>
    );
}

export default Chat;