import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewTask = () => {
    const navigate = useNavigate();
    const [TaskDescription, setTaskDescription] = useState("");
    const [task_admin, setTaskAdmin] = useState("");
    const [Tasks, setTasks] = useState([]);
    const [franchiseSystem_id, setFranchiseSystemid] = useState("");
    const [franchiseSystemids, setFranchiseSystemids] = useState([]);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

 
    useEffect(() => {
        const fetchData = async () => {
         try {
           const response = await axios.get("http://127.0.0.1:8000/api/TaskAdmin-list");
           setTasks(response.data.data.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

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
                console.error("Error fetching roles:", error);
            });
    }, []);

    const handleAddFleet = async (e) => {
        e.preventDefault();
        try {
            // const token = localStorage.getItem("token");

            const response = await axios.post(
                "/api/add-new-task",

                {
                    TaskDescription,
                    TaskAdmin:  task_admin,
                    franchiseSystem_id: franchiseSystem_id,
                    status: status === "1" ? "active" : "inactive",
                },

                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
           // Show success toast
           toast.success("Task added successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
            navigate("/TaskList");
        } catch (error) {
            // Handle login error
            setError(
                error.response ? error.response.data.error : error.message
            );
             // Show error toast if deletion fails
             toast.error("Failed to add Task", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    return (
        <div className="content-wrapper">
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
            <section className="content" style={{ minHeight: "100vh" }}>
                <div className="row">
                    <div className="col-md-12 col-xm-12">
                        <div className="box  box-primary text-left">
                            <div className="box-header with-border">
                                <h3 className="box-title">Add New Task </h3>
                            </div>

                            <form onSubmit={handleAddFleet}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="Description"
                                            autoComplete="off"
                                            value={TaskDescription}
                                            onChange={(e) =>
                                                setTaskDescription(e.target.value)
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
                                                    key={
                                                        franchise.task_admin
                                                    }
                                                    value={
                                                        franchise.task_admin
                                                    }
                                                >
                                                    {franchise.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="userRole">
                                            Franchise System Id
                                        </label>
                                        <select
                                            id="Franchise"
                                            className="form-control"
                                            onChange={(e) =>
                                                setFranchiseSystemid(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Franchise System Id
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
                                        <label htmlFor="exampleInputEmail1">
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
                                            <option value="1"> Active</option>
                                            <option value="0"> Inactive</option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span>*/}
                                    </div>

                                    <div className="box-footer text-right">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Add New Task
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

export default AddNewTask;
