import React from 'react'
import Footer from '../../components/layout/Footer'
<<<<<<< HEAD
// import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'
// import ReservationTable from '../../components/reservations/ReservationTable'
import DataGrid from '../../components/reservations/DataGrid'
=======
import Navbar from '../../components/layout/Navbar'
import ReservationTable from '../../components/reservations/ReservationTable'
>>>>>>> fares

export default function Reservations() {
    return (
        <div>
<<<<<<< HEAD
            <Sidebar />
            {/* <ReservationTable /> */}
            <DataGrid />
=======
            <Navbar />
            <ReservationTable />
>>>>>>> fares
            <Footer />
        </div>
    )
}
