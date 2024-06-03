
import React, { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import Header from "./partials/header";
import Sidebar from "./partials/sidebar";
import Footer from "./partials/footer";
import NF from "./notfound";
import { useAuth } from './AuthContext';

const Dashboard = () => {
    const { isLoggedIn, userRole } = useAuth();
    const role = localStorage.getItem('userRole');
    const location = useLocation(); // Use the useLocation hook to get the current location
    
    // Checking if role is defined
    if (!role) {
        return <NF />;
    }
    
    // Extract the 'path' parameter from the URL
    const path = location.pathname.split('/')[1]; // Get the first part of the path
    
    // Define a variable to hold the dynamically imported component
    let UserRoleDashboard;
    
    // Dynamically import the component based on the 'path'
    if (path && path !== 'layout') {
        UserRoleDashboard = lazy(() => import(`../actors/${role.toLowerCase()}/${path}`));
    } else {
        UserRoleDashboard = lazy(() => import(`../actors/${role.toLowerCase()}/dashboard`));
    }
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Sidebar userRole={userRole} />
            <div className="wrapper">
                {UserRoleDashboard && <UserRoleDashboard userRole={userRole} />}
                <Footer />
            </div>
        </Suspense>
    );
};

export default Dashboard;
