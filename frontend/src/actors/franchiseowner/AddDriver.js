import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDriver = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [father_name, setfather_name] = useState("");
    const [gender, setgender] = useState("");
    const [country, setcountry] = useState("");
    const [identity_number, setidentity_number] = useState("");
    const [date_of_birth, setdate_of_birth] = useState("");
    const [permanent_address, setpermanent_address] = useState("");
    const [present_address, setpresent_address] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");

    const handleAddDriver = async (e) => {
        e.preventDefault();
        try {
            // const token = localStorage.getItem("token");

            const response = await axios.post(
                "api/add-new-driver",

                {
                    name,
                    father_name,
                    gender,
                    country,
                    identity_number,
                    date_of_birth,
                    permanent_address,
                    present_address,
                    image,
                },

                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                        //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
                    },
                }
            );
            // Show success toast
            toast.success("Driver added successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            navigate("/DriverList");
        } catch (error) {
            // Handle login error
            setError(
                error.response ? error.response.data.error : error.message
            );
            // Show error toast if deletion fails
            toast.error("Failed to add Driver", {
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
                                <h3 className="box-title">Add Driver</h3>
                            </div>

                            <form onSubmit={handleAddDriver}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputName">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            autoComplete="off"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Fathername
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Fathername"
                                            autoComplete="off"
                                            value={father_name}
                                            onChange={(e) =>
                                                setfather_name(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Gender
                                        </label>
                                        <select
                                            className="form-control"
                                            onChange={(e) =>
                                                setgender(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                {" "}
                                                Select Gender
                                            </option>
                                            <option value="Male"> Male</option>
                                            <option value="Female">
                                                {" "}
                                                Female
                                            </option>
                                            <option value="Others">
                                                {" "}
                                                Others
                                            </option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Select Country"
                                            autoComplete="off"
                                            value={country}
                                            onChange={(e) =>
                                                setcountry(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Identity No
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=" Identity No"
                                            autoComplete="off"
                                            value={identity_number}
                                            onChange={(e) =>
                                                setidentity_number(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="dd-mm-yy"
                                            autoComplete="off"
                                            value={date_of_birth}
                                            onChange={(e) =>
                                                setdate_of_birth(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Permanent Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Permanent Address"
                                            autoComplete="off"
                                            value={permanent_address}
                                            onChange={(e) =>
                                                setpermanent_address(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Present Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Present Address"
                                            autoComplete="off"
                                            value={present_address}
                                            onChange={(e) =>
                                                setpresent_address(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputFile">
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
                                                    width: "50px",
                                                    height: "50px",
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
                                        Add Driver
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

export default AddDriver;
