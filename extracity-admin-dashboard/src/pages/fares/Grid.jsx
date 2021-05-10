import React from 'react'
import { Container } from '@material-ui/core'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import FaresGrid from '../../components/fares/FaresGrid'

export default function Grid() {
    return (
        <Container>
            <Sidebar />
            <FaresGrid />
            <Footer />
        </Container>
    )
}
