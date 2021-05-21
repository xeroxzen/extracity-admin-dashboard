import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
// import StatsChart from './StatsChart';
// import ActivityChart from './ActivityChart';
import Statistics from './Statistics';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 80,
    },
}));

export default function StatsData() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <h2 style={{ color: '#fff' }}>Statistics</h2>
            <Statistics />
        </div>
    )
}
