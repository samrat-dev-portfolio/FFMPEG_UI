import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Col, Container, Form, Row, Card, Table, ProgressBar } from "react-bootstrap";
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
    const [getIsLoading, setIsLoading] = useState(false);
    const [getError, setError] = useState('');

    const [getAllCls, setAllClass] = useState([]);
    const [getAllSub, setAllSub] = useState([]);
    let tblCls = useRef(null);
    let tblClsHeader = useRef(null);

    //#region Hooks 
    useEffect(() => {
        loadClasses();
    }, []);
    //#endregion
    const loadClasses = () => {
        // setLoading_class({ enabled: true, alert: 'Loading...' });
        axios.get(`${baseurl}api/mpeg/getClasses`)
            .then(res => {
                setAllClass(res.data.data);
                Calcwidth('cls');
                // setLoading_class({ enabled: false, alert: '' });
                // console.log(res.data.data);
            }).catch(err => {
                // setLoading_class({ enabled: true, alert: 'Error' });
            });
    };
    const Action_Click = ({ id }, e) => {
        if ('edit' === e) {
            console.log(id, 'edit');
        }
        else if ('delete' === e) {
            console.log(id, 'delete');
        }
        else if ('add' === e) {
            console.log('add');
        }
    };
    const Calcwidth = (e) => {
        if ('cls' === e) {
            let h = parseInt(tblCls.current.clientHeight);
            let h_parent = parseInt(tblCls.current.parentElement.clientHeight);
            if (h > h_parent) {
                tblClsHeader.current.style.width = '98%';
            } else {
                tblClsHeader.current.style.width = '100%';
            }
        }
    };

    return (
        <Container fluid className="C_AddCsub">
            <Row className="h-100 m-0">
                <Col className="col-md-10 col-lg-6 pt-3 mx-auto">
                    <Table striped bordered hover className="mb-0" ref={tblClsHeader}>
                        <thead>
                            <tr>
                                <th colSpan="3">
                                    Class List
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
                                                    <button title="edit Class" type="button" onClick={() => Action_Click(item, 'edit')}>
                                                        <MDBIcon size="lg" icon="edit mdb-gallery-view-icon" />
                                                    </button>
                                                    <button title="Delete Class" type="button" onClick={() => Action_Click(item, 'delete')}>
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
                                    <td style={{ width: '80%' }} className="py-1">
                                        <Form.Group controlId="Class_Name" className="my-0">
                                            <Form.Control type="text" autoComplete="off" placeholder="Class Name" required
                                                defaultValue=""
                                                onChange={(e) => { console.log(e.target.value); }} />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </td>
                                    <td className="actions py-1" style={{ width: '20%' }}>
                                        <button title="Add Class" type="button" onClick={() => Action_Click({}, 'add')}>
                                            <MDBIcon size="2x" icon="plus-circle mdb-gallery-view-icon" />
                                        </button>
                                    </td>
                                </tr>
                            </thead>
                        </Table>
                    </Form>
                </Col>
                <Col className="col-md-10 col-lg-6 pt-3 mx-auto">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th colSpan="3">
                                    Subject List
                                </th>
                            </tr>
                            <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </Table>
                </Col>
            </Row>
            <Row className="h-100 m-0">
                <Col className="col-md-8 col-lg-6 pt-3">
                    <Card bg="light" text="dark" border="secondary" >
                        <Card.Header> &nbsp;
                            <span className="loading-error">{getError}</span>
                            {
                                getIsLoading ? <Loading /> : null
                            }
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Add Subjects</Card.Title>
                            <Form noValidate>
                                <Form.Group controlId="Subject_Name">
                                    <Form.Label>Subject Name</Form.Label>
                                    <Form.Control type="text" autoComplete="off" placeholder="Subject Name" required
                                        defaultValue=""
                                        onChange={(e) => { console.log(e.target.value); }} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" variant="info" size="sm">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
