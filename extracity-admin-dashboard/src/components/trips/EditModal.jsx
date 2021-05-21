import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import firebase from "../../firebase.config";
import { useHistory } from 'react-router-dom';
import MultipleTimeSelect from './MultipleTimeSelect';
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
  fullWidth: {
    width: '100%',
    margin: theme.spacing(0.5),
  },
}));


export default function EditModal(props) {
  const db = firebase.firestore();
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = React.useState({
    name: '',
    to: '',
    from: '',
    times: [],
    seats: 0
  });

  const handleChange = (prop, value) => {
    props.trip.[prop] = value;
    setValues({ ...values, [prop]: value });
  }

  const handleTimes = value => {
    handleChange('times', value);
  }

  const handleSubmit = () => {
    db.collection('trips').doc(props.id).update({
      name: props.trip.name,
          to: props.trip.to,
          from: props.trip.from,
          seats: parseInt(props.trip.seats),
          times: props.trip?.times?.map((t) => { console.log(t); return t.value }),
    }).then((e) =>{
      alert("Trip successfully updated!");
      return history.push("/trips-grid");
    }).catch((e) => alert("An error occurred!"));
  }

  let dname = (values.name === "" || values.name === undefined || values.name !== props.trip.name)? props.trip.name : values.name;
  let dto = (values.to === "" || values.to === undefined || values.to !== props.trip.to)? props.trip.to : values.to;
  let dfrom = (values.from === "" || values.from === undefined || values.from !== props.trip.from)? props.trip.from : values.from;
  let dtimes = (values.times === undefined || values.times.length === 0 || values.times !== props.trip.times)? props?.trip?.times?.map((e) => ({ label: e, value: e })) : values.times;
  let dseats = (values.seats === 0 || values.seats === undefined || values.seats !== props.trip.seats)? props.trip.seats : values.seats;

  let title, display, submitButton;
  title = "Update trip";
  display = (<div>
      <br />
      <br />
      <label>Trip name</label>
      <br />
      <input
        name='name'
        type='text'
        value={dname}
        required
        onChange={e => handleChange('name',e.target.value)}
      />
      <br />
      <br />
      <label>From</label>
      <br />
      <input
        name='from'
        type='text'
        value={dfrom}
        required
        onChange={e => handleChange('from',e.target.value)}
      />
      <br />
      <br />
      <label>To</label>
      <br />
      <input
        name='to'
        type='text'
        value={dto}
        required
        onChange={e => handleChange('to',e.target.value)}
      />
      <br />
      <br />
      <label>Number of seats</label>
      <br />
      <input
        name='seats'
        type='number'
        value={dseats}
        required
        onChange={e => handleChange('seats',e.target.value)}
      />
      <br />
      <br />
      <label>Departure times</label>
      <MultipleTimeSelect setTimes={handleTimes} times={dtimes} />
    </div>);

  submitButton = (<Modal.Footer>
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        className={classes.button}>
        Update
      </Button>
    </Modal.Footer>);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      class="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={classes.root}>
          { display }
        </div>
      </Modal.Body>
      { submitButton }
    </Modal>
  );
}
