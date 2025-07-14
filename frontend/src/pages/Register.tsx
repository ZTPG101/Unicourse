import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../components/PageHeader";

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("All fields are required.");
      return;
    }
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        form
      );
      alert("Registration successful!");
      navigate("/login");
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 409) {
          setError("Email already in use.");
        } else {
          setError(err.response.data.message || "Registration failed");
        }
      } else {
        setError("Registration failed");
      }
    }
  };

  const breadcrumbs = [{ label: "Home", path: "/" }, { label: "Register" }];

  return (
    <>
      <PageHeader title="Register" breadcrumbs={breadcrumbs} />

      {/* Start Sign up One */}
      <section className="sign-up-one">
        <div className="container">
          <div className="sign-up-one__form">
            <div className="inner-title text-center">
              <h2>Register</h2>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-group">
                <div className="input-box">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name..."
                    required
                    value={form.name}
                    onChange={handleChange}
                    aria-label="Name"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-box">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email..."
                    required
                    value={form.email}
                    onChange={handleChange}
                    aria-label="Email"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-box">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone..."
                    required
                    value={form.phone}
                    onChange={handleChange}
                    aria-label="Phone"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-box">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password..."
                    required
                    value={form.password}
                    onChange={handleChange}
                    aria-label="Password"
                  />
                </div>
              </div>
              {error && (
                <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
              )}
              <div className="form-group">
                <button className="thm-btn" type="submit">
                  Sign Up
                </button>
              </div>
              <div className="google-facebook">
                <a href="#">
                  <div className="icon">
                    <img
                      src="/assets/images/icon/icon-google-2.png"
                      alt="Google"
                    />
                  </div>{" "}
                  Continue with Google
                </a>
                <a href="#">
                  <div className="icon">
                    <img
                      src="/assets/images/icon/icon-facebook.png"
                      alt="Facebook"
                    />
                  </div>{" "}
                  Continue with Facebook
                </a>
              </div>
              <div className="create-account text-center">
                <p>
                  Already have an account? <Link to="/login">Login Here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* End Sign up One */}
    </>
  );
};

export default Register;
