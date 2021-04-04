import React from 'react'
import { Route, Switch, Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss';

export default function Header(props) {
    return (
        <Container fluid className="C_Header bimg-page-2 p-0">
            <Row className="h-100 gutter m-0">
                <Col className="col-6 logo-1"></Col>
                <Col className="col-6 space-1">
                    <div className="b-orange h-100">
                        <div className="h-100 row space-2 m-0">
                            <div className="col-4 pr-0 b-red content-box c-white d-flex center-xy">
                                {props.selected_class}
                    </div>
                            <div className="col-8 pl-0 b-green content-box c-white d-flex center-xy">
                                {props.selected_chapter}
                    </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
