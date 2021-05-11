import { makeStyles } from '@material-ui/core'
import React from 'react'


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 80,
    },
}));

export default function Home() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h2>Home</h2>
            <p>Something beautiful will be put up here</p>
        </div>
    )
}
