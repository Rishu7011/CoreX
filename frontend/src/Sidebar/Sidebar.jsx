import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext.jsx";
import { v4 as uuidv4 } from 'uuid';
import { PiSquareSplitHorizontalBold } from "react-icons/pi";

function Sidebar() {
   const {
      allThreads, setAllThreads,
      currThreadId, setNewChat,
      setPrompt, setReply,
      setCurrentThreadId, setPrevChats,
      loggedIn, setLoggedIn
   } = useContext(MyContext);
   const [user, setUser] = useState(null);
   const [isOpen, setIsOpen] = useState(true);
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
                    "Authorization": `${authToken}`,
                },
            });
            const data = await response.json();
            
            if (response.ok && data.user) {
                await setUser(data.user); // ✅ store only the user object
                const _id = data.user._id;
                getAllThreads(_id);
            } else {
                console.error("Error fetching user data:", data);

                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
        }
    };
    const getAllThreads = async (_id) => {
      try {
         const response = await fetch("http://localhost:8080/api/thread",{
            method: "GET",
            headers: {
               "Authorization": `${_id}`
            }
         });
         const data = await response.json();
         const filteredData = data.map((thread) => ({
            id: thread.threadId,
            title: thread.title,
            createdAt: thread.createdAt,
            updatedAt: thread.updatedAt
         }));
         setAllThreads(filteredData);
      } catch (err) {
         console.log(err);
      }
   };


    useEffect(() => {
        getUserData();
    }, [])

   const createNewChat = () => {
      setNewChat(true);
      setPrompt("");
      setReply(null);
      setCurrentThreadId(uuidv4());
      setPrevChats([]);
   };

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
   }, [setLoggedIn]);

   const changeThread = async (newThreadId) => {
      setCurrentThreadId(newThreadId);
      try {
         const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
         const data = await response.json();
         setPrevChats(data);
         setNewChat(false);
         setReply(null);
      } catch (err) {
         console.log(err);
      }
   };

   const deleteThread = async (threadId) => {
      try {
         const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, {
            method: "DELETE"
         });
         if (response.ok) {
            setAllThreads((prev) => prev.filter((thread) => thread.id !== threadId));
         }
         if (threadId === currThreadId) {
            createNewChat();
         }
      } catch (err) {
         console.log(err);
      }
   };

   // useEffect(() => {
      
   // }, [currThreadId]);

   return (
      <>
         {loggedIn && (
            <section className={`sidebar ${isOpen ? "open" : "closed"}`}>
               {/* Header with New Chat Button and Toggle */}
               <button>
                  <img onClick={createNewChat} width="18%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADtUlEQVR4nO2cP4vUQBiHgzaC+B0OyxUrKysbywhXrIWdIpxioZWVwl5pdR9A0ELEwkqwsBOLaGG9cM2JooVYnGijhX8eCWRwWTbJzGSy8+7M+8BWG3aT55f8JpNNtigURVEUJRBABZyPvR7Zwn80iMgBaBBCAtAghASgQQgJQIMQEoBBgwgJ/lQaRNwADBrEEGjnG268As7F3p6No0PoFLgPHDoGUekR4UCHyLJ5aRCRA9AghARQahAyAig1CBkBlBqEjABKDUJGAKUGISOAUoOQEUCpQVjQIeA1cDtwEA/1EscSFgIOgD1gW4+IEXAQcAg8AS5pEAHBnZ/AC+CaBhEA4AzwCPjlKOAv8Ba4q0EEANgC7gFfcecg4DiRfRAngFvAe48gDgOOE9kHcQS40GxQzHFimnQQTf8f71nmLPAU+O0o4U/A+UR9VH10+O539Q5USKdZ2X3gtOBx4g7wyfJ7fgC7wLFiE1ha8R1h48Rl4KXDZz8HThabxIqN6K2kNYwT203v18ukUzeraNkgq0oaaT4RrG7q9wrp9GzcjsfnbTVd/x13voSqmyYYCulYbKh1JQUcJwbVjZGfSgBelRRonHA+u1mUn1IA3pUUaJywOrtZlp9aAIMqyXM+YX12s0p+TSEd/Nj3rSTLccJpMtUmP+UAglTSwjocBS4Cb1wnU13yawrpdKz7nsVEaB553Tvlb3oA9aToes9p5Eyy/BQCqF83O5Y5JVl+KgE8llQ/OMhPJYAPUuoHR/kpBFBfqWxjIl1+CgGIqB/65X9ONYDo9UO//PoK6tUUA4heP9jLL1MMIGr94CY/yQDaJmC7AuUnGUCU+sFPfjYBzIXKzyaAmVD52QQwESo/iwDmguVnEcAs0gz3isXNuw9yCGAibM+3umu6kE6M+mGYfKfb1YtEApgJkD/1eU6gkM466wc/+ck/oLGW+sFdftriDeuoH9zk5yHeMHb9YC8/L/GGMesHO/k3shRvGKt+6JdfPz/wLFvxhjHqB7sf0OsnY1xI819TQtcPnncvZLPHLxOyfggrP23xhlD1Qzj5eYg3hKgfwsjPS7xhaP0wXH6e4g1D6odh8vMWb/CtH/zlq/hFfOoHP/kqfhWu9YO7fBXfhUv94CZfxdtgWz8O8isV74BN/VjKr1S8B331YyG/UvED6KqfHvmVig9AW/10yK9UfEBW1U+L/ErFj8By/ayQr+LHZLF+luSr+HVg6mdBvopfJ3X9NPJVfAyaP0dN78duRVEURSnC8g8BNaetvZMUZwAAAABJRU5ErkJggg==" alt="dynamics-365"></img>
                  <PiSquareSplitHorizontalBold
                     onClick={() => setIsOpen(!isOpen)}
                     className="splitclose"
                     style={{ fontSize: "40px" }}
                  />
               </button>

               <div className="NewChat" onClick={createNewChat}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  <p>New Chat</p>
               </div>

               {/* Threads List */}
               <p className="chatP">Chats</p>
               <ul className="history">
                  {
                     allThreads && allThreads.map((thread, idx) => (
                        <li
                           key={idx}
                           onClick={() => changeThread(thread.id)}
                           className={thread.id === currThreadId ? "highlightChat" : ""}
                        >
                           <p>{thread.title}</p>
                           <i
                              className="fa-solid fa-trash"
                              onClick={(e) => {
                                 e.stopPropagation();
                                 deleteThread(thread.id);
                              }}
                           ></i>
                        </li>
                     ))
                  }
               </ul>

               {/* Footer */}
               <div className="created-by">
                  <p>by Rishabh Negi</p>
                  <p>Contact: <a href="https://www.linkedin.com/in/rishabh-negi-877360286/">linkedin</a></p>
               </div>
            </section>
         )}

         {/* Toggle Button When Sidebar is Closed */}
         {loggedIn && !isOpen && (
            <div className="sliderClose">
               <PiSquareSplitHorizontalBold
                  onClick={() => setIsOpen(!isOpen)}
                  className="splitopen"
                  style={{ fontSize: "40px" }}
               />
               <div className="NewChat"><i className="fa-solid fa-pen-to-square"></i></div>
            </div>
         )}
      </>
   );
}

export default Sidebar;
