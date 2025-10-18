import React from "react";
import UserProfileCard from "../components/UserProfileCard";
import ThemeToggle from "../components/ThemeToggle";
import ModeSelector from "../components/ModeSelector";
import { useAuthContext } from "../context/AuthContext";
const SettingsPage = () => {
  const { user } = useAuthContext();
  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <section className="settings-section">
        <h3>Profile</h3>
        <UserProfileCard user={user} />
      </section>
      <section className="settings-section">
        <h3>Appearance</h3>
        <ThemeToggle />
      </section>
      <section className="settings-section">
        <h3>Default AI Mode</h3>
        <ModeSelector value="default" onChange={() => {}} />
      </section>
    </div>
  );
};
export default SettingsPage;