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
    grid: {
        backgroundColor: '#008394',
    }
}))

function displayStops(map) {
    if (map === undefined || map === null) return [];

    var newMap = new Map(Object.entries(map));
    var arr = []; // initially new Array()

    newMap.forEach((v) => {
        arr.push(v.name);
    });

    return arr
}

// let link = `/trips/${tripRef.id}/stops`;

const columns = [
    { field: 'trip', headerName: 'TRIP', width: 200, sortable: true, valueGetter: params => `${params.row.from} to ${params.row.to}` },
    { field: 'from', headerName: 'FROM', width: 130, sortable: true },
    { field: 'to', headerName: 'TO', width: 130, sortable: true },
    { field: "times", headerName: "TIMES", width: 160 },
    { field: "stops", headerName: "STOPS", width: 200, valueGetter: params => `${displayStops(params.row.stops)}` },
    { field: "date", headerName: "DATE", width: 160, valueGetter: params => `${params.row.date.toDate()}`, },
    { field: "", headerName: "ACTION", width: 160, valueGetter: params => `${params.row.Button}` },
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
            <h3 style={{ marginBottom: 20, color: '#fff' }}>Trips</h3>
            <Button
                variant="contained"
                color="primary"
                href="/fares/add"
                className={classes.button}>Add Fare</Button>
            <DataGrid className={classes.grid} rows={trips} columns={columns} />
        </div>
    )
}
