import React, { useEffect, useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const UpdatePermission = () => {
    const { permission_id } = useParams(); // Retrieve userId from URL params
    const navigate = useNavigate();
    // const [userData, setUserData] = useState(null);
    const [name, setName] = useState("");
    const [routes, setRoutes] = useState("");
    const [sp_id, setSp_id] = useState("");
    const [parent, setParent] = useState("");
    const [level_id, setLevel_id] = useState("");
    const [error, setError] = useState("");
    // const [redirectToList, setRedirectToList] = useState(false);

    // const setTokenInLocalStorage = (token) => {
    //     localStorage.setItem("token", token);
    // };

    useEffect(() => {
        // Fetch user data and populate form fields
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `/api/update-permission/${permission_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in request headers
                        },
                    }
                );
                const userData = response.data.data; // assuming response.data is an object with user data
                // assuming response.data is an object with user data
                console.log("User Data:", userData);
                setName(userData.name);
                setRoutes(userData.routes);
                setSp_id(userData.sp_id);
                setParent(userData.parent);
                setLevel_id(userData.level_id);
            } catch (error) {
                setError(
                    error.response ? error.response.data.error : error.message
                );
            }
        };

        fetchUser();
    }, [permission_id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("routes", routes);
            formData.append("sp_id", sp_id);
            formData.append("parent", parent);
            formData.append("level_id", level_id);

            const token = localStorage.getItem("token"); // Retrieve token from localStorage

            const response = await axios.post(
                `/api/edit-permission/${permission_id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request headers
                    },
                }
            );
            // Show success toast
            toast.success("Permission updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            // Handle response
            navigate("/PermissionList");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
            // Show error toast if deletion fails
            toast.error("Failed to update Permission", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
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
                                <h3 className="box-title">Edit Permission</h3>
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
                                        <label for="exampleInputName">
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
                                        <label for="exampleInputEmail1">
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
                                                {" "}
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
                                        <label for="exampleInputName">
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
                                        <label for="exampleInputEmail1">
                                            Level
                                        </label>
                                        <select
                                            className="form-control"
                                            value={level_id}
                                            onChange={(e) =>
                                                setLevel_id(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                {" "}
                                                Select Level
                                            </option>
                                            <option value="1">
                                                Full Access
                                            </option>
                                            <option value="2">
                                                Edit Access
                                            </option>
                                            <option value="3">View Only</option>
                                            <option value="4">
                                                Admin Level
                                            </option>
                                            <option value="5">
                                                User Level
                                            </option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>
                                </div>

                                <div className="box-footer text-right ">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Edit Permission
                                    </button>
                                </div>
                            </form>
                        </div>
                        {error && (
                            <p style={{ color: "red", background: "pink" }}>
                                {error}
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdatePermission;
