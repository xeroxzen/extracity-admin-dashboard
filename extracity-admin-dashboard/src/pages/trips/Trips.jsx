import React from 'react'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import TripsTable from '../../components/trips/TripsTable'

export default function Trips() {
    return (
        <div>
        	<Sidebar />
            <TripsTable />
            <Footer />
        </div>
    )
}
