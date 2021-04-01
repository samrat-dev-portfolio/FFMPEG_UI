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

    const [getLoading_class, setLoading_class] = useState(false);
    const [getClasses, setClasses] = useState([]);
    const [getSelectedClass, setSelectedClass] = useState('');

    const [getLoading_subject, setLoading_subject] = useState(false);
    const [getSubjects, setSubjects] = useState([]);
    const [getSelectedSubject, setSelectedSubject] = useState('');

    // Similar to componentDidMount and componentDidUpdate:
    // https://www.digitalocean.com/community/tutorials/react-axios-react

    //#region Hooks 
    useEffect(() => {
        loadClasses();
        loadSubject();
        const query = new URLSearchParams(props.location.search);
        const cls = query.get('cls');
        if (cls)
            setSelectedClass(cls);
        const sub = query.get('sub');
        if (sub)
            setSelectedSubject(sub);

    }, []);
    useEffect(() => {
        props.history.push(`/home?cls=${getSelectedClass}&sub=${getSelectedSubject}`);
        if (getSelectedClass && getSelectedSubject) {
            console.log('change class, sub, load chapter');
        }
    }, [getSelectedClass, getSelectedSubject]);
    //#endregion

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
        setLoading_subject(true);
        axios.get(`${baseurl}api/mpeg/getSubject`)
            .then(res => {
                setSubjects(res.data.data);
                setLoading_subject(false);
                // console.log(res.data.data);
            }).catch(err => {
                setLoading_subject(false);
            });
    };
    const loadChapter = () => {
        console.log('loadChapter');
        // axios.get(`${baseurl}api/mpeg/getSubject`, {
        //     params: {
        //         class_id: getSelectedClass
        //     }
        // })
        //     .then(res => {
        //         // setClasses(res.data.data);
        //         console.log(res.data);
        //     });
    };
    //#endregion

    //#region Create List View
    const getClasses_view = () => {
        let data = [];
        data = getClasses.map((item, index) => {
            return <li key={index} className="list-group-item" onClick={() => { click_classItem(item.id) }}>Class {item.className}</li>;
        });
        return data;
    };
    const getSubjects_view = () => {
        let data = [];
        data = getSubjects.map((item, index) => {
            return <li key={index} className="list-group-item" onClick={() => { click_subjectItem(item.id) }}>{item.subjectName}</li>;
        });
        return data;
    };
    const click_classItem = (_id) => {
        setSelectedClass(_id);
    };
    const click_subjectItem = (_id) => {
        setSelectedSubject(_id);
    };
    //#endregion

    return (
        <>
            <Header />
            <Content
                my_class={getClasses_view()} loading_class={getLoading_class}
                my_subject={getSubjects_view()} loading_subject={getLoading_subject}
            />
            Class: {getSelectedClass}, subject: {getSelectedSubject}
        </>
    )
}
