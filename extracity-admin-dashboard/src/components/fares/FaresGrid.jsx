import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import firebase from '../../firebase.config'
import clsx from 'clsx';
// import moment from 'moment'
import { Button, makeStyles } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';


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
  },
  grid: {
    backgroundColor: '#008394',
  }
}));

const columns = [
  { field: 'from', headerName: 'FROM', width: 130, sortable: true },
  { field: 'to', headerName: 'TO', width: 130, sortable: true },
  { field: 'prices', headerName: 'PRICES', width: 200, sortable: true, valueGetter: params => `$${params.row.prices.USD}, ZAR${params.row.prices.ZAR}, ZWL$${params.row.prices.ZWL}` },
  { field: "date", headerName: "DATE", width: 160, valueGetter: params => `${params.row.date.toDate()}`, },


]
export default function FaresGrid() {
  const classes = useStyles();
  const [fares, setFares] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [values, setValues] = React.useState({
    from: '',
    to: ''
  });

  const handleChange = (prop, value) => {
    setValues({ ...values, [prop]: value });
    fetchFares(prop, value);
  }

  const fetchFares = async (prop, value) => {
    const db = firebase.firestore();
    let dataRef = db.collection('fares');
    let arr = [];

    let from = values.from;
    let to = values.to;

    if (prop === 'from') from = value;
    else if (prop === 'to') to = value;

    if ((from !== '' && from !== undefined) || (to !== '' && to !== undefined)) {
      if ((from !== '' && from !== undefined) && (to !== '' && to !== undefined)) {
        dataRef = dataRef.where("possibleTrips", 'array-contains', `${cities[from]}-${cities[to]}`);
      }
      else {
        if (from === '' || from === undefined) {
          dataRef = dataRef.where('cities', 'array-contains', cities[to]);
        }
        else {
          dataRef = dataRef.where('cities', 'array-contains', cities[from]);
        }
      }
    }

    const data = await dataRef.get();

    setFares(data.docs.map((doc) => {
      let fare = doc.data();

      if (cities.length === 0 && arr.indexOf(fare.from) === -1) arr.push(fare.from);
      if (cities.length === 0 && arr.indexOf(fare.to) === -1) arr.push(fare.to);

      return { ...fare, id: doc.id }
    }));

    if (cities.length === 0) setCities(arr);
  };

  React.useState(() => {
    fetchFares();
  }, []);


  return (
    <div className={classes.root}>
      <h3 style={{ marginBottom: 20, color: '#fff' }}>Fares</h3>
      <Button
        variant="contained"
        color="primary"
        href="/fares/add"
        className={classes.button}>Add Fare</Button>
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
      </Grid>
      <DataGrid className={classes.grid} rows={fares} columns={columns} />
    </div>
  )
}
