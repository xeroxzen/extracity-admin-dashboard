import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import firebase from '../../firebase.config'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        height: 400,
        width: '100%',
        marginTop: 80,
    },
    button: {
        marginBottom: 10,
    },
}))

const columns = [
    { field: 'trip', headerName: 'TRIP', width: 200, sortable: true, valueGetter: params => `${params.row.from} to ${params.row.to}` },
    { field: 'from', headerName: 'FROM', width: 130, sortable: true },
    { field: 'to', headerName: 'TO', width: 130, sortable: true },
    { field: "times", headerName: "TIMES", width: 160 },
    { field: "stops", headerName: "STOPS", width: 160, valueGetter: params => `${params.row.stops}` },
    { field: "date", headerName: "DATE", width: 160, valueGetter: params => `${params.row.date.toDate()}`, },
    // { field: "", headerName: "ACTION", width: 160, valueGetter: params => `Stops` },
]

export default function TripsGrid() {
    const classes = useStyles();
    const [trips, setTrips] = React.useState([]);

    React.useState(() => {
        const fetchTrips = async () => {
            const db = firebase.firestore();
            const data = await db.collection('trips').get()
            setTrips(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        };
        fetchTrips();
    }, [])

    return (
        <div className={classes.root}>
            <h3 style={{ marginBottom: 20, }}>Trips</h3>
            <Button
                variant="contained"
                color="primary"
                href="/fares/add"
                className={classes.button}>Add Fare</Button>
            <DataGrid rows={trips} columns={columns} />
        </div>
    )
}
