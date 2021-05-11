import React, { useState } from "react";
import MultipleTimeSelect from './MultipleTimeSelect';
import { useHistory } from 'react-router-dom';
import firebase from "../../firebase.config";
import { makeStyles } from "@material-ui/core/styles";
const { uuid } = require("uuidv4");

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 80,
  },
}));

export default function TripCreateForm(props) {
  const classes = useStyles()
  const history = useHistory();
  const db = firebase.firestore();
  const [name, setName] = useState();
  const [to, setTo] = useState();
  const [from, setFrom] = useState();
  const [times, setTimes] = useState([]);
  const [seats, setSeats] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === undefined || name === "" || seats === undefined || seats === "" || to === undefined || to === "" || from === undefined || from === "" || times === undefined || times.length === 0) alert("Please fill in all input fields!");
    else {
      let id = uuid();

      //save
      db
        .collection("trips")
        .add({
          id: id,
          name: name,
          to: to,
          from: from,
          seats: parseInt(seats),
          times: times.map((t) => { console.log(t); return t.value }),
          date: new Date(),
        })
        .then(
          (ref) =>
            // fetching free slots
            history.push("/trips/" + ref.id + "/stops")
        )
        .catch(
          (e) => alert("An error occurred!")
        );
    }
  }

  return (
    <form onSubmit={e => { handleSubmit(e) }} className={classes.root}>
      <br />
      <br />
      <label>Trip name</label>
      <br />
      <input
        name='name'
        type='text'
        value={name}
        required
        onChange={e => setName(e.target.value)}
      />
      <br />
      <br />
      <label>From</label>
      <br />
      <input
        name='from'
        type='text'
        value={from}
        required
        onChange={e => setFrom(e.target.value)}
      />
      <br />
      <br />
      <label>To</label>
      <br />
      <input
        name='to'
        type='text'
        value={to}
        required
        onChange={e => setTo(e.target.value)}
      />
      <br />
      <br />
      <label>Number of seats</label>
      <br />
      <input
        name='seats'
        type='number'
        value={seats}
        required
        onChange={e => setSeats(e.target.value)}
      />
      <br />
      <br />
      <label>Departure times</label>
      <br />
      <MultipleTimeSelect setTimes={setTimes} times={times} />
      <br />
      <br />
      <input
        className='submitButton'
        type='submit'
        value='Save'
      />
    </form>
  )
}