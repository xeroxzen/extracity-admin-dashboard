import React from 'react'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import FareCreateForm from '../../components/fares/FareCreateForm'

export default function AddFare() {
    return (
        <div>
            <Navbar />
            <FareCreateForm />
            <Footer />
        </div>
    )
}
