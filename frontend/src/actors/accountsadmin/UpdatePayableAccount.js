import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePayableAccount = () => {
    const { accounts_payable_id } = useParams();
    const navigate = useNavigate();
    const [purchase_jouranl_id, setPurchase_jouranl_id] = useState("");
    const [purchase_jouranl_ids, setPurchase_jouranl_ids] = useState([]);
    const [vendor_id, setvendor_id] = useState("");
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

        // Fetch sales journal list
        axios
            .get("/api/purchaseJouranl-list", config)
            .then((response) => {
                setPurchase_jouranl_ids(response.data.data.data);
            })
            .catch((error) => {
                console.error("Error fetching sales journal list:", error);
            });

        // Fetch account data by ID
        axios
            .get(`/api/payable-edit/${accounts_payable_id}`)
            .then((response) => {
                const accountData = response.data.data;
                setPurchase_jouranl_id(accountData.purchase_jouranl_id);
                setvendor_id(accountData.vendor_id);
                setAmount(accountData.amount);
                setDebit(accountData.debit);
                setCredit(accountData.credit);
                setdebit_date(accountData.debit_date);
                setcredit_date(accountData.credit_date);
            })
            .catch((error) => {
                setError(
                    error.response ? error.response.data.error : error.message
                );
            });
    }, [accounts_payable_id]);

    const handleUpdatePayableAccount = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("purchase_jouranl_id", purchase_jouranl_id);
            formData.append("vendor_id", vendor_id);
            formData.append("amount", amount);
            formData.append("debit", debit);
            formData.append("credit", credit);
            formData.append("debit_date", debit_date);
            formData.append("credit_date", credit_date);

            const response = await axios.post(
                `/api/edit-new-payable/${accounts_payable_id}`,
                formData
            );
 // Show success toast
 toast.success("Payable Account updated successfully", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
});
            navigate("/PayableAccountList");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
            // Show error toast if deletion fails
            toast.error("Failed to update Payable Account", {
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
                                <h3 className="box-title">
                                    Update Recieveable Account
                                </h3>
                            </div>

                            <form onSubmit={handleUpdatePayableAccount}>
                                <div className="box-body">
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label htmlFor="userRole">
                                            Sales Jouranl_id
                                        </label>
                                        <select
                                            id="Franchise"
                                            className="form-control"
                                            value={purchase_jouranl_id}
                                            onChange={(e) =>
                                                setPurchase_jouranl_id(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Sales Jouranl_id
                                            </option>
                                            {purchase_jouranl_ids.map(
                                                (purchase_jouranl) => (
                                                    <option
                                                        key={
                                                            purchase_jouranl.purchase_jouranl_id
                                                        }
                                                        value={
                                                            purchase_jouranl.purchase_jouranl_id
                                                        }
                                                    >
                                                        {purchase_jouranl.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group has-feedback col-md-6 col-xm-12">
                                        <label for="exampleInputName">
                                            Vendor_id
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=" Vendor_id"
                                            value={vendor_id}
                                            onChange={(e) =>
                                                setvendor_id(e.target.value)
                                            }
                                            autoComplete="off"
                                        />
                                        {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
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

export default UpdatePayableAccount;
