import React, { useState, useEffect } from 'react'
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header';
import './Home.scss';
import Content from './Content/Content';
import axios from 'axios';
import Player from '../Admin/Player/Player';

export default function Home(props) {
    const baseurl = window.ffmpeg_baseurl;

    const [getLoading_class, setLoading_class] = useState({ enabled: false, alert: '' });
    const [getClasses, setClasses] = useState([]);
    const [getSelectedClass, setSelectedClass] = useState('');
    const [getSelectedClassName, setSelectedClassName] = useState('');
    const [getSelectedChapterName, setSelectedChapterName] = useState('');

    const [getLoading_subject, setLoading_subject] = useState({ enabled: false, alert: '' });
    const [getSubjects, setSubjects] = useState([]);
    const [getSelectedSubject, setSelectedSubject] = useState('');
    const [getSelectedSubjectName, setSelectedSubjectName] = useState('');

    const [getLoading_chapter, setLoading_chapter] = useState({ enabled: false, alert: '' });
    const [getChapters, setChapters] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    // https://www.digitalocean.com/community/tutorials/react-axios-react


    //#region Hooks 
    useEffect(() => {
        body_blue();
        loadClasses();
        loadSubject();
        const query = new URLSearchParams(props.location.search);
        const cls = query.get('cls');
        if (cls)
            setSelectedClass(cls);

        const sub = query.get('sub');
        if (sub) {
            setSelectedSubject(sub);
        }

        const cls_name = query.get('cls_name');
        if (cls_name)
            setSelectedClassName(cls_name);
        const chap_name = query.get('chap_name');
        if (chap_name) {
            setSelectedChapterName(chap_name);
        }

        return body_blue_reset;
    }, []);
    useEffect(() => {
        urlParamCreation();
        if (getSelectedClass && getSelectedSubject) {
            // console.log('change class, sub, load chapter');
            loadChapter();
        } else {
            setLoading_chapter({ enabled: true, alert: 'Please Provide Class and subject' });
        }
    }, [getSelectedClass, getSelectedSubject]);
    useEffect(() => {
        urlParamCreation();
    }, [getSelectedChapterName]);
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
    const mapSelectedSubjectsName = _id => {
        let data = getSubjects.find((item, index) => item.id == _id) || {};
        data = data.subjectName || '';
        setSelectedSubjectName(data);
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
            return <li key={index} className="list-group-item" onClick={(e) => { click_chapterItem(e, item) }}>{item.chapterName}</li>;
        });
        return data;
    };
    const click_classItem = (_item) => {
        setSelectedClass(_item.id);
        setSelectedClassName(`Class ${_item.className}`);
    };
    const click_subjectItem = (_item) => {
        setSelectedSubject(_item.id);
        mapSelectedSubjectsName(_item.id)
    };
    const click_chapterItem = (_e, _item) => {
        // console.log(_item);
        setSelectedChapterName(_item.chapterName);
        highlight(_e, 'chapter_highlight');
        if (_item.contentID == null) return;
        if (_item.contentID == 'NULL') return;
        setPlayerContentID(_item.contentID);
        setPlayerTitle(_item.chapterName);
        setLoadPlayer(true);
    };
    const highlight = (_e, _className) => {
        var _target = _e.target;
        document.querySelectorAll('.' + _className).forEach(i => {
            i.classList.remove(_className);
        });
        _target.classList.add(_className);
    };
    const body_blue = () => {
        document.body.classList.add('body-blue');
    };
    const body_blue_reset = () => {
        document.body.classList.remove('body-blue');
    };
    const urlParamCreation = () => {
        // props.history.push(`/home?cls=${getSelectedClass}&sub=${getSelectedSubject}&cls_name=${getSelectedClassName}&chap_name=${getSelectedChapterName}`);
        const _search = `?cls=${getSelectedClass}&sub=${getSelectedSubject}&cls_name=${getSelectedClassName}&chap_name=${getSelectedChapterName}`;
        props.history.push({
            search: _search
        });
    }
    //#endregion

    //#region Player
    const [getLoadPlayer, setLoadPlayer] = useState(false);
    const [getPlayerContentID, setPlayerContentID] = useState(null);
    const [getPlayerTitle, setPlayerTitle] = useState(null);
    const hidePlayer = () => {
        setLoadPlayer(false);
        setPlayerContentID(null);
        setPlayerTitle(null);
    };
    //#endregion
    return (
        <>
            <Player chapter={getPlayerTitle} show={getLoadPlayer} contentID={getPlayerContentID} onhide={hidePlayer} />
            <Header selected_class={getSelectedClassName} selected_subject={getSelectedSubjectName} selected_chapter={getSelectedChapterName} />
            <Content
                my_class={getClasses_view()} loading_class={getLoading_class}
                my_subject={getSubjects_view()} loading_subject={getLoading_subject}
                my_chapter={getChapters_view()} loading_chapter={getLoading_chapter}
                isAuth
            />
        </>
    )
}
