import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast} from "react-toastify";


const UpdateIssue = () => {
    const navigate = useNavigate();
    const { issues_id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [driverId, setDriverId] = useState("");
    const [drivers, setDrivers] = useState([]);
    const [recomondation, setRecomondation] = useState("")
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await axios.get("api/drivers-list");
            setDrivers(response.data.data.data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };
    useEffect(() => {
        // Fetch user data and populate form fields
        const fetchDriver = async () => {
            try {
                const response = await axios.get(
                `/api/issues-edit/${ issues_id}`);
                const driverData = response.data.data; 
                console.log("Driver Data:", driverData);
                setTitle(driverData.title);
                setDescription(driverData.description);
                setDate(driverData.date);
                setStatus(driverData.status === 'active' ? 'active' : 'inactive');
                setDriverId(driverData.driver_id);
                setRecomondation(driverData.recomondation);

            } catch (error) {
                setError(
                    error.response ? error.response.data.error : error.message
                );
            }
        };

        fetchDriver();
    }, [ issues_id]);
    

    const handleUpdateIssue = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title); 
            formData.append("description", description); 
            formData.append("date", date); 
            formData.append("status", status ? "active" : "inactive");
            formData.append("driver_id", driverId); // Append driverId instead of drivers array
            formData.append("recomondation", recomondation);
        
            const response = await axios.post(
                `/api/edit-new-issues/${issues_id}`,
                formData,
                {
                   
                }
            );
             // Show success toast
             toast.success("Issue updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            navigate("/IssueList ");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
            // Show error toast if deletion fails
            toast.error("Failed to update Issue", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    return (

        <div className="content-wrapper" >
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
            <section className="content" style={{ minHeight: '100vh' }}>
                <div className="row">
                    <div className="col-md-12 col-xm-12">
                        <div className="box  box-primary text-left">
                            <div className="box-header with-border" >
                                <h3 className="box-title">Update Issue</h3>
                            </div>

                            <form onSubmit={handleUpdateIssue}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputName">
                                            Tittle
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tittle"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            autoComplete="off"

                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
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
                                        <label for="exampleInputEmail1">
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
                                        <label for="exampleInputEmail1">
                                            Status
                                        </label>
                                        <select
                                            className="form-control"
                                            value={status ? 'active' : 'inactive'}
                                            onChange={(e) => setStatus(e.target.value === status)}
                                        >
                                            <option value="">
                                                {" "}
                                                Select status
                                            </option>
                                            <option value="active">
                                                {" "}
                                                Active
                                            </option>
                                            <option value="inactive">
                                                {" "}
                                                Inactive
                                            </option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>

                                <div className="form-group has-feedback col-md-6 col-xm-12">
                                <div className="form-group">
                                    <label htmlFor="driverId">Driver</label>
                                    <select
                                        id="driverId"
                                        className="form-control"
                                        value={driverId}
                                        onChange={(e) => setDriverId(e.target.value)}
                                    >
                                        <option value="">Select Driver</option>
                                        {drivers.map(driver => (
                                            <option key={driver.driver_id} value={driver.driver_id}>
                                                {driver.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Recomendations
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=" Recomendations"
                                            value={recomondation}
                                            onChange={(e) =>
                                                setRecomondation(e.target.value)
                                            }
                                            autoComplete="off"
                                        />
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

export default UpdateIssue;