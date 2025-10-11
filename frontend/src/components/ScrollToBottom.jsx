import React, { useEffect, useRef } from "react";
const ScrollToBottom = ({ trigger }) => {
  const ref = useRef(null);
  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [trigger]);
  return <div ref={ref} />;
};
export default ScrollToBottom;