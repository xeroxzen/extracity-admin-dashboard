import { makeStyles } from '@material-ui/core'
import React from 'react'
import DataTable from '../reservations/DataGrid';

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
            <DataTable />
        </div>
    )
}
