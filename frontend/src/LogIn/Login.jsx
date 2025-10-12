import React, { useContext } from "react";
import { auth, googleProvider, gitHubProvider } from "../firebase.js";
import {
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  GithubAuthProvider,
  GoogleAuthProvider
} from "firebase/auth";
import { MyContext } from "../MyContext.jsx";
import "./Login.css";
import Cookies from "js-cookie";

const Login = () => {
  const { setLoggedIn } = useContext(MyContext);

  // ✅ Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
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
        Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });
        setLoggedIn(true);
        window.location.href = "/";
      } else {
        console.error("❌ Signup Error");
      }
    } catch (error) {
      // 🪝 Handle account linking if GitHub was used before
      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData.email;
        const pendingCred = GoogleAuthProvider.credentialFromError(error);
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods.includes("github.com")) {
          const gitHubResult = await signInWithPopup(auth, gitHubProvider);
          await linkWithCredential(gitHubResult.user, pendingCred);

          const linkedToken = await gitHubResult.user.getIdToken();
          const linkedUserData = {
            uid: gitHubResult.user.uid,
            name: gitHubResult.user.displayName,
            email: gitHubResult.user.email,
            photo: gitHubResult.user.photoURL,
            provider: "google+github",
          };

          const response = await fetch("https://corex-9gzg.onrender.com/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${linkedToken}`,
            },
            body: JSON.stringify(linkedUserData),
          });

          if (response.ok) {
            Cookies.set("authToken", linkedToken, { expires: 1, secure: true, sameSite: "Strict" });
            setLoggedIn(true);
            window.location.href = "/";
          } else {
            console.error("❌ Signup Error after linking");
          }
        } else {
          alert(`This email is already registered with ${methods[0]}. Please use that method to login.`);
        }
      } else {
        console.error("❌ Google Login Error:", error);
      }
    }
  };

  // ✅ GitHub Login Handler
  const handleGitLogin = async () => {
    try {
      const result = await signInWithPopup(auth, gitHubProvider);
      const user = result.user;
      console.log(user);
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
        Cookies.set("authToken", token, { expires: 1, secure: true, sameSite: "Strict" });
        setLoggedIn(true);
        window.location.href = "/";
      } else {
        console.error("❌ Signup Error");
      }
    } catch (error) {
      // 🪝 Handle account linking if Google was used before
      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData.email;
        const pendingCred = GithubAuthProvider.credentialFromError(error);
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods.includes("google.com")) {
          const googleResult = await signInWithPopup(auth, googleProvider);
          await linkWithCredential(googleResult.user, pendingCred);

          const linkedToken = await googleResult.user.getIdToken();
          const linkedUserData = {
            uid: googleResult.user.uid,
            name: googleResult.user.displayName,
            email: googleResult.user.email,
            photo: googleResult.user.photoURL,
            provider: "google+github",
          };

          const response = await fetch("https://corex-9gzg.onrender.com/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${linkedToken}`,
            },
            body: JSON.stringify(linkedUserData),
          });

          if (response.ok) {
            Cookies.set("authToken", linkedToken, { expires: 1, secure: true, sameSite: "Strict" });
            setLoggedIn(true);
            window.location.href = "/";
          } else {
            console.error("❌ Signup Error after linking");
          }
        } else {
          alert(`This email is already registered with ${methods[0]}. Please use that method to login.`);
        }
      } else {
        console.error("❌ GitHub Login Error:", error);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login Page</h2>

        {/* Google Login Button */}
        <button className="gsi-material-button" onClick={handleGoogleLogin}>
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
              <svg viewBox="0 0 48 48" style={{ display: "block" }}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
            </div>
            <span className="gsi-material-button-contents">Continue with Google</span>
          </div>
        </button>

        {/* GitHub Login Button */}
        <button className="gsi-material-button" onClick={handleGitLogin}>
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
              {/* You can replace this SVG with a GitHub icon */}
              <svg viewBox="0 0 24 24" width="24" height="24" fill="black">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.94.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .98-.31 3.2 1.18a11.16 11.16 0 0 1 2.91-.39c.99 0 1.99.13 2.92.39 2.21-1.49 3.19-1.18 3.19-1.18.63 1.57.23 2.73.11 3.02.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.7.41.35.78 1.03.78 2.08 0 1.5-.01 2.71-.01 3.08 0 .31.21.68.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </div>
            <span className="gsi-material-button-contents">Continue with GitHub</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
