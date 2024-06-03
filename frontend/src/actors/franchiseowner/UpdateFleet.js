import React, { useEffect, useState } from "react";
// import { link } from "react-router-dom";
import axios from "axios";
import { json } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";



const UpdateFleet = () => {
    const { fleet_id } = useParams(); // Retrieve userId from URL params
    const navigate = useNavigate();
    // const [userData, setUserData] = useState(null);
    const [name, setName] = useState("");
    const [serial_no, setSerial_no] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
   

    useEffect(() => {
        // Fetch user data and populate form fields
        const fetchFleet = async () => {
            try {
                const response = await axios.get(`api/update-fleet/${fleet_id}`);
                const fleetData = response.data.data; // Assuming response.data is an object with fleet data
                console.log("Fleet Data:", fleetData);
                setName(fleetData.name);
                setSerial_no(fleetData.serial_no);
                setStatus(fleetData.status === '1' ? 'active' : 'inactive');
            } catch (error) {
                setError(error.response ? error.response.data.error : error.message);
            }
        };

        fetchFleet();
    }, [fleet_id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("serial_no", serial_no);
            formData.append("status", status ? "active" : "inactive");


            //const token = localStorage.getItem("token"); // Retrieve token from localStorage

            const response = await axios.post(
                `api/edit-fleet/${fleet_id}`,
                formData,
                {
                    // headers: {
                    //Authorization: `Bearer ${token}` // Include token in request headers
                    // }
                }
            );

            // Handle response
            navigate("/FleetList");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
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
                                <h3 className="box-title">Edit Fleet</h3>
                            </div>

                            <form onSubmit={handleUpdate}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputName">
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
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                    </div>


                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputName">
                                            Serial No
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Serial_No"
                                            autoComplete="off"
                                            value={serial_no}
                                            onChange={(e) =>
                                                setSerial_no(e.target.value)
                                            }
                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                    </div>


                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Status
                                        </label>
                                        <select
                                            className="form-control"
                                            value={status ? '1' : '0'}
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                {" "}
                                                Select status
                                            </option>
                                            <option value="1">
                                                {" "}
                                                Active
                                            </option>
                                            <option value="0">
                                                {" "}
                                                Inactive
                                            </option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span>*/}
                                    </div>


                                </div>

                                <div className="box-footer text-right ">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Edit Permission
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

export default UpdateFleet;