<<<<<<< HEAD

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mic,
  Check,
  ChartNoAxesColumnIncreasing,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Login() {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    // Demo navigation only. Connect your Django login API here.
    navigate(
      role === "admin"
        ? "/admin/dashboard"
        : "/student/dashboard"
    );
  }

  function handleGoogleSignIn() {
    // Replace this with your configured Google OAuth flow.
    setError(
      "Google sign-in is not configured yet. Please use your email and password."
    );
  }

  return (
    <main className="login-page">
      {/* Left introduction panel */}
      <section className="intro-panel">
        <Link to="/login" className="brand">
          <span className="brand-icon">
            <Mic size={20} />
          </span>
          <span>Voice Mock Test</span>
        </Link>

        <div className="intro-content">
          <h1>
            Practice speaking. Get
            <br className="desktop-break" /> instant feedback.
          </h1>

          <p className="intro-subtitle">
            Build confidence with realistic, timed speaking practice.
          </p>

          <ul className="benefits">
            <li>
              <span className="benefit-icon"><Mic size={20} /></span>
              <span>Answer real speaking questions out loud</span>
            </li>
            <li>
              <span className="benefit-icon">
                <ChartNoAxesColumnIncreasing size={20} />
              </span>
              <span>
                See your score for fluency, pronunciation and grammar
              </span>
            </li>
            <li>
              <span className="benefit-icon"><Check size={21} /></span>
              <span>Get one clear tip after every test</span>
            </li>
          </ul>
        </div>

        <p className="panel-footer">
          English speaking practice for students
        </p>
      </section>

      {/* Right login panel */}
      <section className="form-panel">
        <div className="login-card">
          <header className="form-heading">
            <h2>Welcome back</h2>
            <p>Sign in to your account</p>
          </header>

          <form onSubmit={handleSubmit}>
            <fieldset className="role-fieldset">
              <legend>I am signing in as</legend>

              <div className="role-switch">
                <button
                  type="button"
                  className={`role-option ${
                    role === "student" ? "active" : ""
                  }`}
                  aria-pressed={role === "student"}
                  onClick={() => setRole("student")}
                >
                  Student
                </button>

                <button
                  type="button"
                  className={`role-option ${
                    role === "admin" ? "active" : ""
                  }`}
                  aria-pressed={role === "admin"}
                  onClick={() => setRole("admin")}
                >
                  Admin
                </button>
              </div>
            </fieldset>

            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <div className="input-with-icon">
                <Mail size={20} aria-hidden="true" />

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="input-with-icon password-wrap">
                <LockKeyhole size={20} aria-hidden="true" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  <span>{showPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <Link
                className="text-link forgot-link"
                to="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button className="submit-button" type="submit">
              Sign in as {role}
            </button>

            <div className="or-divider">
              <span>OR</span>
            </div>

            <button
              className="google-button"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <svg
                className="google-icon"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.43 37.9 46.98 31.77 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.55 2.56 10.78l7.97-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          {role === "admin" ? (
            <p className="admin-note">
              Admin accounts are created by invitation from another admin.
            </p>
          ) : (
            <p className="register-note">
              New here?{" "}
              <Link className="text-link" to="/register">
                Create a student account
              </Link>
            </p>
          )}
        </div>
      </section>
    </main>
  );
=======
export default function Login() {
  return <main><h1>Login</h1></main>
>>>>>>> 4e3956b564cfbe5c5f465f97057ee96081f8f6a2
}
