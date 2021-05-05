import React from "react";
// import Navbar from "../../components/layout/Navbar";
// import Home from "../../components/home/Home";
import Footer from "../../components/layout/Footer";
import { Container } from "react-bootstrap";
import ReservationTable from "../../components/reservations/ReservationTable";
import PersistentDrawerLeft from "../../components/layout/PersistentDrawerLeft";
import DataGrid from '../../components/reservations/DataGrid'

export default function Home() {
    return (
        <Container>
            <PersistentDrawerLeft />
            <ReservationTable />
            <DataGrid />
            <Footer />
        </Container>
    );
}
export { Home };
