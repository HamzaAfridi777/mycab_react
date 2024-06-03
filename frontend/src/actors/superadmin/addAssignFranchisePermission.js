import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';

const AddAssignFranchisePermission = () => {
    const [franchise_permission_id, setFranchisePermissionId] = useState("");
    const [franchisepermissionids, setFranchisePermissionIds] = useState([]);
    const [franchiseSystem_id, setFranchiseSystemid] = useState("");
    const [franchiseSystemids, setFranchiseSystemids] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get("/api/list-franchisePermission", config)
            .then((response) => {
                setFranchisePermissionIds(response.data.data.data);
            })
            .catch((error) => {
                console.error("Error fetching roles:", error);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get("/api/list-franchiseSystem", config)
            .then((response) => {
                setFranchiseSystemids(response.data.data.data);
            })
            .catch((error) => {
                console.error("Error fetching roles:", error);
            });
    }, []);

    const navigate = useNavigate();
    const handleAddFranchise = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "/api/add-Assignfranchise-Permission",
                {
                    franchise_permission_id: franchise_permission_id, // Update key to franchise_permission_id
                    franchiseSystem_id: franchiseSystem_id,
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
        toast.success('Assign Franchise Permission Added successfully', 
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            navigate("/AssignFranchisePermissionList");
            // Handle success, redirect or show a success message
        } catch (error) {
            // Handle error
            console.error("Error adding Assign Franchise Permission:", error);
              // Show error toast if deletion fails
        toast.error('Failed to add Assign Franchise Permission',
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
                                <h3 className="box-title">
                                    Add Assign Franchise Permission
                                </h3>
                            </div>

                            <form onSubmit={handleAddFranchise}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="userRole">
                                            Franchise Permission Id
                                        </label>
                                        <select
                                            id="Franchise"
                                            className="form-control"
                                            onChange={(e) =>
                                                setFranchisePermissionId(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option key="" value="">
                                                Select Franchise Permission Id
                                            </option>
                                            {franchisepermissionids.map(
                                                (franchise) => (
                                                    <option
                                                        key={
                                                            franchise.franchise_permission_id
                                                        }
                                                        value={
                                                            franchise.franchise_permission_id
                                                        }
                                                    >
                                                        {
                                                            franchise.permission_name
                                                        }{" "}
                                                        {/* Use correct key from API response */}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="userRole">
                                            Franchise System Id
                                        </label>
                                        <select
                                            id="Franchise"
                                            className="form-control"
                                            onChange={(e) =>
                                                setFranchiseSystemid(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Franchise System Id
                                            </option>
                                            {franchiseSystemids.map(
                                                (franchise) => (
                                                    <option
                                                        key={
                                                            franchise.franchiseSystem_id
                                                        }
                                                        value={
                                                            franchise.franchiseSystem_id
                                                        }
                                                    >
                                                        {franchise.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div className="box-footer text-right">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Add Assign Franchise Permission
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

export default AddAssignFranchisePermission;
