import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import firebase from "../../firebase.config";
import moment from 'moment'

const headCells = [
    // { field: 'id', headerName: 'ID', width: 70 },
    // { field: 'firstName', headerName: 'First name', width: 130 },
    // { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: "fullname",
        headerName: "Full name",
        description: 'This column has a value',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
    { field: "PhoneNumber", headerName: "PHONE #", width: 130 },
    { field: "Trip", headerName: "TRIP", width: 130 },
    {
        field: moment(Date, "YYYY-MM-DD").format("LLL"), headerName: "DATE", width: 150
    },
    { field: "TravelTime", headerName: "TIME", width: 110 },
    { field: "Email", headerName: "EMAIL", width: 130 },
    { field: "Amount", headerName: "AMOUNT", width: 110 },
    {
        field: "PaymentMethod",
        headerName: "PAYMENT METHOD",
        width: 130
    },
    {
        field: "MobileMoneyAccount",
        headerName: "PAYMENT ACCOUNT",
        width: 130
    },
    { field: "TicketID", headerName: "TICKET ID", width: 130 },
]

export default function DataTable() {
    const [reservations, setReservations] = React.useState([]);

    React.useState(() => {
        const fetchReservations = async () => {
            const db = firebase.firestore();
            const data = await db.collection('reservations').get();
            setReservations(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchReservations();
    }, []);
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={reservations} columns={headCells} pageSize={5} checkboxSelection />
        </div>
    );
}
