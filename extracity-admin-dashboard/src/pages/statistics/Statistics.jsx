import { Container } from '@material-ui/core'
import React from 'react'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import StatsData from '../../components/statistics/StatsData'

export default function Statistics() {
    return (
        <Container>
            <Sidebar />
            <StatsData />
            <Footer />
        </Container>
    )
}
