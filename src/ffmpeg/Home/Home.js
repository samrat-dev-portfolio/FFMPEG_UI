import React, { useState, useEffect } from 'react'
import { Route, Switch, Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header';
import './Home.scss';
import Content from './Content/Content';
import axios from 'axios';

export default function Home() {
    const [getClasses, setClasses] = useState([]);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        var baseurl = window.ffmpeg_baseurl;
        axios.get(`${baseurl}api/mpeg/getClasses`)
            .then(res => {
                setClasses(res.data.data);
                // console.log(res.data.data);
            })
    }, []);

    const getClasses_view = () => {
        let data = [];
        data = getClasses.map((item, index) => {
            return <li key={index} className="list-group-item" onClick={() => { click_classItem(item.id) }}>Class {item.className}</li>;
        });
        return data;
    };

    const click_classItem = (_id) => {
        let query = JSON.stringify({ "class_id": _id });
        alert(query);
    };

    return (
        <>
            <Header />
            <Content my_class={getClasses_view()} />
        </>
    )
}
