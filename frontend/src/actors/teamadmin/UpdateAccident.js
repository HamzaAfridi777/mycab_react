import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast} from "react-toastify";

const UpdateAccident = () => {
    const navigate = useNavigate();
    const { accident_id } = useParams();
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
    useEffect(() => {
        const fetchAccident = async () => {
            try {
                const response = await axios.get(`/api/accident-edit/${accident_id}`);
                const accidentData = response.data.data;
                setFleetId(accidentData.fleet_id);
                setDriverId(accidentData.driver_id);
                setDate(accidentData.accident_date);
                setDescription(accidentData.description);
                setLocation(accidentData.location);
            } catch (error) {
                console.error("Error fetching accident data:", error);
            }
        };
    
        fetchAccident();
    }, [accident_id]);
    
    // const handleUpdateAccident = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const formData = new FormData();
    //         formData.append("fleet_id", fleetId);
    //         formData.append("driver_id", driverId); // Append driverId instead of drivers array
    //         formData.append("accident_date", date);
    //         formData.append("description", description);
    //         formData.append("location", location);

    //         const response = await axios.post(
    //             `/api/edit-new-accident/${accident_id}`,
    //             formData,
    //             {}
    //         );
    //         navigate("/AccidentList ");
    //     } catch (error) {
    //         setError(
    //             error.response ? error.response.data.error : error.message
    //         );
    //     }
    // };

    const handleUpdateAccident = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                fleet_id: fleetId,
                driver_id: driverId,
                accident_date: date,
                description: description,
                location: location,
            };
    
            const response = await axios.post(
                `/api/edit-new-accident/${accident_id}`, // Endpoint remains as POST
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
             // Show success toast
             toast.success("Accident updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            navigate("/AccidentList");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
            // Show error toast if deletion fails
            toast.error("Failed to update Accident", {
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
                                <h3 className="box-title">Update Accident</h3>
                            </div>

                            <form onSubmit={handleUpdateAccident}>
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
                                            {fleets &&
                                                fleets.map((fleet) => (
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
                                        <label for="exampleInputEmail1">
                                           Accident Date
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
                                        <label for="exampleInputEmail1">
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
                                        <label for="exampleInputName">
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

export default UpdateAccident;
