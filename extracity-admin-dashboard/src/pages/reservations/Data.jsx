import React from 'react'
import Footer from '../../components/layout/Footer'
import PersistentDrawerLeft from '../../components/layout/PersistentDrawerLeft'
import DataGrid from '../../components/reservations/DataGrid'

export default function Data() {
    return (
        <div>
            <PersistentDrawerLeft />
            <DataGrid />
            <Footer />
        </div>
    )
}
