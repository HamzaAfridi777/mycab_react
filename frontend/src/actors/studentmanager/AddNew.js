import React, { useState, useEffect } from "react";
// import { link } from "react-router-dom";
import axios from "axios";
import { json } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const AddNew = () => {

    //  console.log(AddUser);
    // const navigate = useNavigate();
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [status, setStatus] = useState("");
    // const [role_id, setRole] = useState("");
    // const [image, setImage] = useState(null);
    // const [franchise_id, setFranchise] = useState("");
    // const [is_franchise_owner, setIs_franchise_owner] = useState("");
    //const [error, setError] = useState("");

    // const [redirectToList, setRedirectToList] = useState(false);


    // const handleAddUser = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const token = localStorage.getItem("token");

    //         const response = await axios.post(
    //             "http://127.0.0.1:8000/api/add-new-user",

    //             {
    //                 name,
    //                 email,
    //                 password,
    //                 status: status === "1" ? "active" : "inactive",
    //                 role_id,
    //                 image,
    //                 franchise_id,
    //                 is_franchise_owner: is_franchise_owner === "1" ? "franchise_owner" : "customer",
    //             },

    //             {
    //                 headers: {
    //                     Accept: "application/json",
    //                     "Content-Type": "multipart/form-data",
    //                     Authorization: `Bearer ${token}`,

    //                     //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
    //                 }
    //             }
    //         );
    //         // addUserToTable(response.data);
    //         console.log(response.data.data);
    //         navigate("/userList");
    //         //setRedirectToList(true);
    //     } catch (error) {
    //         // Handle login error
    //         setError(
    //             error.response ? error.response.data.error : error.message
    //         );
    //     }
    // };

    return (

        <div className="content-wrapper" >
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
            <section className="content" style={{ minHeight: '100vh' }}>
                <div className="row">
                    <div className="col-md-12 col-xm-12">
                        <div className="box  box-primary text-left">
                            <div className="box-header with-border" >
                                <h3 className="box-title">Add New Tutors</h3>
                            </div>

                            <form >
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
                                        />
                                    </div>


                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Gender
                                        </label>
                                        <select
                                            className="form-control"

                                        >
                                            <option value="">
                                                {" "}
                                                Select Gender
                                            </option>
                                            <option value="1">
                                                {" "}
                                                Male
                                            </option>
                                            <option value="0">
                                                {" "}
                                                Female
                                            </option>
                                            <option value="0">
                                                {" "}
                                                Others
                                            </option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                           Residence Country
                                        </label>
                                        <select
                                            className="form-control"

                                        >
                                            <option value="">
                                                {" "}
                                                Select Country
                                            </option>
                                            <option value="1">
                                                {" "}
                                                Pakistan
                                            </option>
                                            <option value="2">
                                                {" "}
                                                India
                                            </option>
                                            <option value="3">
                                                {" "}
                                                America
                                            </option>
                                            <option value="4">
                                                {" "}
                                                London
                                            </option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Identity_No_Lisence_No_Passport
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=" Identity No"
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="dd/mm/yy"
                                            autoComplete="off"
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

                                        />
                                        <img
                                            src=""
                                            alt="Uploaded Image"
                                            style={{ width: '50px', height: '50px' }}
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

export default AddNew;
