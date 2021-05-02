/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { ListItemLink } from "./ListItemLink";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function pagesList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItemLink href="/">
                    <ListItemText primary="Mascot Dashboard" />
                </ListItemLink>

                <ListItemLink href="/diagnosis">
                    <ListItemText primary="Diagnosis" />
                </ListItemLink>
                <Divider />

                <ListItemLink href="/recommendations">
                    <ListItemText primary="Recommendations" />
                </ListItemLink>

                <ListItemLink href="/complaints">
                    <ListItemText primary="Complaints" />
                </ListItemLink>
                <Divider />
                <ListItemLink href="/statistics">
                    <ListItemText primary="Statistics" />
                </ListItemLink>

                <ListItemLink href="/register">
                    <ListItemText primary="Register" />
                </ListItemLink>
                <Divider />
            </List>
        </div>
    );
}
