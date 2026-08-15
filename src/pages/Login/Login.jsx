import React, { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    // Temporary front-end login
    localStorage.setItem(
      "cineraUser",
      JSON.stringify({
        email: email.trim(),
      })
    );

    navigate("/profile");
  };

  return (
    <main className="login-page">

      <section className="login-card">

        <div className="login-header">

          <div className="login-icon">
            <LogIn size={25} />
          </div>

          <p className="login-label">
            WELCOME BACK
          </p>

          <h1>
            Sign in to CINERA
          </h1>

          <p>
            Continue your movie journey.
          </p>

        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <div className="login-field">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
            />

          </div>

          <div className="login-field">

            <label htmlFor="password">
              Password
            </label>

            <div className="password-wrapper">

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Enter your password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                aria-label="Toggle password"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-submit"
          >
            Sign In
          </button>

        </form>

        <div className="login-footer">

          <span>
            Don't have an account?
          </span>

          <button
            onClick={() =>
              navigate("/register")
            }
          >
            Create account
          </button>

        </div>

      </section>

    </main>
  );
};

export default Login;