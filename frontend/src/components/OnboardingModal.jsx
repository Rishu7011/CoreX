import React, { useState } from "react";
import Modal from "./Modal";
const STEPS = [
  { title: "Welcome to CoreX 👋", body: "Your AI-powered chat assistant." },
  { title: "Start a conversation 💬", body: "Click New Chat and type anything." },
  { title: "You are all set! 🚀", body: "Enjoy smarter conversations." },
];
const OnboardingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const cur = STEPS[step];
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={cur.title}>
      <p>{cur.body}</p>
      <div className="onboarding-actions">
        {step < STEPS.length - 1
          ? <button onClick={() => setStep((s) => s+1)}>Next →</button>
          : <button onClick={onClose}>Get Started</button>}
      </div>
    </Modal>
  );
};
export default OnboardingModal;