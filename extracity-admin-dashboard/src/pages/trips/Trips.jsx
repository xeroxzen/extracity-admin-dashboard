import React from 'react'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import TripsTable from '../../components/trips/TripsTable'

export default function Trips() {
    return (
        <div>
            <Navbar />
            <TripsTable />
            <Footer />
        </div>
    )
}
