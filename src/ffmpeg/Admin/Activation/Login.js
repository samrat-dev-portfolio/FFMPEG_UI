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

function Login(props) {
    const { activation } = useSelector(state => state);
    const dispatch = useDispatch();
    const setAuth = () => {
        dispatch({
            type: 'SET_AUTH',
            payload: !activation.isAuth
        });
    }

    // set database
    const db = new Dexie('ffmpeg');
    // create  database store
    db.version(1).stores({ posts: "title, content, file" });
    db.open().catch(err => {
        console.log(err);
    });

    const setIndexDBData = async () => {
        console.log('setIndexDBData');
        // db.posts.delete(id);
        let allPosts = await db.posts.toArray();
        console.log(allPosts);

        let post = {
            title: 'title 01',
            content: 'content 01',
            file: 'file 01',
        };
        // const result = await db.posts.add(post);

        let postUpdated = {
            content: 'content 01 updated',
            file: 'file 01 updated',
        };
        const result = await db.posts.update('title 01', postUpdated);

    }

    return (
        <Container className="C_Login">
            <Row className="h-100">
                <Col className="col-9 mt-3" style={{ border: '1px dashed red' }}>
                    <h2> login form</h2>
                    <input type="button" value="SetAuth" onClick={setAuth} /> &nbsp;
                    <input type="button" value="setIndexDBData" onClick={setIndexDBData} />
                    <p>{activation.isAuth ? 'Authenticated' : 'Please login'}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
