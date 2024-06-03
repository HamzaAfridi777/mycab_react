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

const GetTeamAdminUsers = ({ userRole }) => {
    const navigate = useNavigate();
    const [data2, setData2] = useState([]);
    const [error, setError] = useState("");

    ////Team Admin Table Api
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/TeamAdmin-list");
                // Accessing the nested name field within the user object
                setData2(response.data.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
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
                                        Page <strong>{pageIndex2 + 1}</strong>{" "}
                                        of{" "}
                                        <strong>
                                            {Math.ceil(
                                                data2.length / pageSize2
                                            )}
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
                                            Math.ceil(
                                                data2.length / pageSize2
                                            ) -
                                                1
                                        }
                                    >
                                        {">"}
                                    </button>
                                    <button
                                        onClick={() =>
                                            gotoPage2(
                                                Math.ceil(
                                                    data2.length / pageSize2
                                                ) - 1
                                            )
                                        }
                                        disabled={
                                            pageIndex2 ===
                                            Math.ceil(
                                                data2.length / pageSize2
                                            ) -
                                                1
                                        }
                                    >
                                        {">>"}
                                    </button>
                                    <select
                                        value={pageSize2}
                                        onChange={(e) => {
                                            setPageSize2(
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
            </section>
        </div>
    );
};

export default GetTeamAdminUsers;
