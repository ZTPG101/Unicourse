import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/PageHeader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      alert("Login successful!");
      login();
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const breadcrumbs = [{ label: "Home", path: "/" }, { label: "Login" }];

  return (
    <>
      <PageHeader title="Login" breadcrumbs={breadcrumbs} />

      <section className="login-one">
        <div className="container">
          <div className="login-one__form">
            <div className="inner-title text-center">
              <h2>Login Here</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label htmlFor="formEmail">Email</label>
                      <input
                        type="email"
                        id="formEmail"
                        placeholder="Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label htmlFor="formPassword">Password</label>
                      <input
                        type="password"
                        id="formPassword"
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="col-xl-12">
                    <div className="form-group">
                      <div className="input-box" style={{ color: "red" }}>
                        {error}
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-xl-12">
                  <div className="form-group">
                    <button className="thm-btn" type="submit">
                      Confirm Login
                    </button>
                  </div>
                </div>

                {/* SOCIAL LOGIN */}
                <div className="google-facebook">
                  <a href="http://localhost:3000/auth/google/login">
                    <div className="icon">
                      <img
                        src="/assets/images/icon/icon-google-2.png"
                        alt="Google"
                      />
                    </div>
                    Continue with Google
                  </a>
                  <a href="#">
                    <div className="icon">
                      <img
                        src="/assets/images/icon/icon-facebook.png"
                        alt="Facebook"
                      />
                    </div>
                    Continue with Facebook
                  </a>
                </div>

                <div className="remember-forget">
                  <div className="checked-box1">
                    <input
                      type="checkbox"
                      name="saveMyInfo"
                      id="saveinfo"
                      defaultChecked
                    />
                    <label htmlFor="saveinfo">
                      <span></span>
                      Remember me
                    </label>
                  </div>
                  <div className="forget">
                    <a href="#">Forget password?</a>
                  </div>
                </div>

                <div className="create-account text-center">
                  <p>
                    Not registered yet?{" "}
                    <Link to="/Register">Create an Account</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
