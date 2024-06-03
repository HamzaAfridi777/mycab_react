import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="pull-right hidden-xs">
                <b>Version</b> 1.0
            </div>
            <strong>
                MYCAB &copy; 2024 wriiten by{" "}
                <a href="https://tkbench.com">Technology Bench</a>.
            </strong>{" "}
            All rights reserved.
        </footer>
    );
};

export default Footer;
