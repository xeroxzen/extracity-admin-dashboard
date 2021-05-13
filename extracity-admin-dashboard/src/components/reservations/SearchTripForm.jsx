import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import DatePicker from 'react-date-picker';
import firebase from "../../firebase.config";
import { useHistory } from 'react-router-dom';
var moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch', //25ch
    // fontSize: '11',
  },
  table: {
    width: '100%',
  },
  pricesContainer: {
    padding: theme.spacing(1),
  }
}));


export default function SearchTripForm(props) {
  const db = firebase.firestore();
  const classes = useStyles();
  const [fare, setFare] = React.useState(null);
  const [seats, setSeats] = React.useState({
    seats: null, error: ""
  });
  const history = useHistory();
  const [date, setDate] = React.useState(new Date());
  const [values, setValues] = React.useState({
    time: null,
    trip: null,
    route: null,
    paymentReference: null,
    currency: null
  });
  const [routes, setRoutes] = React.useState([]);

  React.useEffect(() => {
    const fetchRoutes = async () => {
      const data = await db.collection("trips").get();
      setRoutes(data.docs.map((doc) => (doc.data())));
    };
    fetchRoutes();
    // eslint-disable-next-line
  }, []);

  const handleChange = (prop) => (event) => {
    if (prop === "trip") {
      //check if this trip has a fare
      let str = routes[values.route]?.possibleTrips[event.target.value];

      if (str !== undefined) {
        db
          .collection("fares")
          .where("possibleTrips", "array-contains", str)
          .limit(1)
          .get().then(
            (refs) => {
              if (refs.size === 0) {
                setFare(null);
                setValues({ ...values, [prop]: null });
                alert("Sorry the trip you selected does not have a fare associated with it, please select another one!");
              }
              else {
                setValues({ ...values, [prop]: event.target.value });
                setFare(refs.docs[0].data());
              }
            }
          );
      }
      else {
        setFare(null);
        setValues({ ...values, [prop]: null });
        alert("Sorry the trip you selected does not have a fare associated with it, please select another one!");
      }
    }
    else setValues({ ...values, [prop]: event.target.value });

    if (prop === "time") seatsAvailable(event.target.value);
  };

  const handleReserve = () => {
    if (values.currency === null || values.trip === null || values.time === null || date === '' || values.route === null || fare === null || values.paymentReference === null) alert("Please fill in all input fields!");
    else {
      //now reserve
      const id = uuidv4();
      var ticketId = ticketID();
      let arr = routes[values.route].possibleTrips[values.trip].split('-');
      let momentTravelDate = moment(date, "YYYY-MM-DD HH:mm:ss").toDate();
      const timestamp = new Date();
      var seatNo = generateRandomSeatNumber();
      var refNo = generateRandomReferenceNumber();
      let platform = 'Walk-in clients'

      db
        .collection("reservations")
        .add({
          ID: id,
          paymentReference: values.paymentReference,
          TicketID: ticketId,
          Currency: values.currency,
          Amount: fare.prices[values.currency],
          status: "paid",
          Trip: routes[values.route].name,
          TravellingFrom: arr[0],
          TravellingTo: arr[1],
          BookingTime: timestamp,
          TravelTime: routes[values.route].times[values.time],
          Date: momentTravelDate,
          platform: platform,
          seatNo: seatNo,
          refNo: refNo,
        })
        .then((ref) => history.push("/reservations/" + ref.id + "/add")
        );
    }
  }

  const seatsAvailable = (time) => {
    let momentTravelDate = moment(date, "YYYY-MM-DD HH:mm:ss").toDate();
    let trip = routes[values.route];

    db
      .collection("reservations")
      .where("Trip", "==", trip.name)
      .where("status", "==", "paid")
      .where("Date", "==", momentTravelDate)
      .where("TravelTime", "==", trip.times[time])
      .get().then((refs) => {
        var paidCount = refs.size;

        let d = new Date();
        d.setMinutes(d.getMinutes() - 5);

        db
          .collection("reservations")
          .where("Trip", "==", routes[values.route].name)
          .where("status", "==", "pending")
          .where("Date", "==", momentTravelDate)
          .where("TravelTime", "==", routes[values.route].times[time])
          .where("BookingTime", ">=", d)
          .get().then((refs) => {
            let pendingCount = refs.size;

            let num = trip.seats - paidCount - pendingCount;
            let error = "";

            if (num < 1) {
              if (trip.seats === paidCount) {
                error = "There are no more seats available for the trip you selected!"
              }
              else {
                error = "There are no seats available at the moment. Please check after 5 or so minutes";
              }
            }

            setSeats({ seats: num, error: error });
          });
      });

  }

  const displayFares = () => {
    const getPrice = (currency, amount) => {
      if (amount === undefined) return (<p>--</p>);

      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      });

      return formatter.format(amount).replace(currency, "").replace("$", "");
    }

    const disp = () => {
      if (fare.prices === undefined) return [];
      let newMap = new Map(Object.entries(fare.prices));
      let arr = [];

      newMap.forEach((v, k) => {
        arr.push((<tr><th>{k}</th><td align="right">{getPrice(k, v)}</td></tr>));
      });
      return arr;
    }

    if (fare !== null) {
      console.log(fare);
      var arr = disp();
      return (
        <div className={clsx(classes.pricesContainer)}>
          <h1>Prices</h1>
          <table className={clsx(classes.table)}>
            <tbody>
              {
                arr.map((item) => item)
              }
            </tbody>
          </table>
        </div>
      );
    }
  }

  let submitButton = null;
  let selectedTripInfo = null;

  if (values.route !== null) {
    if (values.trip !== null && values.time !== null && date !== '' && fare !== null) {
      if (seats['seats'] > 0) {
        submitButton = (<Modal.Footer>
          <p><b>Note:</b> Only click this button after the customer has made the necessary payments and please make sure the information entered is correct.</p>
          <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
            <select
              labelId="id"
              value={values.currency}
              onChange={handleChange('currency')}
              required
            >
              <option value="">Select ...</option>
              {(Array.from((new Map(Object.entries(fare?.prices ?? {}))).keys())).map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
            <FormHelperText id="standard-currency-helper-text">Currency</FormHelperText>
          </FormControl>
          <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
            <Input
              id="standard-adornment-payment-reference"
              placeholder="Payment reference"
              value={values.pickUp}
              required
              onChange={handleChange('paymentReference')}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              aria-describedby="standard-payment-reference-helper-text"
              inputProps={{
                'aria-label': 'Payment Reference',
              }}
            >
            </Input>
            <FormHelperText id="standard-payment-reference-helper-text">Payment Reference</FormHelperText>
          </FormControl>
          <br />
          <Button
            onClick={handleReserve}
            variant="contained"
            color="primary"
            className={classes.button}>
            Reserve
            </Button>
        </Modal.Footer>);
      }
      else {
        if (seats['error'] !== '') alert(seats['error']);
      }
    }

    selectedTripInfo = (
      <div>
        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
          <select
            labelId="id"
            value={values.trip}
            onChange={handleChange('trip')}
            required
          >
            <option value="">Select ...</option>
            {routes[values.route]?.possibleTrips?.map((item, key) => {
              return <option value={key}>{item.replace('-', " to ")}</option>;
            })}
          </select>
          <FormHelperText id="standard-date-helper-text">Trips</FormHelperText>
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
          <select
            labelId="id"
            value={values.time}
            onChange={handleChange('time')}
            required
          >
            <option value="">Select ...</option>
            {routes[values.route]?.times?.map((item, counter) => {
              return <option value={counter}>{item}</option>;
            })}
          </select>
          <FormHelperText id="standard-date-helper-text">Time (Bus leaves {routes[values.route]?.from} at )</FormHelperText>
        </FormControl>
      </div>
    );
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      class="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a reservation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={classes.root}>
          <div>
            <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
              <select
                labelId="id"
                value={values.route}
                onChange={handleChange('route')}
                required
              >
                <option value="">Select ...</option>
                {routes.map((item, counter) => {
                  return <option value={counter}>{item.name}</option>;
                })}
              </select>
              <FormHelperText id="standard-date-helper-text">Route</FormHelperText>
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
              <DatePicker
                onChange={setDate}
                value={date}
              />
              <FormHelperText id="standard-date-helper-text">Date of Travel</FormHelperText>
            </FormControl>
          </div>
          {
            selectedTripInfo
          }
          {
            displayFares()
          }
        </div>
      </Modal.Body>
      {
        submitButton
      }
    </Modal>
  );
}

function ticketID() {
  //format: ExC-yymmdd-count

  const d = new Date();
  var dateString = formatDate(d);
  var num = (Math.floor(Math.random() * 1000) + 1).toString();
  num.length === 1 && (num = "0" + num);
  num.length === 2 && (num = "0" + num);

  return `ExC-${dateString}-${num}`;
}

//format date
function formatDate(data) {
  let str = "";
  var y = data.getFullYear().toString();
  var m = (data.getMonth() + 1).toString();
  var d = data.getDate().toString();

  d.length === 1 && (d = "0" + d);
  m.length === 1 && (m = "0" + m);

  str = y + m + d;
  return str;
}

function generateRandomReferenceNumber() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
}

function generateRandomSeatNumber() {
  //temporary fix
  var letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  var seat_letter = letters[Math.floor(Math.random() * 25).toString()];

  var seat_number = (Math.floor(Math.random() * 100) + 1).toString();
  seat_number.length === 1 && (seat_number = "0" + seat_number);

  return seat_letter + seat_number;
}