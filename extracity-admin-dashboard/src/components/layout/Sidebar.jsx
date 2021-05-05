import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from '@material-ui/icons/Explore';
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AirlineSeatReclineNormalSharpIcon from '@material-ui/icons/AirlineSeatReclineNormalSharp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import Link from "@material-ui/core/Link";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ArrowRightTwoTone } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#34495E",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#34495E",
        color: "white",
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    LogoutButton: {
        color: "#F7F9F9",
        backgroundColor: "#E74C3C",
    },
    profileButton: {
        backgroundColor: "#2874A6",
        color: "#F7F9F9",
    },
    dropdownTitle: {
        color: "red",

    },
    dropDownMenu: {
        "& .MuiPaper-root": {
            backgroundColor: "#34495e",
            color: "#fff",
        },
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function Sidebar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState();
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleLogout() {
        setError("");

        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
        }
    }

    return (
        <div className={classes.root}>
            {error && <Alert variant="danger">{error}</Alert>}
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Extracity Dashboard
          </Typography>
                    <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        className={classes.dropdownTitle}
                        endIcon={<ExpandMore />}
                    >
                        {currentUser.email}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className={classes.dropDownMenu}
                    >
                        <MenuItem
                            component={Link}
                            href="/update-profile"
                            style={{ color: "black", textDecoration: "none" }}
                        >
                            Update profile
                     </MenuItem>
                        <MenuItem
                            component={Link}
                            onClick={handleLogout}
                            href="/logout"
                            style={{ color: "red", textDecoration: "none" }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItemLink href="/">
                        <ListItemIcon>
                            <HomeIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemLink>
                    <Divider />

                    <ListItemLink href="/reservations">
                        <ListItemIcon>
                            <ExploreIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Reservations" />
                    </ListItemLink>
                    <Divider />

                    <ListItemLink href="/add-reservation">
                        <ListItemIcon>
                            <AirlineSeatReclineNormalSharpIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Add Reservation" />
                    </ListItemLink>

                    <Divider />

                    <ListItemLink href="/statistics">
                        <ListItemIcon>
                            <AssessmentIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Statistics" />
                    </ListItemLink>
                    <Divider />

                    <ListItemLink href="/payments">
                        <ListItemIcon>
                            <MonetizationOnIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Payments" />
                    </ListItemLink>
                    <Divider />
                </List>
            </Drawer>
        </div>
    );
}
