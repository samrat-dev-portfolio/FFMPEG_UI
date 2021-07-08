import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Activation.scss';

import { MDBIcon, MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

function Login(props) {
    const { activation } = useSelector(state => state);
    const dispatch = useDispatch();
    const setAuth = () => {
        dispatch({
            type: 'SET_AUTH',
            payload: !activation.isAuth
        });
    }

    return (
        <Container className="C_Login">
            <Row className="h-100">
                <Col className="col-9 mt-3" style={{ border: '1px dashed red' }}>
                    <h2> login form</h2>
                    <input type="button" value="getDB" hidden />
                    <p>{activation.isAuth ? 'Authenticated' : 'Please login'}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
