import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Link from "@material-ui/core/Link";
import { Alert } from "react-bootstrap";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        // textAlign: "center",
    },
    body: {
        backgroundColor: "#34495E",
        width: `calc(100% - ${drawerWidth}px)`,
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
        color: "#fff",
    },
    dropDownMenu: {
        "& .MuiPaper-root": {
            backgroundColor: "#34495e",
            color: "#fff",
        },
    },
}));

export default function Header() {
    const classes = useStyles();
    const [error, setError] = React.useState();
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

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
            <AppBar position="fixed" className={classes.body}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Victoria Falls Mascot
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
                            style={{ color: "white", textDecoration: "none" }}
                        >
                            Update profile
            </MenuItem>
                        <MenuItem
                            component={Link}
                            onClick={handleLogout}
                            href="/logout"
                            style={{ color: "white", textDecoration: "none" }}
                        >
                            Logout
            </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export { Header };
