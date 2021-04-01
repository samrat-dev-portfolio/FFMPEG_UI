import React, { useState, useEffect } from 'react'
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header';
import './Home.scss';
import Content from './Content/Content';
import axios from 'axios';

export default function Home(props) {
    const baseurl = window.ffmpeg_baseurl;
    const [getClasses, setClasses] = useState([]);
    const [getSelectedClass, setSelectedClass] = useState();
    const [getLoading_class, setLoading_class] = useState(false);
    // Similar to componentDidMount and componentDidUpdate:
    // https://www.digitalocean.com/community/tutorials/react-axios-react

    useEffect(() => {
        loadClasses();
        const query = new URLSearchParams(props.location.search);
        const my_class = query.get('my_class');
        if (my_class)
            setSelectedClass(my_class);

    }, []);
    useEffect(() => {
        if (getSelectedClass)
            loadSubject();
    }, [getSelectedClass]);

    //#region Load API
    const loadClasses = () => {
        setLoading_class(true);
        axios.get(`${baseurl}api/mpeg/getClasses`)
            .then(res => {
                setClasses(res.data.data);
                setLoading_class(false);
                // console.log(res.data.data);  
            }).catch(err => {
                setLoading_class(false);
            });
    };
    const loadSubject = () => {
        console.log('loadSubject');
        axios.get(`${baseurl}api/mpeg/getSubject`, {
            params: {
                class_id: getSelectedClass
            }
        })
            .then(res => {
                // setClasses(res.data.data);
                console.log(res.data);
            });
    }

    //#endregion
    const getClasses_view = () => {
        let data = [];
        data = getClasses.map((item, index) => {
            return <li key={index} className="list-group-item" onClick={() => { click_classItem(item.id) }}>Class {item.className}</li>;
        });
        return data;
    };
    const click_classItem = (_id) => {
        // let query = JSON.stringify({ "class_id": _id });
        setSelectedClass(_id);
        props.history.push('/home?my_class=' + _id);
    };

    return (
        <>
            <Header />
            <Content my_class={getClasses_view()} loading_class={getLoading_class} />
        </>
    )
}
