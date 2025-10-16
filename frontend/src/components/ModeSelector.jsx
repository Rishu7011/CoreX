import React from "react";
const MODES = [{ id:"default",label:"🤖 Default"},{ id:"coder",label:"💻 Coder"},{ id:"writer",label:"✍️ Writer"},{ id:"analyst",label:"📊 Analyst"}];
const ModeSelector = ({ value, onChange }) => (
  <div className="mode-selector">
    {MODES.map((m) => (
      <button key={m.id} className={`mode-btn ${value === m.id ? "active" : ""}`} onClick={() => onChange(m.id)}>{m.label}</button>
    ))}
  </div>
);
export default ModeSelector;