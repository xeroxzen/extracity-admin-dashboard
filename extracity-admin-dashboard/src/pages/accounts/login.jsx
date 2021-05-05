import React from "react";
import Login from "../../components/accounts/Login";
import { Container } from "react-bootstrap";

export default function login() {
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "80vh" }}
        >
            <div
                className="w-100"
                style={{ maxWidth: "350px", alignItems: "center" }}
            >
                <Login />
            </div>
        </Container>
    );
}
export { login };
