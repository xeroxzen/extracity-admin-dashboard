import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Button, MenuItem } from '@material-ui/core';
import firebase from "../../firebase.config";
const { uuid } = require("uuidv4");
// eslint-disable-next-line
// import firebase from "../../firebase.config";

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
}));

export default function ReservationAdd() {
    const classes = useStyles();
    // eslint-disable-next-line
    const [pickUpPoint, setPickUpPoint] = React.useState('1')
    const history = useHistory();
    // eslint-disable-next-line
    const [dropOffPoint, setDropOffPoint] = React.useState('8')
    // eslint-disable-next-line
    const [values, setValues] = React.useState({
        fullname: '',
        amount: '',
        bookingTime: '',
        date: '',
        email: '',
        mobileMoneyAccount: '',
        paymentMethod: '',
        phoneNumber: '',
        ticketId: '',
        travelTime: '',
        travellingFrom: '',
        travellingTo: '',
        trip: '',
        firstname: '',
        lastname: '',
    });
    // const [fullname, setFullname] = React.useState([]);
    const [amount, setAmount] = React.useState([]);
    // const [bookingTime, setBookingTime] = React.useState([]);
    const [date, setDate] = React.useState([]);
    const [email, setEmail] = React.useState([]);
    const [mobileMoneyAccount, setMobileMoneyAccount] = React.useState([]);
    const [paymentMethod, setPaymentMethod] = React.useState([]);
    const [phoneNumber, setPhoneNumber] = React.useState([]);
    const [travelTime, setTravelTime] = React.useState([]);
    const [travellingFrom, setTravellingFrom] = React.useState([]);
    const [travellingTo, setTravellingTo] = React.useState([]);
    const [firstname, setFirstname] = React.useState([]);
    const [lastname, setLastname] = React.useState([]);
    //db
    const db = firebase.firestore()

    const pickupPoints = [
        {
            value: '1',
            label: 'Bulawayo',
        },
        {
            value: '2',
            label: 'Chegutu',
        },
        {
            value: '3',
            label: 'Gweru',
        },
        {
            value: '4',
            label: 'Harare',
        },
        {
            value: '5',
            label: 'Hwange',
        },
        {
            value: '6',
            label: 'Kadoma',
        },
        {
            value: '7',
            label: 'Kwekwe',
        },
        {
            value: '8',
            label: 'Victoria Falls'
        },
    ]

    // eslint-disable-next-line
    const dropOffPoints = [
        {
            value: '1',
            label: 'Bulawayo',
        },
        {
            value: '2',
            label: 'Chegutu',
        },
        {
            value: '3',
            label: 'Gweru',
        },
        {
            value: '4',
            label: 'Harare',
        },
        {
            value: '5',
            label: 'Hwange',
        },
        {
            value: '6',
            label: 'Kadoma',
        },
        {
            value: '7',
            label: 'Kwekwe',
        },
        {
            value: '8',
            label: 'Victoria Falls'
        },
    ]

    // eslint-disable-next-line
    const time = [
        {
            value: '1',
            label: 'Morning @07:30',
        },
        {
            value: '2',
            label: 'Afternoon @11:30',
        },
        {
            value: '3',
            label: 'Late Afternoon @14:30',
        },
        {
            value: '4',
            label: 'Later Afternoon @16:30',
        },
    ]

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    // const handlePickupPointSelectChange = (event) => {
    //     setPickUpPoint(event.target.value)
    // };

    // eslint-disable-next-line
    // const handleDropOffPointSelectChange = (event) => {
    //     setDropOffPoint(event.target.value)
    // }

    const handleSubmit = e => {
        e.preventDefault();
        if (firstname === undefined || lastname === undefined || amount === undefined || date === undefined || mobileMoneyAccount === undefined || paymentMethod === undefined || phoneNumber === undefined || travelTime === undefined || travellingFrom === undefined || travellingTo === undefined) {
            alert('Please fill in all input fields.')
        }
        else if (firstname === null || lastname === null || amount === null || date === null || mobileMoneyAccount === null || paymentMethod === null || phoneNumber === null || travelTime === null || travellingFrom === null || travellingTo === null) {
            alert('Please fill in all input fields.')
        }
        else {
            let id = uuid();
            let bookingTime = new Date();

            db
                .collection("reservations")
                .add({
                    ID: id,
                    firstName: firstname,
                    lastName: lastname,
                    Email: email,
                    Amount: amount,
                    // BookingTime: bookingTime,
                    BookingTime: bookingTime,
                    Date: date,
                    PhoneNumber: phoneNumber,
                    PaymentMethod: paymentMethod,
                    MobileMoneyAccount: mobileMoneyAccount,
                    TravelTime: travelTime,
                    TravellingFrom: travellingFrom,
                    TravellingTo: travellingTo,

                })
                .then(ref => history.push('/reservations')
                ).catch(
                    e => alert('An error occurred!')
                );
        }

    }

    return (
        <form className={classes.root} onSubmit={e => { handleSubmit(e) }}>
            <div>
                <h3>New Reservation</h3>

                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-first-name"
                        placeholder="Andile"
                        required
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-first-name-helper-text"
                        inputProps={{
                            'aria-label': 'First name',
                        }}
                    />
                    <FormHelperText id="standard-first-name-helper-text">First Name</FormHelperText>
                </FormControl>

                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-last-name"
                        placeholder="Mbele"
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                        required
                        // endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-last-name-helper-text"
                        inputProps={{
                            'aria-label': 'Last name',
                        }}
                    />
                    <FormHelperText id="standard-last-name-helper-text">Last Name</FormHelperText>
                </FormControl>

                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-phone-number"
                        placeholder="0776869521"
                        value={phoneNumber}
                        required
                        onChange={e => setPhoneNumber(e.target.value)}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-phone-number-helper-text"
                        inputProps={{
                            'aria-label': 'Phone Number',
                        }}
                    />
                    <FormHelperText id="standard-weight-helper-text">Phone Number</FormHelperText>
                </FormControl>

                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-email"
                        placeholder="andile.m@outlook.com"
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-email-helper-text"
                        inputProps={{
                            'aria-label': 'Email',
                        }}
                    />
                    <FormHelperText id="standard-weight-helper-text">Email Address</FormHelperText>
                </FormControl>
            </div>
            <div>

                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-date"
                        placeholder="22/07/2021"
                        value={date}
                        required
                        onChange={e => setDate(e.target.value)}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-date-helper-text"
                        inputProps={{
                            'aria-label': 'Date of travel',
                        }}
                    />
                    <FormHelperText id="standard-date-helper-text">Date of Travel</FormHelperText>
                </FormControl>
                {/* <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-phone-number"
                        value={values.weight}
                        onChange={handleChange('phone')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-date-helper-text"
                        inputProps={{
                            'aria-label': 'Phone Number',
                        }}
                    />
                    <FormHelperText id="standard-date-helper-text">Phone Number</FormHelperText>
                </FormControl> */}
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-travel-time"
                        placeholder="Morning at 07:30"
                        value={travelTime}
                        required
                        onChange={e => setTravelTime(e.target.value)}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-travel-time-helper-text"
                        inputProps={{
                            'aria-label': 'Time of travel',
                        }}
                    />
                    <FormHelperText id="standard-date-helper-text">Time of Travel</FormHelperText>
                </FormControl>

                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-payer-phone-number"
                        placeholder="0710431790"
                        value={mobileMoneyAccount}
                        required
                        onChange={e => setMobileMoneyAccount(e.target.value)}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-payer-phone-number-helper-text"
                        inputProps={{
                            'aria-label': "Payer's Phone Number",
                        }}
                    />
                    <FormHelperText id="standard-payer-phone-number-helper-text">Payer's Account</FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-departure-point"
                        placeholder="Harare"
                        select
                        value={travellingFrom}
                        required
                        onChange={e => setTravellingFrom(e.target.value)}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-departure-point-helper-text"
                        inputProps={{
                            'aria-label': 'Departure Point',
                        }}
                    >
                        {pickupPoints.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Input>
                    <FormHelperText id="standard-departure-point-helper-text">Travelling From</FormHelperText>
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-travel-to"
                        placeholder="Victoria Falls"
                        value={travellingTo}
                        required
                        onChange={e => setTravellingTo(e.target.value)}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-arrival-point-helper-text"
                        inputProps={{
                            'aria-label': 'Arrival Point',
                        }}
                    />
                    <FormHelperText id="standard-arrival-point-helper-text">Arrival Point</FormHelperText>
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-amount"
                        placeholder="2, 300"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-amount-helper-text"
                        inputProps={{
                            'aria-label': 'Amount',
                        }}
                    />
                    <FormHelperText id="standard-amount-helper-text">Amount</FormHelperText>
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-payment-method"
                        placeholder="OneMoney"
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value)}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-payment-method-helper-text"
                        inputProps={{
                            'aria-label': 'Payment Method',
                        }}
                    />
                    <FormHelperText id="standard-payment-method-helper-text">Payment Method</FormHelperText>
                </FormControl>
                <br />
                <br />
                <Button
                    input
                    type='submit'
                    variant="contained"
                    color="primary"
                    className="submitButton">Submit</Button>
                {/* <input className='submitButton' type='submit' value='Submit' /> */}
            </div>
        </form>
    );
}
