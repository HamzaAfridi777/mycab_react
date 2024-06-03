import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const UpdateUserPermission = () => {
    const { user_permission_id } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [user_id, setUserId] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [selectedPermission, setSelectedPermission] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const userResponse = await axios.get("/api/users-list", config);
                setUsers(userResponse.data.data.data);

                const permissionsResponse = await axios.get(
                    "/api/user-permission-list",
                    config
                );
                setPermissions(permissionsResponse.data.data.data);

                const userPermissionResponse = await axios.get(
                    `/api/user-permissions-edit/${user_permission_id}`,
                    config
                );
                const userPermissionData = userPermissionResponse.data.data;

                if (userPermissionData) {
                    setUserId(userPermissionData.user_id);
                    setSelectedPermission(
                        userPermissionData.permission_id.toString()
                    ); // Convert to string
                } else {
                    setError("User permission data not found");
                }
            } catch (error) {
                setError(
                    error.response ? error.response.data.error : error.message
                );
            }
        };

        fetchData();
    }, [user_permission_id]);

    const handleUpdatePermission = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("user_id", user_id);
            formData.append("permission_id", selectedPermission);

            await axios.post(
                `/api/user-permissions-update/${user_permission_id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Show success toast
            toast.success("UserPermission updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            navigate("/UserPermissionList");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
            // Show error toast if deletion fails
            toast.error("Failed to update UserPermission", {
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
                        <div className="box box-primary text-left">
                            <div className="box-header with-border">
                                <h3 className="box-title">
                                    Update User Permission
                                </h3>
                            </div>
                            <form onSubmit={handleUpdatePermission}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="userRole">Users</label>
                                        <select
                                            id="user"
                                            className="form-control"
                                            value={user_id}
                                            onChange={(e) =>
                                                setUserId(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Select User
                                            </option>
                                            {users.map((user) => (
                                                <option
                                                    key={user.user_id}
                                                    value={user.user_id}
                                                >
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Permission
                                        </label>
                                        <div>
                                            {permissions.map((permission) => (
                                                <div
                                                    key={
                                                        permission.permission_id
                                                    }
                                                >
                                                    <input
                                                        type="radio"
                                                        name="permission"
                                                        value={permission.permission_id.toString()} // Convert to string
                                                        checked={
                                                            permission.permission_id.toString() ===
                                                            selectedPermission
                                                        } // Compare as strings
                                                        onChange={(e) =>
                                                            setSelectedPermission(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        style={{
                                                            marginLeft: "5px",
                                                        }}
                                                    >
                                                        {permission.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer text-right">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Update Permission
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

export default UpdateUserPermission;
