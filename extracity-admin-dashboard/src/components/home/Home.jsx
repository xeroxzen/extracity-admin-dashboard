import { makeStyles } from '@material-ui/core'
import React from 'react'
import StatsRotated from './StatsRotated';
import StatsTooltip from './StatsTooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 80,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* <h2>Home</h2> */}
            <h2 style={{ fontFamily: 'Roboto' }}>Infographic Data</h2>
            <StatsRotated />
            <hr />
            <StatsTooltip />
        </div>
    )
}
