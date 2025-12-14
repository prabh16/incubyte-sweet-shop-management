import { useState } from "react";
import { register } from "../services/api";

export default function Register({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleRegister = async () => {
  if (!email || !password) {
    setError("Email and password are required");
    return;
  }

  setError("");
  setLoading(true);

  try {
    const res = await register(email, password);

    if (res?.error) {
      setError(res.error); // "Email already registered"
      return;
    }

    alert("Account created successfully. Please login.");
    onSwitchToLogin();
  } catch (err) {
    setError(err.response?.data?.error || "Something went wrong");
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="auth-bg">
      <div className="auth-card-modern">
        <h2 className="auth-heading">Sweet Shop Management System</h2>
        <h3 className="auth-subheading">Create Account</h3>

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

            {error && <p className="auth-error">{error}</p>}

                <button
          className="auth-btn"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating..." : "CREATE ACCOUNT"}
        </button>


          <p className="auth-switch">
            Already have an account?{" "}
            <span onClick={onSwitchToLogin}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}
