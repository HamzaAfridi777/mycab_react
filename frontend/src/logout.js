import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = async () => {
    try {

      const token = localStorage.getItem('token');
      //alert(token)
      //console.warn(token);
      const response = await axios.post(
        '/api/logout',
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
       );

    // Check if the response status is 200
    if (response.status === 200) {
      setSuccess(response.data.message); // Set success message
      setTimeout(() => {
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('userRole'); // Remove userRole from localStorage
        navigate('/login'); // Redirect to login page
      }, 3000);
    } else {
      // Handle error if the response status is not 200
      setError(response.data.message);
    }
  } catch (error) {
    // Handle error if axios request fails
    console.error('Logout error:', error);
    setError(error.message); // Set error message
  }
};


return (
  <div className="logout-box">
    <div className="logout-box-body">
      <h2>Logout</h2>
      <p className="logout-box-msg">Are you sure you want to log out?</p>

      <div className="row" style={{ margin: 'auto', width: '30%' }}>

        <div className="col-xs-6 ">
          <button type="button" className="btn btn-danger btn-block btn-flat" onClick={handleLogout}>
            Yes
          </button>
        </div>
        <div className="col-xs-6">
          <a href="/layout" className="btn btn-primary btn-block btn-flat">
            No
          </a>
        </div>

      </div>

      {/* Display error or success message */}
      {success && <p style={{ color: 'darkgreen' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  </div>
);
};

export default Logout;
