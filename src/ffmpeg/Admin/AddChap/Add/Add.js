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
import { ToastAlert } from '../../Toast/Toast';

export default function Add({ onhide, data }) {
    // https://react-select.com/home
    const baseurl = window.ffmpeg_baseurl;
    const [getIsLoading, setIsLoading] = useState(false);
    const [getError, setError] = useState('');
    const [validated, setValidated] = useState(false);
    const txtChapterId = useRef(null);
    //#region Hooks 
    useEffect(() => {
        // console.log(data);
        if ('add' == data.e) {
            loadClasses();
            loadSubjects();
            loadContents();
        }
        else if ('edit' == data.e) {
            const { id, chapterName, classId, subjectId, contentID } = data.data;
            txtChapterId.current.value = id;
            elmChapter.current.value = chapterName;
            loadClasses(classId);
            loadSubjects(subjectId);
            loadContents(contentID);
        }
        else if ('attach' == data.e) {
         
        }

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
            const post_data = { id: txtChapterId.current.value, chapterName: elmChapter.current.value, subjectId: getSelSubject != null ? getSelSubject.value : null, classId: getSelClass != null ? getSelClass.value : null, contentID: getSelContentID != null ? getSelContentID.value : null };
            // console.log(post_data);
            const config = {
                headers: {
                    'content-type': 'application/json',
                }
            };
            let body = null;
            let post_url = null;
            if ('add' == data.e || 'attach' == data.e) {
                body = { ...post_data };
                post_url = `${baseurl}api/mpeg/AddChapter`;
            }
            if ('edit' == data.e) {
                body = { ...post_data };
                post_url = `${baseurl}api/mpeg/PutChapter`;
            }
            if (post_url == null || body == null) return;
            axios.post(post_url, body, config).then(res => {
                setError(res.data.data);
                setIsLoading(false);
                ToastAlert(res.data.data, 'i');
                onhide();
                // console.log(res);
            }).catch(err => {
                // console.log(err);
                setIsLoading(false);
                setError_Cls('Error to save data');
            });
        }
        setValidated(true);
        isValidate_Subject(getSelSubject);
        isValidate_Class(getSelClass);
        // isValidate_ContentID(getSelContentID);
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
    const [getAllSub, setAllSub] = useState([]);
    const loadSubjects = (_id) => {
        setIsLoading(true);
        setError('Loading...');
        axios.get(`${baseurl}api/mpeg/getSubject`)
            .then(res => {
                setIsLoading(false);
                setError('');
                // console.log(res.data.data);
                var data = res.data.data.map(({ id, subjectName }) => {
                    return { value: id, label: subjectName }
                });
                setAllSub(data);
                var selOption = data.find(i => i.value == _id);
                setSelSubject(selOption);
            }).catch(err => {
                setIsLoading(false);
                setError('Error loading Subject');
            });
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
    const [getAllCls, setAllClass] = useState([]);
    const loadClasses = (_id) => {
        setIsLoading(true);
        setError('Loading...');
        axios.get(`${baseurl}api/mpeg/getClasses`)
            .then(res => {
                setIsLoading(false);
                setError('');
                // console.log(res.data.data);
                var data = res.data.data.map(({ id, className }) => {
                    return { value: id, label: className }
                });
                setAllClass(data);
                var selOption = data.find(i => i.value == _id);
                setSelClass(selOption);
            }).catch(err => {
                setIsLoading(false);
                setError('Error loading Class');
            });
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
    const [getAllContents, setAllContents] = useState([]);
    const loadContents = (_id) => {
        setIsLoading(true);
        setError('Loading...');
        const _params = {
            _id
        };
        axios.get(`${baseurl}api/mpeg/getContent`, {
            params: _params
        })
            .then(res => {
                setIsLoading(false);
                setError('');
                // console.log(res.data.data);
                var data = res.data.data.map(({ contentID }) => {
                    return { value: contentID, label: contentID }
                });
                data.unshift({ value: null, label: 'None' });
                setAllContents(data);
                var selOption = data.find(i => i.value == _id);
                setSelContentID(selOption);
            }).catch(err => {
                setIsLoading(false);
                setError('Error loading Class');
            });
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
                                <input type="hidden" ref={txtChapterId} />
                                <Form.Group controlId="chapterName">
                                    <Form.Label>Chapter Name</Form.Label>
                                    <Form.Control type="text" defaultValue="" ref={elmChapter} placeholder="Chapter Name" required />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="subject">
                                    <Form.Label>Subject</Form.Label>
                                    <Select value={getSelSubject} options={getAllSub} onChange={handleChange_Subject} ref={elmSubject} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="class">
                                    <Form.Label>Class</Form.Label>
                                    <Select value={getSelClass} options={getAllCls} onChange={handleChange_Class} ref={elmClass} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="contentID">
                                    <Form.Label>content ID</Form.Label>
                                    <Select value={getSelContentID} options={getAllContents} onChange={handleChange_ContentID} ref={elmContentID} />
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
