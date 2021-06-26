import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Entry.scss';
import { MDBIcon, MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function Entry(props) {
    const { activation } = useSelector(state => state);
    const dispatch = useDispatch();
    const setAuth = () => {
        dispatch({
            type: 'SET_AUTH',
            payload: !activation.isAuth
        });
    }
    return (
        <Container fluid className="C_Entry bimg-page-1">
            <Row className="h-100">
                <Col className="col-9">
                    <input type="button" value="SetAuth" onClick={setAuth} />
                </Col>
                <Col className="col-3 p-0">
                    <div className="home_btn_row">
                        {
                            activation.isAuth ?
                                <Link className="home_btn" to="/home">
                                    <MDBBtn color="amber" className="indigo-text">
                                        Enter
                                        <MDBIcon size="lg" icon="caret-right" className="ml-2" />
                                    </MDBBtn>
                                </Link> :
                                <Link className="home_btn" to="/login">
                                    <MDBBtn color="dark">
                                        Login
                                        <MDBIcon size="lg" icon="sign-in-alt" className="ml-2" />
                                    </MDBBtn>
                                </Link>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
