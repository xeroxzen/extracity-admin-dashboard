import React from 'react'
import Footer from '../../components/layout/Footer'
// import Navbar from '../../components/layout/Navbar'
import PersistentDrawerLeft from '../../components/layout/Sidebar'
import ReservationTable from '../../components/reservations/ReservationTable'
import DataGrid from '../../components/reservations/DataGrid'

export default function Reservations() {
    return (
        <div>
            <PersistentDrawerLeft />
            {/* <ReservationTable /> */}
            <DataGrid />
            <Footer />
        </div>
    )
}
