import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AddRole = () => {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");

    const navigate = useNavigate();
    const handleAddRole = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "/api/add-new-role",
                {
                    name,
                    status: status === "active" ? "active" : "inactive",
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(response.data);
              // Show success toast
        toast.success('Role Added successfully', 
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            navigate("/RoleList");
            // Handle success, redirect or show a success message
        } catch (error) {
            // Handle error
            console.error("Error adding role:", error);
             // Show error toast if deletion fails
        toast.error('Failed to add role',
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        }
    };

    return (
        <div className="content-wrapper">
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
            <section className="content" style={{ minHeight: "100vh" }}>
                <div className="row">
                    <div className="col-md-12 col-xm-12">
                        <div className="box  box-primary text-left">
                            <div className="box-header with-border">
                                <h3 className="box-title">Add Role </h3>
                            </div>

                            <form onSubmit={handleAddRole}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputName">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            autoComplete="off"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Status
                                        </label>
                                        <select
                                            className="form-control"
                                            value={status}
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                {" "}
                                                Select status
                                            </option>
                                            <option value="active">
                                                {" "}
                                                active
                                            </option>
                                            <option value="inactive">
                                                {" "}
                                                inactive
                                            </option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span>*/}
                                    </div>

                                    {/* Display the message */}
                                    {/* Display the message with allowed roles */}
                                    <div className="col-md-12">
                                        <p className="text-muted"  style={{ color: "#333" }}>
                                            Please provide a unique role name
                                            and select the status of the role.
                                            Allowed roles: Super Admin, Task
                                            Admin, Team Admin, Customer Admin,
                                            Accountant Manager, Franchise Owner,
                                            Student Manager.
                                        </p>
                                    </div>

                                    <div className="box-footer text-right">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Add Role
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

export default AddRole;
