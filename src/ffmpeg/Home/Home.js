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

    const [getLoading_class, setLoading_class] = useState({ enabled: false, alert: '' });
    const [getClasses, setClasses] = useState([]);
    const [getSelectedClass, setSelectedClass] = useState('');
    const [getSelectedClassName, setSelectedClassName] = useState('');

    const [getLoading_subject, setLoading_subject] = useState({ enabled: false, alert: '' });
    const [getSubjects, setSubjects] = useState([]);
    const [getSelectedSubject, setSelectedSubject] = useState('');

    const [getLoading_chapter, setLoading_chapter] = useState({ enabled: false, alert: '' });
    const [getChapters, setChapters] = useState([]);

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
            // console.log('change class, sub, load chapter');
            loadChapter();
        } else {
            setLoading_chapter({ enabled: true, alert: 'Please Provide Class and subject' });
        }
    }, [getSelectedClass, getSelectedSubject]);
    //#endregion

    //#region Load API
    const loadClasses = () => {
        setLoading_class({ enabled: true, alert: 'Loading...' });
        axios.get(`${baseurl}api/mpeg/getClasses`)
            .then(res => {
                setClasses(res.data.data);
                setLoading_class({ enabled: false, alert: '' });
                // console.log(res.data.data);  
            }).catch(err => {
                setLoading_class({ enabled: true, alert: 'Error' });
            });
    };
    const loadSubject = () => {
        setLoading_subject({ enabled: true, alert: 'Loading...' });
        axios.get(`${baseurl}api/mpeg/getSubject`)
            .then(res => {
                setSubjects(res.data.data);
                setLoading_subject({ enabled: false, alert: '' });
                // console.log(res.data.data);
            }).catch(err => {
                setLoading_subject({ enabled: true, alert: 'Error' });
            });
    };
    const loadChapter = () => {
        setLoading_chapter({ enabled: true, alert: 'Loading...' });
        axios.get(`${baseurl}api/mpeg/getChapter`, {
            params: {
                cls: getSelectedClass,
                sub: getSelectedSubject
            }
        })
            .then(res => {
                setChapters(res.data.data);
                if (!res.data.data.length) {
                    setLoading_chapter({ enabled: true, alert: 'No data Available' });
                } else {
                    setLoading_chapter({ enabled: false, alert: '' });
                }
                // console.log(res.data);
            }).catch(err => {
                setLoading_chapter({ enabled: true, alert: 'Error' });
            });
    };
    //#endregion

    //#region Create List View
    const getClasses_view = () => {
        let data = [];
        data = getClasses.map((item, index) => {
            return <li key={index} className="list-group-item" onClick={() => { click_classItem(item) }}>Class {item.className}</li>;
        });
        return data;
    };
    const getSubjects_view = () => {
        let data = [];
        data = getSubjects.map((item, index) => {
            return <li key={index} className="list-group-item" onClick={() => { click_subjectItem(item) }}>{item.subjectName}</li>;
        });
        return data;
    };
    const getChapters_view = () => {
        let data = [];
        data = getChapters.map((item, index) => {
            return <li key={index} className="list-group-item" onClick={() => { click_chapterItem(item) }}>{item.chapterName}</li>;
        });
        return data;
    };
    const click_classItem = (_item) => {
        setSelectedClass(_item.id);
        setSelectedClassName(`Class ${_item.className}`);
    };
    const click_subjectItem = (_item) => {
        setSelectedSubject(_item.id);
    };
    const click_chapterItem = (_item) => {
        console.log(_item);
    };
    //#endregion

    return (
        <>
            <Header selected_class={getSelectedClassName} />
            <Content
                my_class={getClasses_view()} loading_class={getLoading_class}
                my_subject={getSubjects_view()} loading_subject={getLoading_subject}
                my_chapter={getChapters_view()} loading_chapter={getLoading_chapter}
            />
            Class: {getSelectedClass}, subject: {getSelectedSubject}
        </>
    )
}
