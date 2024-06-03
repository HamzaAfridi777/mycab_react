import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Your login logic using axios.post
      // Update the URL to your Laravel login endpoint
      const response = await axios.post('/api/login', {
        email,
        password,
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
    });
    setSuccess(response ? response.data.message : response.message);
    setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (response) {
      // Handle login error
      setError(response.message);
    }
  };

  return (
    <div className="login-box">
      <div className="login-logo">
        <a href="../../index2.html"><b>My</b>CAB</a>
      </div>

      <div className="login-box-body">
        <p className="login-box-msg">Sign in to start your session</p>

        <form onSubmit={handleLogin}>
          <div className="form-group has-feedback">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>

          <div className="form-group has-feedback">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>

          <div className="row">
            <div className="col-xs-8">
              <div className="checkbox icheck">
                <label>
                  <input type="checkbox" /> Remember Me
                </label>
              </div>
            </div>

            <div className="col-xs-4">
              <button type="submit" className="btn btn-primary btn-block btn-flat">
                Sign In
              </button>
            </div>
          </div>
        </form>

        <div className="social-auth-links text-center">
          {/* Add social login buttons here if needed */}
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-9 text-left">
                <a href="/forgot" className="btn btn-warning">
                  Forgot password
                </a>
              </div>
              <div className="col-sm-3 text-right">
                <a href="/signup" className="btn btn-success btn-flat">
                  SignUp
                </a>
              </div>
            </div>
          </div>
          <br/>
        </div>

        {/* Display error message if login fails */}
        {success && <p style={{ color: 'darkgreen' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
