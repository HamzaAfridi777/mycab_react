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

const PermissionList = ({ userRole }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (role_id) => {
    //  alert(role_id)
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get('/api/user-permission-list', config)
      .then(response => {
        // Check if the response data is an array
        if (response.data && Array.isArray(response.data.data.data)) {
          setData(response.data.data.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };


  const columns = useMemo(() => [
    { Header: '#', accessor: 'permission_id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Routes', accessor: 'routes' },
    { Header: 'Secondary Permission', accessor: 'secondary_permissions_name' },
    { Header: 'Parent', accessor: 'parent' },
    { Header: 'Level', accessor: 'level_name' },

    {
      Header: 'Actions',
      accessor: 'ids', // Use id or another unique identifier for the accessor
      Cell: ({ row }) => (
        <>
          {/* <FontAwesomeIcon icon={faPencil} onClick={() => handleUpdateUser(row.original.user_id)}  style={{ color: "blue",marginRight:"10px" }}>
          </FontAwesomeIcon> */}
          <Link to={`/UpdatePermission/${row.original.permission_id}`}
            style={{ marginRight: '10px', color: "blue" }}>
            <FontAwesomeIcon icon={faPencil} />
          </Link>

          <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(row.original.permission_id)}
            style={{ color: "red", marginRight: "7px" }} />

            {/*<Link to={`/view-user/${row.original.user_id}`}
            style={{ color: 'lightblack' }}>
            <FontAwesomeIcon icon={faEye} />
           Render the eye icon 
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
  console.warn("click");
  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  const handleDelete = (permission_id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.delete(`/api/delete-permission/${permission_id}`, config)
      .then(response => {
        // Remove the deleted user from the state
        setData(prevData => prevData.filter(user => user.permission_id !== permission_id));
        // Show success toast
        toast.success('Permission deleted successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      })
      .catch(error => {
        console.error('Error deleting Permission:', error);
        // Show error toast if deletion fails
        toast.error('Failed to delete Permission', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      });
  };
  const handleUpdateUser = (permission_id) => {
    // Redirect to the update user page
    navigate(`/UpdatePermission/${permission_id}`);
    // alert(user_id)
  };

  const handleViewUser = (user_id) => {
    setSelectedUserId(user_id);
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
                <h3 className="box-title pull-left"><b>Permission Table</b></h3>
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
                {selectedUserId && <UserView userId={selectedUserId} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PermissionList;
