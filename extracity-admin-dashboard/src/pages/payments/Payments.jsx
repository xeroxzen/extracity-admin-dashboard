import { Container } from '@material-ui/core'
import React from 'react'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import PaymentsData from '../../components/payments/PaymentsData'

export default function Payments() {
    return (
        <Container>
            <Sidebar />
            <PaymentsData />
            <Footer />
        </Container>
    )
}
