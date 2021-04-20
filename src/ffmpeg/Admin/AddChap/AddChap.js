import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Col, Container, Form, Row, Card, Table, InputGroup, FormControl } from "react-bootstrap";
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
    const [getIsLoading, setIsLoading] = useState(false);
    const [getError, setError] = useState('');
    let contentInput = useRef(null);
    const [getRecords, setRecords] = useState([]);
    let tblRecords = useRef(null);

    //#region Hooks 
    useEffect(() => {

    }, []);
    //#endregion

    const searchBy = (_val, e) => {
        console.log(_val, e);
    };

    return (
        <Container fluid className="C_AddCsub">
            <Row className="h-100 m-0">
                <Col className="col-12 pt-3">
                    <span className="loading-error">{getError}</span>
                    {
                        getIsLoading ? <Loading /> : null
                    }
                </Col>
                <Col className="col-12 pt-3">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '35%' }}>
                                    <div className="td-filter-box">
                                        Chapter
                                    <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search by Chapter"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                                onKeyUp={(e) => { searchBy(e.target.value, 'chap'); }}
                                                ref={contentInput}
                                            />
                                        </InputGroup>
                                    </div>
                                </th>
                                <th style={{ width: '15%' }}>
                                    <div className="td-filter-box">
                                        Class
                                    <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search by Class"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                                onKeyUp={(e) => { searchBy(e.target.value, 'cls'); }}
                                                ref={contentInput}
                                            />
                                        </InputGroup>
                                    </div>
                                </th>
                                <th style={{ width: '15%' }}>
                                    <div className="td-filter-box">
                                        Subject
                                    <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search by Subject"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                                onKeyUp={(e) => { searchBy(e.target.value, 'sub'); }}
                                                ref={contentInput}
                                            />
                                        </InputGroup>
                                    </div>
                                </th>
                                <th style={{ width: '30%' }}>
                                    <div className="td-filter-box">
                                        Content ID
                                    <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search by ContentID"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                                onKeyUp={(e) => { searchBy(e.target.value, 'content_id'); }}
                                                ref={contentInput}
                                            />
                                        </InputGroup>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </Table>
                    <div className="tblList-class">
                        <Table striped bordered hover ref={tblRecords} className="mb-0">
                            <tbody>
                                {
                                    getRecords.map((item, index) => {
                                        return <tr key={index} className={'tr_cls tr_cls_' + item.id}>
                                            <td style={{ width: '10%' }}>{index + 1}</td>
                                            <td style={{ width: '20%' }} className="actions">
                                                <div>
                                                    <button title="Change" className="btnEdit" type="button" onClick={() => console.log(item, 'change')}>
                                                        <MDBIcon size="lg" icon="edit mdb-gallery-view-icon" />
                                                    </button>
                                                    <button title="Remove" className="btnDelete" type="button" onClick={() => console.log(item, 'remove')}>
                                                        <MDBIcon size="lg" icon="trash-alt mdb-gallery-view-icon" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>;
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
