import "./ChatWindow.css"
import Chat from "../Chat/Chat.jsx"
import { MyContext } from "../MyContext.jsx";
import { useContext, useEffect, useState } from "react";
import { ScaleLoader } from 'react-spinners';
import { Link } from "react-router-dom";
import Login from "../LogIn/Login.jsx";
import { auth, googleProvider, } from "../firebase.js";
import { signOut } from "firebase/auth";
import { IoIosSettings } from "react-icons/io";
import { GrUpgrade } from "react-icons/gr";
import { PiSignOut } from "react-icons/pi";
import { v4 as uuidv4 } from 'uuid';






function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currentThreadId, setCurrentThreadId, prevChats, setPrevChats, setNewChat, loggedIn, setLoggedIn, setAllThreads } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrentThreadId(uuidv4());
        setPrevChats([]);
    };
    const handleSignOut = () => {
        signOut(auth).then(() => {
            setLoggedIn(false);
            cookieStore.delete('authToken');
            createNewChat();
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
                await fetch(`https://corex-9gzg.onrender.com/api/cleanup/${threadId}`, {
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
            const response = await fetch("https://corex-9gzg.onrender.com/api/userData", {
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
            const response = await fetch("https://corex-9gzg.onrender.com/api/chat", options)
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
                    <span className="Logo-Upgrade">
                        {!loggedIn && <img width="20%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADtUlEQVR4nO2cP4vUQBiHgzaC+B0OyxUrKysbywhXrIWdIpxioZWVwl5pdR9A0ELEwkqwsBOLaGG9cM2JooVYnGijhX8eCWRwWTbJzGSy8+7M+8BWG3aT55f8JpNNtigURVEUJRBABZyPvR7Zwn80iMgBaBBCAtAghASgQQgJQIMQEoBBgwgJ/lQaRNwADBrEEGjnG268As7F3p6No0PoFLgPHDoGUekR4UCHyLJ5aRCRA9AghARQahAyAig1CBkBlBqEjABKDUJGAKUGISOAUoOQEUCpQVjQIeA1cDtwEA/1EscSFgIOgD1gW4+IEXAQcAg8AS5pEAHBnZ/AC+CaBhEA4AzwCPjlKOAv8Ba4q0EEANgC7gFfcecg4DiRfRAngFvAe48gDgOOE9kHcQS40GxQzHFimnQQTf8f71nmLPAU+O0o4U/A+UR9VH10+O539Q5USKdZ2X3gtOBx4g7wyfJ7fgC7wLFiE1ha8R1h48Rl4KXDZz8HThabxIqN6K2kNYwT203v18ukUzeraNkgq0oaaT4RrG7q9wrp9GzcjsfnbTVd/x13voSqmyYYCulYbKh1JQUcJwbVjZGfSgBelRRonHA+u1mUn1IA3pUUaJywOrtZlp9aAIMqyXM+YX12s0p+TSEd/Nj3rSTLccJpMtUmP+UAglTSwjocBS4Cb1wnU13yawrpdKz7nsVEaB553Tvlb3oA9aToes9p5Eyy/BQCqF83O5Y5JVl+KgE8llQ/OMhPJYAPUuoHR/kpBFBfqWxjIl1+CgGIqB/65X9ONYDo9UO//PoK6tUUA4heP9jLL1MMIGr94CY/yQDaJmC7AuUnGUCU+sFPfjYBzIXKzyaAmVD52QQwESo/iwDmguVnEcAs0gz3isXNuw9yCGAibM+3umu6kE6M+mGYfKfb1YtEApgJkD/1eU6gkM466wc/+ck/oLGW+sFdftriDeuoH9zk5yHeMHb9YC8/L/GGMesHO/k3shRvGKt+6JdfPz/wLFvxhjHqB7sf0OsnY1xI819TQtcPnncvZLPHLxOyfggrP23xhlD1Qzj5eYg3hKgfwsjPS7xhaP0wXH6e4g1D6odh8vMWb/CtH/zlq/hFfOoHP/kqfhWu9YO7fBXfhUv94CZfxdtgWz8O8isV74BN/VjKr1S8B331YyG/UvED6KqfHvmVig9AW/10yK9UfEBW1U+L/ErFj8By/ayQr+LHZLF+luSr+HVg6mdBvopfJ3X9NPJVfAyaP0dN78duRVEURSnC8g8BNaetvZMUZwAAAABJRU5ErkJggg==" alt="dynamics-365"></img>
                        }
                        <span >CoreX  <i className="fa-solid fa-chevron-down"></i>
                        </span>
                    </span>
                    <div className="userIconDiv"><span >{loggedIn && user && (
                        <span
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }}
                        >
                            <img
                                src={user.avatar || "/default-avatar.png"} // ✅ fallback avatar
                                alt="user avatar"
                                className="userAvatar"
                                style={{ width: "35px", height: "35px", borderRadius: "50%" }}
                            />

                        </span>

                    )  }
                    </span></div>
                    {!loggedIn && (
                        <Link className="loginButton" to="/login">
                            <p >Login</p>
                        </Link>
                    )}

                </div>
                {loggedIn && isOpen && (<div className="dropdown-user" >
                    <Link to="/upgrade" className="dropdownItem"><GrUpgrade className="icons" />Upgrade plan</Link>
                    <div className="dropdownItem"><IoIosSettings className="icons" />Settings</div>
                    <div className="dropdownItem" onClick={handleSignOut}><PiSignOut className="icons" />Logout</div>
                </div>)
                }
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
                    <p>© 2025 | Created by Rishabh Negi | Contact: <a href="https://www.linkedin.com/in/rishabh-negi-877360286/" target="_blank" >Linkedin</a></p>
                </div>
            </div>
        </>
    );
}

export default ChatWindow;