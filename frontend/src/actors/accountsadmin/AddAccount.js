import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddAccount = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");  
    const [account, setAccount] = useState("");
    const [error, setError] = useState("");

    const handleAddAccount = async (e) => {
        e.preventDefault();
        try {
            // const token = localStorage.getItem("token");

            const response = await axios.post(
                "/api/add-new-salesJouranl",

                {
                    name,
                    account
                },

                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",

                        //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
                    },
                }
            );     
            // Show success toast
            toast.success("Account added successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            navigate("/AccountList");           
        } catch (error) {
            // Handle login error
            setError(
                error.response ? error.response.data.error : error.message
            );
             // Show error toast if deletion fails
             toast.error("Failed to add Account", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    return (
        <div className="content-wrapper">
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
            <section className="content" style={{ minHeight: "100vh" }}>
                <div className="row">
                    <div className="col-md-12 col-xm-12">
                        <div className="box  box-primary text-left">
                            <div className="box-header with-border">
                                <h3 className="box-title">Add Account</h3>
                            </div>

                            <form onSubmit={handleAddAccount}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputName">
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
                                    <label htmlFor="exampleInputEmail1">
                                        Account
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={(e) =>
                                            setAccount(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            {" "}
                                            Select Account
                                        </option>
                                        <option value="Income">
                                            {" "}
                                            Income
                                        </option>
                                        <option value="Expense">
                                            {" "}
                                            Expense
                                        </option>
                                        <option value="Asset">
                                            {" "}
                                            Asset
                                        </option>
                                        <option value="Liability">
                                            {" "}
                                            Liability
                                        </option>
                                        <option value="Equity">
                                            {" "}
                                            Equity
                                        </option>
                                    </select>
                                    {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span>*/}
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

export default AddAccount;
