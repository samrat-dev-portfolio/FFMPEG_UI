import React, { useState, useEffect, useRef } from 'react'
import { Container, Col, Row, Table, Button, InputGroup, FormControl, Pagination, Dropdown, ButtonGroup } from 'react-bootstrap';
import './Conversion.scss';
import axios from 'axios';
import Modal from '../Modal/Modal';
import Loading from '../Loading/Loading';
import Player from './../Player/Player';

export default function Conversion(props) {
    const baseurl = window.ffmpeg_baseurl;
    const [getIsLoading, setIsLoading] = useState(false);
    const [getError, setError] = useState('');
    const [getContent, setContent] = useState([]);
    let CProgressTimer = useRef(null);
    let LazyKeyupTimer = useRef(null);
    let contentInput = useRef(null);
    let contentInputT = useRef(null);
    let contentInputF = useRef(null);

    const [getModalData, setModalData] = useState([]);
    const [getShowModal, setShowModal] = useState(false);
    const [getShowModalHideBtn, setShowModalHideBtn] = useState(false);
    const [getPageItems, setPageItems] = useState([]);
    const [getContentParams, setContentParams] = useState({
        "pageindex": 0,
        "limit": 7
    });

    const [getLoadPlayer, setLoadPlayer] = useState(false);
    const [getPlayerContentID, setPlayerContentID] = useState(null);

    //#region Hooks 
    useEffect(() => {
        loadContent(getContentParams);
    }, []);
    //#endregion

    const loadContent = (_params) => {
        setIsLoading(true);
        setError('Loading...');
        axios.get(`${baseurl}api/mpeg/getContentPage`, {
            params: _params
        }).then(res => {
            setContent(res.data.data);
            let { pageindex, totalPage } = res.data;
            let PageItems = [];
            for (let p = 0; p < totalPage; p++) {
                PageItems.push(<Pagination.Item key={p} onClick={() => { pageChange(p) }} active={p == pageindex}>{p + 1}</Pagination.Item>);
            }
            setPageItems(PageItems);
            setIsLoading(false);
            setError('');
            // console.log(res.data);
        }).catch(err => {
            setIsLoading(false);
            setError('Error loading Content');
        });
    };
    const pageChange = p_index => {
        setContentParams(prevData => {
            let data = { ...prevData, "pageindex": p_index };
            loadContent(data);
            return data;
        });
    };
    const LazyKeyup = (_callback) => {
        clearTimeout(LazyKeyupTimer.current);
        LazyKeyupTimer.current = setTimeout(() => {
            _callback();
            // _callback.call(this, _args);
        }, 1000);
    };
    const searchByContentID = _contentID => {
        contentInputT.current.value = '';
        contentInputF.current.value = '';
        LazyKeyup(() => {
            setContentParams(prevData => {
                let data = { ...prevData, "contentID": _contentID, "pageindex": 0 };
                delete data["contentTitle"];
                delete data["contentFileName"];
                loadContent(data);
                return data;
            });
        });
    };
    const searchByContentTitle = _contentTitle => {
        contentInput.current.value = '';
        contentInputF.current.value = '';
        LazyKeyup(() => {
            setContentParams(prevData => {
                let data = { ...prevData, "contentTitle": _contentTitle, "pageindex": 0 };
                delete data["contentID"];
                delete data["contentFileName"];
                loadContent(data);
                return data;
            });
        });
    };
    const orderByThis = (orderby, desc) => {
        setContentParams(prevData => {
            let data = { ...prevData, orderby, desc };
            // console.log(data);
            loadContent(data);
            return data;
        });
    };
    const searchByContentFile = _contentFileName => {
        contentInput.current.value = '';
        contentInputT.current.value = '';
        LazyKeyup(() => {
            setContentParams(prevData => {
                let data = { ...prevData, "contentFileName": _contentFileName, "pageindex": 0 };
                delete data["contentID"];
                delete data["contentTitle"];
                loadContent(data);
                return data;
            });
        });
    };

    const update_modal = (msg, is_reset) => {
        if (msg == null) {
            setModalData([]);
            return;
        }
        if ('string' === typeof msg) {
            if (!is_reset) {
                setModalData(prevState => [msg, ...prevState]);
            } else {
                setModalData([msg]);
            }
        }
    };
    const Start_Click = ({ contentID, contentFileName }, e) => {
        if ('start' === e) {
            setShowModal(true);
            axios.get(`${baseurl}api/mpeg/MediaInfo/${contentID}`, {
                params: {
                    fname: contentFileName,
                }
            }).then(res => {
                // console.log(res);
                let { duration, fps, frame } = res.data;
                if (typeof duration === 'undefined') {
                    update_modal(`Video not exist!`, false);
                    setShowModalHideBtn(true);
                    return;
                }
                update_modal('Ready for Conversion...', false);
                update_modal(`Video duration ${duration}, fps ${fps} and frame ${frame}`, false);
                CreateKey(contentID, function () {
                    Convertfile(contentID, contentFileName);
                    frame_progress(contentID, res.data);
                });
            }).catch(err => {
                console.log(err);
                update_modal(err, false);
                setShowModalHideBtn(true);
            });
        }
        else if ('progress' === e) {
            setShowModal(true);
            axios.get(`${baseurl}api/mpeg/MediaInfo/${contentID}`, {
                params: {
                    fname: contentFileName,
                }
            })
                .then(res => {
                    let { duration, fps, frame } = res.data;
                    if (typeof duration === 'undefined') {
                        update_modal(`Video not exist!`, false);
                        setShowModalHideBtn(true);
                        return;
                    }
                    update_modal(`Video duration ${duration}, fps ${fps} and frame ${frame}`, false);
                    frame_progress(contentID, res.data);
                })
                .catch(err => {
                    console.log(err);
                    update_modal(err, false);
                    setShowModalHideBtn(true);
                });
        }
        else if ('restore' === e) {
            setShowModal(true);
            RestoreKey2SD(contentID);
        }
        else if ('remove' === e) {
            setShowModal(true);
            RemoveKeyFromSD(contentID);
        }
        else if ('delete' === e) {
            if (confirm('are you sure to delete ' + contentID)) {
                Deletecontent(contentID);
            }
        }
        else if ('play' === e) {
            setPlayerContentID(contentID);
            setLoadPlayer(true);
        }
        else if ('attach' === e) {
            console.log(contentID, 'attach');
        }
    };
    const CreateKey = (contentID, callback) => {
        update_modal('Ready for generate key file...', false);
        const config = {
            headers: {
                'content-type': 'application/json',
            }
        };
        const body = { Id: contentID };
        axios.post(`${baseurl}api/mpeg/CreateKey`, body, config).then(res => {
            // console.log(res);
            update_modal('key generated successfully', false);
            callback();
        }).catch(err => {
            console.log(err);
            update_modal(err, false);
            setShowModalHideBtn(true);
        });
    };
    const Convertfile = (contentID, contentFileName) => {
        update_modal('Ready for encryption...', false);
        axios.get(`${baseurl}api/mpeg/Conversion/${contentID}`, {
            params: {
                fname: contentFileName,
            }
        }).then(res => {
            // console.log(res);
            update_modal('video file encrypted successfully...', false);
        }).catch(err => {
            console.log(err);
            update_modal(err, false);
            setShowModalHideBtn(true);
        });
    };
    const frame_progress = (contentID, { frame }) => {
        update_modal('keep watching the encryption progress...', false);
        CProgressTimer.current = setInterval(() => {
            axios.get(`${baseurl}api/mpeg/ConversionProgressInfo/${contentID}`, {
                params: {}
            }).then(res => {
                // console.log(res.data);
                const { status, currentFrame } = res.data;
                if ('continue' === status) {
                    let percent = parseInt((currentFrame / frame) * 100);
                    // setCProgress(percent + '%');
                    update_modal(`encryption progress ${percent}%`, false);
                }
                else if ('end' === status) {
                    // console.log('end');
                    update_modal(`encryption progress 100% completed`, false);
                    ConversionEnded(contentID, function () {
                        clearInterval(CProgressTimer.current);
                        setShowModalHideBtn(true);
                    });
                }
            }).catch(err => {
                console.log(err);
                clearInterval(CProgressTimer.current);
                update_modal(err, false);
                setShowModalHideBtn(true);
            });
        }, 10000);
    };
    const ConversionEnded = (contentID, callback) => {
        const config = {
            headers: {
                'content-type': 'application/json',
            }
        };
        const body = { Id: contentID };
        axios.post(`${baseurl}api/mpeg/ConversionEnded`, body, config).then(res => {
            // console.log(res);
            update_modal(res.data.data, false);
            callback();
        }).catch(err => {
            console.log(err);
            update_modal(err, false);
            setShowModalHideBtn(true);
        });
    };
    const RestoreKey2SD = (contentID) => {
        const config = {
            headers: {
                'content-type': 'application/json',
            }
        };
        const body = { Id: contentID };
        axios.post(`${baseurl}api/mpeg/RestoreKey2SD`, body, config).then(res => {
            // console.log(res);
            update_modal(res.data.data, false);
            setShowModalHideBtn(true);
        }).catch(err => {
            console.log(err);
            update_modal(err, false);
            setShowModalHideBtn(true);
        });
    };
    const Deletecontent = (contentID) => {
        setIsLoading(true);
        const config = {
            headers: {
                'content-type': 'application/json',
            }
        };
        const body = { Id: contentID };
        axios.post(`${baseurl}api/mpeg/Deletecontent`, body, config).then(res => {
            setIsLoading(false);
            // console.log(res);
            loadContent(getContentParams);
        }).catch(err => {
            setError('Error');
            setIsLoading(false);
            // console.log(err);
            loadContent(getContentParams);
        });
    };
    const RemoveKeyFromSD = (contentID) => {
        const config = {
            headers: {
                'content-type': 'application/json',
            }
        };
        const body = { Id: contentID };
        axios.post(`${baseurl}api/mpeg/RemoveKeyFromSD`, body, config).then(res => {
            // console.log(res);
            update_modal(res.data.data, false);
            setShowModalHideBtn(true);
        }).catch(err => {
            console.log(err);
            update_modal(err, false);
            setShowModalHideBtn(true);
        });
    };
    const hideModal = () => {
        update_modal(null, true);
        setShowModal(false);
        setShowModalHideBtn(false);
        loadContent(getContentParams);
    };
    const hidePlayer = () => {
        setLoadPlayer(false);
    };

    return (
        <Container fluid className="C_Conversion">
            <Player show={getLoadPlayer} contentID={getPlayerContentID} onhide={hidePlayer} />
            <Modal show={getShowModal} list={getModalData} onhide={hideModal} hide_visible={getShowModalHideBtn} />
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
                                <th>#</th>
                                <th>
                                    <div className="td-filter-box">
                                        Content ID
                                        <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search by ID"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                                onKeyUp={(e) => { searchByContentID(e.target.value); }}
                                                ref={contentInput}
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
                                                onKeyUp={(e) => { searchByContentTitle(e.target.value); }}
                                                ref={contentInputT}
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
                                                onKeyUp={(e) => { searchByContentFile(e.target.value); }}
                                                ref={contentInputF}
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
                                                        <Button style={{ marginRight: '.7rem' }} onClick={() => { orderByThis('contentID', 'false'); }}>ID</Button>
                                                        <Button onClick={() => { orderByThis('contentID', 'true'); }}>Desc</Button>
                                                    </ButtonGroup>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                    <ButtonGroup size="sm">
                                                        <Button style={{ marginRight: '.7rem' }} onClick={() => { orderByThis('contentTitle', 'false'); }}>Title</Button>
                                                        <Button onClick={() => { orderByThis('contentTitle', 'true'); }}>Desc</Button>
                                                    </ButtonGroup>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                    <ButtonGroup size="sm">
                                                        <Button style={{ marginRight: '.7rem' }} onClick={() => { orderByThis('contentFileName', 'false'); }}>File Name</Button>
                                                        <Button onClick={() => { orderByThis('contentFileName', 'true'); }}>Desc</Button>
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
                                                <span>
                                                    <Button variant="outline-info" size="sm" className="mr-1 mb-1" onClick={() => Start_Click(item, 'start')}>Start</Button>
                                                    <Button variant="outline-danger" size="sm" className="mb-1" onClick={() => Start_Click(item, 'delete')}>Delete</Button>
                                                </span> :
                                                item.IsConversion == '1' ?
                                                    <Button variant="outline-info" size="sm" onClick={() => Start_Click(item, 'progress')}>Progress</Button> :
                                                    <span>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="info" size="sm" id="dropdown-content" className="mr-1 mb-1">
                                                                Content &nbsp;
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => Start_Click(item, 'play')}>Play</Dropdown.Item>
                                                                {/* <Dropdown.Item onClick={() => Start_Click(item, 'attach')}>Attach Chapter</Dropdown.Item> */}
                                                                <Dropdown.Item className="danger" onClick={() => Start_Click(item, 'delete')}>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="info" size="sm" id="dropdown-key" className="mb-1">
                                                                Key &nbsp;
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => Start_Click(item, 'restore')}>Restore to device</Dropdown.Item>
                                                                <Dropdown.Item className="danger" onClick={() => Start_Click(item, 'remove')}>Remove from device</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </span>
                                        }
                                        </td>
                                    </tr>;
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col className="col-12 pt-3">
                    <Pagination size="sm">{getPageItems}</Pagination>
                </Col>
            </Row>
        </Container>
    )
}
