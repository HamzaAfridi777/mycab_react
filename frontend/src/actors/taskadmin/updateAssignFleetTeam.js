import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const UpdateAssignFleetTeam = () => {
    const { TA_assign_fleet_id } = useParams();
    const navigate = useNavigate();
    const [user_id, setUser_id] = useState("");
    const [fleetId, setFleetId] = useState("");
    const [teams, setTeams] = useState([]);
    const [fleets, setFleets] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        fetchTeamAdmins();
        fetchFleets();
        fetchAssignFleet();
    }, []);

    const fetchTeamAdmins = async () => {
        try {
            const response = await axios.get("/api/TeamAdmin-list");
            setTeams(response.data.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
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

    // Function to fetch assign fleet to teamadmin data
    const fetchAssignFleet = async () => {
        try {
            const response = await axios.get(
                `/api/TA-assign-fleets/${TA_assign_fleet_id}`
            );
            const { user_id, fleet_id } = response.data.data;

            // setUser_id(user_id.toString()); // Ensure user_id is a string
            // Convert user_id to integer and set in state

            setUser_id(parseInt(user_id)); //setUser_id(user_id);
            setFleetId(fleet_id.toString()); // Ensure fleet_id is a string
        } catch (error) {
            console.error("Error fetching assign fleet:", error);
            setError("Error fetching assign fleet.");
        }
    };
    const handleUpdateAssignFleetTeam = async (e) => {
        e.preventDefault();
        try {
            // Check if user_id is a valid integer
            if (!Number.isInteger(user_id)) {
                throw new Error("The user id field must be an integer.");
            }
            const formData = new FormData();

            //formData.append("user_id", String(user_id)); // Ensure user_id is sent as a string
            //  formData.append("user_id", parseInt(user_id));
            formData.append("user_id", user_id); // Ensure user_id is sent as an integer
            formData.append("fleet_id", fleetId); // Append fleetId instead of fleets array

            const response = await axios.post(
                `/api/TA-assign-fleets-Update/${TA_assign_fleet_id}`,
                formData,
                {}
            );
            // Show success toast
      toast.success("AssignedFleet updated successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
    });
            navigate("/AssignFleetList ");
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
                    {"Taskadmin"}
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
                                    Update Assign Fleet To TeamAdmin{" "}
                                </h3>
                            </div>

                            <form onSubmit={handleUpdateAssignFleetTeam}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <div className="form-group">
                                            <label htmlFor="driverId">
                                                TeamAdmins
                                            </label>
                                            <select
                                                id="user_id"
                                                name="user_id"
                                                className="form-control"
                                                value={user_id}
                                                // onChange={(e) =>
                                                //     setUser_id(e.target.value)
                                                // }
                                                onChange={(e) =>
                                                    setUser_id(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Select TeamAdmin
                                                </option>
                                                {teams.map((team) => (
                                                    <option
                                                        key={team.user_id}
                                                        value={team.user_id}
                                                    >
                                                        {team.name}
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
                                                name="fleet_id"
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

export default UpdateAssignFleetTeam;
