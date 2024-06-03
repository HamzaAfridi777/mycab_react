import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';

const UserPermission = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [user_id, setUserId] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [selectedPermission, setSelectedPermission] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get("/api/users-list", config);
                setUser(response.data.data.data);

                const permissionsResponse = await axios.get(
                    "api/user-permission-list",
                    config
                ); // Fetch permissions

                if (Array.isArray(permissionsResponse.data.data.data)) {
                    // Check if permissions data is an array
                    setPermissions(permissionsResponse.data.data.data); // Set permissions state
                } else {
                    setError("Permissions data is not an array");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleAddPermission = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "/api/user-permissions-add",
                {
                    user_id,
                    permission_id: selectedPermission,
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

          //  console.log(response.data.data);
           // Show success toast
        toast.success('User Permission Added successfully', 
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            navigate("/UserPermissionList");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
            // Show error toast if deletion fails
        toast.error('Failed to add User Permission',
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
                        <div className="box box-primary text-left">
                            <div className="box-header with-border">
                                <h3 className="box-title">User Permission</h3>
                            </div>
                            <form onSubmit={handleAddPermission}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="userRole">User</label>
                                        <select
                                            id="user"
                                            className="form-control"
                                            onChange={(e) =>
                                                setUserId(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Select User
                                            </option>
                                            {user.map((user) => (
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
                                                        type="checkbox"
                                                        value={
                                                            permission.permission_id
                                                        }
                                                        onChange={(e) => {
                                                            const permissionId =
                                                                e.target.value;
                                                            setSelectedPermission(
                                                                permissionId
                                                            ); // Update selectedPermission with the new value
                                                        }}
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
                                        Add Permission
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

export default UserPermission;
