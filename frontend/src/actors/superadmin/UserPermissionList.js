import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import UserView from './UserView';

const UserPermissionList = ({ userRole }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selecteduser_permission_id, setSelecteduser_permission_id] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = (user_permission_id) => {
        //  alert(role_id)
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.get('/api/user-permissions-list', config)
            .then(response => {
                // Check if the response data is an array
                if (response.data && Array.isArray(response.data.data)) {
                    setData(response.data.data);
                } else {
                    console.error('Invalid data format:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };


    const columns = useMemo(() => [
        { Header: '#', accessor: 'user_permission_id' },
        { Header: 'User', accessor: 'user_name' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Permission', accessor: 'permission_name' },
        { Header: 'Parent Permission', accessor: 'parent_permission' },

        {
            Header: 'Actions',
            accessor: 'ids', // Use id or another unique identifier for the accessor
            Cell: ({ row }) => (
                <>

                    <Link to={`/UpdateUserPermission/${row.original.user_permission_id}`}
                        style={{ marginRight: '10px', color: "blue" }}>
                        <FontAwesomeIcon icon={faPencil} />
                    </Link>
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(row.original.user_permission_id)}
                    style={{ color: "red", marginRight: "7px" }} />


                    {/*<Link to={`/view-user/${row.original.role_id}`}
            style={{ color: 'lightblack' }}>
            <FontAwesomeIcon icon={faEye} />
          </Link>*/}
                </>
            ),
        },
    ],
        []);
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
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    
    const { globalFilter } = state;
    const { pageIndex, pageSize } = state;

    const handleDelete = (user_permission_id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.delete(`/api/user-permissions-delete/${user_permission_id}`, config)
            .then(response => {
                // Remove the deleted user from the state
                setData(prevData => prevData.filter(user_permission => user_permission.user_permission_id !== user_permission_id));
                // Show success toast
                toast.success('User Permission Deleted successfully', 
                { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch(error => {
                console.error('Error deleting User Permission:', error);
                // Show error toast if deletion fails
                toast.error('Failed to delete User Permission',
                 { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
              
            });
    };
    const handleUpdateUser = (role_id) => {
        // Redirect to the update user page
        navigate(`/update-user/${role_id}`);
        // alert(user_id)
    };

    const handleViewUser = (role_id) => {
        setSelecteduser_permission_id(role_id);
    };

    return (
        <div className="content-wrapper">
<ToastContainer/>
            <section className="content-header" style={{ 'textAlign': 'left' }}>
                <h1>
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    <small>dashboard</small>
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li className="active">Dashboard</li>
                </ol>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title pull-left"><b>User Permission Table</b></h3>
                                <div >
                                    <input
                                        type="text"
                                        value={globalFilter || ''}
                                        onChange={(e) => setGlobalFilter(e.target.value)}
                                        placeholder="Search..."
                                        style={{ marginLeft: "730px" }}
                                    />
                                </div>

                            </div>

                            <div className="box-body">

                                <table
                                    id="example1"
                                    className="table table-bordered table-striped"
                                    style={{ textAlign: 'left' }}
                                    {...getTableProps()}
                                >
                                    <thead>
                                        {headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map(column => (
                                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                        {column.render('Header')}
                                                        <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>

                                    <tbody {...getTableBodyProps()}>
                                        {page.map(row => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map(cell => (
                                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>

                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>

                                </table>
                                <div>
                                    <span>
                                        Page{' '}
                                        <strong>
                                            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
                                        </strong>{' '}
                                    </span>
                                    <button onClick={() => gotoPage(0)} disabled={pageIndex === 0}>
                                        {'<<'}
                                    </button>
                                    <button onClick={() => previousPage()} disabled={pageIndex === 0}>
                                        {'<'}
                                    </button>
                                    <button onClick={() => nextPage()} disabled={pageIndex === Math.ceil(data.length / pageSize) - 1}>
                                        {'>'}
                                    </button>
                                    <button onClick={() => gotoPage(Math.ceil(data.length / pageSize) - 1)} disabled={pageIndex === Math.ceil(data.length / pageSize) - 1}>
                                        {'>>'}
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
                                {selecteduser_permission_id && <UserView user_permission_id={selecteduser_permission_id} />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserPermissionList;
