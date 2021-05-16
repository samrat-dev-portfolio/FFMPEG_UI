import React from 'react'
import { Route, Switch, Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss';

export default function Header(props) {
    return (
        <Container fluid className="C_Header bimg-page-2 p-0">
            <Row className="gutter m-0">
                <Col className="col-6 logo-1"></Col>
                <Col className="col-6 head-details">
                    <div className="b-orange">
                        <Col className="col-4 b-red c-white center-xy d-flex">
                            {props.selected_class}
                        </Col>
                        <Col className="col-8 b-green c-white center-xy d-flex">
                            {props.selected_chapter}
                        </Col>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
