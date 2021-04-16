import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Col, Container, Form, Row, Card, ProgressBar } from "react-bootstrap";
import axios from 'axios';
import Loading from '../Loading/Loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddCsub.scss';

export default function AddCsub() {
    const baseurl = window.ffmpeg_baseurl;
    const [getIsLoading, setIsLoading] = useState(false);
    const [getError, setError] = useState('');

    useEffect(() => {
    }, []);
    return (
        <Container fluid className="C_Upload">
            <Row className="h-100 m-0">
                <Col className="col-md-8 col-lg-6 pt-3">
                    <Card bg="light" text="dark" border="secondary" >
                        <Card.Header> &nbsp;
                            <span className="loading-error">{getError}</span>
                            {
                                getIsLoading ? <Loading /> : null
                            }
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Add Classes</Card.Title>
                            <Form noValidate className="mb-4">
                                <Form.Group controlId="Class_Name">
                                    <Form.Label>Class Name</Form.Label>
                                    <Form.Control type="text" autoComplete="off" placeholder="Class Name" required
                                        defaultValue=""
                                        onChange={(e) => { console.log(e.target.value); }} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" variant="info" size="sm">Submit</Button>
                            </Form>
                            <Card.Title>Add Subjects</Card.Title>
                            <Form noValidate>
                                <Form.Group controlId="Subject_Name">
                                    <Form.Label>Subject Name</Form.Label>
                                    <Form.Control type="text" autoComplete="off" placeholder="Subject Name" required
                                        defaultValue=""
                                        onChange={(e) => { console.log(e.target.value); }} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" variant="info" size="sm">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
