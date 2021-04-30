import React from "react";
import firebase from "../../firebase.config";

const ReservationInput = ({ booking }) => {
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
    const [pollUrl, setPollUrl] = React.useState(booking.pollURL);
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
                pollUrl,
                // paymentStatus,
            });
    };

    const onDelete = () => {
        const db = firebase.firestore()
        db.collection('reservations').doc(booking.id).delete()
    }

    return (
        <div>
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
            <button onClick={onUpdate}>Update</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default ReservationInput;
