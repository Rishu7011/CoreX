import React from "react";
export const ScreenReaderAnnouncer = ({ message }) => (
  <div className="sr-only" aria-live="polite">{message}</div>
);
