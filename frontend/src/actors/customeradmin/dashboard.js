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

                                <p>New Rides</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-android-car"></i>
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

                                <p>pending rides</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-android-car"></i>
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

                                <p>Completed rides</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-android-car"></i>
                            </div>
                            <a href="#" className="small-box-footer">
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-8">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title pull-left">
                                    <b>Ride requests</b>
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
                    <div className="col-xs-4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box box-primary direct-chat direct-chat-primary">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Direct Chat</h3>

                                        <div className="box-tools pull-right">
                                            <span
                                                data-toggle="tooltip"
                                                title="3 New Messages"
                                                className="badge bg-light-blue"
                                            >
                                                3
                                            </span>
                                            <button
                                                type="button"
                                                className="btn btn-box-tool"
                                                data-widget="collapse"
                                            >
                                                <i className="fa fa-minus"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-box-tool"
                                                data-toggle="tooltip"
                                                title="Contacts"
                                                data-widget="chat-pane-toggle"
                                            >
                                                <i class="fa fa-comments"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-box-tool"
                                                data-widget="remove"
                                            >
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="box-body">
                                        <div className="direct-chat-messages">
                                            <div className="direct-chat-msg">
                                                <div className="direct-chat-info clearfix">
                                                    <span className="direct-chat-name pull-left">
                                                        Alexander Pierce
                                                    </span>
                                                    <span className="direct-chat-timestamp pull-right">
                                                        23 Jan 2:00 pm
                                                    </span>
                                                </div>

                                                <img
                                                    className="direct-chat-img"
                                                    src="theme/dist/img/user1-128x128.jpg"
                                                    alt="Message User Image"
                                                />
                                                <div className="direct-chat-text">
                                                    Is this template really for
                                                    free? That's unbelievable!
                                                </div>
                                            </div>

                                            <div className="direct-chat-msg right">
                                                <div className="direct-chat-info clearfix">
                                                    <span className="direct-chat-name pull-right">
                                                        Sarah Bullock
                                                    </span>
                                                    <span className="direct-chat-timestamp pull-left">
                                                        23 Jan 2:05 pm
                                                    </span>
                                                </div>

                                                <img
                                                    className="direct-chat-img"
                                                    src="theme/dist/img/user3-128x128.jpg"
                                                    alt="Message User Image"
                                                />
                                                <div className="direct-chat-text">
                                                    You better believe it!
                                                </div>
                                            </div>
                                        </div>

                                        <div className="direct-chat-contacts">
                                            <ul className="contacts-list">
                                                <li>
                                                    <a href="#">
                                                        <img
                                                            className="contacts-list-img"
                                                            src="theme/dist/img/user1-128x128.jpg"
                                                            alt="User Image"
                                                        />

                                                        <div className="contacts-list-info">
                                                            <span class="contacts-list-name">
                                                                Count Dracula
                                                                <small className="contacts-list-date pull-right">
                                                                    2/28/2015
                                                                </small>
                                                            </span>
                                                            <span className="contacts-list-msg">
                                                                How have you
                                                                been? I was...
                                                            </span>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="box-footer">
                                        <form action="#" method="post">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    name="message"
                                                    placeholder="Type Message ..."
                                                    className="form-control"
                                                />
                                                <span className="input-group-btn">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-flat"
                                                    >
                                                        Send
                                                    </button>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title pull-left">
                                    <b>Forwarded requests</b>
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
