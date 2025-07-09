import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for internal navigation
import { useAuth } from "../context/AuthContext";

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
      alert("Login successful!");
      navigate("/");
      login();
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      {/* Page Header Start */}
      <section className="page-header">
        <div
          className="page-header__bg"
          style={{
            backgroundImage:
              "url(/assets/images/shapes/page-header-bg-shape.png)",
          }}
        ></div>
        <div className="page-header__shape-4">
          <img src="/assets/images/shapes/page-header-shape-4.png" alt="" />
        </div>
        <div className="page-header__shape-5">
          <img src="/assets/images/shapes/page-header-shape-5.png" alt="" />
        </div>
        <div className="page-header__social">
          <a href="#">Facebook</a>
          <span>//</span>
          <a href="#">Instagram</a>
          <span>//</span>
          <a href="#">LinkedIn</a>
          <span>//</span>
          <a href="#">Twitter</a>
        </div>
        <div className="container">
          <div className="page-header__inner">
            <div className="page-header__img">
              <img
                src="/assets/images/resources/page-header-img-1.png"
                alt=""
              />
              <div className="page-header__shape-1">
                <img
                  src="/assets/images/shapes/page-header-shape-1.png"
                  alt=""
                />
              </div>
              <div className="page-header__shape-2">
                <img
                  src="/assets/images/shapes/page-header-shape-2.png"
                  alt=""
                />
              </div>
              <div className="page-header__shape-3">
                <img
                  src="/assets/images/shapes/page-header-shape-3.png"
                  alt=""
                />
              </div>
            </div>
            <h2>Login</h2>
            <div className="thm-breadcrumb__box">
              <ul className="thm-breadcrumb list-unstyled">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <span>//</span>
                </li>
                <li>Login</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Page Header End */}

      {/* Start Login One */}
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
                      <input
                        type="email"
                        name="form_email"
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
                      <input
                        type="password"
                        name="form_password"
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
      {/* End Login One */}
    </>
  );
};

export default Login;
