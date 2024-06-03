import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const Dashboard = ({ userRole }) => {
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
                                <h3>150</h3>

                                <p>Categories</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-list-alt"></i>
                            </div>
                            <a href="#" className="small-box-footer">
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

                                <p>Courses</p>
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
                        <div className="small-box bg-blue">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                                <h3>65</h3>

                                <p>Registered students</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-registered"></i>
                            </div>
                            <a href="#" className="small-box-footer">
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
                                <h3>65</h3>

                                <p>Enrolled students</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-pencil"></i>
                            </div>
                            <a href="#" className="small-box-footer">
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

                                <p>Certified students</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-graduation-cap"></i>
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

                                <p>Tutors</p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-users"></i>
                            </div>
                            <a href="#" className="small-box-footer">
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title pull-left">
                                    <b>Student enquiries</b>
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
