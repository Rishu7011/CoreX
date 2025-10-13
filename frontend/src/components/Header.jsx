import React from "react";
import ThemeToggle from "./ThemeToggle";
const Header = ({ title = "CoreX", rightSlot }) => (
  <header className="app-header">
    <h1 className="header-title">{title}</h1>
    <div className="header-right">{rightSlot}<ThemeToggle /></div>
  </header>
);
export default Header;