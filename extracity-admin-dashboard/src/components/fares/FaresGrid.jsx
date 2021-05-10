import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import firebase from '../../firebase.config'
// import moment from 'moment'
import { Button, makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
        height: 400,
        width: '100%',
    },
    button: {
        marginBottom: '10px',
    }
}));

const columns = [
    { field: 'from', headerName: 'FROM', width: 130, sortable: true },
    { field: 'to', headerName: 'TO', width: 130, sortable: true },
    { field: 'prices', headerName: 'PRICES', width: 130, sortable: true },
    { field: 'date', headerName: 'DATE', width: 130, sortable: true },


]
export default function FaresGrid() {
    const classes = useStyles();
    const [fares, setFares] = React.useState([]);

    React.useState(() => {
        const fetchFares = async () => {
            const db = firebase.firestore();
            const data = await db.collection('fares').get();
            setFares(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        };
        fetchFares();
    }, []);

    return (
        <div className={classes.root}>
            <h3 style={{ marginBottom: 20, }}>Fares</h3>
            <Button
                variant="contained"
                color="primary"
                href="/fares/add"
                className={classes.button}>Add Fare</Button>
            <DataGrid rows={fares} columns={columns} />
        </div>
    )
}
