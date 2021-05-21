import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
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
  fullWidth: {
    width: '100%',
    margin: theme.spacing(0.5),
  },
}));


export default function DeleteModal(props) {
  const db = firebase.firestore();
  const classes = useStyles();
  const history = useHistory();
  const handleDelete = () => {
    db.collection('trips').doc(props.id).delete().then((e) =>{
      alert("Trip deleted successfully!");
      return history.push("/trips-grid");
    }).catch((e) => alert("An error occurred!"));
  }

  let title, display, submitButton;
  title = "Are you sure you want to delete this trip?";
  display = (<div>
              <h3>Trip information</h3>
              <table className={classes.fullWidth}>
                <tr>
                  <td><b>Name:</b></td>
                </tr>
                <tr>
                  <td>{props?.trip?.name}</td>
                </tr>
                <tr>
                  <td><b>From:</b></td>
                </tr>
                <tr>
                  <td>{props?.trip?.from}</td>
                </tr>
                <tr>
                  <td><b>To:</b></td>
                </tr>
                <tr>
                  <td>{props?.trip?.to}</td>
                </tr>
                <tr>
                  <td><b>Date created:</b></td>
                </tr>
                <tr>
                  <td>{moment(props?.trip?.date?.toDate()).format('LLL')}</td>
                </tr>
                <tr>
                  <td><b>Seats:</b></td>
                </tr>
                <tr>
                  <td>{props?.trip?.seats}</td>
                </tr>
                <tr>
                  <td><b>Stops:</b></td>
                </tr>
                <tr>
                  <td>{displayStops(props?.trip?.stops)}</td>
                </tr>
                <tr>
                  <td><b>Times:</b></td>
                </tr>
                <tr>
                  <td>{props?.trip?.times?.join(', ')}</td>
                </tr>
              </table></div>);
  submitButton = (<Modal.Footer>
      <p><b>Note:</b> This action cannot be reversed!</p><br />
      <Button
        onClick={handleDelete}
        variant="contained"
        color="primary"
        className={classes.button}>
        Delete
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

function displayStops(map) {
    if (map === undefined || map === null) return [];

    var newMap = new Map(Object.entries(map));
    var arr = []; // initially new Array()

    newMap.forEach((v) => {
        arr.push(v.name);
    });

    return arr
}