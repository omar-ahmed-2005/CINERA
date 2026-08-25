import React, { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login, verify } from "../../services/auth";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [step, setStep] = useState("login"); // "login" or "verify"
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (step === "login") {
      if (!email.trim() || !password.trim()) {
        setError("Please enter your email and password.");
        return;
      }

      setLoading(true);
      try {
        const data = await login(email.trim(), password);
        // If user is Admin, we can optionally redirect them to admin dashboard
        if (data.user.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/profile");
        }
      } catch (err) {
        if (err.response?.data?.requiresVerification) {
          setStep("verify");
        } else {
          setError(err.response?.data?.message || "Invalid email or password.");
        }
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
        const data = await verify(email.trim(), verificationCode.trim());
        if (data.user.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/profile");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Invalid or expired verification code.");
      } finally {
        setLoading(false);
      }
    }
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

          {step === "login" ? (
            <>
              {/* EMAIL */}
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
                  disabled={loading}
                />
              </div>

              {/* PASSWORD */}
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
                    disabled={loading}
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
            </>
          ) : (
            <>
              {/* VERIFICATION CODE */}
              <div className="login-field">
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
                Your email is not verified yet. We sent a verification code to {email}.
              </p>
            </>
          )}

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Loading..." : step === "login" ? "Sign In" : "Verify Code"}
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