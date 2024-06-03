import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserView = () => {
  const { user_id } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users-view/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();

  }, [user_id]);

  return (
    <div className="user-data-modal">
      {userData && (
        <div className="user-card">
          <p>Name:{userData.data.name}</p>
          <p>Email: {userData.data.email}</p>
          <p>Role: {userData.data.role}</p>
          <p>Status: {userData.data.status}</p>
          <p>Franchise: {userData.data.franchise}</p>
          <p>Image: <img src={userData.data.image} alt="User Image"
            style={{ width: '40px', height: '40px' }} /></p>
        </div>
      )}
    </div>
  );
};

export default UserView;