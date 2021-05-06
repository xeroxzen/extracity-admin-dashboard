import React from 'react'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import FareCreateForm from '../../components/fares/FareCreateForm'

export default function AddFare() {
    return (
        <div>
            <Sidebar />
            <FareCreateForm />
            <Footer />
        </div>
    )
}
