import React from 'react'
import Footer from '../../components/layout/Footer'
// import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'
import ReservationAdd from '../../components/reservations/ReservationAdd'

export default function AddReservation() {
    return (
        <div>
            <Sidebar />
            <ReservationAdd />
            <Footer />
        </div>

    )
}
