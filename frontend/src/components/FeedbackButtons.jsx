import React, { useState } from "react";
const FeedbackButtons = ({ onFeedback }) => {
  const [voted, setVoted] = useState(null);
  const vote = (t) => { setVoted(t); onFeedback?.(t); };
  return (
    <div className="feedback-buttons">
      <button className={`thumb-btn ${voted === "up" ? "active" : ""}`} onClick={() => vote("up")} disabled={!!voted}>👍</button>
      <button className={`thumb-btn ${voted === "down" ? "active" : ""}`} onClick={() => vote("down")} disabled={!!voted}>👎</button>
    </div>
  );
};
export default FeedbackButtons;