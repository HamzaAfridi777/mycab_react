import React, { useState, useEffect } from "react";
// import { link } from "react-router-dom";
import axios from "axios";
import { json } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const AddNewExpenses = () => {

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
    //             "http://127.0.0.1:8000/api/adAccount-user",

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
                    {"Account Admin"}
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
                                <h3 className="box-title">Add New Expences</h3>
                            </div>

                            <form >
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputName">
                                            Expense Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Customer_Name"
                                            autoComplete="off"

                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Category
                                        </label>
                                        <select
                                            className="form-control"

                                        >
                                            <option value="">
                                                {" "}
                                                Select Category
                                            </option>
                                            <option value="0">
                                                {" "}
                                                office supplies
                                            </option>
                                            <option value="1">
                                                {" "}
                                                Utilities
                                            </option>
                                            <option value="2">
                                                {" "}
                                                Travel
                                            </option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Amount
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Amount"
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Payment Method
                                        </label>
                                        <select
                                            className="form-control"

                                        >
                                            <option value="">
                                                {" "}
                                                Select Method
                                            </option>
                                            <option value="0">
                                                {" "}
                                                Cash
                                            </option>
                                            <option value="1">
                                                {" "}
                                                Credit card
                                            </option>
                                            <option value="2">
                                                {" "}
                                                Bank transfer
                                            </option>

                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Payment Status
                                        </label>
                                        <select
                                            className="form-control"

                                        >
                                            <option value="">
                                                {" "}
                                                Select Status
                                            </option>
                                            <option value="0">
                                                {" "}
                                                Paid
                                            </option>
                                            <option value="1">
                                                {" "}
                                                Pending
                                            </option>
                                            <option value="2">
                                                {" "}
                                                Overdue
                                            </option>

                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Receipt
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            placeholder="Receipt"
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputEmail1">
                                            Notes
                                        </label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="notes"
                                            autoComplete="off"
                                        />
                                    </div>
                                

                                </div>

                                <div className="box-footer text-right">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Save
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

export default AddNewExpenses;
