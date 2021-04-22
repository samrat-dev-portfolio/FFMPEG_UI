import React, { useState, useEffect, useRef, Component } from 'react';
import { Button, Col, Container, Form, Row, Card, Table, InputGroup, FormControl, Pagination, Dropdown, ButtonGroup } from "react-bootstrap";
import axios from 'axios';
import { MDBIcon, MDBBtn } from "mdbreact";
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Add.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function Add({ onhide }) {
    // https://react-select.com/home
    const baseurl = window.ffmpeg_baseurl;
    const [getIsLoading, setIsLoading] = useState(false);
    const [getError, setError] = useState('');
    const [validated, setValidated] = useState(false);

    //#region Hooks 
    useEffect(() => {

    }, []);
    //#endregion
    const handleSubmit = (event) => {
        setError('');
        setIsLoading(true);
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        const isValid = form.checkValidity();
        if (isValid === false) {
            setError("Please provide all field");
            setIsLoading(false);
        } else {
            console.log("Ready for upload to server");
        }
        setValidated(true);
    };
    const Limitoptions = [
        { value: '5', label: '5' },
        { value: '10', label: '10' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
    ];
    const [getSelectedLimit, setSelectedLimit] = useState(null);
    const handleChange_limit = (e) => {
        setSelectedLimit(e);
    };
    return (
        <Container fluid className="C_AddChap_Add">
            <Row>
                <Col className="col-md-8 col-lg-6 pt-3 mx-auto">
                    <Card>
                        <Card.Header>
                            Add chapter <span className="loading-error">{getError}</span>
                            {
                                getIsLoading ? <Loading /> : null
                            }
                        </Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="chapterName">
                                    <Form.Label>Chapter Name</Form.Label>
                                    <Form.Control type="text" defaultValue="" placeholder="Chapter Name" required />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="subjectId">
                                    <Form.Label>Subject Id</Form.Label>
                                    <Select value={getSelectedLimit} className="x" options={Limitoptions} onChange={handleChange_limit} />
                                </Form.Group>
                                <MDBBtn type="submit" color="indigo" size="sm" >
                                    <MDBIcon far icon="save" size="lg" />&nbsp;&nbsp;Submit
                                </MDBBtn>
                                <MDBBtn type="submit" color="indigo" size="sm" onClick={onhide} >
                                    <MDBIcon icon="times-circle" size="lg" />&nbsp;&nbsp;Close
                                </MDBBtn>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
