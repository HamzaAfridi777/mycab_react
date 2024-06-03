import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const UpdateAssignFranchisePermission = () => {
    const { APTofranchiseSystem_id } = useParams(); // Retrieve userId from URL params
    const navigate = useNavigate();

    const [franchisepermissionids, setFranchisePermissionIds] = useState([]);
    const [franchise_permission_id, setFranchise_permission_id] = useState("");
    const [franchiseSystem_id, setFranchiseSystem_id] = useState("");
    const [franchiseSystemids, setFranchiseSystemids] = useState([]);
    const [error, setError] = useState("");

    ///permissionsIds
    useEffect(() => {}, [franchisepermissionids]); // Run this effect whenever franchises state changes

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
                console.error("Error fetching Franchise:", error);
            });
    }, []);

    ///fetchfranchiseSystem_id,
    useEffect(() => {}, [franchiseSystemids]); // Run this effect whenever franchises state changes

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
                console.error("Error fetching Franchise:", error);
            });
    }, []);

    useEffect(() => {
        const fetchFranchise = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from local storage
                const response = await axios.get(
                    `/api/update-Assignfranchise-Permission/${APTofranchiseSystem_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in request headers
                        },
                    }
                );
                const franchiseData = response.data.data;

                setFranchise_permission_id(
                    franchiseData.franchise_permission_id
                );
                setFranchiseSystem_id(franchiseData.franchiseSystem_id);
            } catch (error) {
                setError(
                    error.response ? error.response.data.error : error.message
                );
            }
        };

        fetchFranchise();
    }, [APTofranchiseSystem_id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("franchise_permission_id", franchise_permission_id);
            formData.append("franchiseSystem_id", franchiseSystem_id);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                `/api/edit-new-Assignfranchise-Permission/${APTofranchiseSystem_id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request headers
                    },
                }
            );
// Show success toast
toast.success("Assign Franchise Permission updated successfully", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
});
            // Handle response
            navigate("/AssignFranchisePermissionList");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
             // Show error toast if deletion fails
             toast.error("Failed to update Assign Franchise Permission ", {
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
                                <h3 className="box-title">
                                    Edit Assign Franchise Permission{" "}
                                </h3>
                            </div>

                            <form onSubmit={handleUpdate}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="Franchise">
                                            Franchise Permission Id
                                        </label>
                                        <select
                                            id="franchise_id"
                                            className="form-control"
                                            value={franchise_permission_id}
                                            onChange={(e) =>
                                                setFranchise_permission_id(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
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
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="Franchise">
                                            Franchise System Id
                                        </label>
                                        <select
                                            id="franchise_id"
                                            className="form-control"
                                            value={franchiseSystem_id}
                                            onChange={(e) =>
                                                setFranchiseSystem_id(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                select Franchise System Id
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
                                                        {
                                                            franchise.name
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="box-footer text-right">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Edit Assign Franchise Permission
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

export default UpdateAssignFranchisePermission;
