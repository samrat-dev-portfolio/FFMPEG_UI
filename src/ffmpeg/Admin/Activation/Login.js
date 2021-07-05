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

import Dexie from 'dexie';
import { GetFFMPEGLocalStorageData, SetFFMPEGLocalStorageData } from '../Toast/LocalStorage';

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
        let allPosts = await GetFFMPEGLocalStorageData();
        console.log(allPosts);
    };

    const setIndexDBData = async () => {
        console.log('setIndexDBData');
        // db.posts.delete(id);
        // let allPosts = await db.ffmpegLocalStorage.toArray();
        // console.log(allPosts);

        let data = {
            key: '123',
            value: { name: 'Suman', age: 20 },
        };
        await SetFFMPEGLocalStorageData(data.key, data.value);

        let postUpdated = {
            content: 'content 01 updated',
            file: 'file 01 updated',
        };
        // const result = await db.ffmpegLocalStorage.update('title 01', postUpdated);

    }

    return (
        <Container className="C_Login">
            <Row className="h-100">
                <Col className="col-9 mt-3" style={{ border: '1px dashed red' }}>
                    <h2> login form</h2>
                    <input type="button" value="SetAuth" onClick={setAuth} /> &nbsp;
                    <input type="button" value="setIndexDBData" onClick={setIndexDBData} /> &nbsp;
                    <input type="button" value="getDB" onClick={getDB} />
                    <p>{activation.isAuth ? 'Authenticated' : 'Please login'}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
