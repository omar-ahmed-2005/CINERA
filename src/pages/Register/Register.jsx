import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError(
        "Please fill in all fields."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    const user = {
      name: name.trim(),
      email: email.trim(),
    };

    localStorage.setItem(
      "cineraUser",
      JSON.stringify(user)
    );

    navigate("/profile");
  };

  return (
    <main className="register-page">

      <section className="register-card">

        {/* HEADER */}

        <div className="register-header">

          <div className="register-icon">
            <UserPlus size={25} />
          </div>

          <p className="register-label">
            JOIN CINERA
          </p>

          <h1>
            Create your account
          </h1>

          <p>
            Start building your personal
            movie collection.
          </p>

        </div>

        {/* FORM */}

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          {/* NAME */}

          <div className="register-field">

            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              placeholder="Enter your name"
            />

          </div>

          {/* EMAIL */}

          <div className="register-field">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="Enter your email"
            />

          </div>

          {/* PASSWORD */}

          <div className="register-field">

            <label htmlFor="password">
              Password
            </label>

            <div className="register-password">

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
                placeholder="At least 6 characters"
              />

              <button
                type="button"
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

          {/* CONFIRM PASSWORD */}

          <div className="register-field">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className="register-password">

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                placeholder="Repeat your password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                aria-label="Toggle password"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* ERROR */}

          {error && (
            <p className="register-error">
              {error}
            </p>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            className="register-submit"
          >
            Create Account
          </button>

        </form>

        {/* FOOTER */}

        <div className="register-footer">

          <span>
            Already have an account?
          </span>

          <button
            onClick={() =>
              navigate("/login")
            }
          >
            Sign in
          </button>

        </div>

      </section>

    </main>
  );
};

export default Register;