import React, { useState, useRef } from "react";
const ResizablePanel = ({ children, defaultWidth = 260, minWidth = 180, maxWidth = 400 }) => {
  const [width, setWidth] = useState(defaultWidth);
  const drag = useRef(false);
  return (
    <div className="resizable-panel" style={{ width }}
      onMouseMove={(e) => drag.current && setWidth((w) => Math.min(maxWidth, Math.max(minWidth, w + e.movementX)))}
      onMouseUp={() => (drag.current = false)}>
      {children}
      <div className="resize-handle" onMouseDown={() => (drag.current = true)} />
    </div>
  );
};
export default ResizablePanel;