import React, { useState, useEffect } from "react";
import axios from "axios";

const UserSummaryModal = ({ userRole }) => {
    const [userSummaryData, setUserSummaryData] = useState([]);

    useEffect(() => {
        const fetchUserSummaryData = async () => {
            try {
                const response = await axios.get(
                    "/api/users-summary"
                );
                setUserSummaryData(response.data.data);
            } catch (error) {
                console.error("Error fetching user summary data:", error);
            }
        };

        fetchUserSummaryData();
    }, []);

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
                    <div className="col-lg-12 col-xs-8">
                    <div className="box">
                    <div className="box-header">
                        <div className="small-box bg-white">
                            <h2>User Summary</h2>
                            <ul>
                                {userSummaryData.map((item, index) => (
                                    <li style={{listStyle: "none"}} key={index}>
                                        <strong>{item.title}:</strong>{" "}
                                        {item.value}
                                    </li>
                                ))}
                            </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserSummaryModal;
