import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Activation.scss';

import { MDBIcon, MDBBtn } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import {
    GetFFMPEGLocalData,
    GetFFMPEGLocalDataByKey,
    SetFFMPEGLocalData,
    PutFFMPEGLocalData,
    DeleteFFMPEGLocalData
} from '../Toast/LocalStorage';

function Login(props) {
    const { activation } = useSelector(state => state);
    const dispatch = useDispatch();
    const setAuth = () => {
        dispatch({
            type: 'SET_AUTH',
            payload: !activation.isAuth
        });
    }

    const getDB = async () => {
        console.log('getDB');
        let allPosts = await GetFFMPEGLocalData();
        // let Post = await GetFFMPEGLocalDataByKey('123');
        console.log(allPosts);
    };

    const setIndexDBData = async () => {
        console.log('setIndexDBData');
        let data = {
            key: '123',
            value: { name: 'Suman', age: 20 },
        };
        // await SetFFMPEGLocalData(data.key, data.value);
        
        let dataUpdate = {
            key: '123',
            value: { name: 'Samrat', age: 28 },
        };
        // await PutFFMPEGLocalData(dataUpdate.key, dataUpdate.value);
       
        // await DeleteFFMPEGLocalData('467');
    }

    return (
        <Container className="C_Login">
            <Row className="h-100">
                <Col className="col-9 mt-3" style={{ border: '1px dashed red' }}>
                    <h2> login form</h2>
                    <input type="button" value="setIndexDBData" onClick={setIndexDBData} /> &nbsp;
                    <input type="button" value="getDB" onClick={getDB} />
                    <p>{activation.isAuth ? 'Authenticated' : 'Please login'}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
