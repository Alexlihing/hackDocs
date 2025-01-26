import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Redirect to the Google login page
    window.location.href = "http://localhost:3011/api/auth/google"; // Triggers OAuth login flow
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Login to Your Account</h1>
        <p>Access personalized health advice and tools by logging in.</p>
      </div>
      <button onClick={handleGoogleLogin} className="login-button">
        Login with Google
      </button>
      <div className="login-footer">
        <p>
          By logging in, you agree to our{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
