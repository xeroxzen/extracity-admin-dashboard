import React from 'react'
import Footer from '../../components/layout/Footer'
// import Navbar from '../../components/layout/Navbar'
import PersistentDrawerLeft from '../../components/layout/PersistentDrawerLeft'
import ReservationTable from '../../components/reservations/ReservationTable'

export default function Reservations() {
    return (
        <div>
            <PersistentDrawerLeft />
            <ReservationTable />
            <Footer />
        </div>
    )
}
