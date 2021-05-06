import React from 'react'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import FaresTable from '../../components/fares/FaresTable'

export default function Trips() {
    return (
        <div>
            <Sidebar />
            <FaresTable />
            <Footer />
        </div>
    )
}
