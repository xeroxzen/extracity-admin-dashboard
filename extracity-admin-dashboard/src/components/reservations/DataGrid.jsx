import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import firebase from "../../firebase.config";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 400,
        width: '100%',
        marginTop: 80,
    },
    button: {
        marginBottom: '10px',
    }
}));

const headCells = [
    {
        field: "fullname",
        headerName: "FULL NAME",
        description: 'This column has a value',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName}  ${params.row.lastName}`,
    },
    { field: "PhoneNumber", headerName: "PHONE #", width: 130 },
    { field: "Trip", headerName: "TRIP", width: 170 },
    {
        field: "Date", headerName: "DATE", width: 160, valueGetter: params => `${params.row.Date.toDate()}`,
    }, //moment().startOf('day').fromNow(); 
    { field: "TravelTime", headerName: "TIME", width: 110 },
    // { field: "Email", headerName: "EMAIL", width: 130 },
    { field: "Amount", headerName: "AMOUNT", width: 110 },
    // {
    //     field: "PaymentMethod",
    //     headerName: "PAYMENT METHOD",
    //     width: 130
    // },
    // {
    //     field: "MobileMoneyAccount",
    //     headerName: "PAYMENT ACCOUNT",
    //     width: 130
    // },
    { field: "TicketID", headerName: "TICKET ID", width: 180 },
]

export default function DataTable() {
    const classes = useStyles();
    const [reservations, setReservations] = React.useState([]);

    React.useState(() => {
        const fetchReservations = async () => {
            const db = firebase.firestore();
            const data = db.collection('reservations');
            const query = await data.where('status', '==', 'paid').get();
            if (query.empty) {
                console.log('No matching documents.');
                return
            }

            query.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });

            setReservations(query.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchReservations();
    }, []);
    return (
        <div className={classes.root}>
            <h3 style={{ marginBottom: 20, }}>Ticket Reservation List</h3>
            <DataGrid rows={reservations} columns={headCells} />
        </div>
    );
}
