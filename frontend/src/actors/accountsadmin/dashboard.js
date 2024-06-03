import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = ({ userRole }) => {
    const [sales,setSales] = useState(null);
    const [totalRecieves, setTotalRecieves] = useState(null);
    const [totalPayables,setTotalPayables] = useState(null);
    useEffect(()=>{
        const fetchData = async () =>{
             try {


            /////Total Sales
            const SalesResponse = await axios.get("/api/salesJouranl-list");
            const totalSale = SalesResponse.data.data.total;
            setSales(totalSale);

            /////Total Recivable Account
            const RecieveResponse = await axios.get("/api/Accounts-list");
            const totalRecieve = RecieveResponse.data.data.total;
            setTotalRecieves(totalRecieve);

            /////Total Payable Account
            const PayableResponse = await axios.get("/api/payable-list");
            const totalPayable = PayableResponse.data.data.total;
            setTotalPayables(totalPayable);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };
       fetchData()
    },[]);
    return (
        <div className="content-wrapper">
            <section className="content-header" style={{ textAlign: "left" }}>
                <h1>
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
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

            <section className="content">
                <div className="row">
                    <div className="col-lg-4 col-xs-6">
                        <div className="small-box bg-aqua">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                                <h3>{sales}</h3>

                                <p>Sales</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-shopping-cart"></i>
                            </div>
                            <a href="/SalesInfo" className="small-box-footer">
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-4 col-xs-6">
                        <div className="small-box bg-yellow">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                                <h3>65</h3>

                                <p>Expenses</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-money"></i>
                            </div>
                            <a href="#" className="small-box-footer">
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-4 col-xs-6">
                        <div className="small-box bg-blue">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                                <h3>{totalRecieves}</h3>

                                <p>Account recievables</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-registered"></i>
                            </div>
                            <a href="/RecievableAccountInfo" className="small-box-footer">
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xs-6">
                        <div className="small-box bg-purple">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                                <h3>{totalPayables}</h3>

                                <p>Account payables</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-dollar"></i>
                            </div>
                            <a href="/PayableAccountListInfo" className="small-box-footer">
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xs-6">
                        <div className="small-box bg-green">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                                <h3>65</h3>

                                <p>General ledger</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-book"></i>
                            </div>
                            <a href="#" className="small-box-footer">
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xs-6">
                        <div className="small-box bg-red">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                                <h3>65</h3>

                                <p>Gross profit</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-arrow-up"></i>
                            </div>
                            <a href="#" className="small-box-footer">
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-6">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title pull-left">
                                    <b>Revenue</b>
                                </h3>
                            </div>

                            <div className="box-body">
                                <table
                                    id="example1"
                                    className="table table-bordered table-striped"
                                    style={{ textAlign: "left" }}
                                >
                                    <thead>
                                        <tr>
                                            <th>Sr.</th>
                                            <th>Name</th>
                                            <th>Revenue</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Irfan</td>

                                            <td>10000.00</td>

                                            <td>Win 95+</td>
                                        </tr>

                                        <tr>
                                            <td>2</td>
                                            <td>Talha</td>
                                            <td>10000.00</td>
                                            <td>Win 95+</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Usama</td>
                                            <td>10000.00</td>
                                            <td>Win 95+</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Usama</td>
                                            <td>10000.00</td>
                                            <td>Win 95+</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Usama</td>
                                            <td>10000.00</td>
                                            <td>Win 95+</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Usama</td>
                                            <td>10000.00</td>
                                            <td>Win 95+</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Usama</td>
                                            <td>10000.00</td>
                                            <td>Win 95+</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                    <div className="col-xs-6">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title pull-left">
                                    <b>Expenses</b>
                                </h3>
                            </div>

                            <div className="box-body">
                                <table
                                    id="example1"
                                    className="table table-bordered table-striped"
                                    style={{ textAlign: "left" }}
                                >
                                    <thead>
                                        <tr>
                                            <th>Sr.</th>
                                            <th>Name</th>
                                            <th>Revenue</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Irfan</td>

                                            <td>10000.00</td>

                                            <td>Win 95+</td>
                                        </tr>

                                        <tr>
                                            <td>2</td>
                                            <td>Talha</td>
                                            <td>10000.00</td>
                                            <td>Win 95+</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Usama</td>
                                            <td>10000.00</td>
                                            <td>Win 95+</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Usama</td>
                                            <td>10000.00</td>
                                            <td>Win 95+</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Usama</td>
                                            <td>10000.00</td>
                                            <td>Win 95+</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Usama</td>
                                            <td>10000.00</td>
                                            <td>Win 95+</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Usama</td>
                                            <td>10000.00</td>
                                            <td>Win 95+</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Dashboard;
