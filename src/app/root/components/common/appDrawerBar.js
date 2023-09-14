import * as React from "react";
import { useState, useEffect } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  addSocket,
  setNumberOfNotificaitons,
} from "../../../auth/loginSlice";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ColorModeContext, tokens } from "../../../../config/themes/rootTheme";
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import socketCon from "../../../../socket";
import useSocketSetup from "../../socket.io/useSocketSetup";
import NotificaitonMenu from "../common/notificationsMenu";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // backgroundColor: theme.palette.primary.dark,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const user_info = useSelector((state) => state.login.user_info);
  const persisted_number_of_notificaitons = useSelector(
    (state) => state.login.persisted_number_of_notificaitons
  );
  const [initPersistedNotifications, setInitPersistedNotifications] =
    useState();
  const isLoggedIn = user_info !== null;
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [socket, setSocket] = useState(() => socketCon(user_info));
  const [messages, setMessages] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [unreadNotificationsNumber, setUnreadNotificationsNumber] = useState(
    []
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    // const message = { to: 1, from: null, content: "test socket" };

    // socket.emit("dm", message);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
  };
  //TODO
  useSocketSetup(
    socket,
    setMessages,
    setUnreadNotifications,
    setInitPersistedNotifications,
    setUnreadNotificationsNumber
  );

  dispatch(addSocket(socket));
  //TODO
  useEffect(() => {
    if (persisted_number_of_notificaitons === 0 && initPersistedNotifications) {
      const numberInitPersistedNot = Number(
        initPersistedNotifications?.[0].content
      );
      dispatch(setNumberOfNotificaitons(numberInitPersistedNot));
    }
  }, [messages, initPersistedNotifications]);

  return (
    <>
      {isLoggedIn ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              {/* <Typography
                sx={{ minWidth: "3rem" }}
                variant="h6"
                noWrap
                component="div"
              >
                Dashboard
              </Typography> */}
              <Box
                sx={{
                  display: "flex",
                  flex: "1",
                  // backgroundColor: "black",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton size="large" onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === "dark" ? (
                    <LightModeOutlinedIcon />
                  ) : (
                    <DarkModeOutlinedIcon sx={{ color: "white" }} />
                  )}
                </IconButton>
                <NotificaitonMenu
                  setUnreadNotifications={setUnreadNotifications}
                  unreadNotifications={unreadNotifications}
                  notifications={messages}
                  persistedNumberOfnotificaitons={
                    persisted_number_of_notificaitons
                  }
                  setUnreadNotificationsNumber={setUnreadNotificationsNumber}
                  unreadNotificationsNumber={unreadNotificationsNumber}
                ></NotificaitonMenu>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={anchorEl}
                  onClose={handleClose}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem
                    key={text}
                    disablePadding
                    sx={{ display: "block" }}
                    // onClick={() => navigate(`${pathname}/stats`)}
                    to={`stats`}
                    component={Link}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        color: "neutral.light",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                        // sx={{ color: "#2f4f4f" }}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
            <Divider />
            <List>
              {["materials", "warehouse", "timeline", "Route"].map(
                (text, index) => (
                  <ListItem
                    key={text}
                    disablePadding
                    sx={{ display: "block" }}
                    // onClick={() => navigate(`${pathname}/materials`)}
                    to={text}
                    component={Link}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        color: "neutral.light",
                      }}
                      // to={`${pathname}/materials`}
                      // disable={pathname === `${pathname}/materials`}
                      // onClick={() => navigate("/materials")}
                      // component={Link}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: theme.spacing(2),
              minWidth: "20%",
              // height: "100vh",
            }}
          >
            <DrawerHeader />
            {children}
          </Box>
        </Box>
      ) : (
        <>
          <Navigate to="/"></Navigate>
        </>
      )}
    </>
  );
}
