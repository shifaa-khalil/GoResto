import React, { useState } from "react";
import "../App.css";

const DropDown = ({ Name }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="drop-down-menu">
      <div className="user-name" onClick={handleUserClick}>
        {/* {Name} */}
        <i>Name</i>
      </div>
      {isDropdownOpen && (
        <div className="drop-down-items">
          <a href="#">Settings</a>
          <a href="#">Logout</a>
        </div>
      )}
    </nav>
  );
};

export default DropDown;
