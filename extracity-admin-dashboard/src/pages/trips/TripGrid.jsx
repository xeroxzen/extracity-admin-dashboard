import { Container } from '@material-ui/core'
import React from 'react'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import TripsGrid from '../../components/trips/TripsGrid'

export default function TripGrid() {
    return (
        <Container>
            <Sidebar />
            <TripsGrid />
            <Footer />
        </Container>
    )
}
