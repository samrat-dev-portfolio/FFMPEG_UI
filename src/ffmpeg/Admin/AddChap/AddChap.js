import React, { useState, useEffect, useRef, Component } from 'react';
import { Button, Col, Container, Form, Row, Card, Table, InputGroup, FormControl, Pagination, Dropdown, ButtonGroup } from "react-bootstrap";
import axios from 'axios';
import Loading from '../Loading/Loading';
import { MDBIcon, MDBBtn } from "mdbreact";
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddChap.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Add from './Add/Add';

export default function AddChap() {
    // https://react-select.com/home
    const baseurl = window.ffmpeg_baseurl;
    const [getIsLoading, setIsLoading] = useState(false);
    const [getError, setError] = useState('');
    let contentInput = useRef(null);
    const [getRecords, setRecords] = useState([]);
    const [getSelectedLimit, setSelectedLimit] = useState(null);
    let tblRecords = useRef(null);
    const [getPageItems, setPageItems] = useState([]);
    const [getChapterParams, setChapterParams] = useState({
        "pageindex": 0,
        "limit": 10
    });
    const Limitoptions = [
        { value: '10', label: '10' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
    ]
    const [getshowAdd, setshowAdd] = useState(false);
    const [getAddData, setAddData] = useState({});

    //#region Hooks 
    useEffect(() => {
        loadChapters(getChapterParams);
        setSelectedLimit({ value: '10', label: '10' });
    }, []);
    //#endregion  
    const loadChapters = (_params) => {
        setIsLoading(true);
        setError('Loading...');
        axios.get(`${baseurl}api/mpeg/getChapterFilter`, {
            params: _params
        })
            .then(res => {
                // console.log(res.data);
                setRecords(res.data.data);
                let { pageindex, totalPage } = res.data;
                //#region Pagination
                let PageItems = [];
                if (parseInt(pageindex) > 0) {
                    PageItems.push(<Pagination.Item key={'prev'} onClick={() => { pageChange(parseInt(pageindex) - 1) }}>
                        <MDBIcon icon="angle-double-left" size="lg" />
                    </Pagination.Item>);
                }
                for (let p = 0; p < totalPage; p++) {
                    PageItems.push(<Pagination.Item key={p} onClick={() => { pageChange(p) }} active={p == pageindex}>
                        {parseInt(p) + 1}
                    </Pagination.Item>);
                }
                if (parseInt(pageindex) < parseInt(totalPage)) {
                    PageItems.push(<Pagination.Item key={'next'} onClick={() => { pageChange(parseInt(pageindex) + 1) }}>
                        <MDBIcon icon="angle-double-right" size="lg" />
                    </Pagination.Item>);
                }
                //#endregion
                setPageItems(PageItems);
                setIsLoading(false);
                setError('');
            }).catch(err => {
                setIsLoading(false);
                setError('Error loading Chapter');
            });
    };
    const pageChange = p_index => {
        setChapterParams(prevData => {
            let data = { ...prevData, "pageindex": p_index };
            loadChapters(data);
            return data;
        });
    };
    const orderByThis = (orderby, desc) => {
        setChapterParams(prevData => {
            let data = { ...prevData, orderby, desc };
            // console.log(data);
            loadChapters(data);
            return data;
        });
    };
    const searchBy = (_val, e) => {
        console.log(_val, e);
    };
    const handleChange_limit = (e) => {
        setSelectedLimit(e);
        setChapterParams(prevData => {
            let data = { ...prevData, "limit": e.value, "pageindex": 0 };
            loadChapters(data);
            return data;
        });
    };
    const Action_Click = (item, e) => {
        if ('add_new' == e) {
            setAddData({
                e: 'add'
            });
            setshowAdd(true);
        }
        else if ('edit' == e) {
            console.log(item);
            setAddData({
                e: 'edit',
                data: item
            });
            setshowAdd(true);
        }
        else if ('remove' == e) {
            console.log(item);
            setAddData({
                e: 'remove',
                data: item
            });
            setshowAdd(true);
        }
    };
    const hideAddForm = () => {
        loadChapters(getChapterParams);
        setshowAdd(false);
    };

    return (
        <Container fluid className="C_AddChap">
            <Row>
                {
                    getshowAdd ? <Add onhide={hideAddForm} data={getAddData} /> : null
                }
            </Row>
            <Row className="h-100 m-0">
                <Col className="col-12 pt-3">
                    <span className="loading-error">{getError}</span>
                    {
                        getIsLoading ? <Loading /> : null
                    }
                </Col>
                <Col className="col-12">
                    <Table striped bordered hover className="mb-0">
                        <thead>
                            <tr>
                                <th style={{ width: '35%' }}>
                                    <div className="td-filter-box">
                                        Chapter
                                    <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                                onKeyUp={(e) => { searchBy(e.target.value, 'chap'); }}
                                                ref={contentInput}
                                            />
                                        </InputGroup>
                                    </div>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <div className="td-filter-box">
                                        Class
                                    <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                                onKeyUp={(e) => { searchBy(e.target.value, 'cls'); }}
                                                ref={contentInput}
                                            />
                                        </InputGroup>
                                    </div>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <div className="td-filter-box">
                                        Subject
                                    <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search"
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
                                                placeholder="Search"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                                onKeyUp={(e) => { searchBy(e.target.value, 'content_id'); }}
                                                ref={contentInput}
                                            />
                                        </InputGroup>
                                    </div>
                                </th>
                                <th style={{ width: '15%' }}>
                                    <div className="td-filter-box">
                                        Action
                                    <Dropdown>
                                            <Dropdown.Toggle size="sm" variant="light" id="dropdown-basic">
                                                Sort By &nbsp;&nbsp;
                                        </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">
                                                    <ButtonGroup size="sm">
                                                        <Button style={{ marginRight: '.7rem' }} onClick={() => { orderByThis('chapterName', 'false'); }}>Chapter</Button>
                                                        <Button onClick={() => { orderByThis('chapterName', 'true'); }}>Desc</Button>
                                                    </ButtonGroup>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                    <ButtonGroup size="sm">
                                                        <Button style={{ marginRight: '.7rem' }} onClick={() => { orderByThis('classId', 'false'); }}>Class</Button>
                                                        <Button onClick={() => { orderByThis('classId', 'true'); }}>Desc</Button>
                                                    </ButtonGroup>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                    <ButtonGroup size="sm">
                                                        <Button style={{ marginRight: '.7rem' }} onClick={() => { orderByThis('subjectId', 'false'); }}>Subject</Button>
                                                        <Button onClick={() => { orderByThis('subjectId', 'true'); }}>Desc</Button>
                                                    </ButtonGroup>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                    <ButtonGroup size="sm">
                                                        <Button style={{ marginRight: '.7rem' }} onClick={() => { orderByThis('contentID', 'false'); }}>contentID</Button>
                                                        <Button onClick={() => { orderByThis('contentID', 'true'); }}>Desc</Button>
                                                    </ButtonGroup>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
                                            <td style={{ width: '35%' }}>{item.chapterName}</td>
                                            <td style={{ width: '10%' }}>{item.classId}</td>
                                            <td style={{ width: '10%' }}>{item.subjectId}</td>
                                            <td style={{ width: '30%' }}>{item.contentID}</td>
                                            <td style={{ width: '15%' }} className="actions">
                                                <div>
                                                    <button title="Change" className="btnEdit" type="button" onClick={() => Action_Click(item, 'edit')}>
                                                        <MDBIcon size="lg" icon="edit mdb-gallery-view-icon" />
                                                    </button>
                                                    <button title="Remove" className="btnDelete" type="button" onClick={() => Action_Click(item, 'remove')}>
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
                <Col className="col-4 pt-3">
                    <table className="lmt">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="y"> Limit: </div>
                                    <Select value={getSelectedLimit} className="x" options={Limitoptions} onChange={handleChange_limit} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
                <Col className="col-8 pt-3 pagination-wrapper">
                    <Pagination size="sm">{getPageItems}</Pagination>
                </Col>
                <Col className="col-12 pt-3">
                    <MDBBtn size="sm" onClick={() => Action_Click({}, 'add_new')} color="indigo" className="btnAdd">
                        <MDBIcon size="lg" icon="plus-circle mdb-gallery-view-icon" className="ml-2" />&nbsp; Add New
                    </MDBBtn>
                    <p>
                        delete fn baki, <br /> 
                        contentid load which is not set, <br /> 
                        show class-sub-name instead of id
                    </p>
                </Col>
            </Row>
        </Container>
    )
}
