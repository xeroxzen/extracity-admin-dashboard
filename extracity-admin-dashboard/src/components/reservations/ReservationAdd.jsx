import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';

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
        fontSize: '11',
    },
}));

export default function InputAdornments() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div className={classes.root}>
            <div>

                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-name"
                        value={values.weight}
                        onChange={handleChange('firstname')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-first-name-helper-text"
                        inputProps={{
                            'aria-label': 'First name',
                        }}
                    />
                    <FormHelperText id="standard-weight-helper-text">First Name</FormHelperText>
                </FormControl>

                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-name"
                        value={values.weight}
                        onChange={handleChange('lastname')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-last-name-helper-text"
                        inputProps={{
                            'aria-label': 'Last name',
                        }}
                    />
                    <FormHelperText id="standard-weight-helper-text">Last Name</FormHelperText>
                </FormControl>

                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-name"
                        value={values.weight}
                        onChange={handleChange('lastname')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-last-name-helper-text"
                        inputProps={{
                            'aria-label': 'Last name',
                        }}
                    />
                    <FormHelperText id="standard-weight-helper-text">Phone Number</FormHelperText>
                </FormControl>

                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-email"
                        value={values.weight}
                        onChange={handleChange('lastname')}
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
                        id="standard-adornment-name"
                        value={values.weight}
                        onChange={handleChange('lastname')}
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
                        id="standard-adornment-time"
                        value={values.weight}
                        onChange={handleChange('time')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-time-helper-text"
                        inputProps={{
                            'aria-label': 'Time of travel',
                        }}
                    />
                    <FormHelperText id="standard-date-helper-text">Time of Travel</FormHelperText>
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-payer-phone-number"
                        value={values.weight}
                        onChange={handleChange('phone')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-date-helper-text"
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
                        id="standard-adornment-traveling-from"
                        value={values.weight}
                        onChange={handleChange('travellingFrom')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-departure-point-helper-text"
                        inputProps={{
                            'aria-label': 'Departure Point',
                        }}
                    />
                    <FormHelperText id="standard-date-helper-text">Departure Point</FormHelperText>
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-travel-to"
                        value={values.weight}
                        onChange={handleChange('travellingTo')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-arrival-point-helper-text"
                        inputProps={{
                            'aria-label': 'Arrival Point',
                        }}
                    />
                    <FormHelperText id="standard-date-helper-text">Arrival Point</FormHelperText>
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-amount"
                        value={values.weight}
                        onChange={handleChange('amount')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-amount-helper-text"
                        inputProps={{
                            'aria-label': 'Amount',
                        }}
                    />
                    <FormHelperText id="standard-date-helper-text">Amount</FormHelperText>
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-payment-method"
                        placeholder="OneMoney"
                        value={values.weight}
                        onChange={handleChange('paymentMethod')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-payment-method-helper-text"
                        inputProps={{
                            'aria-label': 'Payment Method',
                        }}
                    />
                    <FormHelperText id="standard-date-helper-text">Payment Method</FormHelperText>
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
