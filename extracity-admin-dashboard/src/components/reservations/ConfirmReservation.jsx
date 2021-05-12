import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
var moment = require("moment");

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    table: {
      width: '100%',
    },
    pricesContainer: {
      padding: theme.spacing(1),
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    fullWidth: {
      width: '100%',
      margin: theme.spacing(0.5),
    },
}));


export default function SearchTripForm(props) {
  const classes = useStyles();

  let submitButton = null;

  if (props.values.trip!==null && props.values.time!==null){
      submitButton = 
    (<Modal.Footer>
      <p><b>Note:</b> Please click the save button after you have confirmed the information displayed above.</p>
        <Button
            onClick={props.handleSubmit}
            variant="contained"
            color="primary"
            className={classes.button}>
              Save
        </Button>
    </Modal.Footer>);
  }
  else{
    
  }

  let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: props.reservation.Currency,
      });
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
      class="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <div className={classes.root}>
            <Grid container className={classes.root} spacing={2}>
              <Grid item lg={6}>
                <Grid container justify="left" spacing={1}>
                  <h3>Ticket information</h3>
                  <table className={classes.fullWidth}>
                    <tr>
                      <td><b>Route:</b></td>
                    </tr>
                    <tr>
                      <td>{props.reservation.Trip}</td>
                    </tr>
                    <tr>
                      <td><b>Travelling from:</b></td>
                    </tr>
                    <tr>
                      <td>{props.reservation.TravellingFrom}</td>
                    </tr>
                    <tr>
                      <td><b>Travelling to:</b></td>
                    </tr>
                    <tr>
                      <td>{props.reservation.TravellingTo}</td>
                    </tr>
                    <tr>
                      <td><b>Date:</b></td>
                    </tr>
                    <tr>
                      <td>{moment(props.reservation.Date.toDate()).format('LL')}</td>
                    </tr>
                    <tr>
                      <td><b>Time (Leaves Bulawayo at):</b></td>
                    </tr>
                    <tr>
                      <td>{props.reservation.TravelTime}</td>
                    </tr>
                    <tr>
                      <td><b>Amount:</b></td>
                    </tr>
                    <tr>
                      <td>{props.reservation.Currency}{formatter.format(props.reservation.Amount).replace(props.reservation.Currency,"").replace("$","")}</td>
                    </tr>
                  </table>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container justify="left" spacing={1}>
                  <h3>Personal information</h3>
                  <table className={classes.fullWidth}>
                    <tr>
                      <td><b>First name:</b></td>
                    </tr>
                    <tr>
                      <td>{props.values.firstname}</td>
                    </tr>
                    <tr>
                      <td><b>Last name:</b></td>
                    </tr>
                    <tr>
                      <td>{props.values.lastname}</td>
                    </tr>
                    <tr>
                      <td><b>Email:</b></td>
                    </tr>
                    <tr>
                      <td>{props.values.email}</td>
                    </tr>
                    <tr>
                      <td><b>Phone number:</b></td>
                    </tr>
                    <tr>
                      <td>{props.values.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td><b>Paid using:</b></td>
                    </tr>
                    <tr>
                      <td>{props.values.paymentMethod}</td>
                    </tr>
                  </table>
                </Grid>
              </Grid>
            </Grid>
        </div>
      </Modal.Body>
      {
       submitButton
      }
    </Modal>
  );
}
