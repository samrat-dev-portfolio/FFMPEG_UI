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
    //#region Class
    const [getIsLoading_Cls, setIsLoading_Cls] = useState(false);
    const [getError_Cls, setError_Cls] = useState('');
    const [getAllCls, setAllClass] = useState([]);
    let tblCls = useRef(null);
    let tblClsHeader = useRef(null);

    const [getIsEditCls, setIsEditCls] = useState(false);
    let txtCls = useRef(null);
    let txtClsId = useRef(null);
    //#endregion

    //#region Subject
    const [getIsLoading_Sub, setIsLoading_Sub] = useState(false);
    const [getError_Sub, setError_Sub] = useState('');
    const [getAllSub, setAllSub] = useState([]);
    let tblSub = useRef(null);
    let tblSubHeader = useRef(null);

    const [getIsEditSub, setIsEditSub] = useState(false);
    let txtSub = useRef(null);
    let txtSubId = useRef(null);
    //#endregion

    //#region Hooks 
    useEffect(() => {
        loadClasses();
        loadSubjects();
    }, []);
    //#endregion
    const loadClasses = () => {
        setIsLoading_Cls(true);
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
    const PostCls = ({ name, id, e }) => {
        setIsLoading_Cls(true);
        const config = {
            headers: {
                'content-type': 'application/json',
            }
        };
        let body = null;
        let post_url = null;

        if ('update_cls' === e) {
            body = { name, id };
            post_url = `${baseurl}api/mpeg/PutClass`;
        }
        else if ('add_cls' === e) {
            body = { name };
            post_url = `${baseurl}api/mpeg/AddClass`;
        }
        else if ('delete_cls' === e) {
            body = { id };
            post_url = `${baseurl}api/mpeg/RemoveClass`;
        }
        if (post_url == null || body == null) return;
        axios.post(post_url, body, config).then(res => {
            setError_Cls(res.data.data);
            // console.log(res);
            loadClasses();
        }).catch(err => {
            // console.log(err);
            setError_Cls('Error to save data');
        });
    };
    const PostSub = ({ name, id, e }) => {
        setIsLoading_Sub(true);
        const config = {
            headers: {
                'content-type': 'application/json',
            }
        };
        let body = null;
        let post_url = null;

        if ('update_sub' === e) {
            body = { name, id };
            post_url = `${baseurl}api/mpeg/PutSubject`;
        }
        else if ('add_sub' === e) {
            body = { name };
            post_url = `${baseurl}api/mpeg/AddSubject`;
        }
        else if ('delete_sub' === e) {
            body = { id };
            post_url = `${baseurl}api/mpeg/RemoveSubject`;
        }
        if (post_url == null || body == null) return;
        axios.post(post_url, body, config).then(res => {
            setError_Sub(res.data.data);
            // console.log(res);
            loadSubjects();
        }).catch(err => {
            // console.log(err);
            setError_Sub('Error to save data');
        });
    };
    const Action_Click = ({ id, className, subjectName }, e) => {
        if ('edit_cls' === e) {
            // console.log(id, className, 'edit_cls');
            txtClsId.current.value = id;
            txtCls.current.value = className;
            setIsEditCls(true);
            highlight_Edit(id);
        }
        else if ('update_cls' === e) {
            // console.log('update_cls', txtClsId.current.value, txtCls.current.value);
            if (txtCls.current.value == '') return;
            if (txtClsId.current.value == '') return;
            PostCls({ name: txtCls.current.value, id: txtClsId.current.value, e });
            setTimeout(() => {
                txtClsId.current.value = '';
                txtCls.current.value = '';
                setIsEditCls(false);
                highlight_Edit(null);
            }, 200);
        }
        else if ('delete_cls' === e) {
            // console.log(id, 'delete_cls');
            if (id == '') return;
            PostCls({ id, e });
        }
        else if ('add_cls' === e) {
            // console.log('add_cls', txtCls.current.value);
            if (txtCls.current.value == '') return;
            PostCls({ name: txtCls.current.value, e });
            setTimeout(() => {
                txtCls.current.value = '';
            }, 200);
        }
        else if ('edit_sub' === e) {
            // console.log(id, subjectName, 'edit_sub');
            txtSubId.current.value = id;
            txtSub.current.value = subjectName;
            setIsEditSub(true);
            highlight_Edit_Sub(id);
        }
        else if ('update_sub' === e) {
            // console.log('update_sub', txtSubId.current.value, txtSub.current.value);
            if (txtSub.current.value == '') return;
            if (txtSubId.current.value == '') return;
            PostSub({ name: txtSub.current.value, id: txtSubId.current.value, e });
            setTimeout(() => {
                txtSubId.current.value = '';
                txtSub.current.value = '';
                setIsEditSub(false);
                highlight_Edit(null);
                highlight_Edit_Sub(null);
            }, 200);
        }
        else if ('delete_sub' === e) {
            if (id == '') return;
            PostSub({ id, e });
        }
        else if ('add_sub' === e) {
            if (txtSub.current.value == '') return;
            PostSub({ name: txtSub.current.value, e });
            setTimeout(() => {
                txtSub.current.value = '';
            }, 200);
        }
    };
    const Calcwidth = (e) => {
        if ('cls' === e) {
            if (typeof tblCls.current === 'undefined') return;
            let h = parseInt(tblCls.current.clientHeight);
            let h_parent = parseInt(tblCls.current.parentElement.clientHeight);
            if (typeof tblClsHeader.current === 'undefined') return;
            if (h > h_parent) {
                tblClsHeader.current.style.borderRight = '.9rem solid #cecece';
                // tblClsHeader.current.style.width = '98%';
            } else {
                tblClsHeader.current.style.borderRight = '0rem solid #cecece';
                // tblClsHeader.current.style.width = '100%';
            }
        } else if ('sub' === e) {
            if (typeof tblSub.current === 'undefined') return;
            let h = parseInt(tblSub.current.clientHeight);
            let h_parent = parseInt(tblSub.current.parentElement.clientHeight);
            if (typeof tblClsHeader.current === 'undefined') return;
            if (h > h_parent) {
                tblSubHeader.current.style.borderRight = '.9rem solid #cecece';
            }
            else {
                tblSubHeader.current.style.borderRight = '0rem solid #cecece';
            }
        }
    };
    const highlight_Edit = (id) => {
        document.querySelectorAll('.tr_cls').forEach(i => {
            i.classList.remove('active');
        });
        if (id)
            document.querySelector('.tr_cls_' + id).classList.add('active');
    };
    const highlight_Edit_Sub = (id) => {
        document.querySelectorAll('.tr_sub').forEach(i => {
            i.classList.remove('active');
        });
        if (id)
            document.querySelector('.tr_sub_' + id).classList.add('active');
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
                                        return <tr key={index} className={'tr_cls tr_cls_' + item.id}>
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
                                                defaultValue="" ref={txtCls} />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </td>
                                    <td className="actions py-1" style={{ width: '20%' }}>
                                        <input type="hidden" ref={txtClsId} />
                                        {getIsEditCls ?
                                            <MDBBtn size="sm" onClick={() => Action_Click({}, 'update_cls')} color="indigo" className="btnAdd">
                                                <MDBIcon size="lg" icon="save" className="ml-2" /> Update
                                            </MDBBtn> :
                                            <MDBBtn size="sm" onClick={() => Action_Click({}, 'add_cls')} color="indigo" className="btnAdd">
                                                <MDBIcon size="lg" icon="plus-circle mdb-gallery-view-icon" className="ml-2" /> Add
                                            </MDBBtn>
                                        }
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
                                        return <tr key={index} className={'tr_sub tr_sub_' + item.id}>
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
                                                defaultValue="" ref={txtSub} />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </td>
                                    <td className="actions py-1" style={{ width: '20%' }}>
                                        <input type="hidden" ref={txtSubId} />
                                        {getIsEditSub ?
                                            <MDBBtn size="sm" onClick={() => Action_Click({}, 'update_sub')} color="indigo" className="btnAdd">
                                                <MDBIcon size="lg" icon="save" className="ml-2" /> Update
                                            </MDBBtn> :
                                            <MDBBtn size="sm" onClick={() => Action_Click({}, 'add_sub')} color="indigo" className="btnAdd">
                                                <MDBIcon size="lg" icon="plus-circle mdb-gallery-view-icon" className="ml-2" /> Add
                                            </MDBBtn>
                                        }
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
