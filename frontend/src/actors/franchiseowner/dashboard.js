import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
  
const Dashboard = ({ userRole }) => {
   const [totalTask, setTotalTask] = useState(null);
   const [totalFleet, setTotalFleet] = useState(null);
   const [totalCustomers,setTotalCustomers] = useState(null);
   const [totalDriver,setTotalDriver] = useState(null);
    useEffect(()=>{
const fetchData = async ()=>{
try{
    ////Total Tasks
    const taskResponse = await axios.get("/api/task-list");
    const total = taskResponse.data.data.total;
     setTotalTask(total);

     /////Total Fleets
     const fleetResponse = await axios.get("/api/fleets-list");
     const totalFleets = fleetResponse.data.data.total;
     setTotalFleet(totalFleets);

     /////Total Customer 
     const customerResponse = await axios.get("/api/list-customer");
     const totalCustomer = customerResponse.data.data.total;
     setTotalCustomers(totalCustomer);

     ///Total Drivers
     const driverResponse = await axios.get("/api/drivers-list");
     const totalDrivers = driverResponse.data.data.total;
     setTotalDriver(totalDrivers);

} catch (error) {
    console.error("Error fetching data:", error);
}
};
fetchData();
    },[])


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
                                <h3>{totalTask}</h3>

                                <p>Tasks</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-android-calendar"></i>
                            </div>
                            <a href="/TaskInfo" className="small-box-footer">
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
                                    {totalFleet}<sup style={{ fontSize: "20px" }}></sup>
                                </h3>

                                <p>Fleet</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-ios-analytics"></i>
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

                    
                    <div className="col-lg-3 col-xs-6">
                        <div className="small-box bg-red">
                            <div
                                className="inner"
                                style={{ textAlign: "left" }}
                            >
                                <h3>{totalCustomers}</h3>

                                <p>Customer</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-android-people"></i>
                            </div>
                            <a href="/CustomerListInfo" className="small-box-footer">
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
                                <h3>{totalDriver}</h3>

                                <p>Drivers</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-android-person"></i>
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

                
            </section>
        </div>
    );
};

export default Dashboard;
