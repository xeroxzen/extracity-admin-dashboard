import React from 'react'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import TripCreateForm from '../../components/trips/TripCreateForm'

export default function AddTrip() {
    return (
        <div>
            <Navbar />
            <TripCreateForm />
            <Footer />
        </div>
    )
}
