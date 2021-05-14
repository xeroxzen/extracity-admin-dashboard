import React from 'react';
import clsx from 'clsx';
import { DataGrid } from '@material-ui/data-grid';
import firebase from "../../firebase.config";
import { makeStyles } from "@material-ui/core/styles";

// import moment from 'moment'
import { Button } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import DatePicker from 'react-date-picker';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
var moment = require("moment");

const useStyles = makeStyles((theme) => ({
    root: {
        height: 400,
        width: '100%',
        marginTop: 80,
    },
    button: {
        marginBottom: '10px',
    },
    filterBox: {
         margin: theme.spacing(1),
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
    { field: "Amount", headerName: "AMOUNT", width: 110, valueGetter: params => `${params.row.Currency} ${params.row.Amount}` },
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
    const [routes, setRoutes] = React.useState([]);
    const [values, setValues] = React.useState({
        route: 0,
        trip: 0,
        time: 0,
        from: '',
        to: '',
        search: '',
    });
    const db = firebase.firestore();

    const handleChange = (prop,value) => {
        setValues({ ...values, [prop]: value });
        fetchReservations(null,prop,value);
    }

    const handleTo = (value) => {
        handleChange("to", value);
    }
    const handleFrom = (value) => {
        handleChange("from", value);
    }

    React.useState(() => {
        const fetchRoutes = async () => {
            const data = await db.collection("trips").get();
            let rts = data.docs.map((doc) => (doc.data()));
            setRoutes(rts);
            fetchReservations(rts);
        };

        fetchRoutes();
    }, []);

    const fetchReservations = async (r = null, property = null, value = null) => {
        let rts;
        if (r===null)rts = routes;
        else rts = r;


        let from = values.from;
        let to = values.to;
        let route = values.route;
        let trip = values.trip;
        let time = values.time;
        let search = values.search;

        switch(property){
            case 'to':
                to = value;
                break;
            case 'from':
                from = value;
                break;
            case 'route':
                route = value;
                break;
            case 'trip':
                trip = value;
                break;
            case 'time':
                time = value;
            case 'search':
                search = value;
        }

        const data = db.collection('reservations');
        let queryRef = data.where('status', '==', 'paid');

        if (route !== '' && rts[route] !== undefined){
            queryRef = queryRef.where("Trip","==",rts[route]?.name);
            if (trip !== '' && rts[route].possibleTrips[trip] !== undefined){
                let arr = rts[route].possibleTrips[trip].split('-');
                queryRef = queryRef
                                .where("TravellingFrom","==",arr[0])
                                .where("TravellingTo","==",arr[1]);
            }

            if (time !== '' && rts[route].times[time] !== undefined)queryRef = queryRef.where("TravelTime","==",rts[route]?.times[time]);
        }
        console.log(from,to);
        if (from !== '' && from !== null && from !== undefined && from === to){
            console.log('heer');
            let min = moment(from, "YYYY-MM-DD").toDate();
            min.setDays(min.getDays() - 1);
            let max = moment(from, "YYYY-MM-DD").toDate();
            max.setDays(max.getDays() + 1);

            queryRef = queryRef.where("Date", ">", min).where("Date","<",max);
        }
        else{
            if (from !== '' && from !== null && from !== undefined)queryRef = queryRef.where("Date", ">=", moment(from, "YYYY-MM-DD").toDate());
            if (to !== '' && to !== null && to !== undefined)queryRef = queryRef.where("Date", "<=", moment(to, "YYYY-MM-DD").toDate());
        }
        const query = await queryRef.get();
        console.log(query.size);
        if (query.empty) {
            console.log('No matching documents.');
            setReservations([]);
            return;
        }

        setReservations(query.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    return (
        <div className={classes.root}>
            <h3 style={{ marginBottom: 20, }}>Ticket Reservation List</h3> <Button
                variant="contained"
                color="primary"
                href="/reservations/add-reservation"
                className={classes.button}>Add Reservation</Button>
            <br />
             <Grid container className={classes.filterBox} spacing={2}>
                <Grid item>
                  <Grid container justify="left" spacing={1}>
                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                      <select
                        labelId="id"
                        value={values.route}
                        onChange={(e) => handleChange('route', e.target.value)}
                        required
                      >
                        <option value="">All</option>
                        {routes?.map((item, counter) => {
                          return <option value={counter}>{item.name}</option>;
                        })}
                      </select>
                      <FormHelperText id="standard-date-helper-text">Route</FormHelperText>
                    </FormControl>
                   </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="left" spacing={1}>
                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                      <select
                        labelId="id"
                        value={values.trip}
                        onChange={(e) => handleChange('trip', e.target.value)}
                        required
                      >
                        <option value="">All</option>
                        {routes[values.route]?.possibleTrips?.map((item, key) => {
                          return <option value={key}>{item.replace('-', " to ")}</option>;
                        })}
                      </select>
                      <FormHelperText id="standard-date-helper-text">Trip</FormHelperText>
                    </FormControl>
                   </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="left" spacing={1}>
                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                      <select
                        labelId="id"
                        value={values.time}
                        onChange={(e) => handleChange('time', e.target.value)}
                        required
                      >
                        <option value="">All</option>
                        {routes[values.route]?.times?.map((item, counter) => {
                          return <option value={counter}>{item}</option>;
                        })}
                      </select>
                      <FormHelperText id="standard-date-helper-text">Time</FormHelperText>
                    </FormControl>
                   </Grid>
                </Grid>
                <Grid item>
                   <Grid container justify="left" spacing={1}>
                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                          <DatePicker
                            onChange={handleFrom}
                            value={values.from}
                          />
                          <FormHelperText id="standard-date-helper-text">From</FormHelperText>
                        </FormControl>
                   </Grid>
                </Grid>
                <Grid item>
                   <Grid container justify="left" spacing={1}>
                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                          <DatePicker
                            onChange={handleTo}
                            value={values.to}
                          />
                          <FormHelperText id="standard-date-helper-text">To</FormHelperText>
                        </FormControl>
                   </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify="left" spacing={1}>
                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                            <Input
                              id="standard-adornment-search"
                              placeholder="Search..."
                              value={values.search}
                              required
                              onChange={(e) => handleChange('search', e.target.value)}
                              endAdornment={<InputAdornment position="end"></InputAdornment>}
                              aria-describedby="standard-payment-reference-helper-text"
                              inputProps={{
                                'aria-label': 'Search',
                              }}
                            >
                            </Input>
                            <FormHelperText id="standard-search-helper-text">Search</FormHelperText>
                          </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <DataGrid rows={reservations} columns={headCells} />
        </div>
    );
}
