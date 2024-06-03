import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';


const AddFranchisePermission = () => {
    const [permission_name, setPermission_name] = useState("");
   
    const navigate = useNavigate();
    const handleAddPermission = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "/api/add-franchise-Permission",
                {
                    permission_name,
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                       Authorization: `Bearer ${token}`,
                    },
                }
            );
             // Show success toast
        toast.success('Franchise Permission Added successfully', 
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            navigate("/FranchisePermissionList");
            // Handle success, redirect or show a success message
        } catch (error) {
            // Handle error
            console.error("Error adding Franchise Permission:", error);
             // Show error toast if deletion fails
        toast.error('Failed to add Franchise Permission ',
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        }
    };

    return (

        <div className="content-wrapper" >
            <section className="content-header" style={{ textAlign: "left" }}>
                <h1>
                    {"Superadmin"}
                    <small>dashboard</small>
                </h1>
                <ol className="breadcrumb">
                    <li>
                        <a href="#">
                            <i className="fa fa-dashboard"></i> Home
                        </a>
                    </li>
                    <li className="active">Dashboard</li>
                </ol>
            </section>
            <hr style={{ border: "1px solid #e3e3e3", margin: "10px" }} />
            <section className="content" style={{ minHeight: '100vh' }}>
                <div className="row">
                    <div className="col-md-12 col-xm-12">
                        <div className="box  box-primary text-left">
                            <div className="box-header with-border" >
                                <h3 className="box-title">Add Franchise Permission </h3>
                            </div>

                            <form onSubmit={handleAddPermission}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputName">
                                          Permission Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="permission_name"
                                            autoComplete="off"
                                            value={permission_name}
                                            onChange={(e) => setPermission_name(e.target.value)}
                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                    </div>                                                                      
                                    <div className="box-footer text-right">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Add Franchise Permission
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddFranchisePermission;