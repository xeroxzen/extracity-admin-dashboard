import React from 'react'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import FaresTable from '../../components/fares/FaresTable'
import { Container } from '@material-ui/core'

export default function Trips() {
    return (
        <Container>
            <Sidebar />
            <FaresTable />
            <Footer />
        </Container>
    )
}
