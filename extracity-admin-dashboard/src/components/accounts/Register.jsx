import React from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Register() {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const passwordConfirmRef = React.useRef();
    const { register } = useAuth();
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }
        try {
            setError("");
            setLoading(true);
            await register(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to create account.");
        }
        setLoading(false);
    }

    return (
        <>
            <Card className={"bg-dark text-white"}>
                <Card.Body>
                    <h4 className="text-center mb-4">Extracity Admin</h4>

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

                        <Form.Group id="email">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100">
                            Register
            </Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </Card>
        </>
    );
}
