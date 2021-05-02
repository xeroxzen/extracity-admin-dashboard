import React from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const { login } = useAuth();
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to log in.");
        }
        setLoading(false);
    }

    return (
        <>
            <Card className={"bg-dark text-white"}>
                <Card.Body>
                    <h4 className="text-center mb-4">Extracity Login</h4>

                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100">
                            Login
            </Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </Card>
        </>
    );
}
