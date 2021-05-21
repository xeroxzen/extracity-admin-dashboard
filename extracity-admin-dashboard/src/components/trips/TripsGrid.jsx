import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import firebase from '../../firebase.config'
import clsx from 'clsx';
import { Button, makeStyles } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const useStyles = makeStyles(theme => ({
    root: {
        height: 400,
        width: '100%',
        marginTop: 80,
    },
    button: {
        margin: 10,
    },
    filterBox: {
         margin: theme.spacing(1),
    },
    customButton: {
        margin: 10,
        fontSize: '18px'
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
    { field: "", headerName: "ACTION", width: 160, disableClickEventBubbling: true, renderCell: params => params.row.Button},
]

export default function TripsGrid() {
    const classes = useStyles();
    const [editShow, setEditShow] = React.useState(false);
    const [deleteShow, setDeleteShow] = React.useState(false);
    const [trips, setTrips] = React.useState([]);
    const [values, setValues] = React.useState({
        from: '',
        to: '',
        stops: []
    });
    const [deleteTrip, setDeleteTrip] = React.useState({});
    const [deleteID, setDeleteID] = React.useState({});

    const [editTrip, setEditTrip] = React.useState({});
    const [editID, setEditID] = React.useState({});

    const [cities, setCities] = React.useState([]);
    const [options, setOptions] = React.useState([]);

    const handleChange = (prop, value) => {
        setValues({ ...values, [prop]: value });
        fetchTrips(prop,value);
    }

    const handleDelete = (trip, id) => {
        setDeleteID(id);
        setDeleteTrip(trip);
        setDeleteShow(true);
    }

    const handleEdit = (trip, id) => {
        setEditID(id);
        setEditTrip(trip);
        setEditShow(true);
    }

    const handleOptions = selectedOptions => {
        handleChange('stops', selectedOptions);
    }

    const fetchTrips = async (prop, value) => {
        const db = firebase.firestore();
        let dataRef = db.collection('trips');
        let to = values.to;
        let from = values.from;
        let stops = values.stops;
        let arr = [];

        switch(prop){
            case 'to':
                to = value;
            break;
            case 'from':
                from = value;
            break;
            case 'stops':
                stops = value;
            break;
        }

        if (from !== '' && from !== undefined)dataRef = dataRef.where('from','==', cities[from]);
        if (to !== '' && to !== undefined)dataRef = dataRef.where('to','==', cities[to]);

        if (stops !== undefined && stops.length > 0){
            stops.forEach((e) => {
                dataRef = dataRef.where('stops.' + e.value + '.name', '==', e.value);
            });
        }

        const data = await dataRef.get();
        setTrips(data.docs.map(doc => {
            let trip = doc.data();

            if (cities.length === 0 && arr.indexOf(trip.from) === -1)arr.push(trip.from);
            if (cities.length === 0 && arr.indexOf(trip.to) === -1)arr.push(trip.to);
            if (cities.length === 0 && trip.stops !== undefined){
                (Array.from(new Map(Object.entries(trip.stops)).keys())).forEach((e) => {
                    if (arr.indexOf(e) === -1)arr.push(e);
                });
            }

            trip.Button = (<div>
                <Button
                variant="contained"
                color="primary"
                className={classes.customButton} color="red" onClick={() => handleEdit(trip,doc.id)}><EditIcon fontSize="inherit"/></Button>
                <Button
                variant="contained"
                color="primary"
                className={classes.customButton} onClick={() => handleDelete(trip,doc.id)}><DeleteForeverIcon fontSize="inherit"/></Button>
            </div>);

            return { ...trip, id: doc.id };
        }));

        if(cities.length === 0)setCities(arr);
        if(cities.length === 0)setOptions(arr.map((e) => ({value: e, label: e})));
    };

    React.useState(() => {
        fetchTrips();
    }, [])


    return (
        <div className={classes.root}>
            <h3 style={{ marginBottom: 20, }}>Trips</h3>
            <Button
                variant="contained"
                color="primary"
                href="/trips/add"
                className={classes.button}>Add trip</Button>
            <br />
            <Grid container className={classes.filterBox} spacing={2}>
                <Grid item>
                  <Grid container justify="left" spacing={1}>
                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                      <select
                        labelId="id"
                        value={values.from}
                        onChange={(e) => handleChange('from', e.target.value)}
                        required
                      >
                        <option value="">All</option>
                        {cities?.map((item, counter) => {
                          return <option value={counter}>{item}</option>;
                        })}
                      </select>
                      <FormHelperText id="standard-date-helper-text">From</FormHelperText>
                    </FormControl>
                   </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="left" spacing={1}>
                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                      <select
                        labelId="id"
                        value={values.to}
                        onChange={(e) => handleChange('to', e.target.value)}
                        required
                      >
                        <option value="">All</option>
                        {cities?.map((item, counter) => {
                          return <option value={counter}>{item}</option>;
                        })}
                      </select>
                      <FormHelperText id="standard-date-helper-text">To</FormHelperText>
                    </FormControl>
                   </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="left" spacing={1}>
                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                      <Select
                          closeMenuOnSelect={false}
                          isMulti
                          options={options}
                          onChange={handleOptions}
                          style={{width: "400px"}}
                          className="select-custom-class" 
                        />
                      <FormHelperText id="standard-date-helper-text">Stops</FormHelperText>
                    </FormControl>
                   </Grid>
                </Grid>
            </Grid>
            <DataGrid rows={trips} columns={columns} />
            <DeleteModal trip={deleteTrip} id={deleteID} show={deleteShow} onHide={() => setDeleteShow(false)}/>
            <EditModal trip={editTrip} id={editID} show={editShow} onHide={() => setEditShow(false)}/>
        </div>
    )
}
