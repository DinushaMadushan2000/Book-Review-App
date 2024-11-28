import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/v1/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);

      
      const redirectTo = location.state?.from || "/"; 
      navigate(redirectTo);  
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;