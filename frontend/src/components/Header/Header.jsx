import React from "react";
import axios from "axios";
import "./Header.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserState } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";

const Header = () => {
  const { todos, setIsAuthenticated, user, theme, setTheme } = UserState();
  const handleLogOut = async () => {
    try {
      await axios.get("/api/v1/logout");
      setIsAuthenticated(false);
    } catch (error) {}
  };

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="header">
      <a
        href="https://github.com/sarjilpatel/Todo-app"
        className="github"
        target="blank"
      >
        <GitHubIcon />
      </a>
      <div className="theme_icon" onClick={changeTheme}>
        {theme === "dark" ? <WbSunnyIcon /> : <ModeNightIcon />}
      </div>
      <Link to="/" className="no__of__todos">
        Todos : {todos.length}{" "}
      </Link>
      <div className="header__profile__wrapper">
        <Link to="/profile" className="header__profile">
          <h5>{user.name}</h5>
          <Avatar src={user.avatar?.url} />
        </Link>
        <div onClick={handleLogOut} variant="outlined" className="logout">
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
