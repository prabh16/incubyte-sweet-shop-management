import { useState } from "react";
import { login } from "../services/api";

export default function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  if (!email || !password) {
    alert("Email and password are required");
    return;
  }

  try {
    const data = await login(email, password);

    localStorage.setItem("token", data.token);
    onLogin();
  } catch (err) {
    alert(err.message || err.error || "Login failed");
  }
};



  return (
    <div className="auth-bg">
      <div className="auth-card-modern">
        <h2 className="auth-heading">Sweet Shop Management System</h2>
        <h3 className="auth-subheading">Login</h3>

        <div className="auth-form-modern">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn" onClick={handleLogin}>
            LOGIN
          </button>

          <p className="auth-switch">
            Don’t have an account?{" "}
            <span onClick={onSwitchToRegister}>Create Account</span>
          </p>
        </div>
      </div>
    </div>
  );
}
