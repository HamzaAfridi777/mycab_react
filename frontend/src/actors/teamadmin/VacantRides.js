import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VacantRides = ({ userRole, setVacantRidesCount }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const config = {};
        axios
            .get("/api/list-vacantRides", config)
            .then((response) => {
                // Check if the response data is an array
                if (response.data && Array.isArray(response.data.data.data)) {
                    setData(response.data.data.data);
                    setVacantRidesCount(response.data.totalCount); // Set the total count
                } else {
                    console.error("Invalid data format:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    const columns = useMemo(
        () => [
            { Header: "#", accessor: "ride_id" },
            { Header: "Customer_Id", accessor: "customer_id" },
            { Header: "Driver", accessor: "driver_id" },
            { Header: "FS_Id", accessor: "franchiseSystem_id" },
            { Header: "Fare_Amount", accessor: "fare_amount" },
            { Header: "PickUp_Location", accessor: "pickUp_location" },
            { Header: "Destination", accessor: "destination" },
            { Header: "Status", accessor: "status" },
            { Header: "Date", accessor: "date" },
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        setGlobalFilter,
        gotoPage,
        previousPage,
        nextPage,
        setPageSize,
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
    const { globalFilter } = state;
    const { pageIndex, pageSize } = state;

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
                    <div className="col-xs-12">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title pull-left">
                                    <b>Vacant Rides</b>
                                </h3>
                                <div>
                                    <input
                                        type="text"
                                        value={globalFilter || ""}
                                        onChange={(e) =>
                                            setGlobalFilter(e.target.value)
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
                                    {...getTableProps()}
                                >
                                    <thead>
                                        {headerGroups.map((headerGroup) => (
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

                                    <tbody {...getTableBodyProps()}>
                                        {page.map((row) => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map((cell) => (
                                                        <td
                                                            {...cell.getCellProps()}
                                                        >
                                                            {cell.render(
                                                                "Cell"
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div>
                                    <span>
                                        Page{" "}
                                        <strong>
                                            {pageIndex + 1} of{" "}
                                            {Math.ceil(data.length / pageSize)}
                                        </strong>{" "}
                                    </span>
                                    <button
                                        onClick={() => gotoPage(0)}
                                        disabled={pageIndex === 0}
                                    >
                                        {"<<"}
                                    </button>
                                    <button
                                        onClick={() => previousPage()}
                                        disabled={pageIndex === 0}
                                    >
                                        {"<"}
                                    </button>
                                    <button
                                        onClick={() => nextPage()}
                                        disabled={
                                            pageIndex ===
                                            Math.ceil(data.length / pageSize) -
                                                1
                                        }
                                    >
                                        {">"}
                                    </button>
                                    <button
                                        onClick={() =>
                                            gotoPage(
                                                Math.ceil(
                                                    data.length / pageSize
                                                ) - 1
                                            )
                                        }
                                        disabled={
                                            pageIndex ===
                                            Math.ceil(data.length / pageSize) -
                                                1
                                        }
                                    >
                                        {">>"}
                                    </button>
                                    <select
                                        value={pageSize}
                                        onChange={(e) => {
                                            setPageSize(Number(e.target.value));
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
            </section>
        </div>
    );
};

export default VacantRides;
