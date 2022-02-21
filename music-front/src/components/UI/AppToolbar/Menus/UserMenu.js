import React from "react";
import { Button, MenuItem, Menu, Fade, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTrackHistory } from "../../../../store/actions/tracksHistoryActions";
import { logoutUser } from "../../../../store/actions/usersActions";

const UserMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const trackHistoryHandler = () => {
    dispatch(fetchTrackHistory(user.token));
  };
  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Hello, {user.displayName}
      </Button>
      <Avatar alt="Remy Sharp" src={user.avatarImage} />
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to={"/artists/new"}>
          Add artist
        </MenuItem>
        <MenuItem component={Link} to={"/albums/new"}>
          Add album
        </MenuItem>
        <MenuItem component={Link} to={"/tracks/new"}>
          Add track
        </MenuItem>
        <MenuItem
          component={Link}
          to={"/track_history"}
          onClick={trackHistoryHandler}
        >
          Track History
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
