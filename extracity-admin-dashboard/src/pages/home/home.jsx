import React from "react";
import Navbar from "../../components/layout/Navbar";
import Home from "../../components/home/Home";
import Footer from "../../components/layout/Footer";
import { Container } from "react-bootstrap";

export default function home() {
    return (
        <Container>
            <Navbar />
            <Home />
            <Footer />
        </Container>
    );
}
export { home };
