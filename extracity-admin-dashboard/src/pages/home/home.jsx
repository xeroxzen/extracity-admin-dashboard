import React from "react";
import Navbar from "../../components/layout/Navbar";
// import Home from "../../components/home/Home";
import Footer from "../../components/layout/Footer";
import { Container } from "react-bootstrap";
import ReservationTable from "../../components/reservations/ReservationTable";

export default function Home() {
    return (
        <Container>
            <Navbar />
            <ReservationTable />
            <Footer />
        </Container>
    );
}
export { Home };
