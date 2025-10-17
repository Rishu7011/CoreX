import React from "react";
import Modal from "./Modal";
const SHORTCUTS = [
  { keys: "Enter", action: "Send message" },
  { keys: "Shift + Enter", action: "New line in input" },
  { keys: "Ctrl + K", action: "Open new chat" },
  { keys: "Esc", action: "Close modal" },
];
const KeyboardShortcutsModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Keyboard Shortcuts">
    <table className="shortcuts-table">
      <tbody>{SHORTCUTS.map((s) => (<tr key={s.keys}><td><kbd>{s.keys}</kbd></td><td>{s.action}</td></tr>))}</tbody>
    </table>
  </Modal>
);
export default KeyboardShortcutsModal;