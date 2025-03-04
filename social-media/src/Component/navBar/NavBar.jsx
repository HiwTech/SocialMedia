import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import HomeIcon from "@mui/icons-material/Home";
import NightlightIcon from "@mui/icons-material/Nightlight";
import GridViewIcon from "@mui/icons-material/GridView";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";
import axios from "axios";
import { DarkModeContext } from "../../context/DarkModeContext";
import loginImg from "../../img/login.png";
import { AuthContext } from "../../context/authContext";
import Users from "../AllUsers/Users";

function Navbar() {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("users")) || null
  );
   const [openSearch, setOpenSearch] = useState(false);

  const navigate = useNavigate(); // React Router hook for navigation

  const profileImageUrl = currentUser?.profilePic
    ? `http://localhost:8880/upload/${currentUser.profilePic}`
    : "default-avatar.png"; //  default image when logged out

  // Handle user logout
  const handleLogout = async () => {
    try {
      // Send logout request
      await axios.post(
        "http://localhost:8880/api/auth/logout",
        {},
        { withCredentials: true }
      );

      // Clear user state and localStorage
      setCurrentUser(null);
      localStorage.removeItem("users");

      // Navigate to login page
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };
  //console.log(currentUser.profilePic);

  //Save user state in localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("users", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <div className="navBar">
      <div className="leftNav">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Hiwi Media</span>
        </Link>
        <HomeIcon fontSize="small" />
        {darkMode ? (
          <LightModeIcon onClick={toggle} fontSize="small" />
        ) : (
          <NightlightIcon onClick={toggle} fontSize="small" />
        )}
        <GridViewIcon />
        <div className="search">
          <SearchIcon
            fontSize="small"
            onClick={() => setOpenSearch(!openSearch)}
          />
          {openSearch && <Users />}
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="rightNav">
        <PersonOutlineIcon />
        <MailOutlineIcon />
        <NotificationsIcon />
        <div className="user">
          {currentUser ? (
            <>
              <img
                src={profileImageUrl}
                alt="User"
                onError={(e) => (e.target.src = loginImg)}
              />
              <span>{currentUser?.name}</span>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <span>Please log in</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
