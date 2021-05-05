import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import firebase from "../../firebase.config";
import moment from 'moment'

// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 90,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (params) =>
//             `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
//     },
// ];

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

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];



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
