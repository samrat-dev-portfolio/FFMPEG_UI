import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row, Card, ProgressBar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { MDBIcon, MDBBtn } from "mdbreact";
import './Settings.scss';

export default function RemoteAuthUrl() {
    const baseurl = window.ffmpeg_baseurl;
    const [getIsLoading, setIsLoading] = useState(false);
    const [getError, setError] = useState('');
    const [secret, setSecret] = useState('');
    const [remoteUrl, setRemoteUrl] = useState('');

    useEffect(() => {
        GetRemoteUrl();
    }, []);
    const GetRemoteUrl = () => {
        setIsLoading(true);
        axios.get(`${baseurl}api/mpeg/GetRemoteUrl`)
            .then(res => {
                // console.log(res.data);
                if (res.data.data) {
                    const url = res.data.data[0].url || '';
                    setRemoteUrl(url);
                }
                setIsLoading(false);
            }).catch(err => {
                setError('Error');
                setIsLoading(false);
            });
    };

    const handleSubmit = () => {
        const body = {
            url: remoteUrl,
            secret
        };
        const config = {
            headers: {
                'content-type': 'application/json',
            }
        };
        setIsLoading(true);
        axios.post(`${baseurl}api/mpeg/SetRemoteUrl`, body, config)
            .then(res => {
                setIsLoading(false);
                console.log(res.data.data);
                setError(res.data.data);
                GetRemoteUrl();
                setRemoteUrl('');
                setSecret('');
            }).catch(err => {
                setError('Error');
                setIsLoading(false);
            });
    }

    return (
        <Col className="col-12 col-sm-12 col-md-8 col-lg-6 pt-3">
            <Card>
                <Card.Header>
                    Admin Domain Url
                    <span className="loading-error">{getError}</span>
                    {
                        getIsLoading ? <Loading /> : null
                    }
                </Card.Header>
                <Card.Body>
                    <Form noValidate>
                        <Form.Group controlId="Secret">
                            <Form.Label>Secret</Form.Label>
                            <Form.Control type="text" autoComplete="off" placeholder="Secret" required
                                value={secret}
                                onChange={(e) => { setSecret(e.target.value); }} />
                        </Form.Group>
                        <Form.Group controlId="Secret">
                            <Form.Label>Domain Url<span className="label_eg">(e.g. http://localhost:3000)</span></Form.Label>
                            <Form.Control type="text" autoComplete="off" placeholder="Remote Url" required
                                value={remoteUrl}
                                onChange={(e) => { setRemoteUrl(e.target.value); }} />
                        </Form.Group>
                        <MDBBtn type="submit" color="indigo" size="md" onClick={handleSubmit}>
                            <MDBIcon icon="save" size="2x" />
                            &nbsp;&nbsp;Save Url
                        </MDBBtn>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    )
}
