import React from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "20px",
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <AppBar className={classes.root} position="static" color="primary">
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="body1" color="inherit">
                        First Source Technology {new Date().getFullYear()}
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export { Footer };