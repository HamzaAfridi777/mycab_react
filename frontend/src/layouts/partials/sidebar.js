import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ userRole }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    // Fetch user data when the component mounts
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage");
            navigate("/login");
            return;
        }
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/api/Authuser-image", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Response data:", response.data.data);
                setUserData(response.data.data);
            } catch (error) {
                console.error("Error fetching user data", error);
                if (error.response && error.response.status === 401) {
                    navigate("/login");
                }
            }
        };
        fetchUserData();
    }, [navigate]); // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        <aside className="main-sidebar" style={{ marginTop: "20px" }}>
            <section className="sidebar">
                <div className="user-panel" style={{ marginTop: "1px" }}>
                    {userData && (
                        <div className="pull-left image">
                            <img
                                src={userData.image}
                                className="img-circle"
                                alt="User Image"
                            />
                        </div>
                    )}

                    <div
                        className="pull-left info"
                        style={{ marginTop: "-20px" }}
                    >
                        {userData && (
                            <>
                                <p style={{ marginTop: "5px" }}>
                                    {userData.name}
                                </p>

                                <p>
                                    <i
                                        className="fa fa-circle text-success"
                                        style={{ marginTop: "-1px" }}
                                    ></i>
                                    Online
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <form
                    action="#"
                    method="get"
                    className="sidebar-form"
                    style={{ marginTop: "39px" }}
                >
                    <div className="input-group">
                        <input
                            type="text"
                            name="q"
                            className="form-control"
                            placeholder="Search..."
                        />
                        <span className="input-group-btn">
                            <button
                                type="submit"
                                name="search"
                                id="search-btn"
                                className="btn btn-flat"
                            >
                                <i className="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </form>

                <ul className="sidebar-menu">
                    <li className="header">NAVIGATON</li>

                    {userRole === "Superadmin" && (
                        <>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-users"></i>{" "}
                                    <span>Users</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/addUser">
                                            <i className="fa fa-circle-o"></i>
                                            Add user
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/userList">
                                            <i className="fa fa-circle-o"></i>
                                            Users list
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-building"></i>{" "}
                                    <span>Franchise System</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/AddFranchise">
                                            <i className="fa fa-circle-o"></i>
                                            Add Franchise
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/FranchiseList">
                                            <i className="fa fa-circle-o"></i>
                                            Franchise list
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#">
                                    <i className="fa fa-lock"></i>
                                    <span>Roles & Permissions</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                        {/* <span className="label label-primary pull-right">4</span> */}
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li>
                                        <a href="/AddRole">
                                            <i className="fa fa-circle-o"></i>
                                            Add role
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/RoleList">
                                            <i className="fa fa-circle-o"></i>
                                            Role list
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/AddPermission">
                                            <i className="fa fa-circle-o"></i>
                                            Add permission
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/PermissionList">
                                            <i className="fa fa-circle-o"></i>
                                            Permissions list
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-key"></i>{" "}
                                    <span>Assign Permission</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/UserPermission">
                                            <i className="fa fa-circle-o"></i>
                                            User Permission
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/UserPermissionList">
                                            <i className="fa fa-circle-o"></i>
                                            User Permission List
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-suitcase"></i>{" "}
                                    <span>Franchise_onwer List</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/FranchiseonwerList">
                                            <i className="fa fa-circle-o"></i>
                                            Franchise_onwer_List
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-sitemap"></i>{" "}
                                    <span>Franchise Permission</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/AddFranchisePermission">
                                            <i className="fa fa-circle-o"></i>
                                            Add Franchise Permission
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/FranchisePermissionList">
                                            <i className="fa fa-circle-o"></i>
                                            Franchise Permission list
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-user"></i>{" "}
                                    <span>Assign Franchise Permission</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/addAssignFranchisePermission">
                                            <i className="fa fa-circle-o"></i>
                                            Add Assign Franchise Permission
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/AssignFranchisePermissionList">
                                            <i className="fa fa-circle-o"></i>
                                            Assign Franchise Permission list
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}
                    {userRole === "Taskadmin" && (
                        <>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-user"></i>{" "}
                                    <span>Fleets</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/AddFleet">
                                            <i className="fa fa-circle-o"></i>
                                            Add fleet
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/FleetList">
                                            <i className="fa fa-circle-o"></i>
                                            fleets list
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#">
                                    <i className="fa fa-car"></i>
                                    <span>Drivers & Assignement</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                        {/* <span className="label label-primary pull-right">4</span> */}
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li>
                                        <a href="/AddDriver">
                                            <i className="fa fa-circle-o"></i>
                                            Add driver
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/DriverList">
                                            <i className="fa fa-circle-o"></i>
                                            Drivers list
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/AssignFleet">
                                            <i className="fa fa-circle-o"></i>
                                            Assign fleet
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/AssignedFleetList">
                                            <i className="fa fa-circle-o"></i>
                                            Assigned fleets
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/getTeamAdminUsers">
                                            <i className="fa fa-circle-o"></i>
                                            Team Admin List
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-user"></i>{" "}
                                    <span>AssignFleetsTo TeamAdmin</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/AssignFleetTeam">
                                            <i className="fa fa-circle-o"></i>
                                            Assign fleet Team
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/AssignFleetList">
                                            <i className="fa fa-circle-o"></i>
                                            Assign fleets list
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}
                    {userRole === "TeamAdmin" && (
                        <>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-user"></i>{" "}
                                    <span>Attendance</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/AddAttendence">
                                            <i className="fa fa-circle-o"></i>
                                            Add attendance
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/AttendenceList">
                                            <i className="fa fa-circle-o"></i>
                                            Attendance list
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-user"></i>{" "}
                                    <span>Fleet Management</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/AssignFleets">
                                            <i className="fa fa-circle-o"></i>
                                            Assign Fleet
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/AssignedFleetLists">
                                            <i className="fa fa-circle-o"></i>
                                            Fleet list
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#">
                                    <i className="fa fa-bug"></i>
                                    <span> Issues & Accidents</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                        {/* <span className="label label-primary pull-right">4</span> */}
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li>
                                        <a href="/AddIssue">
                                            <i className="fa fa-circle-o"></i>
                                            Add issue
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/IssueList">
                                            <i className="fa fa-circle-o"></i>
                                            Issues list
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/AddAccident">
                                            <i className="fa fa-circle-o"></i>
                                            Add Accident
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/AccidentList">
                                            <i className="fa fa-circle-o"></i>
                                            Accidents list
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}

                    {userRole === "customeradmin" && (
                        <>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-user"></i>{" "}
                                    <span>Rides</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/RideRequest">
                                            <i className="fa fa-circle-o"></i>
                                            Ride Request
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/Quries">
                                            <i className="fa fa-circle-o"></i>
                                            Quries
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}

                    {userRole === "studentmanager" && (
                        <>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-users"></i>{" "}
                                    <span>Tutors</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/AddNew">
                                            <i className="fa fa-circle-o"></i>
                                            Add new
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/TutorsList">
                                            <i className="fa fa-circle-o"></i>
                                            Tutors
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-list-alt"></i>{" "}
                                    <span>Categories</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/Category">
                                            <i className="fa fa-circle-o"></i>
                                            Add new
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/CategoryList">
                                            <i className="fa fa-circle-o"></i>
                                            Categories
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#">
                                    <i className="fa fa-book"></i>
                                    <span> Courses</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                        {/* <span className="label label-primary pull-right">4</span> */}
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li>
                                        <a href="/AddCourse">
                                            <i className="fa fa-circle-o"></i>
                                            Add course
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/CoursesList">
                                            <i className="fa fa-circle-o"></i>
                                            Courses list
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/AssignTutors">
                                            <i className="fa fa-circle-o"></i>
                                            Assign tutors
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/AssignedTutors">
                                            <i className="fa fa-circle-o"></i>
                                            Assigned tutors
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-registered"></i>{" "}
                                    <span>Students</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/EnrollNew">
                                            <i className="fa fa-circle-o"></i>
                                            Enroll new
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/EnrolmentList">
                                            <i className="fa fa-circle-o"></i>
                                            Enrollments
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}

                    {userRole === "accountsadmin" && (
                        <>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-list-alt"></i>{" "}
                                    <span>Chart of Accounts</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                <li className="active">
                                <a href="/AddAccount">
                                    <i className="fa fa-circle-o"></i>
                                    Add Account
                                </a>
                            </li>
                            <li className="active">
                                        <a href="/AccountList">
                                            <i className="fa fa-circle-o"></i>
                                            Account List
                                        </a>
                                    </li>

                                    <li className="active">
                                        <a href="/AddRecievableAccount">
                                            <i className="fa fa-circle-o"></i>
                                            Add RecievableAccount
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/RecievableAccountList">
                                            <i className="fa fa-circle-o"></i>
                                            Recievable Account List
                                        </a>
                                    </li>
                                    <li>
                                    <a href="/AddPayableAccount">
                                        <i className="fa fa-circle-o"></i>
                                        Add PayableAccount
                                    </a>
                                </li>
                                <li>
                                <a href="/PayableAccountList">
                                    <i className="fa fa-circle-o"></i>
                                    Payable Account List
                                </a>
                            </li>
                                </ul>
                            </li>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-arrow-up"></i>{" "}
                                    <span>Sales</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/AddSales">
                                            <i className="fa fa-circle-o"></i>
                                            Add new
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/SalesList">
                                            <i className="fa fa-circle-o"></i>
                                            Sales List
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-arrow-up"></i>{" "}
                                    <span>PurchaseJournal</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/AddPurchase">
                                            <i className="fa fa-circle-o"></i>
                                            Add new
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/PurchaseList">
                                            <i className="fa fa-circle-o"></i>
                                            Purchase List
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#">
                                    <i className="fa fa-arrow-down"></i>
                                    <span> Expenses</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                        {/* <span className="label label-primary pull-right">4</span> */}
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li>
                                        <a href="/AddNewExpenses">
                                            <i className="fa fa-circle-o"></i>
                                            Add New
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/Expenses">
                                            <i className="fa fa-circle-o"></i>
                                            Expenses
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="fa fa-file"></i>{" "}
                                    <span>Reports</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li>
                                        <a href="/RecievableAccountInfo">
                                            <i className="fa fa-circle-o"></i>
                                            Sales
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/Expenses">
                                            <i className="fa fa-circle-o"></i>
                                            Expenses
                                        </a>
                                    </li>
                                    <li className="active">
                                        <a href="/ProfitAndLoss">
                                            <i className="fa fa-circle-o"></i>
                                            Profit and Loss
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/TrialBalance">
                                            <i className="fa fa-circle-o"></i>
                                            Trial Balance
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/CashFlowStatement">
                                            <i className="fa fa-circle-o"></i>
                                            Cash flow statement
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}
                    {userRole === "franchiseowner" && (
                        <>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="ion ion-android-calendar"></i>{" "}
                                    <span>Task</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/AddNewTask">
                                            <i className="fa fa-circle-o"></i>
                                            Add New Task
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/TaskList">
                                            <i className="fa fa-circle-o"></i>
                                            Task List
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="ion ion-ios-analytics"></i>{" "}
                                    <span>Fleet</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/AddFleet">
                                            <i className="fa fa-circle-o"></i>
                                            Add New Fleet
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/FleetList">
                                            <i className="fa fa-circle-o"></i>
                                            Fleet List
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className="treeview"
                                style={{ textAlign: "left" }}
                            >
                                <a href="#" style={{ textAlign: "left" }}>
                                    <i className="ion ion-android-person"></i>{" "}
                                    <span>Drivers</span>
                                    <span className="pull-right-container">
                                        <i
                                            className="fa fa-angle-left pull-right"
                                            style={{ paddingRight: "20px" }}
                                        ></i>
                                    </span>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active">
                                        <a href="/AddDriver">
                                            <i className="fa fa-circle-o"></i>
                                            Add New Driver
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/DriverList">
                                            <i className="fa fa-circle-o"></i>
                                            Driver List
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}

                    {/*  <li>
                        <a href="pages/widgets.html">
            <i className="fa fa-th"></i> <span>Widgets</span>
            <span className="pull-right-container">
              <small className="label pull-right bg-green">new</small>
            </span>
          </a>
        </li>
       <li className="treeview" style={{ textAlign:'left'}}>
          <a href="#">
            <i className="fa fa-pie-chart"></i>
            <span>Charts</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a href="pages/charts/chartjs.html"><i className="fa fa-circle-o"></i> ChartJS</a></li>
            <li><a href="pages/charts/morris.html"><i className="fa fa-circle-o"></i> Morris</a></li>
            <li><a href="pages/charts/flot.html"><i className="fa fa-circle-o"></i> Flot</a></li>
            <li><a href="pages/charts/inline.html"><i className="fa fa-circle-o"></i> Inline charts</a></li>
          </ul>
        </li>
       <li className="treeview" style={{ textAlign:'left'}}>
          <a href="#">
            <i className="fa fa-laptop"></i>
            <span>UI Elements</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a href="pages/UI/general.html"><i className="fa fa-circle-o"></i> General</a></li>
            <li><a href="pages/UI/icons.html"><i className="fa fa-circle-o"></i> Icons</a></li>
            <li><a href="pages/UI/buttons.html"><i className="fa fa-circle-o"></i> Buttons</a></li>
            <li><a href="pages/UI/sliders.html"><i className="fa fa-circle-o"></i> Sliders</a></li>
            <li><a href="pages/UI/timeline.html"><i className="fa fa-circle-o"></i> Timeline</a></li>
            <li><a href="pages/UI/modals.html"><i className="fa fa-circle-o"></i> Modals</a></li>
          </ul>
        </li>
       <li className="treeview" style={{ textAlign:'left'}}>
          <a href="#">
            <i className="fa fa-edit"></i> <span>Forms</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a href="pages/forms/general.html"><i className="fa fa-circle-o"></i> General Elements</a></li>
            <li><a href="pages/forms/advanced.html"><i className="fa fa-circle-o"></i> Advanced Elements</a></li>
            <li><a href="pages/forms/editors.html"><i className="fa fa-circle-o"></i> Editors</a></li>
          </ul>
        </li>
       <li className="treeview" style={{ textAlign:'left'}}>
          <a href="#">
            <i className="fa fa-table"></i> <span>Tables</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a href="pages/tables/simple.html"><i className="fa fa-circle-o"></i> Simple tables</a></li>
            <li><a href="pages/tables/data.html"><i className="fa fa-circle-o"></i> Data tables</a></li>
          </ul>
        </li>
        <li>
          <a href="pages/calendar.html">
            <i className="fa fa-calendar"></i> <span>Calendar</span>
            <span className="pull-right-container">
              <small className="label pull-right bg-red">3</small>
              <small className="label pull-right bg-blue">17</small>
            </span>
          </a>
        </li>
        <li>
          <a href="pages/mailbox/mailbox.html">
            <i className="fa fa-envelope"></i> <span>Mailbox</span>
            <span className="pull-right-container">
              <small className="label pull-right bg-yellow">12</small>
              <small className="label pull-right bg-green">16</small>
              <small className="label pull-right bg-red">5</small>
            </span>
          </a>
        </li>
       <li className="treeview" style={{ textAlign:'left'}}>
          <a href="#">
            <i className="fa fa-folder"></i> <span>Examples</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a href="pages/examples/invoice.html"><i className="fa fa-circle-o"></i> Invoice</a></li>
            <li><a href="pages/examples/profile.html"><i className="fa fa-circle-o"></i> Profile</a></li>
            <li><a href="pages/examples/login.html"><i className="fa fa-circle-o"></i> Login</a></li>
            <li><a href="pages/examples/register.html"><i className="fa fa-circle-o"></i> Register</a></li>
            <li><a href="pages/examples/lockscreen.html"><i className="fa fa-circle-o"></i> Lockscreen</a></li>
            <li><a href="pages/examples/404.html"><i className="fa fa-circle-o"></i> 404 Error</a></li>
            <li><a href="pages/examples/500.html"><i className="fa fa-circle-o"></i> 500 Error</a></li>
            <li><a href="pages/examples/blank.html"><i className="fa fa-circle-o"></i> Blank Page</a></li>
            <li><a href="pages/examples/pace.html"><i className="fa fa-circle-o"></i> Pace Page</a></li>
          </ul>
        </li>
       <li className="treeview" style={{ textAlign:'left'}}>
          <a href="#">
            <i className="fa fa-share"></i> <span>Multilevel</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a href="#"><i className="fa fa-circle-o"></i> Level One</a></li>
           <li className="treeview" style={{ textAlign:'left'}}>
              <a href="#"><i className="fa fa-circle-o"></i> Level One
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu">
                <li><a href="#"><i className="fa fa-circle-o"></i> Level Two</a></li>
               <li className="treeview" style={{ textAlign:'left'}}>
                  <a href="#"><i className="fa fa-circle-o"></i> Level Two
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li><a href="#"><i className="fa fa-circle-o"></i> Level Three</a></li>
                    <li><a href="#"><i className="fa fa-circle-o"></i> Level Three</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a href="#"><i className="fa fa-circle-o"></i> Level One</a></li>
          </ul>
        </li>
    {/* <li><a href="https://adminlte.io/docs"><i className="fa fa-book"></i> <span>Documentation</span></a></li>
        <li className="header">LABELS</li>
        <li><a href="#"><i className="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
        <li><a href="#"><i className="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
        <li><a href="#"><i className="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li> */}
                </ul>
            </section>
        </aside>
    );
};

export default Sidebar;
