import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Col, Container, Form, Row, Card, Table, ProgressBar } from "react-bootstrap";
import axios from 'axios';
import Loading from '../Loading/Loading';
import { MDBIcon, MDBBtn } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddChap.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function AddChap() {
    const baseurl = window.ffmpeg_baseurl;
    // const [getIsLoading_Sub, setIsLoading_Sub] = useState(false);
    // const [getError_Sub, setError_Sub] = useState('');
    // const [getAllCls, setAllClass] = useState([]);
    // let tblCls = useRef(null);

    //#region Hooks 
    useEffect(() => {

    }, []);
    //#endregion

    const Action_Click = ({ id }, e) => {
        if ('edit_sub' === e) {
            console.log(id, 'edit_sub');
        }
    };
    return (
        <Container fluid className="C_AddCsub">
            <Row className="h-100 m-0">
                <Col className="col-sm-12 col-md-10 col-lg-6 pt-3 mx-auto">
                    Chapter
                </Col>
            </Row>
        </Container>
    )
}
