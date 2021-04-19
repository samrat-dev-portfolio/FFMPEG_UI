import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, Form, Row, Card, Table } from "react-bootstrap";
import axios from 'axios';
import Loading from '../Loading/Loading';
import { MDBIcon, MDBBtn } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddCsub.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function AddCsub() {
    // https://mdbootstrap.com/docs/react/content/icons-list/
    // https://mdbootstrap.com/docs/react/content/icons-usage/
    const baseurl = window.ffmpeg_baseurl;
    const [getIsLoading_Sub, setIsLoading_Sub] = useState(false);
    const [getError_Sub, setError_Sub] = useState('');

    const [getIsLoading_Cls, setIsLoading_Cls] = useState(false);
    const [getError_Cls, setError_Cls] = useState('');

    const [getAllCls, setAllClass] = useState([]);
    const [getAllSub, setAllSub] = useState([]);

    let tblCls = useRef(null);
    let tblClsHeader = useRef(null);
    let tblSub = useRef(null);
    let tblSubHeader = useRef(null);

    //#region Hooks 
    useEffect(() => {
        loadClasses();
        loadSubjects();
    }, []);
    //#endregion
    const loadClasses = () => {
        setIsLoading_Cls(true);
        setError_Cls('Loading...');
        axios.get(`${baseurl}api/mpeg/getClasses`)
            .then(res => {
                setAllClass(res.data.data);
                Calcwidth('cls');
                setIsLoading_Cls(false);
                setError_Cls('');
                // console.log(res.data.data);
            }).catch(err => {
                setIsLoading_Cls(false);
                setError_Cls('Error loading Class');
            });
    };
    const loadSubjects = () => {
        setIsLoading_Sub(true);
        setError_Sub('Loading...');
        axios.get(`${baseurl}api/mpeg/getSubject`)
            .then(res => {
                setAllSub(res.data.data);
                Calcwidth('sub');
                setIsLoading_Sub(false);
                setError_Sub('');
                // console.log(res.data.data);
            }).catch(err => {
                setIsLoading_Sub(false);
                setError_Sub('Error loading Subject');
            });
    };
    const Action_Click = ({ id }, e) => {
        if ('edit_sub' === e) {
            console.log(id, 'edit_sub');
        }
        else if ('delete_sub' === e) {
            console.log(id, 'delete_sub');
        }
        else if ('add_sub' === e) {
            console.log('add_sub');
        }
        else if ('edit_cls' === e) {
            console.log(id, 'edit_cls');
        }
        else if ('delete_cls' === e) {
            console.log(id, 'delete_cls');
        }
        else if ('add_cls' === e) {
            console.log('add_cls');
        }
    };
    const Calcwidth = (e) => {
        if ('cls' === e) {
            let h = parseInt(tblCls.current.clientHeight);
            let h_parent = parseInt(tblCls.current.parentElement.clientHeight);
            if (h > h_parent) {
                tblClsHeader.current.style.borderRight = '.9rem solid #cecece';
                // tblClsHeader.current.style.width = '98%';
            } else {
                tblClsHeader.current.style.borderRight = '0rem solid #cecece';
                // tblClsHeader.current.style.width = '100%';
            }
        } else if ('sub' === e) {
            let h = parseInt(tblSub.current.clientHeight);
            let h_parent = parseInt(tblSub.current.parentElement.clientHeight);
            if (h > h_parent) {
                tblSubHeader.current.style.borderRight = '.9rem solid #cecece';
            }
            else {
                tblSubHeader.current.style.borderRight = '0rem solid #cecece';
            }
        }
    };

    return (
        <Container fluid className="C_AddCsub">
            <Row className="h-100 m-0">
                <Col className="col-sm-12 col-md-10 col-lg-6 pt-3 mx-auto">
                    <Table striped bordered hover className="mb-0" ref={tblClsHeader}>
                        <thead>
                            <tr>
                                <th colSpan="3">
                                    Class List
                                    <span className="loading-error">{getError_Cls}</span>
                                    {
                                        getIsLoading_Cls ? <Loading /> : null
                                    }
                                </th>
                            </tr>
                            <tr>
                                <th style={{ width: '10%' }}>#</th>
                                <th style={{ width: '70%' }}>Description</th>
                                <th style={{ width: '20%' }}>Action</th>
                            </tr>
                        </thead>
                    </Table>
                    <div className="tblList-class">
                        <Table striped bordered hover ref={tblCls} className="mb-0">
                            <tbody>
                                {
                                    getAllCls.map((item, index) => {
                                        return <tr key={index}>
                                            <td style={{ width: '10%' }}>{index + 1}</td>
                                            <td style={{ width: '70%' }}>{item.className}</td>
                                            <td style={{ width: '20%' }} className="actions">
                                                <div>
                                                    <button title="edit Class" className="btnEdit" type="button" onClick={() => Action_Click(item, 'edit_cls')}>
                                                        <MDBIcon size="lg" icon="edit mdb-gallery-view-icon" />
                                                    </button>
                                                    <button title="Delete Class" className="btnDelete" type="button" onClick={() => Action_Click(item, 'delete_cls')}>
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
                    <Form noValidate>
                        <Table striped bordered hover className="mb-0">
                            <thead>
                                <tr>
                                    <td style={{ width: '10%' }}></td>
                                    <td style={{ width: '70%' }} className="py-1">
                                        <Form.Group controlId="Class_Name" className="my-0">
                                            <Form.Control type="text" autoComplete="off" placeholder="Class Name" required
                                                defaultValue=""
                                                onChange={(e) => { console.log(e.target.value); }} />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </td>
                                    <td className="actions py-1" style={{ width: '20%' }}>
                                        <MDBBtn size="sm" onClick={() => Action_Click({}, 'add_cls')} color="indigo" className="btnAdd">
                                            <MDBIcon size="lg" icon="plus-circle mdb-gallery-view-icon" className="ml-2" /> Add
                                        </MDBBtn>

                                    </td>
                                </tr>
                            </thead>
                        </Table>
                    </Form>
                </Col>
                <Col className="col-sm-12 col-md-10 col-lg-6 pt-3 mx-auto Subject">
                    <Table striped bordered hover className="mb-0" ref={tblSubHeader}>
                        <thead>
                            <tr>
                                <th colSpan="3">
                                    Subject List
                                    <span className="loading-error">{getError_Sub}</span>
                                    {
                                        getIsLoading_Sub ? <Loading /> : null
                                    }
                                </th>
                            </tr>
                            <tr>
                                <th style={{ width: '10%' }}>#</th>
                                <th style={{ width: '70%' }}>Description</th>
                                <th style={{ width: '20%' }}>Action</th>
                            </tr>
                        </thead>
                    </Table>
                    <div className="tblList-class">
                        <Table striped bordered hover ref={tblSub} className="mb-0">
                            <tbody>
                                {
                                    getAllSub.map((item, index) => {
                                        return <tr key={index}>
                                            <td style={{ width: '10%' }}>{index + 1}</td>
                                            <td style={{ width: '70%' }}>{item.subjectName}</td>
                                            <td style={{ width: '20%' }} className="actions">
                                                <div>
                                                    <button title="edit Class" className="btnEdit" type="button" onClick={() => Action_Click(item, 'edit_sub')}>
                                                        <MDBIcon size="lg" icon="edit mdb-gallery-view-icon" />
                                                    </button>
                                                    <button title="Delete Class" className="btnDelete" type="button" onClick={() => Action_Click(item, 'delete_sub')}>
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
                    <Form noValidate>
                        <Table striped bordered hover className="mb-0">
                            <thead>
                                <tr>
                                    <td style={{ width: '10%' }}></td>
                                    <td style={{ width: '70%' }} className="py-1">
                                        <Form.Group controlId="Subject_Name" className="my-0">
                                            <Form.Control type="text" autoComplete="off" placeholder="Subject Name" required
                                                defaultValue=""
                                                onChange={(e) => { console.log(e.target.value); }} />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </td>
                                    <td className="actions py-1" style={{ width: '20%' }}>
                                        <MDBBtn size="sm" onClick={() => Action_Click({}, 'add_sub')} color="indigo" className="btnAdd">
                                            <MDBIcon size="lg" icon="plus-circle mdb-gallery-view-icon" className="ml-2" /> Add
                                        </MDBBtn>

                                    </td>
                                </tr>
                            </thead>
                        </Table>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
