import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [role_id, setRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [image, setImage] = useState(null);
    const [franchise_id, setFranchise] = useState("");
    const [is_franchise_owner, setIs_franchise_owner] = useState("");
    const [error, setError] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get("/api/users-role-list", config)
            .then((response) => {
                setRoles(response.data.data.data);
            })
            .catch((error) => {
                console.error("Error fetching roles:", error);
            });
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "/api/add-new-user",

                {
                    name,
                    email,
                    password,
                    status: status === "active" ? "active" : "inactive",
                    role_id,
                    image,
                    franchise_id,
                    is_franchise_owner:
                        is_franchise_owner === "1"
                            ? "franchise_owner"
                            : "customer",
                },

                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,

                        //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
                    },
                }
            );
             // Show success toast
        toast.success('User Added successfully', 
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            // console.log(response.data.data);
            navigate("/userList");
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const { errors } = error.response.data;
                if (errors.name) {
                    setNameError(errors.name[0]);
                } else {
                    setNameError("");
                }
                if (errors.email) {
                    setEmailError(errors.email[0]);
                } else {
                    setEmailError("");
                }
            } else {
                setError(error.response ? error.response.data.error : error.message);
            }
            // Show error toast if deletion fails
        toast.error('Failed to add user',
         { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
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
                                <h3 className="box-title">New user</h3>
                            </div>

                            <form onSubmit={handleAddUser}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputName">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            autoComplete="off"
                                        />
                                        {nameError && <span className="text-danger">{nameError}</span>}
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Email / Username
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        
                                            autoComplete="off"
                                        />
                                        {emailError && <span className="text-danger">{emailError}</span>}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            autoComplete="off"
                                        />
                                       {/* <p style={{ margin: 0, padding: 0 }}>Please Enter Minimum 6 characters</p>
                                         <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
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
                                        <label htmlFor="userRole">
                                            User Role
                                        </label>
                                        <select
                                            id="Role"
                                            className="form-control"
                                            onChange={(e) =>
                                                setRole(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Select role
                                            </option>
                                            {roles.map((roles) => (
                                                <option
                                                    key={roles.role_id}
                                                    value={roles.role_id}
                                                >
                                                    {roles.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Franchise
                                        </label>
                                        <select
                                            className="form-control"
                                            id="franchiseSelect"
                                            value={franchise_id}
                                            onChange={(e) =>{
                                                console.log(e.target.value) // Debug log
                                                setFranchise(e.target.value)
                                             }}
                                        >
                                            <option value="">Select</option>
                                            <option value="1">CityCabs</option>
                                            <option value="2">QuickTaxi</option>
                                            <option value="3">SafeRide</option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Franchise owner
                                        </label>
                                        <select
                                            className="form-control"
                                            onChange={(e) =>
                                                setIs_franchise_owner(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value=""> Select</option>
                                            <option value="1">
                                                {" "}
                                                franchise_owner
                                            </option>
                                            <option value=""> customer</option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputFile">
                                            User Image
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            placeholder="Image"
                                            onChange={(e) =>
                                                setImage(e.target.files[0])
                                            } // Update to handle file selection
                                        />{" "}
                                        {image && (
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt="Uploaded Image"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="box-footer text-right">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Add user
                                    </button>
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

export default AddUser;
