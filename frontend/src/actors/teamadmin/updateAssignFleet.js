import React, { useEffect, useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast} from "react-toastify";

const UpdateAssignFleet = () => {
    const { assign_fleet_id } = useParams(); // Retrieve userId from URL params
    const navigate = useNavigate();
    const [driverId, setDriverId] = useState("");
    const [fleetId, setFleetId] = useState("");
    const [drivers, setDrivers] = useState([]);
    const [fleets, setFleets] = useState([]);
    const [error, setError] = useState("");

    // Function to fetch drivers
    const fetchDrivers = async () => {
        try {
            const response = await axios.get("api/drivers-list");
            return response;
        } catch (error) {
            throw error;
        }
    };

    // Function to fetch fleets
    const fetchFleets = async () => {
        try {
            const response = await axios.get("api/fleets-list");
            return response;
        } catch (error) {
            throw error;
        }
    };

    // Function to fetch assign fleet data
    const fetchAssignFleet = async () => {
        try {
            const response = await axios.get(
                `api/update-assign-fleet/${assign_fleet_id}`
            );
            return response;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [driversResponse, fleetsResponse, assignFleetResponse] =
                    await Promise.all([
                        fetchDrivers(),
                        fetchFleets(),
                        fetchAssignFleet(),
                    ]);

                setDrivers(driversResponse.data.data.data);
                setFleets(fleetsResponse.data.data.data);

                const assignFleetData = assignFleetResponse.data.data;
                setDriverId(assignFleetData.driver_id);
                setFleetId(assignFleetData.fleet_id);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleUpdateFleet = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("driver_id", driverId); // Append driverId instead of drivers array
            formData.append("fleet_id", fleetId); // Append fleetId instead of fleets array

            const response = await axios.post(
                `api/edit-assign-fleet/${assign_fleet_id}`,
                formData,
                {}
            );
             // Show success toast
             toast.success("AssignedFleet updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            navigate("/AssignedFleetLists ");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
             // Show error toast if deletion fails
             toast.error("Failed to update AssignedFleet", {
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
                                <h3 className="box-title">Edit Assign Fleet</h3>
                            </div>

                            <form onSubmit={handleUpdateFleet}>
                                <div className="box-body">
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
                                                {drivers &&
                                                    drivers.map((driver) => (
                                                        <option
                                                            key={
                                                                driver.driver_id
                                                            }
                                                            value={
                                                                driver.driver_id
                                                            }
                                                        >
                                                            {driver.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-group has-feedback col-md-6 col-xm-12">
                                            <label htmlFor="fleetId">
                                                Fleet
                                            </label>
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
                                                            value={
                                                                fleet.fleet_id
                                                            }
                                                        >
                                                            {fleet.name}
                                                        </option>
                                                    ))}
                                            </select>
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

export default UpdateAssignFleet;
