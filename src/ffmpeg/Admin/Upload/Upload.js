import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, Form, Row, Card, ProgressBar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Upload.scss';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Upload() {
    const baseurl = window.ffmpeg_baseurl;
    const [getIsLoading, setIsLoading] = useState(false);
    const [getError, setError] = useState('');
    const [getUnique_ID, setUnique_ID] = useState('');

    const [getContent_file_label, setContent_file_label] = useState('');
    const [getContent_file_alert, setContent_file_alert] = useState('');
    const [getContent_file, setContent_file] = useState(null);
    const [getFile_Title, setFile_Title] = useState('');
    const [getFile_UploadProgress, setFile_UploadProgress] = useState(0);

    const [validated, setValidated] = useState(false);
    const titleRef = useRef();

    //#region Hooks 
    useEffect(() => {
        setContent_file_label('Select any MP4 file');
        loadUnique_ID();
    }, []);

    //#endregion

    //#region Load API
    const loadUnique_ID = () => {
        setIsLoading(true);
        setError('');
        axios.get(`${baseurl}api/mpeg/UniquID`)
            .then(res => {
                setUnique_ID(res.data.Id);
                setIsLoading(false);
                // console.log(res.data.Id);
            }).catch(err => {
                setError('Error load unique ID');
                setIsLoading(false);
            });
    };
    //#endregion

    const change_file = (event) => {
        if (event.currentTarget.files) {
            if (event.currentTarget.files.length) {
                const { size, type, name } = event.currentTarget.files[0];
                // console.log(type);
                if ("video" != type.split('/')[0]) {
                    setContent_file_alert("Please select video file");
                    setContent_file_label('Select any MP4 file');
                } else {
                    setContent_file_alert("Size: " + bytesToSize(size));
                    setContent_file_label(name);
                    setContent_file(event.currentTarget.files[0]);
                    // console.log(event.currentTarget.files[0]);
                }
            }
        }
    };
    const bytesToSize = (bytes) => {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };
    const UploadProgress = (progressEvent) => {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setFile_UploadProgress(percentCompleted);
        // console.log(percentCompleted);
        // onUploadProgress: function (progressEvent) { UploadProgress(progressEvent); }
    };
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
            let formData = new FormData();
            formData.append('body', getContent_file);
            formData.append('uid', getUnique_ID);
            formData.append('file_name', getContent_file_label);
            formData.append('file_title', getFile_Title);
            // console.log(formData);

            const data = { uid: getUnique_ID, file_name: getContent_file_label, file_title: getFile_Title };
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
                onUploadProgress: function (progressEvent) { UploadProgress(progressEvent); }
            };
            axios.post(`${baseurl}api/Mpeg/UploadFile`, formData, config).then(function (res) {
                setError('SUCCESS!!');
                setIsLoading(false);
                // console.log(res);
                ResetAll();
            }).catch(err => {
                setError('Error post data');
                setIsLoading(false);
            });
        }
        setValidated(true);
    };
    const ResetAll = () => {
        setTimeout(() => {
            loadUnique_ID();
            setContent_file_alert('');
            setContent_file_label('Select any MP4 file');
            setContent_file(null);
            setFile_UploadProgress(0);
            titleRef.current.value = "";
            document.querySelector("#content_file").value = '';
            setValidated(false);
        }, 1000, true);
    };

    return (
        <Container fluid className="C_Upload">
            <Row className="h-100 m-0">
                <Col className="col-md-8 col-lg-6 pt-3">
                    <Card bg="light" text="dark" border="secondary">
                        <Card.Header>
                            Upload File <span className="loading-error">{getError}</span>
                            {
                                getIsLoading ? <Loading /> : null
                            }
                        </Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="Unique_ID">
                                    <Form.Label>Unique ID</Form.Label>
                                    <Form.Control type="text" defaultValue={getUnique_ID} placeholder="Unique ID" required readOnly />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="File_Title">
                                    <Form.Label>File Title</Form.Label>
                                    <Form.Control type="text" autoComplete="off" placeholder="File title" required
                                        defaultValue={getFile_Title}
                                        onChange={(e) => { setFile_Title(e.target.value); }} ref={titleRef} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Choose File</Form.Label>
                                    <Form.File name="content_file" id="content_file" custom>
                                        <Form.File.Input required onChange={change_file} />
                                        <Form.File.Label data-browse="Browse File">
                                            {getContent_file_label}
                                        </Form.File.Label>
                                        <Form.Text className="text-muted">
                                            {getContent_file_alert}
                                        </Form.Text>
                                    </Form.File>
                                    <ProgressBar variant="success" animated now={getFile_UploadProgress} />
                                </Form.Group>
                                <Button type="submit">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
