import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAccident = () => {
    const navigate = useNavigate();
    const [fleetId, setFleetId] = useState("");
    const [fleets, setFleets] = useState([]);
    const [driverId, setDriverId] = useState("");
    const [drivers, setDrivers] = useState([]);
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDrivers();
        fetchFleets();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await axios.get("api/drivers-list");
            setDrivers(response.data.data.data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };
    const fetchFleets = async () => {
        try {
            const response = await axios.get("api/fleets-list");
            setFleets(response.data.data.data);
        } catch (error) {
            console.error("Error fetching fleets:", error);
        }
    };

    const handleAddAccident = async (e) => {
        e.preventDefault();
        try {
            // const token = localStorage.getItem("token");

            const response = await axios.post(
                "/api/add-new-accident",

                {
                    fleet_id: fleetId,
                    driver_id: driverId,
                    accident_date: date,
                    description,
                    location,
                },

                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            
            // console.log(response.data.data);
            // Show success toast
        toast.success('Accident Added successfully', 
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            navigate("/AccidentList");
            //  setRedirectToList(true);
        } catch (error) {
            // Handle login error
            setError(
                error.response ? error.response.data.error : error.message
            );
            // Show error toast if deletion fails
        toast.error('Failed to add Accident',
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
                                <h3 className="box-title">Add Accident</h3>
                            </div>

                            <form onSubmit={handleAddAccident}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="fleetId">Fleet</label>
                                        <select
                                            id="fleetId"
                                            className="form-control"
                                            value={fleetId}
                                            onChange={(e) =>
                                                setFleetId(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Select Fleet
                                            </option>
                                            {fleets.map((fleet) => (
                                                <option
                                                    key={fleet.fleet_id}
                                                    value={fleet.fleet_id}
                                                >
                                                    {fleet.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <div className="form-group">
                                            <label htmlFor="driverId">
                                                Driver
                                            </label>
                                            <select
                                                id="driverId"
                                                className="form-control"
                                                value={driverId}
                                                onChange={(e) =>
                                                    setDriverId(e.target.value)
                                                }
                                            >
                                                <option value="">
                                                    Select Driver
                                                </option>
                                                {drivers.map((driver) => (
                                                    <option
                                                        key={driver.driver_id}
                                                        value={driver.driver_id}
                                                    >
                                                        {driver.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="yyyy-mm-dd"
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputName">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tittle"
                                            value={location}
                                            onChange={(e) =>
                                                setLocation(e.target.value)
                                            }
                                            autoComplete="off"
                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                    </div>
                                </div>

                                <div className="box-footer text-right">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Submit
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

export default AddAccident;
