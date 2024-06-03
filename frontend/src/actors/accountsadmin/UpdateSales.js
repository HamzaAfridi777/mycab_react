import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateSales = () => {
    const { sales_jouranl_id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [sale, setSale] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");
    const [franchiseSystem_id, setFranchiseSystem_id] = useState("");
    const [franchiseSystemids, setFranchiseSystemids] = useState([]);
    const [error, setError] = useState("");

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
        // Fetch user data and populate form fields
        const fetchSale = async () => {
            try {
                const response = await axios.get(
                    `/api/salesJouranl-edit/${sales_jouranl_id}`
                );
                const salesData = response.data.data; // assuming response.data is an object with user data
                // assuming response.data is an object with user data

                setName(salesData.name);
                setSale(salesData.sale);
                setAmount(salesData.amount);
                setFranchiseSystem_id(salesData.franchiseSystem_id);
                setStatus(
                    salesData.status === "Posted" ? "Posted" : "UnPosted"
                );
                setDate(salesData.date);
            } catch (error) {
                setError(
                    error.response ? error.response.data.error : error.message
                );
            }
        };

        fetchSale();
    }, [sales_jouranl_id]);

    const handleUpdateSales = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("sale", sale);
            formData.append("amount", amount);
            formData.append("franchiseSystem_id", franchiseSystem_id);
            formData.append("status", status ? "Posted" : "UnPosted");
            formData.append("date", date);

            // const token = localStorage.getItem("token"); // Retrieve token from localStorage

            const response = await axios.post(
                `/api/edit-new-salesJouranl/${sales_jouranl_id}`,
                formData,
                {
                    // headers: {
                    //     Authorization: `Bearer ${token}` // Include token in request headers
                    // }
                }
            );
            // Show success toast
            toast.success("Sales updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            // Handle response
            navigate("/SalesList");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
            // Show error toast if deletion fails
            toast.error("Failed to update Sales", {
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
                                <h3 className="box-title">Update Sales</h3>
                            </div>

                            <form onSubmit={handleUpdateSales}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputName">
                                            Customer Name
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
                                        <label htmlFor="exampleInputName">
                                            Sales
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="sale"
                                            autoComplete="off"
                                            value={sale}
                                            onChange={(e) =>
                                                setSale(e.target.value)
                                            }
                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
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
                                        <label htmlFor="exampleInputEmail1">
                                            Status
                                        </label>
                                        <select
                                            className="form-control"
                                            value={
                                                status ? "Posted" : "UnPosted"
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
                                            <option value="Posted">
                                                {" "}
                                                Posted
                                            </option>
                                            <option value="UnPosted">
                                                {" "}
                                                UnPosted
                                            </option>
                                        </select>
                                        {/* <span className="glyphicon glyphicon-lock form-control-feedback"></span> */}
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="exampleInputEmail1">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="dd-mm-yy"
                                            autoComplete="off"
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                        />
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

export default UpdateSales;
