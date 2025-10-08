import './App.css'
import Sidebar from "./Sidebar/Sidebar.jsx"
import ChatWindow from "./ChatWindow/ChatWindow.jsx"
// import MyContext from "./MyContext.jsx"


function App() {
  const providerValues = {};

  return (
    <div className='app'>
      
      <Sidebar></Sidebar>
      <ChatWindow></ChatWindow>
     
    </div>
  )
}

export default App
