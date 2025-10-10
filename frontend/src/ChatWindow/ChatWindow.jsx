import "./ChatWindow.css"
import Chat from "../Chat/Chat.jsx"
import { MyContext } from "../MyContext.jsx";
import { useContext, useEffect, useState } from "react";
import { ScaleLoader } from 'react-spinners';
import { Link } from "react-router-dom";
import Login from "../LogIn/Login.jsx";
import { auth, googleProvider, } from "../firebase.js";
import { signOut } from "firebase/auth";


function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currentThreadId, setCurrentThreadId, prevChats, setPrevChats, setNewChat, loggedIn, setLoggedIn, } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const handleSignOut = () => {
        signOut(auth).then(() => {
            setLoggedIn(false);
            cookieStore.remove('authToken');
        }).catch((error) => {
            console.error("Sign Out Error:", error);
        });
    }
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? match[2] : null;
    };
    useEffect(() => {
        const authToken = getCookie("authToken");
        if (authToken) {
            return;
        } else {
            const handleUnload = async (threadId) => {
                await fetch(`http://localhost:5000/api/cleanup/${threadId}`, {
                    method: "DELETE"
                });
            };
            window.addEventListener("beforeunload", handleUnload);

            return () => {
                window.removeEventListener("beforeunload", handleUnload);
            };
        }
    }, []);
    const getUserData = async () => {
        const authToken = getCookie("authToken");
        if (!authToken) {
            setLoggedIn(false);
            return;
        }
        setLoggedIn(true);
        try {
            const response = await fetch("http://localhost:8080/api/userData", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
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
    },[])

    const getReply = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currentThreadId,
                token: getCookie("authToken") || "",
            })

        }
        try {
            setLoading(true);
            setNewChat(false);
            const response = await fetch("http://localhost:8080/api/chat", options)
            const res = await response.json();
            setReply(res.reply);
            console.log("Received reply:", res.reply);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching reply:", error);
            setLoading(false);
        }
    }

    //Append the new message and reply to the chat history
    useEffect(() => {
        if (prompt && reply) {
            setPrevChats((prevChats) => [...prevChats, {
                role: "user",
                content: prompt
            },
            {
                role: "assistant",
                content: reply
            }])
        }
        setPrompt("");
    }, [reply])

    useEffect(() => {
        const authToken = getCookie("authToken");
        if (!authToken) {
            setLoggedIn(false);
            return;
        }
        setLoggedIn(true);
    }, [setLoggedIn])

    return (
        <>
            <div className="chatWindow">
                <div className="navbar">
                    <span >CoreX  <i className="fa-solid fa-chevron-down"></i></span>
                    <div className="userIconDiv"><span >{loggedIn && user ? (
                        <span>
                            <img
                                src={user.avatar || "/default-avatar.png"} // ✅ fallback avatar
                                alt="user avatar"
                                className="userAvatar"
                                style={{ width: "35px", height: "35px", borderRadius: "50%" }}
                            />
                            <div onClick={handleSignOut}>logout</div>
                        </span>
                    ) : (
                        <p>
                            <Link style={{ textDecoration: "none", color: "#0D0D0D" }} to="/login">
                                Login
                            </Link>
                        </p>
                    )}
                    </span></div>

                </div>
                <Chat></Chat>
                {loading && <div className="loaderDiv"><ScaleLoader color="#fff"></ScaleLoader></div>}
                <div className="chatInput">
                    <div className="inputBox">
                        <input placeholder="Ask anything"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (prompt === "") {
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
                        CoreX can make mistakes. check important info. See cookie Preferences.
                    </p>
                </div>
            </div>
        </>
    );
}

export default ChatWindow;