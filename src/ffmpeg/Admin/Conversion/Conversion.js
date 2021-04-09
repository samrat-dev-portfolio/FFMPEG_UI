import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Table, Button, InputGroup, FormControl, Pagination, Dropdown, ButtonGroup } from 'react-bootstrap';
import './Conversion.scss';
import axios from 'axios';

export default function Conversion(props) {
    const baseurl = window.ffmpeg_baseurl;

    const [getLoading_Content, setLoading_Content] = useState({ enabled: false, alert: '' });
    const [getContent, setContent] = useState([]);

    //#region Hooks 
    useEffect(() => {
        loadContent();
    }, []);
    //#endregion

    const loadContent = () => {
        setLoading_Content({ enabled: true, alert: 'Loading...' });
        axios.get(`${baseurl}api/mpeg/getContent`)
            .then(res => {
                setContent(res.data.data);
                setLoading_Content({ enabled: false, alert: '' });
                // console.log(res.data.data);
            }).catch(err => {
                setLoading_Content({ enabled: true, alert: 'Error' });
            });
    };
    const Start_Click = ({ contentID, contentFileName }, e) => {
        if ('start' === e) {
            axios.get(`${baseurl}api/mpeg/MediaInfo/${contentID}`, {
                params: {
                    fname: contentFileName,
                }
            }).then(res => {
                console.log(res);
                CreateKey(contentID, function () {
                    Convertfile(res.data, contentID, contentFileName);
                    // frame progress calculation
                });
            }).catch(err => {
                console.log(err);
            });
        }
        else if ('play' === e) {
            console.log(id, 'p');
        }
        else if ('delete' === e) {
            console.log(id, 'd');
        }
    };
    const CreateKey = (contentID, callback) => {
        const config = {
            headers: {
                'content-type': 'application/json',
            }
        };
        // const body = JSON.stringify({ Id: contentID });
        const body = { Id: contentID };
        axios.post(`${baseurl}api/mpeg/CreateKey`, body, config).then(res => {
            console.log(res);
            callback();
        }).catch(err => {
            console.log(err);
        });
    };
    const Convertfile = (MediaInfo, contentID, contentFileName) => {
        axios.get(`${baseurl}api/mpeg/Conversion/${contentID}`, {
            params: {
                fname: contentFileName,
            }
        }).then(res => {
            console.log(res);

        }).catch(err => {
            console.log(err);
        });
        // console.log(MediaInfo, contentID, contentFileName);
    };

    //#region Pagination
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} href={"#admin/conversion?offset=" + number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }
    //#endregion

    return (
        <Container fluid className="C_Conversion">
            <Row className="h-100 m-0">
                <Col className="col-12 pt-3">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>
                                    <div className="td-filter-box">
                                        Content ID
                                        <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search by ID"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                            />
                                        </InputGroup>
                                    </div>
                                </th>
                                <th>
                                    <div className="td-filter-box">
                                        Content Title
                                        <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search by Title"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                            />
                                        </InputGroup>
                                    </div>
                                </th>
                                <th>
                                    <div className="td-filter-box">
                                        File Name
                                        <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search by File Name"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                            />
                                        </InputGroup>
                                    </div></th>
                                <th>
                                    <div className="td-filter-box">
                                        Action
                                        <Dropdown>
                                            <Dropdown.Toggle size="sm" variant="light" id="dropdown-basic">
                                                Sort By &nbsp;&nbsp;
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">
                                                    <ButtonGroup size="sm">
                                                        <Button className="mr-1">ID</Button>
                                                        <Button>Desc</Button>
                                                    </ButtonGroup>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                    <ButtonGroup size="sm">
                                                        <Button className="mr-1">File Name</Button>
                                                        <Button>Desc</Button>
                                                    </ButtonGroup>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getContent.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.contentID}</td>
                                        <td>{item.contentTitle}</td>
                                        <td>{item.contentFileName}</td>
                                        <td>{
                                            item.IsConversion == '0' ?
                                                <Button variant="outline-info" size="sm" onClick={() => Start_Click(item, 'start')}>Start</Button> :
                                                <span>
                                                    <Button variant="info" size="sm" className="mr-1 mb-1" onClick={() => Start_Click(item.contentID, 'play')}>Play</Button>
                                                    <Button variant="danger" size="sm" className="mb-1" onClick={() => Start_Click(item.contentID, 'delete')}>Delete</Button>
                                                </span>
                                        }</td>
                                    </tr>;
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col className="col-12 pt-3 d-none">
                    <Pagination size="sm">{items}</Pagination>
                </Col>
            </Row>
        </Container>
    )
}
