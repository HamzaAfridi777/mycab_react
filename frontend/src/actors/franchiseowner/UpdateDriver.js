import React, { useState, useEffect } from "react";
// import { link } from "react-router-dom";
import axios from "axios";
import { json } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";



const UpdateDriver = () => {
    const { driver_id } = useParams(); // Retrieve userId from URL params
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

    // const [redirectToList, setRedirectToList] = useState(false);

    useEffect(() => {
        // Fetch user data and populate form fields
        const fetchDriver = async () => {
            try {
                const response = await axios.get(
                    `api/update-driver/${driver_id}`);
                const driverData = response.data.data; // assuming response.data is an object with user data
                // assuming response.data is an object with user data
                console.log("Driver Data:", driverData);
                setName(driverData.name);
                setfather_name(driverData.father_name);
                setgender(driverData.gender);
                setcountry(driverData.country);
                setidentity_number(driverData.identity_number);
                setdate_of_birth(driverData.date_of_birth);
                setpermanent_address(driverData.permanent_address);
                setpresent_address(driverData.present_address);

            } catch (error) {
                setError(
                    error.response ? error.response.data.error : error.message
                );
            }
        };

        fetchDriver();
    }, [driver_id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("father_name", father_name);
            formData.append("gender", gender);
            formData.append("country", country);
            formData.append("identity_number", identity_number);
            formData.append("date_of_birth", date_of_birth);
            formData.append("permanent_address", permanent_address);
            formData.append("present_address", present_address);

            formData.append("image", image);
            console.log('image')
            // const token = localStorage.getItem("token"); // Retrieve token from localStorage

            const response = await axios.post(
                `api/edit-driver/${driver_id}`,
                formData,
                {
                    // headers: {
                    //     Authorization: `Bearer ${token}` // Include token in request headers
                    // }
                }
            );

            // Handle response
            navigate("/DriverList");
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
                                <h3 className="box-title">Update Driver</h3>
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
                                            value={gender}
                                            onChange={(e) =>
                                                setgender(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                {" "}
                                                Select Gender
                                            </option>
                                            <option value="Male">
                                                {" "}
                                                Male
                                            </option>
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
                                                setidentity_number(e.target.value)
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
                                                setpermanent_address(e.target.value)
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
                                                setpresent_address(e.target.value)
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
                                            onChange={(e) => setImage(e.target.files[0])}  // Update to handle file selection
                                            accept=".jpg,.jpeg,.png,.gif" // Limit accepted file types to images
                                        />
                                    </div>
                                </div>

                                <div className="box-footer text-right">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                       Update Driver
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

export default UpdateDriver;