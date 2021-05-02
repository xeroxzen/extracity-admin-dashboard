import React from "react";
import Register from "../../components/accounts/Register";
import { Container } from "react-bootstrap";

export default function register() {
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "80vh" }}
        >
            <div
                className="w-100"
                style={{ maxWidth: "350px", alignItems: "center" }}
            >
                <Register />
                {/* <Footer /> */}
            </div>
        </Container>
    );
}
export { register };
