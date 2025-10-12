import React, { useContext, useEffect, useState } from "react";
import { auth, googleProvider, gitHubProvider} from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { MyContext } from "../MyContext.jsx";
import "./Login.css";
import Cookies from "js-cookie";




const Login = () => {
  const { loggedIn, setLoggedIn } = useContext(MyContext);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = await result.user;
      const token = await user.getIdToken();
      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        provider: "google",
      };


      const response = await fetch("https://corex-9gzg.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        // route to chat window
        Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });
        setLoggedIn(true);
        window.location.href = "/";
      } else {
        console.error("❌ Signup Error:");
      }
    } catch (error) {
      console.error("❌ Google Login Error:", error);
    }
  };
   const handleGitLogin = async () => {
    try {
      const result = await signInWithPopup(auth, gitHubProvider);
      const user = await result.user;
      const token = await user.getIdToken();
      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        provider: "github",
      };


      const response = await fetch("https://corex-9gzg.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        // route to chat window
        Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });
        setLoggedIn(true);
        window.location.href = "/";
      } else {
        console.error("❌ Signup Error:");
      }
    } catch (error) {
      console.error("❌ GitHub Login Error:", error);
    }
  };
  useEffect(() => {
  const checkAuth = async () => {
    const authToken = Cookies.get("authToken");
    if (!authToken) return;

    try {
      const response = await fetch("https://corex-9gzg.onrender.com/api/checkauth", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        setLoggedIn(true);
        window.location.href = "/";
      } else {
        // ❌ Token invalid or not provided, remove cookie
        Cookies.remove("authToken");
        setLoggedIn(false);
        console.warn("Auth token invalid or expired. Removed cookie.");
      }
    } catch (err) {
      console.error("Auth check error:", err);
      // Optional: Remove token on fetch failure
      Cookies.remove("authToken");
      setLoggedIn(false);
    }
  };

  checkAuth();
}, [setLoggedIn]);


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login Page</h2>
        
          <button className="gsi-material-button" onClick={handleGoogleLogin}>
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 48 48"
                  style={{ display: "block" }}
                >
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>

              </div>
              <span className="gsi-material-button-contents">Continue with Google</span>
              <span style={{ display: "none" }}>Continue with Google</span>
            </div>
          </button>
          {/* <button className="gsi-material-button" onClick={handleGitLogin}>
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 48 48"
                  style={{ display: "block" }}
                >
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>

              </div>
              <span className="gsi-material-button-contents">Continue with Github</span>
              <span style={{ display: "none" }}>Continue with </span>
            </div>
          </button> */}
        
      </div>
    </div>
  );
};

export default Login;
