import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(""); 
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const validUsername = "admin";
    const validPassword = "admin@123";

    if (username === validUsername && password === validPassword) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-outer-bg">
      <div className="login-bg">
        <div className="app-logo-bg">
          <img src="/logo.png" alt="app-logo" className="app-logo" />
        </div>
        <div className="login-inner-bg">
          <div className="login-div">
            <h1>Sign In</h1>

            <form onSubmit={handleLogin}>
              <div className="input-div">
                <label>Username</label>
                <input 
                  type="text" 
                  onChange={handleInputChange(setUsername)} 
                  value={username} 
                  required 
                />
              </div>
              <div className="input-div">
                <label>Password</label>
                <div className="password-div">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    onChange={handleInputChange(setPassword)}
                    value={password}
                    required
                  />
                  {passwordVisible ? (
                    <FaEyeSlash
                      className="icon"
                      onClick={() => setPasswordVisible(false)}
                    />
                  ) : (
                    <FaEye
                      className="icon"
                      onClick={() => setPasswordVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div className="password-memory-div">
                <div className="checkbox-div">
                  <input type="checkbox" />
                  <p>Remember me</p>
                </div>
                <p>Forgot Password?</p>
              </div>
              {error && <p className="error-text">{error}</p>} {/* Error Message */}
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
