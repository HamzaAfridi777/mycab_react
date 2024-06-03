import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignFleetTeam = () => {
    const navigate = useNavigate();
    const [teamId, setTeamId] = useState("");
    const [fleetId, setFleetId] = useState("");
    const [teams, setTeams] = useState([]);
    const [fleets, setFleets] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        fetchTeamAdmins();
        fetchFleets();
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

    const handleAssignFleetTeam = async (e) => {
        e.preventDefault();
        try {
            // Find the selected team admin by name to get its user_id
            const selectedTeamAdmin = teams.find(team => team.name === teamId);
            if (!selectedTeamAdmin) {
                throw new Error("Selected team admin not found");
            }
            
            const response = await axios.post(
                "/api/TA-assign-fleets",
                { user_id: selectedTeamAdmin.user_id, fleet_id: fleetId },
                { headers: { Accept: "application/json", "Content-Type": "application/json" } }
            );
            // console.log(response.data.data);
             // Show success toast
        toast.success('Assigned Fleet to Team Added successfully', 
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            navigate("/AssignFleetList");
        } catch (error) {
            setError(error.response ? error.response.data.error : error.message);
              // Show error toast if deletion fails
        toast.error('Failed to add Assigned Fleet to Team ',
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        }
    };
    return (

        <div className="content-wrapper" >
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
            <section className="content" style={{ minHeight: '100vh' }}>
                <div className="row">
                    <div className="col-md-12 col-xm-12">
                        <div className="box  box-primary text-left">
                            <div className="box-header with-border" >
                                <h3 className="box-title">Assign Fleet To TeamAdmin </h3>
                            </div>

                            <form onSubmit={handleAssignFleetTeam}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <div className="form-group">
                                            <label htmlFor="driverId">TeamAdmins</label>
                                            <select
                                                id="teamId"
                                                className="form-control"
                                                value={teamId}
                                                onChange={(e) => setTeamId(e.target.value)}
                                            >
                                                <option value="">Select TeamAdmin</option>
                                                {teams.map(team => (
                                                    <option key={team.team_admin_id} 
                                                           value={team.team_admin_id}>
                                                        {team.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-group has-feedback col-md-6 col-xm-12">
                                            <label htmlFor="fleetId">Fleet</label>
                                            <select
                                                id="fleetId"
                                                className="form-control"
                                                value={fleetId}
                                                onChange={(e) => setFleetId(e.target.value)}
                                            >
                                                <option value="">Select Fleet</option>
                                                {fleets.map(fleet => (
                                                    <option key={fleet.fleet_id} value={fleet.fleet_id}>
                                                        {fleet.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="box-footer text-right">
                                            <button type="submit" className="btn btn-primary">Submit</button>
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

export default AssignFleetTeam;