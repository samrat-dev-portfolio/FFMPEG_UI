import React from 'react';
import { Route, Switch, Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Entry.scss';

export default function Entry() {
    return (
        <Container fluid className="bimg-page-1">
            <Row className="h-100">
                <Col className="col-9"></Col>
                <Col className="col-3 p-0">
                    <div className="home_btn_row">
                        <Button variant="danger" size="lg" className="btn-enter">
                            <Link className="home_btn" to="/home">Enter</Link>
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
