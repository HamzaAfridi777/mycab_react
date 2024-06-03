import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import TaskAdminActivity from "./TaskAdminActivity";
import TeamAdminActivity from "./TeamAdminActivity";

const Dashboard = ({ userRole }) => {
    const [rideTotal, setRideTotal] = useState(null);
    const [possession, setPossession] = useState(null);
    const [register, setRegister] = useState(null);
    const [totalDrivers, setTotalDrivers] = useState(null);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null); // Single state for selected user
    const [selectedUserId2, setSelectedUserId2] = useState(null);

    ////Task Admin Api
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/TaskAdmin-list");
                setData(response.data.data.data);

                ////Ride Info dashboard
                const rideResponse = await axios.get("/api/list-ride");
                setRideTotal(rideResponse.data.totalRides);

                //Possession dashboard
                const possessionResponse = await axios.get(
                    "/api/users-summary"
                );
                const possessionData = possessionResponse.data.data;

                // Extract the "Total Percentage" value
                const totalPercentage = possessionData.find(
                    (item) => item.title === "Total Percentage"
                ).value;
                setPossession(totalPercentage);

                // Fetch total users with token
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No  token found");
                } else {
                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };
                    const registerResponse = await axios.get(
                        "/api/users-list",
                        { headers }
                    );
                    const totalUsers = registerResponse.data.totalUsers;
                    setRegister(totalUsers);
                }
                /////Total Drivers
                   const driverResponse = await axios.get("/api/drivers-list");
                   const total = driverResponse.data.data.total; // Change here
                   //console.log("Total drivers:", total); // Debugging log
                   setTotalDrivers(total);

            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.response && error.response.status === 401) {
                    console.error(
                        "Unauthorized access - possibly invalid token"
                    );
                }
            }
        };

        fetchData();
    }, []);

    const columns = useMemo(
        () => [
            { Header: "#", accessor: "user_id" },
            { Header: "Name", accessor: "name" },
            { Header: "Email", accessor: "email" },
            { Header: "Status", accessor: "status" },
            {
                Header: "Image",
                accessor: "image",
                Cell: ({ row }) =>
                    row.original.image ? (
                        <img
                            src={`${axios.defaults.baseURL}storage/images/${row.original.image}`}
                            className="img-circle"
                            alt="User Image"
                            style={{ width: "40px", height: "40px" }}
                        />
                    ) : null,
            },
            // {
            //     Header: "Actions",
            //     accessor: "ids", // Use id or another unique identifier for the accessor
            //     Cell: ({ row }) => (
            //         <Link
            //             to={`/TaskAdminActivity/${row.original.user_id,"taskAdmin"}`}
            //            // style={{ color: "lightblack" }}
            //         >
            //              <FontAwesomeIcon

            //             icon={faEye}
            //             style={{ cursor: 'pointer', color: "green",marginLeft:30}}
            //             onClick={() => handleViewUser(row.original.user_id,"taskAdmin")}

            //         />
            //         </Link>
            //     ),
            // },
            {
                Header: "Actions",
                accessor: "ids",
                Cell: ({ row }) => (
                    <FontAwesomeIcon
                        icon={faEye}
                        style={{
                            cursor: "pointer",
                            color: "green",
                            marginLeft: 30,
                        }}
                        onClick={() =>
                            handleViewUser(row.original.user_id, "taskAdmin")
                        }
                    />
                ),
            },
        ],
        []
    );

    const {
        getTableProps: getTableProps1,
        getTableBodyProps: getTableBodyProps1,
        headerGroups: headerGroups1,
        page: page1,
        prepareRow: prepareRow1,
        state: {
            globalFilter: globalFilter1,
            pageIndex: pageIndex1,
            pageSize: pageSize1,
        },
        setGlobalFilter: setGlobalFilter1,
        gotoPage: gotoPage1,
        previousPage: previousPage1,
        nextPage: nextPage1,
        setPageSize: setPageSize1,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 50 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    ////Team Admin Table Api
    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await axios.get("/api/TeamAdmin-list");
                // Accessing the nested name field within the user object
                setData2(response.data.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTeamData();
    }, []);

    const teamAdminColumns = useMemo(
        () => [
            { Header: "#", accessor: "user_id" },
            { Header: "Name", accessor: "name" },
            { Header: "Email", accessor: "email" },
            { Header: "Status", accessor: "status" },
            {
                Header: "Image",
                accessor: "image",
                Cell: ({ row }) =>
                    row.original.image ? (
                        <img
                            src={`${axios.defaults.baseURL}storage/images/${row.original.image}`}
                            className="img-circle"
                            alt="User Image"
                            style={{ width: "40px", height: "40px" }}
                        />
                    ) : null,
            },
            {
                Header: "Actions",
                accessor: "ids",
                Cell: ({ row }) => (
                    <FontAwesomeIcon
                        icon={faEye}
                        style={{
                            cursor: "pointer",
                            color: "green",
                            marginLeft: 30,
                        }}
                        onClick={() =>
                            handleViewUser2(row.original.user_id, "teamAdmin")
                        }
                    />
                ),
            },
        ],
        []
    );

    const {
        getTableProps: getTableProps2,
        getTableBodyProps: getTableBodyProps2,
        headerGroups: headerGroups2,
        page: page2,
        prepareRow: prepareRow2,
        state: {
            globalFilter: globalFilter2,
            pageIndex: pageIndex2,
            pageSize: pageSize2,
        },
        setGlobalFilter: setGlobalFilter2,
        gotoPage: gotoPage2,
        previousPage: previousPage2,
        nextPage: nextPage2,
        setPageSize: setPageSize2,
    } = useTable(
        {
            columns: teamAdminColumns,
            data: data2,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    //Task Admin View
    const handleViewUser = (user_id) => {
        // navigate(`/TaskAdminActivity/${user_id}`);
        setSelectedUserId(user_id);
        toast(<TaskAdminActivity user_id={user_id} />, {
            position: "top-center",
            autoClose: false,
            closeOnClick: true,
        });
    };

    /////Team Admin View
    const handleViewUser2 = (user_id) => {
        setSelectedUserId2(user_id);
        toast(<TeamAdminActivity user_id={user_id} />, {
            position: "top-center",
            autoClose: false,
            closeOnClick: true,
        });
    };
    {
        /**  {selectedUserId2 && <TeamAdminActivity user_id={selectedUserId2} />}*/
    }
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
                    <div className="col-lg-3 col-xs-6">
                        <div className="small-box bg-aqua">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                                <h3>{rideTotal}</h3>

                                <p>New Rides</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-android-car"></i>
                            </div>
                            <a href="/RideInfo" className="small-box-footer">
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-3 col-xs-6">
                        <div className="small-box bg-green">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                                <h3>
                                    {possession}
                                    {/*38{" "}
                                    <sup style={{ fontSize: "20px" }}></sup>*/}
                                </h3>

                                <p>Possession</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-stats-bars"></i>
                            </div>
                            <a
                                href="/UserSummaryModal"
                                className="small-box-footer"
                            >
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-3 col-xs-6">
                        <div className="small-box bg-yellow">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                                <h3>{register}</h3>
                                {/**<h3>150</h3>*/}
                                <p>User Registrations</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-person-add"></i>
                            </div>
                            <a
                                href="/RegisterUser"
                                className="small-box-footer"
                            >
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-3 col-xs-6">
                        <div className="small-box bg-red">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                               {/* <h3>65</h3>*/}
                                 <h3>{totalDrivers}</h3>
                                  {/* <h3>{totalDrivers !== null ? totalDrivers : "Loading..."}</h3>*/}
                                <p>New Drivers</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-pie-graph"></i>
                            </div>
                            <a href="/DriversInfo" className="small-box-footer">
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <ToastContainer />
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title pull-left">
                                        <b>Task Admin</b>
                                    </h3>
                                    <div>
                                        <input
                                            type="text"
                                            value={globalFilter1 || ""}
                                            onChange={(e) =>
                                                setGlobalFilter1(e.target.value)
                                            }
                                            placeholder="Search..."
                                            style={{ marginLeft: "730px" }}
                                        />
                                    </div>
                                </div>

                                <div className="box-body">
                                    <table
                                        id="example1"
                                        className="table table-bordered table-striped"
                                        style={{ textAlign: "left" }}
                                        {...getTableProps1()}
                                    >
                                        <thead>
                                            {headerGroups1.map(
                                                (headerGroup) => (
                                                    <tr
                                                        {...headerGroup.getHeaderGroupProps()}
                                                    >
                                                        {headerGroup.headers.map(
                                                            (column) => (
                                                                <th
                                                                    {...column.getHeaderProps(
                                                                        column.getSortByToggleProps()
                                                                    )}
                                                                >
                                                                    {column.render(
                                                                        "Header"
                                                                    )}
                                                                    <span>
                                                                        {column.isSorted
                                                                            ? column.isSortedDesc
                                                                                ? " 🔽"
                                                                                : " 🔼"
                                                                            : ""}
                                                                    </span>
                                                                </th>
                                                            )
                                                        )}
                                                    </tr>
                                                )
                                            )}
                                        </thead>

                                        <tbody {...getTableBodyProps1()}>
                                            {page1.map((row) => {
                                                prepareRow1(row);
                                                return (
                                                    <tr {...row.getRowProps()}>
                                                        {row.cells.map(
                                                            (cell) => (
                                                                <td
                                                                    {...cell.getCellProps()}
                                                                >
                                                                    {cell.render(
                                                                        "Cell"
                                                                    )}
                                                                </td>
                                                            )
                                                        )}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <div>
                                        <span>
                                            Page{" "}
                                            <strong>{pageIndex1 + 1}</strong> of{" "}
                                            <strong>
                                                {Math.ceil(
                                                    data.length / pageSize1
                                                )}
                                            </strong>
                                        </span>
                                        <button
                                            onClick={() => gotoPage1(0)}
                                            disabled={pageIndex1 === 0}
                                        >
                                            {"<<"}
                                        </button>
                                        <button
                                            onClick={() => previousPage1()}
                                            disabled={pageIndex1 === 0}
                                        >
                                            {"<"}
                                        </button>
                                        <button
                                            onClick={() => nextPage1()}
                                            disabled={
                                                pageIndex1 ===
                                                Math.ceil(
                                                    data.length / pageSize1
                                                ) -
                                                    1
                                            }
                                        >
                                            {">"}
                                        </button>
                                        <button
                                            onClick={() =>
                                                gotoPage1(
                                                    Math.ceil(
                                                        data.length / pageSize1
                                                    ) - 1
                                                )
                                            }
                                            disabled={
                                                pageIndex1 ===
                                                Math.ceil(
                                                    data.length / pageSize1
                                                ) -
                                                    1
                                            }
                                        >
                                            {">>"}
                                        </button>
                                        <select
                                            value={pageSize1}
                                            onChange={(e) => {
                                                setPageSize1(
                                                    Number(e.target.value)
                                                );
                                            }}
                                        >
                                            {[10, 25, 50].map((size) => (
                                                <option key={size} value={size}>
                                                    Show {size}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/**  {selectedUserId && <TaskAdminActivity user_id={selectedUserId} />}*/}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title pull-left">
                                <b>Team Admin</b>
                            </h3>
                            <div>
                                <input
                                    type="text"
                                    value={globalFilter2 || ""}
                                    onChange={(e) =>
                                        setGlobalFilter2(e.target.value)
                                    }
                                    placeholder="Search..."
                                    style={{ marginLeft: "730px" }}
                                />
                            </div>
                        </div>

                        <div className="box-body">
                            <table
                                id="example2"
                                className="table table-bordered table-striped"
                                style={{ textAlign: "left" }}
                                {...getTableProps2()}
                            >
                                <thead>
                                    {headerGroups2.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    <th
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps()
                                                        )}
                                                    >
                                                        {column.render(
                                                            "Header"
                                                        )}
                                                        <span>
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? " 🔽"
                                                                    : " 🔼"
                                                                : ""}
                                                        </span>
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </thead>

                                <tbody {...getTableBodyProps2()}>
                                    {page2.map((row) => {
                                        prepareRow2(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => (
                                                    <td
                                                        {...cell.getCellProps()}
                                                    >
                                                        {cell.render("Cell")}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <span>
                                    Page <strong>{pageIndex2 + 1}</strong> of{" "}
                                    <strong>
                                        {Math.ceil(data.length / pageSize2)}
                                    </strong>
                                </span>
                                <button
                                    onClick={() => gotoPage2(0)}
                                    disabled={pageIndex2 === 0}
                                >
                                    {"<<"}
                                </button>
                                <button
                                    onClick={() => previousPage2()}
                                    disabled={pageIndex2 === 0}
                                >
                                    {"<"}
                                </button>
                                <button
                                    onClick={() => nextPage2()}
                                    disabled={
                                        pageIndex2 ===
                                        Math.ceil(data.length / pageSize2) - 1
                                    }
                                >
                                    {">"}
                                </button>
                                <button
                                    onClick={() =>
                                        gotoPage2(
                                            Math.ceil(data.length / pageSize2) -
                                                1
                                        )
                                    }
                                    disabled={
                                        pageIndex2 ===
                                        Math.ceil(data.length / pageSize2) - 1
                                    }
                                >
                                    {">>"}
                                </button>
                                <select
                                    value={pageSize2}
                                    onChange={(e) => {
                                        setPageSize2(Number(e.target.value));
                                    }}
                                >
                                    {[10, 25, 50].map((size) => (
                                        <option key={size} value={size}>
                                            Show {size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/**  {selectedUserId2 && <TeamAdminActivity user_id={selectedUserId2} />}*/}
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default Dashboard;
