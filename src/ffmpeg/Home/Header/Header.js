import React from 'react'
import { Route, Switch, Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss';
import styled from 'styled-components';

export default function Header(props) {
    const SubjectDetails = styled.span`
       font-size: smaller;
       letter-spacing: 1px;
    `;
    const ChaptertDetails = styled.span`
       font-weight: 100;
       letter-spacing: 1px;
    `;
    return (
        <Container fluid className="C_Header bimg-page-2 p-0">
            <Row className="gutter m-0">
                <Col className="col-4 logo-1"></Col>
                <Col className="col-8 head-details">
                    <div className="b-orange">
                        <Col className="col-4 b-red c-white center-xy d-flex" style={{ flexDirection: 'column' }}>
                            <div>
                                {props.selected_class}
                            </div>
                            <SubjectDetails>
                                {
                                    props.selected_subject ? props.selected_subject : ''
                                }
                            </SubjectDetails>
                        </Col>
                        <Col className="col-8 b-green c-white center-xy d-flex">
                            <ChaptertDetails>
                                {props.selected_chapter}
                            </ChaptertDetails>
                        </Col>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
