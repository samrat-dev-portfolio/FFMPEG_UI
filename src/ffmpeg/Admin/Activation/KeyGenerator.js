import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, Form, Row, Card, ProgressBar } from "react-bootstrap";
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

  //#region Hooks 
  useEffect(() => {
    loadAppID();
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
  }
  const handleSubmit = () => {
    const config = {
      headers: {
        'content-type': 'application/json',
      }
    };
    const body = { LicenceAppId: getAppId, LicenceKey: getSerialKey };
    setIsLoading(true);
    axios.post(`${baseurl}api/mpeg/AddLicenseKeyGen`, body, config).then(res => {
      // console.log(res);
      if (res.data.data)
        ToastAlert(res.data.data, 's');
      if (res.data.error)
        ToastAlert(res.data.error, 'e');
      setIsLoading(false);
      setDisabledRegister(true);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
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
            </Card.Header>
            <Card.Body>
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
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
