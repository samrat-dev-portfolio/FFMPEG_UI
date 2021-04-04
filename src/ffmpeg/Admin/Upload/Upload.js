import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Upload.scss';

export default function Upload() {
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const isValid = form.checkValidity();
        if (isValid === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            console.log("Ready for upload to server");
        }
        setValidated(true);
    };

    return (
        <Container fluid className="C_Upload">
            <Row className="h-100 m-0">
                <Col className="col-md-6 pt-3">
                    <Card bg="light" text="dark" border="secondary">
                        <Card.Header>Upload File</Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="Unique_ID">
                                    <Form.Label>Unique ID</Form.Label>
                                    <Form.Control type="text" defaultValue="" placeholder="Unique ID" required />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="File_Title">
                                    <Form.Label>File Title</Form.Label>
                                    <Form.Control type="text" placeholder="File title" required />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Choose File</Form.Label>
                                    <Form.File name="content_file" id="content_file" custom>
                                        <Form.File.Input required />
                                        <Form.File.Label data-browse="Browse File" id="content_file_label">
                                            Select any MP4 file
                                </Form.File.Label>
                                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                    </Form.File>
                                </Form.Group>
                                <Button type="submit">Submit form</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
