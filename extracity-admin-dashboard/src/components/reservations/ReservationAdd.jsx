import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Button, MenuItem } from '@material-ui/core';
// eslint-disable-next-line
// import firebase from "../../firebase.config";

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
}));

export default function InputAdornments() {
    const classes = useStyles();
    const [pickUpPoint, setPickUpPoint] = React.useState('1')
    // eslint-disable-next-line
    const [dropOffPoint, setDropOffPoint] = React.useState('8')
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

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handlePickupPointSelectChange = (event) => {
        setPickUpPoint(event.target.value)
    };

    // eslint-disable-next-line
    const handleDropOffPointSelectChange = (event) => {
        setDropOffPoint(event.target.value)
    }

    return (
        <div className={classes.root}>
            <div>

                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-first-name"
                        placeholder="Andile"
                        value={values.firstname}
                        onChange={handleChange('firstname')}
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
                        value={values.lastname}
                        onChange={handleChange('lastname')}
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
                        value={values.phoneNumber}
                        onChange={handleChange('phoneNumber')}
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
                        placeholder="zenandemachinga@hotmail.com"
                        value={values.email}
                        onChange={handleChange('email')}
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
                        id="standard-adornment-payer-phone-number"
                        placeholder="0710431790"
                        value={values.mobileMoneyAccount}
                        onChange={handleChange('mobileMoneyAccount')}
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
                        id="standard-adornment-payment-method"
                        placeholder="OneMoney"
                        value={values.paymentMethod}
                        onChange={handleChange('paymentMethod')}
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
                    variant="contained"
                    color="primary"
                    className={classes.button}>Submit</Button>
            </div>
        </div>
    );
}
