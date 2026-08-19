import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { register, verify } from "../../services/auth";

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

  const [step, setStep] = useState("register"); // "register" or "verify"
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (step === "register") {
      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        setError("Please fill in all fields.");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setLoading(true);
      try {
        await register(name.trim(), email.trim(), password);
        setStep("verify");
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      if (!verificationCode.trim()) {
        setError("Please enter the verification code.");
        return;
      }

      setLoading(true);
      try {
        await verify(email.trim(), verificationCode.trim());
        navigate("/profile");
      } catch (err) {
        setError(err.response?.data?.message || "Invalid or expired verification code.");
      } finally {
        setLoading(false);
      }
    }
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

          {step === "register" ? (
            <>
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
                  disabled={loading}
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
                  disabled={loading}
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
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    aria-label="Toggle password"
                    disabled={loading}
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
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    aria-label="Toggle password"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* VERIFICATION CODE */}
              <div className="register-field">
                <label htmlFor="verificationCode">
                  Verification Code
                </label>
                <input
                  id="verificationCode"
                  type="text"
                  value={verificationCode}
                  onChange={(event) =>
                    setVerificationCode(
                      event.target.value
                    )
                  }
                  placeholder="Enter 6-digit code"
                  disabled={loading}
                />
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "-10px", marginBottom: "15px" }}>
                We have sent a verification code to {email}.
              </p>
            </>
          )}

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
            disabled={loading}
          >
            {loading ? "Loading..." : step === "register" ? "Create Account" : "Verify Code"}
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