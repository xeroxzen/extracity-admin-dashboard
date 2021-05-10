import { Container } from '@material-ui/core'
import React from 'react'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'

export default function FaresGrid() {
    return (
        <Container>
            <Sidebar />
            <FaresGrid />
            <Footer />
        </Container>
    )
}
