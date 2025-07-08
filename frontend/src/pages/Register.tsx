import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError('All fields are required.');
      return;
    }
    setError(null);
    console.log(form);
    // TODO: Send to NestJS API
  };

  return (
    <section className="sign-up-one">
      <div className="container">
        <div className="sign-up-one__form">
          <div className="inner-title text-center">
            <h2>Sign Up</h2>
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
              <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>
            )}
            <div className="form-group">
              <button className="thm-btn" type="submit">Sign Up</button>
            </div>
            <div className="google-facebook">
              <a href="#"><div className="icon"><img src="/assets/images/icon/icon-google-2.png" alt="Google" /></div> Continue with Google</a>
              <a href="#"><div className="icon"><img src="/assets/images/icon/icon-facebook.png" alt="Facebook" /></div> Continue with Facebook</a>
            </div>
            <div className="create-account text-center">
              <p>Already have an account? <Link to="/login">Login Here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
