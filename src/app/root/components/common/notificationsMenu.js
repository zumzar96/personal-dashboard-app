import * as React from "react";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { setNumberOfNotificaitons } from "../../../auth/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
//TODO
export default function NotificationMenu({
  notifications,
  unreadNotifications,
  setUnreadNotifications,
  persistedNumberOfnotificaitons,
  setUnreadNotificationsNumber,
  unreadNotificationsNumber,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user_scoket = useSelector((state) => state.login.socket);

  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const unreadNumber =
    notifications.length <= persistedNumberOfnotificaitons
      ? unreadNotificationsNumber.length
      : unreadNotificationsNumber.length +
        notifications.length -
        persistedNumberOfnotificaitons;

  const unreadNumberOffline =
    notifications.length <= persistedNumberOfnotificaitons
      ? 0
      : notifications.length - persistedNumberOfnotificaitons;

  const totalNotificaitons = unreadNotifications.concat(notifications);

  const totalNumberOfNotificaitons =
    unreadNumber + persistedNumberOfnotificaitons;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setUnreadNotificationsNumber([]);
    dispatch(setNumberOfNotificaitons(totalNumberOfNotificaitons));
    const persistednn = {
      to: 1,
      from: null,
      content: totalNumberOfNotificaitons,
    };
    user_scoket.emit("persistednn", persistednn);
  };

  console.log("persistedNumberOfnotificaitons", persistedNumberOfnotificaitons);

  console.log("notifications.length", notifications.length);

  console.log(
    "unreadNotificationsNumber.length",
    unreadNotificationsNumber.length
  );

  return (
    <div style={{ position: "relative" }}>
      <IconButton
        color="inherit"
        aria-label="more"
        id="long-button"
        size="large"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <CircleNotificationsIcon />
      </IconButton>
      {unreadNumber !== 0 || unreadNumberOffline!==0 ? (
        <div
          style={{
            position: "absolute",
            backgroundColor: "red",
            width: "30%",
            height: "40%",
            borderRadius: "20%",
            marginLeft: "1.7rem",
            marginTop: "-1.5rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            {unreadNotifications.lenght !== 0 ? unreadNumber : unreadNumberOffline}
          </div>
        </div>
      ) : null}
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {totalNotificaitons.map((not) => (
          <MenuItem key={not} onClick={handleClose}>
            {not.content}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
