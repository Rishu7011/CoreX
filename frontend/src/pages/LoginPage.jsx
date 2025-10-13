import React from "react";
import GoogleSignInButton from "../components/GoogleSignInButton";
const LoginPage = () => {
  const handleGoogle = () => { window.location.href = "/api/auth/google"; };
  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome to CoreX</h1>
        <p className="login-subtitle">Your AI-powered chat assistant</p>
        <GoogleSignInButton onClick={handleGoogle} />
      </div>
    </div>
  );
};
export default LoginPage;