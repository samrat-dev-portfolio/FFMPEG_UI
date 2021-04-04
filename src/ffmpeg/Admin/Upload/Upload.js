import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Upload.scss';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Upload() {
    const baseurl = window.ffmpeg_baseurl;
    const [getIsLoading, setIsLoading] = useState(false);
    const [getUnique_ID, setUnique_ID] = useState('');
    const [getContent_file_label, setContent_file_label] = useState('');
    const [getContent_file_alert, setContent_file_alert] = useState('');
    const [getContent_file, setContent_file] = useState(null);

    const [validated, setValidated] = useState(false);
    //#region Hooks 
    useEffect(() => {
        setContent_file_label('Select any MP4 file');
        loadUnique_ID();
    }, []);

    //#endregion

    //#region Load API
    const loadUnique_ID = () => {
        setIsLoading(true);
        axios.get(`${baseurl}api/mpeg/UniquID`)
            .then(res => {
                setUnique_ID(res.data.Id);
                setIsLoading(false);
                // console.log(res.data.Id);
            }).catch(err => {
            });
    };
    //#endregion

    const change_file = (event) => {
        if (event.currentTarget.files) {
            const { size, type, name } = event.currentTarget.files[0];
            console.log(type);
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
    };
    const bytesToSize = (bytes) => {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        const isValid = form.checkValidity();
        if (isValid === false) {
            console.log(" Not Ready");
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
                        <Card.Header>
                            Upload File
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
                                    <Form.Control type="text" autoComplete="off" placeholder="File title" required />
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
