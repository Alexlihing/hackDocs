import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Redirect to the Google login page
    window.location.href = "http://localhost:3011/api/auth/google"; // Triggers OAuth login flow
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
