import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, Form, Row, Card, ProgressBar } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import './Activation.scss';
const log = console.log;

export default function Activation() {
  const { activation } = useSelector(state => state);
  const dispatch = useDispatch();
  const setActivation = () => {
    dispatch({
      type: 'SET_ACTIVATION',
      payload: !activation.isActivate
    });
  }

  const baseurl = window.ffmpeg_baseurl;
  const [getIsLoading, setIsLoading] = useState(false);
  const [getError, setError] = useState('');

  const [getToken, setToken] = useState('');
  const [getValidFrom, setValidFrom] = useState('');
  const [getValidTo, setValidTo] = useState('');

  //#region Hooks 
  useEffect(() => {
    // AuthGetToken();
  }, []);

  //#endregion
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

  return (
    <Container fluid className="C_Activation">
      <Row className="h-100 m-0">
        <Col className="col-md-8 col-lg-6 pt-3">
          Activation
          <ul>
            <li>
              token: {getToken}
            </li>
            <li>
              ValidFrom: {getValidFrom}
            </li>
            <li>
              ValidTo: {getValidTo}
            </li>
          </ul>
          <button onClick={setActivation}>setActivation</button>
          <p>{activation.isActivate ? 'Activated' : 'Please Activate'}</p>

        </Col>
      </Row>
    </Container>
  )
}
