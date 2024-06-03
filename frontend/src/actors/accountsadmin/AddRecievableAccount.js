import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddAccount = () => {
    const navigate = useNavigate();
    const [sales_jouranl_id, setSales_jouranl_id] = useState("");
    const [sales_jouranl_ids, setSales_jouranl_ids] = useState([]);
    const [customer_id, setCustomerid] = useState("");
    const [customerids, setCustomerids] = useState([]);
    const [amount, setAmount] = useState("");
    const [debit, setDebit] = useState("");
    const [credit, setCredit] = useState("");
    const [debit_date, setdebit_date] = useState("");
    const [credit_date, setcredit_date] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get("/api/salesJouranl-list", config)
            .then((response) => {
                setSales_jouranl_ids(response.data.data.data);
            })
            .catch((error) => {
                console.error("Error fetching roles:", error);
            });
    }, []);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get("/api/list-customer", config)
            .then((response) => {
                setCustomerids(response.data.data.data);
            })
            .catch((error) => {
                console.error("Error fetching roles:", error);
            });
    }, []);

    const handleAddAccount = async (e) => {
        e.preventDefault();
        try {
            // const token = localStorage.getItem("token");

            const response = await axios.post(
                "/api/add-new-Account",

                {
                    sales_jouranl_id: sales_jouranl_id,
                    customer_id: customer_id,
                    amount,
                    debit,
                    credit,
                    debit_date,
                    credit_date,
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
            toast.success("Recievable Account added successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            navigate("/RecievableAccountList");
            //setRedirectToList(true);
        } catch (error) {
            // Handle login error
            setError(
                error.response ? error.response.data.error : error.message
            );
             // Show error toast if deletion fails
             toast.error("Failed to add Recievable Account", {
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
                                <h3 className="box-title">Add New Recieveable</h3>
                            </div>

                            <form onSubmit={handleAddAccount}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="userRole">
                                            Sales Jouranl_id
                                        </label>
                                        <select
                                            id="Franchise"
                                            className="form-control"
                                            onChange={(e) =>
                                                setSales_jouranl_id(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Select Sales Jouranl_id
                                            </option>
                                            {sales_jouranl_ids.map(
                                                (sales_journal) => (
                                                    <option
                                                        key={
                                                            sales_journal.sales_jouranl_id
                                                        }
                                                        value={
                                                            sales_journal.sales_jouranl_id
                                                        }
                                                    >
                                                        {sales_journal.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="userRole">
                                            Customer_Name
                                        </label>
                                        <select
                                            id="Franchise"
                                            className="form-control"
                                            onChange={(e) =>
                                                setCustomerid(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Select Customer_Name
                                            </option>
                                            {customerids.map((customer) => (
                                                <option
                                                    key={customer.customer_id}
                                                    value={customer.customer_id}
                                                >
                                                    {customer.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Amount
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Total_Amount"
                                            value={amount}
                                            onChange={(e) =>
                                                setAmount(e.target.value)
                                            }
                                            min="0"
                                            max="9999999.99"
                                        />
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Debit Amount
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Total_Amount"
                                            value={debit}
                                            onChange={(e) =>
                                                setDebit(e.target.value)
                                            }
                                            min="0"
                                            max="9999999.99"
                                        />
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Credit Amount
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Total_Amount"
                                            value={credit}
                                            onChange={(e) =>
                                                setCredit(e.target.value)
                                            }
                                            min="0"
                                            max="9999999.99"
                                        />
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                           Debit Date
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="dd-mm-yy"
                                            autoComplete="off"
                                            value={debit_date}
                                            onChange={(e) =>
                                                setdebit_date(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                           Credit Date
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="dd-mm-yy"
                                            autoComplete="off"
                                            value={credit_date}
                                            onChange={(e) =>
                                                setcredit_date(e.target.value)
                                            }
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

export default AddAccount;
