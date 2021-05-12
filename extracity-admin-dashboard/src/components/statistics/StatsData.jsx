import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import StatsPieChart from './StatsPieChart';

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
            <StatsPieChart />
        </div>
    )
}
