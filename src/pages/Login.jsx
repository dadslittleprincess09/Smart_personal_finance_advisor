import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoimg from '../assets/logo.png';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (user) => user.email == email && user.password == password
    );

    if (matchedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      navigate("/home");
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-white">
      <div
        className="card p-4 shadow-lg border-0"
        style={{ width: "380px", borderRadius: "25px" }}
      >
        <img
          src={logoimg}
          alt="SmartFinance Logo"
          width="120"
          height="120"
          className="mx-auto mb-3 rounded-circle border"
          style={{ objectFit: "cover" }}
        />
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-decoration-none">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
