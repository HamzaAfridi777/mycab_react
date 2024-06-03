import React, { lazy, Suspense } from "react";
import Header from "./partials/header";
import Sidebar from "./partials/sidebar";
import Footer from "./partials/footer";
import NF from "./notfound";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Empty = (props) => {
    return (
        <div>
            <div className="login-box">
                <div className="login-logo">
                    <a href="/layout">
                        <b>My</b>CAB
                    </a>
                </div>
                <div
                    className="login-box-body"
                    style={{
                        background: "transparent",
                        fontStyle: "italic",
                        color: "darkred",
                    }}
                >
                    <h3>Sorry your requested page was not found!!</h3>
                </div>
            </div>
        </div>
    );
};
export default Empty;
