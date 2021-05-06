import React from 'react'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import TripCreateForm from '../../components/trips/TripCreateForm'

export default function AddTrip() {
    return (
        <div>
            <Sidebar />
            <TripCreateForm />
            <Footer />
        </div>
    )
}
