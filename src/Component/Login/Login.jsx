import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import "./Login.css";
import movie from "../../assets/movie.png";
import { useNavigate } from "react-router-dom";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    setSuccess("");

    if (!email.trim()) newErrors.email = "Can't be empty";
    else if (!isValidEmail(email)) newErrors.email = "Invalid email address";

    if (!password.trim()) newErrors.password = "Can't be empty";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess("Logged in successfully!");
        setEmail("");
        setPassword("");

        navigate("/home");
      } catch (err) {
        setErrors({ firebase: "Invalid email or password" });
      }
    }
  };

  return (
    <div className="login">
      <img src={movie} alt="logo" className="movie" />
      <div className="login-div">
        <h1 className="loginh1">Login</h1>

        <div className={`input-group ${errors.email ? "error" : ""}`}>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email address"
              className="underline-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>

        <div className={`input-group ${errors.password ? "error" : ""}`}>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="underline-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>
        </div>

        {errors.firebase && <p className="firebase-error">{errors.firebase}</p>}

        {success && <p className="login-success">{success}</p>}

        <button className="login-btn" onClick={handleSubmit}>
          Login to your account
        </button>

        <p className="loginp">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
