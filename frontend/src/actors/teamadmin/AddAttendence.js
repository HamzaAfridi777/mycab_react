import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAttendence = () => {
    const navigate = useNavigate();
    const [driverIds, setDriverIds] = useState([]);
    const [drivers, setDriver] = useState([]);
    const [Attendance, setAttendance] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await axios.get("api/drivers-list");
            setDriver(response.data.data.data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setDriverIds((prevIds) => [...prevIds, value]);
        } else {
            setDriverIds((prevIds) =>
                prevIds.filter((id) => id !== value)
            );
        }
    };

    const handleAddAttendence = async (e) => {
        e.preventDefault();
        try {
            // const token = localStorage.getItem("token");
            const selectedDriver = driverIds[0];
            const response = await axios.post(
                "api/add-new-attendance",

                {
                    driver_id: selectedDriver,
                    Attendance,
                },

                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            //  addUserToTable(response.data);
            // console.log(response.data.data);
             // Show success toast
        toast.success('Attendence Added successfully', 
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            navigate("/AttendenceList");
            //  setRedirectToList(true);
        } catch (error) {
            // Handle login error
            setError(
                error.response ? error.response.data.error : error.message
            );
             // Show error toast if deletion fails
        toast.error('Failed to add Attendence',
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content-header" style={{ textAlign: "left" }}>
                <h1>
                    {"Teamadmin"}
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
                                <h3 className="box-title">Add Attendence </h3>
                            </div>

                            <form onSubmit={handleAddAttendence}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-3 col-xm-12">
                                        <div className="form-group">
                                            <label>Drivers:</label>
                                            <br />
                                            {drivers.map((driver) => (
                                                <div key={driver.driver_id}>
                                                    <input
                                                        type="checkbox"
                                                        value={driver.driver_id}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label style={{ marginLeft: "5px" }}>{driver.name}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Attendance
                                        </label>
                                        <select
                                            className="form-control"
                                            value={Attendance}
                                            onChange={(e) =>
                                                setAttendance(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                {" "}
                                                Select Attendance
                                            </option>
                                            <option> Present</option>
                                            <option> Absent</option>
                                            <option> Leave</option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>

                                    <div className="box-footer text-right">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Submit
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

export default AddAttendence;
