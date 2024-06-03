// DropdownMenu.js

import React from 'react';

const DropdownMenu = ({ onDelete }) => {
    return (
        <div style={{padding:'0px'}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button className="dropdown-item" onClick={onDelete} >Delete</button>
        </div>
    );
};

export default DropdownMenu;
