import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function MyMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  // const location = useLocation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
      window.location = event.target.innerText;
      setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        edge="start"
        className={props.className}
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>about</MenuItem>
        <MenuItem onClick={handleClose}>todo</MenuItem>
        <MenuItem onClick={handleClose}>user</MenuItem>
      </Menu>
    </div>
  );
}
