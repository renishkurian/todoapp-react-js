import React, { useRef } from "react";

import InputBase from "@mui/material/InputBase";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDataStore } from "../DataStore/DataStore";
import { deepOrange } from "@mui/material/colors";
import "./resources/css/Header.css";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { authConf } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Header() {
  const [{ hideSideBar, user }, dispatch] = useDataStore();
  const searchRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const logoutNavigate = useNavigate();
  const id = open ? "simple-popover" : undefined;
  const hide_side_bar = () => {
    dispatch({ type: "Toggle_Sidebar", hideSideBar: !hideSideBar });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    signOut(authConf)
      .then(() => {
        dispatch({ type: "Sign_Out" });
        logoutNavigate("/");

        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const handleSearch = (e) => {
    dispatch({
      type: "SEARCH",
      search: e.target.value,
    });
  };
  return (
    <div className="headerContent">
      <div className="searchbar">
        <IconButton
          sx={{ p: "10px" }}
          aria-label="menu"
          onClick={hide_side_bar}
        >
          <MenuIcon />
        </IconButton>
        <InputBase
          ref={searchRef}
          // onKeyPress={handleSearch}
          sx={{ ml: 1, flex: 1 }}
          onChange={(e) => handleSearch(e)}
          placeholder="Search "
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
      <div className="user">
        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        <MoreVertIcon onClick={handleClick} />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }} className="logout">
            <Button onClick={logout} variant="outlined">
              Log out
            </Button>
          </Typography>
        </Popover>
      </div>
    </div>
  );
}

export default Header;
