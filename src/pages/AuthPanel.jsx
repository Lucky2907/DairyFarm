import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPanel.css";

function AuthPanel() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerFirst, setRegisterFirst] = useState("");
  const [registerLast, setRegisterLast] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  // Dummy login logic
  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.email === loginEmail &&
      storedUser.password === loginPassword
    ) {
      localStorage.setItem("isLoggedIn", "true");
      setLoginError("");
      navigate("/");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  // Dummy register logic
  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerFirst || !registerLast) {
      setRegisterError("Please enter your first and last name");
      return;
    }
    if (!registerEmail || !registerPassword) {
      setRegisterError("Please enter email and password");
      return;
    }
    localStorage.setItem(
      "user",
      JSON.stringify({
        first: registerFirst,
        last: registerLast,
        email: registerEmail,
        password: registerPassword,
      })
    );
    setRegisterError("");
    setActiveTab("login");
  };

  return (
    <div className="authpanel-bg">
      <div className="authpanel-card">
        <div className="authpanel-split">
          {/* Login Panel */}
          <div className="authpanel-half">
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email Address"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                required
                autoComplete="username"
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button className="authpanel-btn blue" type="submit">
                Sign In
              </button>
              <div className="authpanel-forgot">Forgot Password?</div>
              {loginError && <div className="authpanel-error">{loginError}</div>}
              <div className="authpanel-or">Or Sign in With</div>
              <div className="authpanel-socials">
                <button type="button" className="twitter">Twitter</button>
                <button type="button" className="facebook">Facebook</button>
                <button type="button" className="google">Google</button>
              </div>
              <div className="authpanel-switch">
                Don't have an account?{" "}
                <span onClick={() => setActiveTab("register")}>Sign Up</span>
              </div>
            </form>
          </div>
          {/* Divider */}
          <div className="authpanel-divider" />
          {/* Register Panel */}
          <div className="authpanel-half">
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="First Name"
                value={registerFirst}
                onChange={e => setRegisterFirst(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={registerLast}
                onChange={e => setRegisterLast(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={registerEmail}
                onChange={e => setRegisterEmail(e.target.value)}
                required
                autoComplete="username"
              />
              <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={e => setRegisterPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button className="authpanel-btn yellow" type="submit">
                Sign Up
              </button>
              {registerError && (
                <div className="authpanel-error">{registerError}</div>
              )}
              <div className="authpanel-terms">
                By creating an account, you agree to our <a href="#">terms</a>
              </div>
              <div className="authpanel-switch">
                Already have an account?{" "}
                <span onClick={() => setActiveTab("login")}>Sign In</span>
              </div>
            </form>
          </div>
        </div>
        {/* Overlay for switching on mobile */}
        <div className="authpanel-mobile-tabs">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Sign In
          </button>
          <button
            className={activeTab === "register" ? "active" : ""}
            onClick={() => setActiveTab("register")}
          >
            Sign Up
          </button>
        </div>
        <div className="authpanel-mobile-content">
          {activeTab === "login" ? (
            <div className="authpanel-half-mobile">
              <h2>Sign In</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button className="authpanel-btn blue" type="submit">
                  Sign In
                </button>
                <div className="authpanel-forgot">Forgot Password?</div>
                {loginError && (
                  <div className="authpanel-error">{loginError}</div>
                )}
                <div className="authpanel-or">Or Sign in With</div>
                <div className="authpanel-socials">
                  <button type="button" className="twitter">Twitter</button>
                  <button type="button" className="facebook">Facebook</button>
                  <button type="button" className="google">Google</button>
                </div>
              </form>
            </div>
          ) : (
            <div className="authpanel-half-mobile">
              <h2>Sign Up</h2>
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={registerFirst}
                  onChange={e => setRegisterFirst(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={registerLast}
                  onChange={e => setRegisterLast(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={registerEmail}
                  onChange={e => setRegisterEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={registerPassword}
                  onChange={e => setRegisterPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button className="authpanel-btn yellow" type="submit">
                  Sign Up
                </button>
                {registerError && (
                  <div className="authpanel-error">{registerError}</div>
                )}
                <div className="authpanel-terms">
                  By creating an account, you agree to our <a href="#">terms</a>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPanel;