import React from 'react'
import Footer from '../../components/layout/Footer'
// import Navbar from '../../components/layout/Navbar'
import PersistentDrawerLeft from '../../components/layout/Sidebar'
import ReservationAdd from '../../components/reservations/ReservationAdd'

export default function AddReservation() {
    return (
        <div>
            <PersistentDrawerLeft />
            <ReservationAdd />
            <Footer />
        </div>

    )
}
