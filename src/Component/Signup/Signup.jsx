import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import "./Signup.css";
import movie from "../../assets/movie.png";
import { useNavigate } from "react-router-dom";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    setSuccess("");

    if (!email.trim()) newErrors.email = "Can't be empty";
    else if (!isValidEmail(email)) newErrors.email = "Invalid email address";

    if (!password.trim()) newErrors.password = "Can't be empty";
    if (!repeatPassword.trim()) newErrors.repeatPassword = "Can't be empty";
    if (password && repeatPassword && password !== repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess("Account created successfully!");
        setEmail("");
        setPassword("");
        setRepeatPassword("");

        navigate("/home");
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          setErrors({ email: "Email is already in use" });
        } else {
          setErrors({ firebase: err.message });
        }
      }
    }
  };

  return (
    <div className="signup">
      <img src={movie} alt="logo" className="movie" />
      <div className="signup-div">
        <h1 className="signuph1">Sign Up</h1>

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

        <div className={`input-group ${errors.repeatPassword ? "error" : ""}`}>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Repeat Password"
              className="underline-input"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {errors.repeatPassword && (
              <span className="error-text">{errors.repeatPassword}</span>
            )}
          </div>
        </div>

        {errors.firebase && <p className="error-text">{errors.firebase}</p>}
        {success && <p className="signup-success">{success}</p>}

        <button className="signup-btn" onClick={handleSubmit}>
          Create an account
        </button>

        <p className="signupp">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
