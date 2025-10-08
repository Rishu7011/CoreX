import "./ChatWindow.css"
import Chat from "../Chat/Chat.jsx"

function ChatWindow() {
    return ( 
        <>
        <div className="chatWindow">
            <div className="navbar">
                <span >BYTEBUDDY  <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv"><span ><i className="userIcon fa-solid fa-circle-user"></i></span></div>
            </div>
            <Chat></Chat>
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything"></input>
                    <div id="submit"><i class="fa-solid fa-paper-plane"></i></div>
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