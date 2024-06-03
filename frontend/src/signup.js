import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Your login logic using axios.post
      // Update the URL to your Laravel login endpoint
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      const token = response.data.token;
      console.log('Login successful! Token:', token);

      // Store the token in your application state or local storage as needed

      // Redirect or perform any other logic here after successful login
    } catch (error) {
      // Handle login error
      setError(error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <div className="login-box">
      <div className="login-logo">
        <a href="../../index2.html"><b>My</b>CAB</a>
      </div>

      <div className="login-box-body">
        <p className="login-box-msg">Signup to register for your session</p>

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
              type="text"
              className="form-control"
              placeholder="Username"
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


            <div className="col-xs-12">
              <button type="submit" className="btn btn-primary btn-block btn-flat">
                Sign Up
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
              <div className="col-sm-9 text-left " >
                <p><b>Already have an account? login.</b></p>
              </div>
              <div className="col-sm-3 text-right">
                <a href="/login" className="btn btn-success btn-flat">
                  Login
                </a>
              </div>
            </div>
          </div>
          <br/>
        </div>

        {/* Display error message if login fails */}
        {error && <p style={{ color: 'red', background: 'pink' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
