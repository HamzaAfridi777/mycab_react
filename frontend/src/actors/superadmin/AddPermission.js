import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';

const AddPermission = () => {
    const [name, setName] = useState("");
    const [routes, setRoutes] = useState("");
    const [sp_id, setSp_id] = useState("");
    const [parent, setParent] = useState("");
    const [level_id, setLevel_id] = useState("");
    const navigate = useNavigate();
    const handleAddPermission = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "/api/add-new-permission",
                {
                    name,
                    routes,
                    sp_id,
                    parent,
                    level_id,
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
          //  console.log(response.data);
            // Show success toast
        toast.success('Permission Added successfully', 
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            navigate("/PermissionList");
            // Handle success, redirect or show a success message
        } catch (error) {
            // Handle error
            console.error("Error adding Permission:", error);
             // Show error toast if deletion fails
        toast.error('Failed to add Permission',
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
                                <h3 className="box-title">Add Permission </h3>
                            </div>

                            <form onSubmit={handleAddPermission}>
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
                                        <label htmlFor="exampleInputName">
                                            Routes
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            autoComplete="off"
                                            value={routes}
                                            onChange={(e) =>
                                                setRoutes(e.target.value)
                                            }
                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Secondary_Permissions
                                        </label>
                                        <select
                                            className="form-control"
                                            value={sp_id}
                                            onChange={(e) =>
                                                setSp_id(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Select secondary_Permissions
                                            </option>
                                            <option value="1">
                                                Edit Ride Details
                                            </option>
                                            <option value="2">
                                                Approve Discounts
                                            </option>
                                            <option value="3">
                                                Manage Complaints
                                            </option>
                                            <option value="4">
                                                Access Ride Logs
                                            </option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputName">
                                            Parent
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Parent"
                                            autoComplete="off"
                                            value={parent}
                                            onChange={(e) =>
                                                setParent(e.target.value)
                                            }
                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Level
                                        </label>
                                        <select
                                            className="form-control"
                                            value={level_id}
                                            onChange={(e) =>
                                                setLevel_id(e.target.value)
                                            }
                                        >
                                            <option value="">Select Level</option>
                                            <option value="1">Full Access</option>
                                            <option value="2">Edit Access</option>
                                            <option value="3">View Only</option>
                                            <option value="4">Admin Level</option>
                                            <option value="5">User Level</option>
                                        </select>
                                    </div>

                                    <div className="box-footer text-right">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Add Permission
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

export default AddPermission;
