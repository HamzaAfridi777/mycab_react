import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateFranchise = () => {
    const { franchiseSystem_id } = useParams(); // Retrieve userId from URL params
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [franchises, setFranchises] = useState([]);
    const [franchise_id, setFranchiseId] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        console.log(franchises); // Log franchises array to console
    }, [franchises]); // Run this effect whenever franchises state changes

    useEffect(() => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get("/api/Franchise-owner", config)
            .then((response) => {
                setFranchises(response.data.data.data);
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
                    `/api/update-franchiseSystem/${franchiseSystem_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in request headers
                        },
                    }
                );
                const franchiseData = response.data.data;
                setName(franchiseData.name);
                setFranchiseId(franchiseData.franchise_owner);
                setStatus(
                    franchiseData.status === "active" ? "active" : "inactive"
                );
            } catch (error) {
                setError(
                    error.response ? error.response.data.error : error.message
                );
            }
        };

        fetchFranchise();
    }, [franchiseSystem_id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("franchise_owner", franchise_id);
            formData.append("status", status ? "active" : "inactive");

            const token = localStorage.getItem("token"); // Retrieve token from localStorage

            const response = await axios.post(
                `/api/edit-new-franchiseSystem/${franchiseSystem_id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request headers
                    },
                }
            );
            // Show success toast
            toast.success("Franchise updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            // Handle response
            navigate("/FranchiseList");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
              // Show error toast if deletion fails
        toast.error('Failed to update Franchise',
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
                                    Edit Franchise System{" "}
                                </h3>
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
                                        <label htmlFor="Franchise">
                                            Franchise
                                        </label>
                                        <select
                                            id="franchise_id"
                                            className="form-control"
                                            value={franchise_id}
                                            onChange={(e) =>
                                                setFranchiseId(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Select Franchise
                                            </option>
                                            {franchises.map((franchise) => (
                                                <option
                                                    key={
                                                        franchise.franchise_owner
                                                    }
                                                    value={
                                                        franchise.franchise_owner
                                                    }
                                                >
                                                    {franchise.name}
                                                </option>
                                            ))}
                                        </select>
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
                                        Edit Franchise
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

export default UpdateFranchise;
