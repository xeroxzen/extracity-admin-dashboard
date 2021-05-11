import React from "react";
import firebase from "../../firebase.config";
import { makeStyles } from "@material-ui/core/styles";
import classes from "*.module.css";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 80,
    },
}));

const ReservationInput = ({ booking }) => {
    const classes = useStyles()
    const [fullname, setFullname] = React.useState(booking.fullname);
    const [amount, setAmount] = React.useState(booking.Amount);
    const [bookingTime, setBookingTime] = React.useState(booking.BookingTime);
    const [date, setDate] = React.useState(booking.Date);
    const [email, setEmail] = React.useState(booking.Email);
    const [mobileMoneyAccount, setMobileMoneyAccount] = React.useState(
        booking.MobileMoneyAccount
    );
    const [paymentMethod, setPaymentMethod] = React.useState(
        booking.PaymentMethod
    );
    const [phoneNumber, setPhoneNumber] = React.useState(booking.PhoneNumber);
    const [ticketId, setTicketId] = React.useState(booking.TicketID);
    const [travelTime, setTravelTime] = React.useState(booking.TravelTime);
    const [travellingFrom, setTravellingFrom] = React.useState(
        booking.TravellingFrom
    );
    const [travellingTo, setTravellingTo] = React.useState(booking.TravellingTo);
    const [trip, setTrip] = React.useState(booking.Trip);
    const [firstname, setFirstname] = React.useState(booking.firstName);
    const [lastname, setLastname] = React.useState(booking.lastName);
    // const [pollUrl, setPollUrl] = React.useState(booking.pollURL);
    //   const [paymentStatus, setPaymentStatus] = React.useState(booking.status);

    const onUpdate = () => {
        const db = firebase.firestore();
        db.collection("reservations")
            .doc(booking.id)
            .set({
                ...booking,
                fullname,
                amount,
                bookingTime,
                date,
                email,
                mobileMoneyAccount,
                paymentMethod,
                phoneNumber,
                ticketId,
                travelTime,
                travellingFrom,
                travellingTo,
                trip,
                firstname,
                lastname,
                // pollUrl,
                // paymentStatus,
            });
    };

    const onDelete = () => {
        const db = firebase.firestore()
        db.collection('reservations').doc(booking.id).delete()
    }

    return (
        <div className={classes.root}>
            {/* Fullname */}
            <input
                value={fullname}
                onChange={(e) => {
                    setFullname(e.target.value);
                }}
            />
            {/* Booking Time */}
            <input
                value={bookingTime}
                onChange={(e) => {
                    setBookingTime(e.target.value);
                }}
            />
            {/* Email */}
            <input
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            {/* Trip */}
            <input
                value={trip}
                onChange={(e) => {
                    setTrip(e.target.value);
                }}
            />
            {/* Amount */}
            <input
                value={amount}
                onChange={(e) => {
                    setAmount(e.target.value);
                }}
            />
            {/* Date */}
            <input
                value={date}
                onChange={(e) => {
                    setDate(e.target.value);
                }}
            />
            {/* Phone Number */}
            <input
                value={phoneNumber}
                onChange={(e) => {
                    setPhoneNumber(e.target.value);
                }}
            />

            {/* Mobile Money Account */}
            <input
                value={mobileMoneyAccount}
                onChange={(e) => {
                    setMobileMoneyAccount(e.target.value);
                }}
            />
            {/* Payment Method */}
            <input
                value={paymentMethod}
                onChange={(e) => {
                    setPaymentMethod(e.target.value);
                }}
            />
            {/* Ticket Id */}
            <input
                value={ticketId}
                onChange={(e) => {
                    setTicketId(e.target.value);
                }}
            />
            {/* Travel Time */}
            <input
                value={travelTime}
                onChange={(e) => {
                    setTravelTime(e.target.value);
                }}
            />
            {/* traveling from */}
            <input
                value={travellingFrom}
                onChange={(e) => {
                    setTravellingFrom(e.target.value);
                }}
            />
            {/* travelling to */}
            <input
                value={travellingTo}
                onChange={(e) => {
                    setTravellingTo(e.target.value);
                }}
            />
            {/* first name */}
            <input
                value={firstname}
                onChange={(e) => {
                    setFirstname(e.target.value);
                }}
            />
            {/* last name */}
            <input
                value={lastname}
                onChange={(e) => {
                    setLastname(e.target.value);
                }}
            />
            {/* Phone Number */}
            <input
                value={phoneNumber}
                onChange={(e) => {
                    setPhoneNumber(e.target.value);
                }}
            />
            <button onClick={onUpdate}>Update</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default ReservationInput;
