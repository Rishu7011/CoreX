import React from "react";
const GoogleSignInButton = ({ onClick }) => (
  <button className="google-signin-btn" onClick={onClick}>
    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" />
    Continue with Google
  </button>
);
export default GoogleSignInButton;