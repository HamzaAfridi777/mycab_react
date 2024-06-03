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
import { toast, ToastContainer } from "react-toastify";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

const PayableAccountList = ({ userRole }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = (accounts_payable_id) => {
        //  alert(role_id)
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .get("api/payable-list", config)
            .then((response) => {
                // Check if the response data is an array
                if (response.data && Array.isArray(response.data.data.data)) {
                    setData(response.data.data.data);
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
            { Header: "#", accessor: "accounts_payable_id" },
            {
                Header: "Purchase_journal_name",
                accessor: "purchase_journal_name",
            },
            { Header: "Vendor_id", accessor: "vendor_id" },
            { Header: "Amount", accessor: "amount" },
            { Header: "Debit", accessor: "debit" },
            { Header: "Credit", accessor: "credit" },
            { Header: "Debit_date", accessor: "debit_date" },
            { Header: "Credit_date", accessor: "credit_date" },
            {
                Header: "Actions",
                accessor: "ids", // Use id or another unique identifier for the accessor
                Cell: ({ row }) => (
                    <>
                        {/* <FontAwesomeIcon icon={faPencil} onClick={() => handleUpdateUser(row.original.user_id)}  style={{ color: "blue",marginRight:"10px" }}>
          </FontAwesomeIcon> */}
                        <Link
                            to={`/UpdatePayableAccount/${row.original.accounts_payable_id}`}
                            style={{ marginRight: "10px", color: "blue" }}
                        >
                            <FontAwesomeIcon icon={faPencil} />
                        </Link>

                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                                handleDelete(row.original.accounts_payable_id)
                            }
                            style={{ color: "red", marginRight: "7px" }}
                        />

                        {/*  <Link to={`/view-user/${row.original.user_id}`}
            style={{ color: 'lightblack' }}>
            <FontAwesomeIcon icon={faEye} />
            Render the eye icon 
          </Link>*/}
                    </>
                ),
            },
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

    const handleDelete = (accounts_payable_id) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .delete(`/api/delete-payable/${accounts_payable_id}`, config)
            .then((response) => {
                // Remove the deleted user from the state
                setData((prevData) =>
                    prevData.filter(
                        (user) =>
                            user.accounts_payable_id !== accounts_payable_id
                    )
                );
                // Show success toast
                toast.success("Payable Account deleted successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
                // Show error toast if deletion fails
                toast.error("Failed to delete Payable Account", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            });
    };
    const handleUpdateUser = (accounts_payable_id) => {
        navigate(`/UpdatePayableAccount/${accounts_payable_id}`);
    };

    // const handleViewUser = (user_id) => {
    //   setSelectedUserId(user_id);
    // };

    return (
        <div className="content-wrapper">
            <ToastContainer />
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
                                    <b>Payable Account List</b>
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

export default PayableAccountList;
