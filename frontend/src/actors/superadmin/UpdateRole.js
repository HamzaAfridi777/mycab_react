import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRole = () => {
    const { role_id } = useParams(); // Retrieve userId from URL params
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch user data and populate form fields
        const fetchRole = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from local storage
                const response = await axios.get(
                    `/api/update-role/${role_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in request headers
                        },
                    }
                );
                const roleData = response.data.data;
                setName(roleData.name);
                setStatus(roleData.status === "active" ? "active" : "inactive");
            } catch (error) {
                setError(
                    error.response ? error.response.data.error : error.message
                );
            }
        };

        fetchRole();
    }, [role_id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("status", status ? "active" : "inactive");
            // console.log("Status:", status ? "active" : "inactive");

            const token = localStorage.getItem("token"); // Retrieve token from localStorage

            const response = await axios.post(
                `/api/edit-new-role/${role_id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request headers
                    },
                }
            );
            // Show success toast
            toast.success("Role updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            // Handle response
            navigate("/RoleList");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
             // Show error toast if deletion fails
        toast.error('Failed to update Role',
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
                                <h3 className="box-title">Update Role </h3>
                            </div>

                            <form onSubmit={handleUpdate}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputName">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            autoComplete="off"
                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Status
                                        </label>
                                        <select
                                            className="form-control"
                                            value={
                                                status ? "active" : "inactive"
                                            }
                                            onChange={(e) =>
                                                setStatus(
                                                    e.target.value === status
                                                )
                                            }
                                            // setStatus(e.target.value)
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
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>
                                </div>

                                <div className="box-footer text-right">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Edit Role
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdateRole;
