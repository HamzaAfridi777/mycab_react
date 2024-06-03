import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
    const navigate = useNavigate();
  

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Your login logic using axios.post
            // Update the URL to your Laravel login endpoint
            const response = await axios.post(
                "api/login",
                {
                    email,
                    password,
                },
                {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    },
                }
            );

        } catch (response) {
            // Handle login error
           result = false;
        }
    };

    return (
        <>
        </>
    );
};

export default Login;
