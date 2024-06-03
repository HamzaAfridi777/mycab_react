import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useTable,useSortBy,useGlobalFilter,usePagination,} from "react-table";
import "react-toastify/dist/ReactToastify.css";
// import VacantRides from "./VacantRides";
import PropTypes from "prop-types";

const Dashboard = ({ userRole }) => {
    const [vacantRidesCount, setVacantRidesCount] = useState(null);
    const [vacantIssuesCount, setVacantIssuesCount] = useState(null);
    const [availableDrivers, setAvailableDrivers] = useState(null);
    const [absentDrivers, setAbsentDrivers] = useState(null);
    //const [isLoading, setIsLoading] = useState(true); // Initialize loading state
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        fetchData();
        fetchDriverReports();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
   
    try {
        const [ridesResponse, issuesResponse,vacantResponse,
            presentResponse,absentResponse] = await Promise.all([
            axios.get("/api/list-ride", config),
            axios.get("/api/issues-list", config),
            axios.get("/api/list-vacantRides", config),
            axios.get("/api/presentDrivers-list", config),
            axios.get("/api/absentDrivers-list", config),
        ]);

        if (ridesResponse.data && Array.isArray(ridesResponse.data.data.data)) {
            setData(ridesResponse.data.data.data);
           // setVacantRidesCount(ridesResponse.data.totalCount);
        }

        if (issuesResponse.data && Array.isArray(issuesResponse.data.data.data)) {
            setVacantIssuesCount(issuesResponse.data.totalCount);
        }

        if (vacantResponse.data && Array.isArray(vacantResponse.data.data.data)) {
            setVacantRidesCount(vacantResponse.data.totalCount);
        }

        if (presentResponse.data && Array.isArray(presentResponse.data.data.data)) {
            setAvailableDrivers(presentResponse.data.totalPresentDrivers);
        }

        if (absentResponse.data && Array.isArray(absentResponse.data.data.data)) {
            setAbsentDrivers(absentResponse.data.totalAbsentDrivers);
        }

    } catch (error) {
        console.error("Error fetching data:", error);
   } 
   //finally {
    //     setIsLoading(false);
    // }
};
   
    const fetchDriverReports = async () => {
        try {
            const response = await axios.get("/api/reports-list");
            setData2(response.data.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const columns = useMemo(
        () => [
            { Header: "#", accessor: "ride_id" },
            { Header: "Customer", accessor: "customer_name" },
            { Header: "Driver", accessor: "driver_name" },
            { Header: "Fare_Amount", accessor: "fare_amount" },
            { Header: "PickUp_Location", accessor: "pickUp_location" },
            { Header: "Destination", accessor: "destination" },
            { Header: "FranchiseSystem_Name",accessor: "franchiseSystem_name", },
            { Header: "Status", accessor: "status" },
            { Header: "Date", accessor: "date" },
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
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const DriverReports = useMemo(
        () => [
            { Header: "#", accessor: "reports_id" },
            { Header: "Driver", accessor: "driver_name" },
            { Header: "Start_time", accessor: "start_time" },
            { Header: "End_Time", accessor: "end_time" },
            { Header: "Total_Distance", accessor: "total_distance" },
            { Header: "Total_Income", accessor: "total_income" },
            { Header: "Date", accessor: "date" },
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
            columns: DriverReports,
            data: data2,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    useEffect(() => {
        fetchData();
    }, []);


     // Render the component conditionally based on whether data is loaded or not
    //  if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="content-wrapper">
            <section className="content-header" style={{ textAlign: "left" }}>
                <h1>
                    {userRole &&
                        userRole.charAt(0).toUpperCase() + userRole.slice(1)}
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
                                <h3>{vacantRidesCount}</h3>{" "}
                                {/*Dynamically display the count */}
                                {/* <h3>{vacantRidesCount !== null ? vacantRidesCount : "Loading..."}</h3> Display "Loading..." until count is available */}
                                <p>Vacant Rides</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-android-car"></i>
                            </div>
                            <a href="/VacantRides" className="small-box-footer">
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-xs-6">
                        <div className="small-box bg-purple">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                               {/* <h3>150</h3>*/}
                                <h3>{vacantIssuesCount}</h3>{" "}
                                <p>Issues</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-bug"></i>
                            </div>
                            <a
                                href="/IssueListInfo"
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
                                <h3>{availableDrivers}</h3>
                                <p>Available Drivers</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-person-add"></i>
                            </div>
                            <a
                                href="/PresentDriverList"
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
                                <h3>{absentDrivers}</h3>
                                <p>Absent Drivers</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-alert"></i>
                            </div>
                            <Link
                                to="/AbsentDriverList"
                                className="small-box-footer"
                            >
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title pull-left">
                                        <b>Rides</b>
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
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title pull-left">
                                <b> Taxi Driver Reports</b>
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
                        </div>
                    </div>
                </section>
               {/**  <VacantRides userRole={userRole} setVacantRidesCount={setVacantRidesCount} />*/}
            </section>
        </div>
    );
};

Dashboard.propTypes = {
    userRole: PropTypes.string,
};

export default Dashboard;
