import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { useNavigate, useParams  } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";


const UpdateFranchisePermission = () => {
    const { franchise_permission_id } = useParams(); // Retrieve userId from URL params
    const navigate = useNavigate();
    const [permission_name, setPermission_name] = useState("");
    const [error, setError] = useState("");

  
    useEffect(() => {
        // Fetch user data and populate form fields
        const fetchRole = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from local storage
                const response = await axios.get(
                    `/api/update-franchisePermission/${franchise_permission_id }`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in request headers
                        },
                    }
                );
                const roleData = response.data.data;
                setPermission_name(roleData.permission_name);
        
            } catch (error) {
                setError(
                    error.response ? error.response.data.error : error.message
                );
            }
        };

        fetchRole();
    }, [franchise_permission_id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("permission_name", permission_name);          

            const token = localStorage.getItem("token"); // Retrieve token from localStorage

            const response = await axios.post(
                `/api/edit-new-franchisePermission/${franchise_permission_id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in request headers
                    }
                }
            );
  // Show success toast
  toast.success("FranchisePermission updated successfully", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
});
            // Handle response
            navigate("/FranchisePermissionList ");
        } catch (error) {
            setError(
                error.response ? error.response.data.error : error.message
            );
              // Show error toast if deletion fails
              toast.error("Failed to update FranchisePermission", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    return (

        <div className="content-wrapper" >
            <section className="content-header" style={{ textAlign: "left" }}>
                <h1>
                    {"Superadmin"}
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
            <hr style={{ border: "1px solid #e3e3e3", margin: "10px" }} />
            <section className="content" style={{ minHeight: '100vh' }}>
                <div className="row">
                    <div className="col-md-12 col-xm-12">
                        <div className="box  box-primary text-left">
                            <div className="box-header with-border" >
                                <h3 className="box-title">Update Franchise Permission </h3>
                            </div>

                            <form onSubmit={handleUpdate}>
                            <div className="box-body">
                                <div className="form-group has-feedback col-md-6 col-xm-12">
                                    <label for="exampleInputName">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={permission_name}
                                        onChange={(e) =>
                                            setPermission_name(e.target.value)
                                        }
                                        autoComplete="off"

                                    />
                                    {/* <span className="glyphicon glyphicon-envelope form-control-feedback"></span> */}
                                </div>

                            </div>

                            <div className="box-footer text-right">
                                <button
                                    type="submit"
                                    className="btn btn-primary"

                                >
                                    Edit Franchise Permission
                                </button>
                            </div>
                        </form>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdateFranchisePermission;