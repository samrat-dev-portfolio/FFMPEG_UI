import React, { useState, useEffect } from 'react'
// import { Route, Switch, Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Content.scss';
import ProgressAlert from '../ProgressAlert/ProgressAlert';

export default function Content(props) {

    return (
        <Container fluid className="C_Content bimg-page-2 p-0">
            <Row className="h-100 gutter m-0">
                <Col className="col-12 b-orange py-1 b-radius-1 shadow-1">
                    <Row>
                        <Col className="col-2 pl-4">
                            Shreni
                        </Col>
                        <Col className="col-3 pl-4">
                            Bishoy
                        </Col>
                        <Col className="col-7 pl-4">
                            Adhay Suchi
                         </Col>
                    </Row>
                </Col>
                <Col className="col-12 b-red b-radius-2 space-3">
                    <Row className="h-100 m-0">
                        <Col className="col-2 pr-0 content-box">
                            {
                                props.loading_class.enabled ?
                                    <ProgressAlert alert={props.loading_class.alert} /> : null
                            }
                            <div className="h-100 b-color-1 b-radius-3">
                                <ul className="list-group grp-1">
                                    {props.my_class}
                                </ul>
                            </div>
                        </Col>
                        <Col className="col-3 pr-0 content-box">
                            {
                                props.loading_subject.enabled ?
                                    <ProgressAlert alert={props.loading_subject.alert} /> : null
                            }
                            <div className="h-100 b-color-1 b-radius-3">
                                <ul className="list-group grp-2">
                                    {props.my_subject}
                                </ul>
                            </div>
                        </Col>
                        <Col className="col-7 pr-0 content-box">
                            {
                                props.loading_chapter.enabled ?
                                    <ProgressAlert alert={props.loading_chapter.alert} /> : null
                            }
                            <ul className="list-group grp-3">
                                {props.my_chapter}
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>
    )
}
