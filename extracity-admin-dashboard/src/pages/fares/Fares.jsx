import React from 'react'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import FaresTable from '../../components/fares/FaresTable'

export default function Trips() {
    return (
        <div>
            <Navbar />
            <FaresTable />
            <Footer />
        </div>
    )
}
