import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row, Card, ProgressBar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { MDBIcon, MDBBtn } from "mdbreact";
import './Settings.scss';

export default function Settings() {
    const baseurl = window.ffmpeg_baseurl;
    const [getIsLoading, setIsLoading] = useState(false);
    const [getError, setError] = useState('');
    const [secret, setSecret] = useState('');
    const [havepassword, setHavepassword] = useState(false);

    useEffect(() => {
        SQliteHavePassword();
    }, []);
    const SQliteHavePassword = () => {
        setIsLoading(true);
        axios.get(`${baseurl}api/mpeg/SQliteHavePassword`)
            .then(res => {
                setHavepassword(res.data.data);
                setIsLoading(false);
                // console.log(res.data);
            }).catch(err => {
                setError('Error load SQliteHavePassword');
                setIsLoading(false);
            });
    };

    const handleSubmit = type => {
        const _params = {
            secret,
            type
        };
        setIsLoading(true);
        axios.get(`${baseurl}api/mpeg/SQliteChangePassword`, {
            params: _params
        })
            .then(res => {
                setIsLoading(false);
                // console.log(res.data.data);
                setError(res.data.data);
                SQliteHavePassword();
                setSecret('');
            }).catch(err => {
                setError('Error');
                setIsLoading(false);
            });
    }

    return (
        <Container fluid className="C_Settings">
            <Row className="h-100 m-0">
                <Col className="col-md-8 col-lg-6 pt-3">
                    <Card>
                        <Card.Header>
                            DB Encryption
                            {
                                havepassword ?
                                    <MDBIcon icon="unlock" size="2x" className="float-right" /> :
                                    <MDBIcon icon="lock-open" size="2x" className="float-right" />
                            }

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
                                {
                                    havepassword ?
                                        <MDBBtn type="submit" color="indigo" size="md" onClick={() => handleSubmit('remove')}>
                                            <MDBIcon icon="lock-open" size="2x" />
                                    &nbsp;&nbsp;Remove Password
                                </MDBBtn> :
                                        <MDBBtn type="submit" color="indigo" size="md" onClick={() => handleSubmit('add')}>
                                            <MDBIcon icon="unlock" size="2x" />
                                &nbsp;&nbsp;Add Password
                            </MDBBtn>
                                }
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
