import React, { useState, useEffect, useRef } from 'react';
import { MDBIcon, MDBBtn } from "mdbreact";
import { Button, Col, Container, Form, Row, Card, ProgressBar } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import './Activation.scss';
import { ToastAlert } from '../../Admin/Toast/Toast';
import { Toast } from '../Toast/Toast';
import BrandAnimation from '../BrandAnimation/BrandAnimation';
import Loading from '../Loading/Loading';
import { useHistory } from 'react-router-dom';
const log = console.log;

export default function Activation() {
  const { activation } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const baseurl = window.ffmpeg_baseurl;
 
  useEffect(() => {
    loadDeviceID();
  }, []);

  //#region auth section 
  const [getToken, setToken] = useState('');
  const [getValidFrom, setValidFrom] = useState('');
  const [getValidTo, setValidTo] = useState('');
  const [getError, setError] = useState('');

  const AuthGetToken = () => {
    let post_url = `${baseurl}api/mpeg/AuthGetToken`;
    let body = {
      "Username": "Samrat",
      "Password": "123"
    };
    const config = {
      headers: {
        'content-type': 'application/json',
      }
    };
    axios.post(post_url, body, config).then(res => {
      setError(res.data.data);
      setIsLoading(false);
      const { token, validFrom, validTo } = res.data;
      setToken(token);
      setValidFrom(Utc2Local(validFrom));
      setValidTo(Utc2Local(validTo));
      // console.log(token);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
  }
  const AdminData = (token) => {
    let post_url = `${baseurl}api/mpeg/AdminData`;
    let body = {};
    const config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    axios.post(post_url, body, config).then(res => {
      setError(res.data.data);
      setIsLoading(false);
      console.log(res);
    }).catch(err => {
      // console.log(JSON.stringify(err));
      let status = (err.response || {}).statusText || '';
      console.log(status);
      setIsLoading(false);
    });

  }
  const Utc2Local = str => {
    // https://momentjs.com/docs/#/parsing/string-format/
    let dt = str;
    if (dt) {
      var x = moment.utc(dt, 'MM-DD-YYYY LTS');
      dt = x.local().format('MM-DD-YYYY LTS');
    }
    return dt;
  }
  //#endregion
  
  const [getIsLoading, setIsLoading] = useState(false);
  const [getAppId, setAppId] = useState('');
  const [getSerialKey, setSerialKey] = useState('');
  const [getDeviceId, setDeviceId] = useState('');
  const [getClientName, setClientName] = useState('');
  const [getDesc, setDesc] = useState('');
  
  const setActivation = () => {
    dispatch({
      type: 'SET_ACTIVATION',
      payload: true
      // payload: !activation.isActivate
    });
  }
  const today = () => {
    return moment().local().format('YYYY-MM-DD HH:mm:ss');
  }
  const loadDeviceID = () => {
    setIsLoading(true);
    axios.post(`${baseurl}api/mpeg/DeviceInfo`)
      .then(res => {
        setDeviceId(res.data.deviceId);
        setIsLoading(false);
        // console.log(res.data);
      }).catch(err => {
        ToastAlert("Error load DeviceId", 'e');
        setIsLoading(false);
      });
  };
  const handleSubmit = () => {
    const config = {
      headers: {
        'content-type': 'application/json',
      }
    };
    const body = {
      LicenceAppId: getAppId,
      LicenceKey: getSerialKey,
      DeviceId: getDeviceId,
      ClientName: getClientName,
      Desc: getDesc,
      activationDate: today()
    };
    console.log(body);
    setActivation();
    history.push('/');
    // setIsLoading(true);
    // axios.post(`${baseurl}api/mpeg/AddLicenseKeyGen`, body, config).then(res => {
    //   // console.log(res);
    //   if (res.data.data)
    //     ToastAlert(res.data.data, 's');
    //   if (res.data.error)
    //     ToastAlert(res.data.error, 'e');
    //   setIsLoading(false);
    //   setDisabledRegister(true);
    //   LoadAllKeyGens(getKeyGenParams);
    // }).catch(err => {
    //   console.log(err);
    //   setIsLoading(false);
    // });
  }
  // const pasteData = (type) => {
  // }

  return (
    <div className="C_Activation">
      <Toast />
      <div style={{ position: 'relative' }}>
        <BrandAnimation />
      </div>
      <Container fluid className="C_Activation">
        <Row className="h-100 m-0">
          <Col className="col-md-8 col-lg-6 pt-3">
            <Card>
              <Card.Header>
                Key Activation
                {
                  getIsLoading ? <Loading /> : null
                }
              </Card.Header>
              <Card.Body>
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="Device_ID">
                    <Form.Label>Device ID</Form.Label>
                    <Form.Control type="text" defaultValue={getDeviceId} placeholder="Device ID" readOnly />
                  </Form.Group>
                  <Form.Group controlId="App_ID">
                    <Form.Label>App ID</Form.Label>
                    <Form.Control type="text" autoComplete="off" defaultValue={getAppId} onChange={(e) => setAppId(e.target.value)} placeholder="App ID" />
                  </Form.Group>
                  <Form.Group controlId="Serial_Key">
                    <Form.Label>Serial Key</Form.Label>
                    <Form.Control type="text" autoComplete="off" defaultValue={getSerialKey} placeholder="Serial Key" onChange={(e) => setSerialKey(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="Client_Name">
                    <Form.Label>Client Name</Form.Label>
                    <Form.Control type="text" autoComplete="off" defaultValue={getClientName} placeholder="Client Name" onChange={(e) => setClientName(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="Client_Desc">
                    <Form.Label>Client Description</Form.Label>
                    <Form.Control as="textarea" rows={3} autoComplete="off" defaultValue={getDesc} placeholder="Client Description" onChange={(e) => setDesc(e.target.value)} />
                  </Form.Group>
                  <MDBBtn type="button" color="indigo" size="sm" onClick={handleSubmit} >
                    <MDBIcon icon="save" />&nbsp;&nbsp;Activate
                  </MDBBtn>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
