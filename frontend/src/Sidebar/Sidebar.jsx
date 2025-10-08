import "./Sidebar.css";
function Sidebar() {
    return ( 
        <>
        <section className="sidebar">
           {/* new chat Button */}
           <button>
            <img className="logo"  src="https://imgs.search.brave.com/OC4-UKgf1zeU4NZ8XcZs8i0AEfcUMfY8dTp4jnF5dMk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jaGF0/Z3B0YWlodWIuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIz/LzA2L0NoYXRHcHQt/TG9nby13aXRoLUJs/YWNrLUJhY2tncm91/bmQucG5n"></img>
            <span><i className="fa-solid fa-pen-to-square"></i></span>
           </button>

           {/* history */}
           <ul className="history">
            <li>history1</li>
            <li>history1</li>
            <li>history1</li>
            <li>history1</li>
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