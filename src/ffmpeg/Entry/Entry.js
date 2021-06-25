import React from 'react';
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Entry.scss';
import { MDBIcon, MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function Entry(props) {
    const history = useHistory();
    const SignIn = () => {
        // console.log(history);
        history.push("/admin");
    };

    return (
        <Container fluid className="C_Entry bimg-page-1">
            <Row className="h-100">
                <Col className="col-9">
                    <MDBIcon onClick={SignIn} icon="sign-in-alt" className="sign-in" size="2x" />
                </Col>
                <Col className="col-3 p-0">
                    <div className="home_btn_row">
                        <Link className="home_btn" to="/home">
                            <MDBBtn color="amber">
                                Enter
                            </MDBBtn>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
