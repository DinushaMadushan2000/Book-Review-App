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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>Don't have an account? <a href="/register">Register here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;