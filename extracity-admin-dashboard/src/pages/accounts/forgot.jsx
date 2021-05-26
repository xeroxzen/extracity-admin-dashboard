import React from "react";
import Forgot from "../../components/accounts/Forgot";
import { Container } from "react-bootstrap";

export default function forgot() {
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "80vh", }}
        >
            <div
                className="w-100"
                style={{ maxWidth: "350px", alignItems: "center" }}
            >
                <Forgot />
            </div>
        </Container>
    );
}
export { forgot };
