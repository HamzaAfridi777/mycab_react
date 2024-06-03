import React, { useState, useEffect } from "react";
// import { link } from "react-router-dom";
import axios from "axios";
import { json } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const UpdateNewTask = () => {
    const { task_id } = useParams(); // Retrieve userId from URL params
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [task_admin, setTaskAdmin] = useState("");
    const [Tasks, setTasks] = useState([]);
    const [franchiseSystem_id, setFranchiseSystem_id] = useState("");
    const [franchiseSystemids, setFranchiseSystemids] = useState([]);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {}, [Tasks]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get("http://127.0.0.1:8000/api/TaskAdmin-list", config)
            .then((response) => {
                setTasks(response.data.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    ///fetchfranchiseSystem_id,
    useEffect(() => {}, [franchiseSystemids]); // Run this effect whenever franchises state changes

    useEffect(() => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get("/api/list-franchiseSystem", config)
            .then((response) => {
                setFranchiseSystemids(response.data.data.data);
            })
            .catch((error) => {
                console.error("Error fetching Franchise:", error);
            });
    }, []);

    useEffect(() => {
        const fetchFranchise = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`/api/task-edit/${task_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const franchiseData = response.data.data; // Access nested data object
                setDescription(franchiseData.TaskDescription); // Use TaskDescription instead of description
                setTaskAdmin(franchiseData.taskadmin); // Use taskadmin instead of task_admin
                setFranchiseSystem_id(franchiseData.franchiseSystem_id); // Use franchiseSystem_id instead of franchiseSystem_id
                setStatus(franchiseData.status === "active" ? true : false); // Convert status to boolean
            } catch (error) {
                setError(
                    error.response ? error.response.data.error : error.message
                );
            }
        };

        fetchFranchise();
    }, [task_id]);

  //  setStatus(franchiseData.status === "active" ? "active" : "inactive");
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("TaskDescription", description);
            formData.append("TaskAdmin", task_admin); // Use TaskAdmin instead of task_admin
            formData.append("franchiseSystem_id", franchiseSystem_id);
            formData.append("status", status ? "active" : "inactive");

            const token = localStorage.getItem("token"); // Retrieve token from localStorage

            const response = await axios.post(
                `/api/edit-new-task/${task_id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request headers
                    },
                }
            );

            // Handle response
            navigate("/TaskList");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
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
                                <h3 className="box-title">Edit Task </h3>
                            </div>

                            <form onSubmit={handleUpdate}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="Description"
                                            autoComplete="off"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="userRole">
                                            Task Admin
                                        </label>
                                        <select
                                            id="Franchise"
                                            className="form-control"
                                            value={task_admin}
                                            onChange={(e) =>
                                                setTaskAdmin(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Select Task Admin
                                            </option>
                                            {Tasks.map((franchise) => (
                                                <option
                                                    key={franchise.task_admin}
                                                    value={franchise.task_admin}
                                                >
                                                    {franchise.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="Franchise">
                                            Franchise System Id
                                        </label>
                                        <select
                                            id="franchise_id"
                                            className="form-control"
                                            value={franchiseSystem_id}
                                            onChange={(e) =>
                                                setFranchiseSystem_id(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                select Franchise System Id
                                            </option>
                                            {franchiseSystemids.map(
                                                (franchise) => (
                                                    <option
                                                        key={
                                                            franchise.franchiseSystem_id
                                                        }
                                                        value={
                                                            franchise.franchiseSystem_id
                                                        }
                                                    >
                                                        {franchise.name}
                                                    </option>
                                                )
                                            )}
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
                                        Edit Task
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

export default UpdateNewTask;
