import React from "react";
// import Navbar from "../../components/layout/Navbar";
// import Home from "../../components/home/Home";
import Footer from "../../components/layout/Footer";
import { Container } from "react-bootstrap";
import ReservationTable from "../../components/reservations/ReservationTable";
import Sidebar from "../../components/layout/Sidebar";
import DataGrid from '../../components/reservations/DataGrid'

export default function Home() {
    return (
        <Container>
            <Sidebar />
            {/* <ReservationTable /> */}
            <DataGrid />
            <Footer />
        </Container>
    );
}
export { Home };
