import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 80,
    },
}));

export default function PaymentsData() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h2>Payments</h2>
            <p>Some payments data is coming here...</p>
        </div>
    )
}
