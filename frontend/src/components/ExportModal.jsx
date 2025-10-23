import React from "react";
export const ExportModal = ({ isOpen, onClose }) => (
  isOpen ? <div className="export-modal">Select Export Format</div> : null
);
