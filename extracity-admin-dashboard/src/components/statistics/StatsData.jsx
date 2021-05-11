import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 80,
    },
}));

export default function StatsData() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <h2>Statistics</h2>
            <p>Some beautiful statistics will be put up here.</p>
        </div>
    )
}
