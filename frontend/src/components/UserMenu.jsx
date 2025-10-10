import React, { useState } from "react";
import Avatar from "./Avatar";
const UserMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="user-menu">
      <button className="user-menu-trigger" onClick={() => setOpen((o) => !o)}>
        <Avatar src={user?.avatar} name={user?.name} size={32} />
      </button>
      {open && (
        <div className="user-menu-dropdown">
          <p className="user-name">{user?.name}</p>
          <p className="user-email">{user?.email}</p>
          <button className="logout-btn" onClick={onLogout}>Sign out</button>
        </div>
      )}
    </div>
  );
};
export default UserMenu;