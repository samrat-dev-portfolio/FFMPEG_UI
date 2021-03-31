import React, { useState, useEffect } from 'react'
import { Route, Switch, Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Content.scss';

export default function Content(props) {

    return (
        <Container fluid className="bimg-page-2">
            <Row className="h-100 gutter">
                <Col className="col-12 b-orange py-1 b-radius-1 shadow-1">
                    <Row>
                        <Col className="col-3 pl-4">
                            Shreni
                        </Col>
                        <Col className="col-3 pl-4">
                            Bishoy
                        </Col>
                        <Col className="col-6 pl-4">
                            Adhay Suchi
                         </Col>
                    </Row>
                </Col>
                <Col className="col-12 b-red b-radius-2 space-3">
                    <Row className="h-100">
                        <Col className="col-3 pr-0 content-box">
                            <div className="h-100 b-color-1 b-radius-3">
                                <ul className="list-group grp-1">
                                    {props.my_class}
                                </ul>
                            </div>
                        </Col>
                        <Col className="col-3 pr-0 content-box">
                            <div className="h-100 b-color-1 b-radius-3">
                                <ul className="list-group grp-2">
                                    <li className="list-group-item">Cras justo odio</li>
                                    <li className="list-group-item">Dapibus ac facilisis in</li>
                                    <li className="list-group-item">Morbi leo risus</li>
                                    <li className="list-group-item">Porta ac consectetur ac</li>
                                    <li className="list-group-item">Vestibulum at eros</li>
                                </ul>
                            </div>
                        </Col>
                        <Col className="col-6 pr-0 content-box">
                            <ul className="list-group grp-3">
                                <li className="list-group-item">Cras justo odio</li>
                                <li className="list-group-item">Dapibus ac facilisis in</li>
                                <li className="list-group-item">Morbi leo risus</li>
                                <li className="list-group-item">Porta ac consectetur ac</li>
                                <li className="list-group-item">Vestibulum at eros</li>
                                <li className="list-group-item">Cras justo odio</li>
                                <li className="list-group-item">Dapibus ac facilisis in</li>
                                <li className="list-group-item">Morbi leo risus</li>
                                <li className="list-group-item">Porta ac consectetur ac</li>
                                <li className="list-group-item">Vestibulum at eros</li>
                                <li className="list-group-item">Cras justo odio</li>
                                <li className="list-group-item">Dapibus ac facilisis in</li>
                                <li className="list-group-item">Morbi leo risus</li>
                                <li className="list-group-item">Porta ac consectetur ac</li>
                                <li className="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>
    )
}
