import React, { useState, useEffect, useRef, Component } from 'react';
import { Button, Col, Container, Form, Row, Card, Table, InputGroup, FormControl, Pagination, Dropdown, ButtonGroup } from "react-bootstrap";
import axios from 'axios';
import Loading from '../../Loading/Loading';
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
        if (isValid === false || getSelSubject == null || getSelClass == null) {
            setError("Please provide all field");
            setIsLoading(false);
        } else {
            const post_data = { chapter_name: elmChapter.current.value, subject_id: getSelSubject.value, class_id: getSelClass.value, content_id: getSelContentID.value };
            console.log(post_data);
        }
        setValidated(true);
        isValidate_Subject(getSelSubject);
        isValidate_Class(getSelClass);
        isValidate_ContentID(getSelContentID);
    };
    const elmChapter = useRef(null);
    //#region Subject Vars
    const Subject_options = [
        { value: '1', label: 'Item 1' },
        { value: '2', label: 'Item 2' }
    ];
    const [getSelSubject, setSelSubject] = useState(null);
    const handleChange_Subject = (e) => {
        setSelSubject(e);
        if (isValidate_Subject_Init.current) {
            isValidate_Subject(e);
        }
    };
    const elmSubject = useRef(null);
    const isValidate_Subject_Init = useRef(false);
    const isValidate_Subject = (data) => {
        LooksGoodShowHide(data, elmSubject, isValidate_Subject_Init);
    };
    //#endregion

    //#region Class Vars
    const Class_options = [
        { value: '3', label: 'Item 3' },
        { value: '4', label: 'Item 4' }
    ];
    const [getSelClass, setSelClass] = useState(null);
    const handleChange_Class = (e) => {
        setSelClass(e);
        if (isValidate_Class_Init.current) {
            isValidate_Class(e);
        }
    };
    const elmClass = useRef(null);
    const isValidate_Class_Init = useRef(false);
    const isValidate_Class = data => {
        LooksGoodShowHide(data, elmClass, isValidate_Class_Init);
    };
    //#endregion

    //#region ContentID Vars
    const ContentID_options = [
        { value: '5', label: 'Item 5' },
        { value: '6', label: 'Item 6' }
    ];
    const [getSelContentID, setSelContentID] = useState(null);
    const handleChange_ContentID = (e) => {
        setSelContentID(e);
        if (isValidate_ContentID_Init.current) {
            isValidate_ContentID(e);
        }
    };
    const elmContentID = useRef(null);
    const isValidate_ContentID_Init = useRef(false);
    const isValidate_ContentID = data => {
        LooksGoodShowHide(data, elmContentID, isValidate_ContentID_Init);
    };
    //#endregion

    const LooksGoodShowHide = (data, refElm, refValidateInit) => {
        if (refElm.current) {
            let elm = refElm.current.select.controlRef;
            if (elm) {
                refValidateInit.current = true;
                if (data == null) {
                    elm.style.borderColor = "#dc3545";  //red
                } else {
                    elm.style.borderColor = "#28a745"; // green
                    let lookGoodElm = elm.parentNode.nextSibling
                    if (lookGoodElm) {
                        if (lookGoodElm.classList.contains('valid-feedback')) {
                            lookGoodElm.style.display = 'block';
                        }
                    }
                }
            }
        }
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
                                    <Form.Control type="text" defaultValue="" ref={elmChapter} placeholder="Chapter Name" required />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="subject">
                                    <Form.Label>Subject</Form.Label>
                                    <Select value={getSelSubject} options={Subject_options} onChange={handleChange_Subject} ref={elmSubject} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="class">
                                    <Form.Label>Class</Form.Label>
                                    <Select value={getSelClass} options={Class_options} onChange={handleChange_Class} ref={elmClass} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="contentID">
                                    <Form.Label>content ID</Form.Label>
                                    <Select value={getSelContentID} options={ContentID_options} onChange={handleChange_ContentID} ref={elmContentID} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
