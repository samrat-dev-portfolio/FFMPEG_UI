import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, Form, Row, Card, Table, Pagination, Dropdown, ButtonGroup, InputGroup, FormControl } from "react-bootstrap";
import Loading from '../Loading/Loading';
import { MDBIcon, MDBBtn } from "mdbreact";
import { ToastAlert } from '../../Admin/Toast/Toast';
import axios from 'axios';
import moment from 'moment';
import './Activation.scss';
const log = console.log;

export default function KeyGenerator() {
  const baseurl = window.ffmpeg_baseurl;
  const [getIsLoading, setIsLoading] = useState(false);
  const [getError, setError] = useState('');

  const [getAppId, setAppId] = useState('');
  const [getSerialKey, setSerialKey] = useState('');
  const [getCopyKeyGen, setCopyKeyGen] = useState('');
  const [disabledRegister, setDisabledRegister] = useState(false);

  const [getAllKeyGens, setAllKeyGens] = useState([]);
  const [getKeyGenParams, setKeyGenParams] = useState({
    "pageindex": 0,
    "limit": 5
  });
  const [getPageItems, setPageItems] = useState([]);
  const Limitoptions = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '50', label: '50' },
    { value: '100', label: '100' }
  ];
  const [getCardBodyShow, setCardBodyShow] = useState(true);

  let LazyKeyupTimer = useRef(null);
  let appIDInput = useRef(null);
  let SKeyInput = useRef(null);
  let ToggleTarget = useRef(null);

  //#region Hooks 
  useEffect(() => {
    loadAppID();
    LoadAllKeyGens(getKeyGenParams);
  }, []);

  //#endregion
  const loadAppID = () => {
    setIsLoading(true);
    axios.post(`${baseurl}api/mpeg/LicenseGenerateKey`)
      .then(res => {
        setAppId(res.data.appId);
        setSerialKey(res.data.serialKey);
        setIsLoading(false);
        setCopyKeyGen(res.data);
        setDisabledRegister(false)
        // console.log(res.data);
      }).catch(err => {
        ToastAlert("Error load License Generate Key", 'e');
        setIsLoading(false);
      });
  };
  const today = () => {
    return moment().local().format('YYYY-MM-DD HH:mm:ss');
  }
  const copyKeyGen = () => {
    // console.log(getCopyKeyGen);
    var textArea = document.createElement("textarea");
    textArea.value = JSON.stringify(getCopyKeyGen);
    document.body.appendChild(textArea);
    // textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      // console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      // console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
    ToastAlert('Copied', 's');

  }
  const handleSubmit = () => {
    const config = {
      headers: {
        'content-type': 'application/json',
      }
    };
    const body = { LicenceAppId: getAppId, LicenceKey: getSerialKey, creationDate: today() };
    setIsLoading(true);
    axios.post(`${baseurl}api/mpeg/AddLicenseKeyGen`, body, config).then(res => {
      // console.log(res);
      if (res.data.data)
        ToastAlert(res.data.data, 's');
      if (res.data.error)
        ToastAlert(res.data.error, 'e');
      setIsLoading(false);
      setDisabledRegister(true);
      LoadAllKeyGens(getKeyGenParams);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
  }
  const LoadAllKeyGens = (_params) => {
    setIsLoading(true);
    axios.get(`${baseurl}api/mpeg/getLicenseKeyGens`, {
      params: _params
    }).then(res => {
      setAllKeyGens(res.data.data);
      let { pageindex, totalPage } = res.data;
      let PageItems = [];
      for (let p = 0; p < totalPage; p++) {
        PageItems.push(<Pagination.Item key={p} onClick={() => { pageChange(p) }} active={p == pageindex}>{p + 1}</Pagination.Item>);
      }
      setPageItems(PageItems);
      setIsLoading(false);
      // setError('');
      // console.log(res.data);
    }).catch(err => {
      setIsLoading(false);
      setError('Error loading Content');
    });
  }
  const LazyKeyup = (_callback) => {
    clearTimeout(LazyKeyupTimer.current);
    LazyKeyupTimer.current = setTimeout(() => {
      _callback();
      // _callback.call(this, _args);
    }, 1000);
  };
  const searchByAppID = _appID => {
    SKeyInput.current.value = '';
    LazyKeyup(() => {
      setKeyGenParams(prevData => {
        let data = { ...prevData, "appId": _appID, "pageindex": 0 };
        delete data["serialKey"];
        LoadAllKeyGens(data);
        return data;
      });
    });
  };
  const searchBySKey = _SKey => {
    appIDInput.current.value = '';
    LazyKeyup(() => {
      setKeyGenParams(prevData => {
        let data = { ...prevData, "serialKey": _SKey, "pageindex": 0 };
        delete data["appId"];
        LoadAllKeyGens(data);
        return data;
      });
    });
  };
  const pageChange = p_index => {
    setKeyGenParams(prevData => {
      let data = { ...prevData, "pageindex": p_index };
      LoadAllKeyGens(data);
      return data;
    });
  };
  const toggleCardBody = () => {
    setCardBodyShow(prev => {
      let elm = ToggleTarget.current;
      if (!elm) return;
      let h = elm.offsetHeight;
      if (prev) {
        elm.classList.add('minimize-zone-active')
        setTimeout(() => {
          elm.style.marginTop = `-${h}px`;
        }, 100);
      } else {
        elm.style.marginTop = `0px`;
        setTimeout(() => {
          elm.classList.remove('minimize-zone-active')
        }, 300);
      }
      return !prev;
    });
  }

  return (
    <Container fluid className="C_KeyGenerator">
      <Row className="h-100 m-0">
        <Col className="col-md-8 col-lg-6 pt-3">
          <Card>
            <Card.Header>
              {disabledRegister ? "Reload New KeyGen" : "Key Generator"}
              <span className="loading-error">{getError}</span>
              {
                getIsLoading ? <Loading /> : null
              }
              <span className="minimize-card" onClick={toggleCardBody}>
                <MDBIcon icon={getCardBodyShow ? 'minus' : 'plus'} />
              </span>
            </Card.Header>
            {
              <Card.Body ref={ToggleTarget} className="minimize-zone">
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="App_ID">
                    <Form.Label>App ID</Form.Label>
                    <MDBIcon icon="redo-alt" className="indigo-text refresh-btn" size="lg" title="Refresh KeyGen" onClick={loadAppID} />
                    <MDBIcon icon="copy" className="green-text refresh-btn" size="lg" title="Copy KeyGen" onClick={copyKeyGen} />
                    <Form.Control type="text" defaultValue={getAppId} placeholder="App ID" readOnly />
                  </Form.Group>
                  <Form.Group controlId="Serial_Key">
                    <Form.Label>Serial Key</Form.Label>
                    <Form.Control type="text" defaultValue={getSerialKey} placeholder="Serial Key" readOnly />
                  </Form.Group>
                  <MDBBtn type="button" color="indigo" size="sm" onClick={handleSubmit} disabled={disabledRegister}>
                    <MDBIcon icon="save" />&nbsp;&nbsp;Register
                  </MDBBtn>
                </Form>
              </Card.Body>
            }
          </Card>
        </Col>
        <Col className="col-12 pt-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div className="td-filter-box">
                    App ID
                    <InputGroup size="sm" className="">
                      <FormControl
                        placeholder="Search by App ID"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onKeyUp={(e) => { searchByAppID(e.target.value); }}
                        ref={appIDInput}
                      />
                    </InputGroup>
                  </div>
                </th>
                <th>
                  <div className="td-filter-box">
                    Serial Key
                    <InputGroup size="sm" className="">
                      <FormControl
                        placeholder="Search by serial Key"
                        aria-label=""
                        aria-describedby="basic-addon2"
                        onKeyUp={(e) => { searchBySKey(e.target.value); }}
                        ref={SKeyInput}
                      />
                    </InputGroup>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                getAllKeyGens.map((item, index) => {
                  return <tr key={index}>
                    <td>{item.appId}</td>
                    <td>{item.serialKey}</td>
                    <td>{item.creationDate}</td>
                  </tr>;
                })
              }
            </tbody>
          </Table>
        </Col>
        <Col className="col-8 pt-3 pagination-wrapper">
          <Pagination size="sm">{getPageItems}</Pagination>
        </Col>
      </Row>
    </Container>
  )
}
