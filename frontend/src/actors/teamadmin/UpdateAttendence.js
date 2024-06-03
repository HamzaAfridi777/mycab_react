import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const UpdateAttendence = () => {
    const navigate = useNavigate();
    const { attendance_id } = useParams(); // Retrieve userId from URL params
    const [serial_no, setSerial_no] = useState("");
    const [driverIds, setDriverIds] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [Attendance, setAttendance] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDrivers();
       // fetchDriverAttendence();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await axios.get("api/drivers-list");
            setDrivers(response.data.data.data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setDriverIds((prevIds) => [...prevIds, parseInt(value)]); // Ensure value is an integer
        } else {
            setDriverIds((prevIds) => prevIds.filter((id) => id !== parseInt(value)));
        }
    };
    useEffect(() => {
        // Fetch user data and populate form fields
        const fetchDriverAttendence = async () => {
            try {
                const response = await axios.get(
                    `/api/attendance-edit/${attendance_id}`
                );
                const driverData = response.data.data;

                console.log("Driver Data:", driverData);
                setSerial_no(driverData.serial_no);
                // setDriverIds(driverData.driver_id);
                setDriverIds([driverData.driver_id]); // Ensure this is set as an array
                setAttendance(driverData.Attendance);
            } catch (error) {
                setError(
                    error.response ? error.response.data.error : error.message
                );
            }
        };

        fetchDriverAttendence();
    }, [attendance_id]);

    const handleUpdateAttendence = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("serial_no", serial_no);
            formData.append("driver_id", driverIds); // Append driverId instead of drivers array
            formData.append("Attendance", Attendance);

            const response = await axios.post(
                `/api/edit-new-attendance/${attendance_id}`,
                formData,
                {}
            );
            // Show success toast
            toast.success("Attendence updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            navigate("/AttendenceList ");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
            // Show error toast if deletion fails
            toast.error("Failed to update Attendence", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
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
                                <h3 className="box-title">
                                    Update Attendence{" "}
                                </h3>
                            </div>

                            <form onSubmit={handleUpdateAttendence}>
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
                                                        checked={
                                                            Array.isArray(
                                                                driverIds
                                                            ) &&
                                                            driverIds.includes(
                                                                driver.driver_id
                                                            )
                                                        }
                                                        // Check if driverIds is an array and driverId is included
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label
                                                        style={{
                                                            marginLeft: "5px",
                                                        }}
                                                    >
                                                        {driver.name}
                                                    </label>
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

export default UpdateAttendence;
