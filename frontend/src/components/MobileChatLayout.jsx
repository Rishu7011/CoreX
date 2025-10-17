import React, { useState } from "react";
import Drawer from "./Drawer";
import useMediaQuery from "../hooks/useMediaQuery";
const MobileChatLayout = ({ sidebar, main }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  if (!isMobile) return <div className="desktop-layout">{sidebar}{main}</div>;
  return (
    <div className="mobile-layout">
      <button className="menu-btn" onClick={() => setDrawerOpen(true)}>☰</button>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>{sidebar}</Drawer>
      {main}
    </div>
  );
};
export default MobileChatLayout;