import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Entry.scss';
import { MDBIcon, MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import IsActivated from '../Admin/Activation/IsActivated';
import { ToastAlert, Toast } from '../Admin/Toast/Toast';

export default function Entry(props) {
    const { activation } = useSelector(state => state);
    const baseurl = window.ffmpeg_baseurl;
    const [getIsLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        CheckIsActivated();
    }, []);

    const CheckIsActivated = async () => {
        const res = await IsActivated(baseurl);
        // console.log(res.data);
        const activated = res.data.activated || false;
        const activated_alert = res.data.data || "";
        dispatch({
            type: 'SET_ACTIVATION',
            payload: activated
        });
        if (!activated) {
            ToastAlert(activated_alert, 'w');
        }
    };
 
    return (
        <Container fluid className="C_Entry bimg-page-1">
            <Toast />
            <Row className="h-100">
                <Col className="col-9">
                    <button type="button" hidden>IsolatedStorage_ReadAppId</button> <br />
                </Col>
                <Col className="col-3 p-0">
                    <div className="home_btn_row">
                        {
                            !activation.isActivate ?
                                <Link className="home_btn" to="/activation">
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
