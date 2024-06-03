import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFleet = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [serial_no, setSerial_no] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const handleAddFleet = async (e) => {
        e.preventDefault();
        try {
            // const token = localStorage.getItem("token");

            const response = await axios.post(
                "api/add-new-fleet",

                {
                    name,
                    serial_no,
                    status: status === "1" ? "active" : "inactive",

                },

                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",

                    }
                }
            );
             // Show success toast
             toast.success("Fleet added successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            navigate("/FleetList");
        } catch (error) {
            // Handle login error
            setError(
                error.response ? error.response.data.error : error.message
            );
               // Show error toast if deletion fails
               toast.error("Failed to add Fleet", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    return (

        <div className="content-wrapper" >
            <section className="content-header" style={{ textAlign: "left" }}>
                <h1>
                    {"Franchise Owner"}
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
                                <h3 className="box-title">Add Fleet </h3>
                            </div>

                            <form onSubmit={handleAddFleet}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputName">
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
                                        <label for="exampleInputName">
                                            Serial No
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Serial_No"
                                            autoComplete="off"
                                            value={serial_no}
                                            onChange={(e) =>
                                                setSerial_no(e.target.value)
                                            }
                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                    </div>



                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Status
                                        </label>
                                        <select
                                            className="form-control"
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                {" "}
                                                Select status
                                            </option>
                                            <option value="1">
                                                {" "}
                                                Active
                                            </option>
                                            <option value="0">
                                                {" "}
                                                Inactive
                                            </option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span>*/}
                                    </div>

                                    <div className="box-footer text-right">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"

                                        >
                                            Add Fleet
                                        </button>
                                    </div>
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

export default AddFleet;