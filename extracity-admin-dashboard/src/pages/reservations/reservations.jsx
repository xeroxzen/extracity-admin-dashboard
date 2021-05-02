import React from 'react'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import ReservationTable from '../../components/reservations/ReservationTable'

export default function Reservations() {
    return (
        <div>
            <Navbar />
            <ReservationTable />
            <Footer />
        </div>
    )
}
