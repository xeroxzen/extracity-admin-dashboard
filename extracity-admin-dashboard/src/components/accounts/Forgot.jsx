import React, { Component } from 'react'
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export class Forgot extends Component {

    handleSubmit = e => {
        e.preventDefault();
    };

    render() {

        return (
            <>
                <Card className={"bg-dark text-white"}>
                    <Card.Body>
                        <h4 className="text-center mb-4">Forgot Password</h4>

                        {/* {error && <Alert variant="danger">{error}</Alert>} */}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={this.emailRef} required />
                            </Form.Group>

                            <Button type="submit" className="w-100">
                                Submit
            </Button>
                        </Form>
                    </Card.Body>
                    <p className="login w-100 text-center mt-2">
                        Login Instead? <Link to="login">Click here</Link>
                    </p>
                </Card>
            </>
        );
    }
}

export default Forgot
