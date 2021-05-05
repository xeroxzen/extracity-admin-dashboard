import React from 'react'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import DataGrid from '../../components/reservations/DataGrid'

export default function Data() {
    return (
        <div>
            <Sidebar />
            <DataGrid />
            <Footer />
        </div>
    )
}
