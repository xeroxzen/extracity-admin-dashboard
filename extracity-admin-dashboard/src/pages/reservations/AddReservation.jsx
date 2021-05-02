import React from 'react'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import ReservationAdd from '../../components/reservations/ReservationAdd'

export default function AddReservation() {
    return (
        <div>
            <Navbar />
            <ReservationAdd />
            <Footer />
        </div>

    )
}
