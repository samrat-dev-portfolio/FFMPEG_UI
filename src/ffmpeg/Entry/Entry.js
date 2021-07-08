import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Row } from "react-bootstrap";
// import axios from 'axios';
// import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Entry.scss';
import { MDBIcon, MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { ToastAlert, Toast } from '../Admin/Toast/Toast';
import CheckIsActivated from './../Admin/Activation/CheckIsActivated';

export default function Entry(props) {
    const { activation } = useSelector(state => state);
    // const baseurl = window.ffmpeg_baseurl;
    // const dispatch = useDispatch();
    // const history = useHistory();

    useEffect(() => {
       
    }, []);

    return (
        <Container fluid className="C_Entry bimg-page-1">
            <CheckIsActivated />
            <Row className="h-100">
                <Col className="col-9">
                </Col>
                <Col className="col-3 p-0">
                    <div className="home_btn_row">
                        {
                            !activation.isActivate ?
                                !activation.loading_CheckActivation && <Link className="home_btn" to="/activation">
                                    <MDBBtn color="success" className="">
                                        Activate
                                        <MDBIcon size="lg" icon="shield-alt" className="ml-2" />
                                    </MDBBtn>
                                </Link> :
                                !activation.isAuth ?
                                    <Link className="home_btn" to="/login">
                                        <MDBBtn color="dark">
                                            Login
                                            <MDBIcon size="lg" icon="sign-in-alt" className="ml-2" />
                                        </MDBBtn>
                                    </Link> :
                                    <Link className="home_btn" to="/home">
                                        <MDBBtn color="amber" className="indigo-text">
                                            Enter
                                            <MDBIcon size="lg" icon="caret-right" className="ml-2" />
                                        </MDBBtn>
                                    </Link>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
