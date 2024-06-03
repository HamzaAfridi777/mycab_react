import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./Chat";

const Dashboard = ({ userRole }) => {
    const [data, setData] = useState([]);
    const [rides, setRides] = useState(null);
    const [fleets,setFleets] = useState(null);
    const [drivers, setDrivers] = useState(null);
    // Fetch customer admin data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/list-customer");
                setData(response.data.data.data);

                ////Total No of Rides
                const ridesResponse = await axios.get("/api/list-ride");
                const totalRides = ridesResponse.data.totalRides;
               // console.log(totalRides);
                setRides(totalRides);

                /////Total No of Fleets
                const fleetResponse = await axios.get("/api/fleets-list");
                const total = fleetResponse.data.data.total;
               // console.log(total);
                setFleets(total);

                ////Total No of Drivers
                const driverResponse = await axios.get("/api/drivers-list");
                const totals = driverResponse.data.data.total;
                //console.log(totals);
                setDrivers(totals);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const columns = useMemo(
        () => [
            { Header: "#", accessor: "customer_id" },
            { Header: "Name", accessor: "name" },
            { Header: "Father_Name", accessor: "father_name" },
            { Header: "Gender", accessor: "gender" },
            { Header: "Country", accessor: "country" },
            { Header: "ID_Number", accessor: "identity_number" },
            { Header: "Date_of_Birth", accessor: "date_of_birth" },
            { Header: "Permanent_Address", accessor: "permanent_address" },
            { Header: "Present_Address", accessor: "present_address" },
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
                                <h3>{rides}</h3>

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

                    <div className="col-lg-4 col-xs-6">
                        <div className="small-box bg-yellow">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                                <h3>{fleets}</h3>

                                <p>Fleets</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-person-add"></i>
                            </div>
                            <a
                                href="/FleetListInfo"
                                className="small-box-footer"
                            >
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
                                <h3>{drivers}</h3>

                                <p>New Drivers</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-pie-graph"></i>
                            </div>
                            <a
                                href="/DriverListInfo"
                                className="small-box-footer"
                            >
                                More info{" "}
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title pull-left">
                                        <b>Customer Admin</b>{" "}
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
                                    <div
                                        className="table-container"
                                        style={{ overflowX: "auto" }}
                                    >
                                        <table
                                            id="example1"
                                            className="table table-bordered table-striped"
                                            style={{ textAlign: "left" }}
                                            {...getTableProps1()}
                                        >
                                            {/* Table content */}
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
                                                        <tr
                                                            {...row.getRowProps()}
                                                        >
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
                                                <strong>
                                                    {pageIndex1 + 1}
                                                </strong>{" "}
                                                of{" "}
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
                                                            data.length /
                                                                pageSize1
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
                                                    <option
                                                        key={size}
                                                        value={size}
                                                    >
                                                        Show {size}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Chat />
            </section>
        </div>
    );
};

export default Dashboard;
