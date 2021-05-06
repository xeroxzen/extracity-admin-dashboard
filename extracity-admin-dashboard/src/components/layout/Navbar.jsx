import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from '@material-ui/icons/Explore';
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import AirlineSeatReclineNormalSharpIcon from '@material-ui/icons/AirlineSeatReclineNormalSharp';
import AssessmentIcon from '@material-ui/icons/Assessment';
// import ThumbDown from "@material-ui/icons/ThumbDown";
import Header from "../header/Header";
// import pagesList from "../nav/pagesList";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: "#34495E",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#880e4f",
        color: "white",
        onMouseOver: "green",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        backgroundColor: "#0097a7",
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />

                <Divider />
                <List component="nav" aria-label="secondary mailbox folders">
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

                    {/* <ListItemLink href="/complaints">
                        <ListItemIcon>
                            <ThumbDown color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Complaints" />
                    </ListItemLink> */}

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

                    <ListItemLink href="/trips">
                        <ListItemIcon>
                            <DirectionsBusIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Trips" />
                    </ListItemLink>
                    <Divider />
                    <pagesList />

                    <ListItemLink href="/fares">
                        <ListItemIcon>
                            <MonetizationOnIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Fares" />
                    </ListItemLink>
                    <Divider />
                </List>
            </Drawer>
        </div>
    );
}

export { Navbar };
