import React, { useState } from "react";
import debounce from "../utils/debounce";
const SearchBar = ({ onSearch, placeholder = "Search chats..." }) => {
  const [value, setValue] = useState("");
  const ds = debounce(onSearch, 300);
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input type="search" className="search-input" placeholder={placeholder} value={value}
        onChange={(e) => { setValue(e.target.value); ds(e.target.value); }} />
    </div>
  );
};
export default SearchBar;