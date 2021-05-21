import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Button, Card } from '@material-ui/core';
import firebase from "../../firebase.config";
import ConfirmReservation from './ConfirmReservation';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 80,
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
    card: {
        marginTop: 80,
    },
}));

export default function ReservationAdd() {
    const classes = useStyles();
    const history = useHistory();
    const db = firebase.firestore();
    const { id } = useParams();
    const [reservation, setReservation] = React.useState(null);
    const [modalShow, setModalShow] = React.useState(false);
    // eslint-disable-next-line
    const [values, setValues] = React.useState({
        email: null,
        paymentMethod: null,
        phoneNumber: null,
        firstname: null,
        lastname: null,
    });

    React.useEffect(() => {
        const fetchData = () => {
            db.collection("reservations").doc(id).get().then((doc) => {
                if (doc.exists) {
                    setReservation(doc.data());
                }
            }
            );
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    const handleSubmit = () => {
        if (values.firstname === null || values.lastname === null || values.paymentMethod === null || values.phoneNumber === null || values.email === null) {
            alert('Please fill in all input fields.')
        }
        else {

            // let indexes = Array.from(new Map(Object.entries(values)).values());
            // indexes = [...indexes.concat(Array.from(new Map(Object.entries(reservation)).values()))];

            db
                .collection("reservations")
                .doc(id)
                .update({
                    firstName: values.firstname,
                    lastName: values.lastname,
                    fullname: `${values.firstname} ${values.lastname}`,
                    Email: values.email,
                    PhoneNumber: values.phoneNumber,
                    PaymentMethod: values.paymentMethod,
                    //indexes: indexes.join(" ")
                })
                .then(ref => history.push("/downloads/" + id + "/" + encodeURIComponent(reservation.TicketID))
                ).catch(
                    e => alert('An error occurred!')
                );
        }

    }

    if (reservation !== null) {
        return (
            <Card className={classes.card}>
                <h3 style={{ padding: 20 }}>New Reservation</h3>
                <form className={classes.root} >
                    <div>

                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                            <Input
                                id="standard-adornment-first-name"
                                // placeholder="Andile"
                                required
                                value={values.firstname}
                                onChange={handleChange('firstname')}
                                endAdornment={<InputAdornment position="end"></InputAdornment>}
                                aria-describedby="standard-first-name-helper-text"
                                inputProps={{
                                    'aria-label': 'First name',
                                }}
                            />
                            <FormHelperText id="standard-first-name-helper-text"><b>First Name</b></FormHelperText>
                        </FormControl>

                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                            <Input
                                id="standard-adornment-last-name"

                                value={values.lastname}
                                onChange={handleChange('lastname')}
                                required

                                aria-describedby="standard-last-name-helper-text"
                                inputProps={{
                                    'aria-label': 'Last name',
                                }}
                            />
                            <FormHelperText id="standard-last-name-helper-text"><b>Last Name</b></FormHelperText>
                        </FormControl>

                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                            <Input
                                id="standard-adornment-phone-number"

                                value={values.phoneNumber}
                                required
                                onChange={handleChange('phoneNumber')}
                                endAdornment={<InputAdornment position="end"></InputAdornment>}
                                aria-describedby="standard-phone-number-helper-text"
                                inputProps={{
                                    'aria-label': 'Phone Number',
                                }}
                            />
                            <FormHelperText id="standard-phone-number-helper-text"><b>Phone Number</b></FormHelperText>
                        </FormControl>

                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                            <Input
                                id="standard-adornment-email"
                                // placeholder="andile.m@outlook.com"
                                value={values.email}
                                required
                                onChange={handleChange('email')}
                                endAdornment={<InputAdornment position="end"></InputAdornment>}
                                aria-describedby="standard-email-helper-text"
                                inputProps={{
                                    'aria-label': 'Email',
                                }}
                            />
                            <FormHelperText id="standard-email-helper-text"><b>Email Address</b></FormHelperText>
                        </FormControl>
                    </div>
                    <div>
                        <br />
                        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                            <select
                                labelId="id"
                                value={values.paymentMethod}
                                onChange={handleChange('paymentMethod')}
                                required
                            >
                                <option value="">Select ...</option>
                                <option>Swipe</option>
                                <option>Ecocash</option>
                                <option>One Money</option>
                                <option>Telecash</option>
                                <option>Cash</option>
                                <option>Other</option>
                            </select>
                            <FormHelperText id="standard-payment-method-helper-text"><b>Payment Method</b></FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <br />
                        <Button
                            input
                            type='button'
                            onClick={() => {
                                if (values.firstname === null || values.lastname === null || values.paymentMethod === null || values.phoneNumber === null || values.email === null) alert("Please fill in all input fields.");
                                else setModalShow(true);
                            }}
                            variant="contained"
                            color="primary"
                            className="submitButton">Submit</Button>
                        <br />
                        <br />
                        {/* <input className='submitButton' type='submit' value='Submit' /> */}
                    </div>
                </form>
                <ConfirmReservation
                    reservation={reservation}
                    values={values}
                    handleSubmit={handleSubmit}
                    show={modalShow}
                    onHide={() => setModalShow(false)} />
            </Card>
        );
    }
    else {
        return (
            <div>
                <h1>404</h1>
                <h2>Page not found!</h2>
            </div>
        );
    }
}
