import React, { useState, useEffect, useRef } from 'react'
import { Container, Col, Row, Table, Button, InputGroup, FormControl, Pagination, Dropdown, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import ReactHlsPlayer from 'react-hls-player';
import './Player.scss';
// import cross from '../../img/9.png';
import { MDBIcon, MDBBtn, MDBContainer, MDBNavbarNav, MDBNavbar } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function Player({ show, onhide, contentID, chapter }) {
    // https://www.npmjs.com/package/react-hls-player
    const baseurl = window.ffmpeg_baseurl;
    const playerRef = React.useRef();
    const playerWrapperRef = React.useRef();
    const [getM3u8Url, setM3u8Url] = useState('');

    const playVideo = () => {
        playerRef.current.play();
    };
    const pauseVideo = () => {
        playerRef.current.pause();
    };
    const toggleControls = () => {
        playerRef.current.controls = !playerRef.current.controls;
    };
    const Resize = () => {
        var actualWidth = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth ||
            document.body.offsetWidth;

        var actualHeight = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight ||
            document.body.offsetHeight;
        if (actualWidth < actualHeight) {
            // console.log('w small');
            if (typeof playerWrapperRef.current === 'undefined') return;
            playerWrapperRef.current.style.width = '90%';
        } else {
            // console.log('h small');
            if (typeof playerWrapperRef.current === 'undefined') return;
            if (playerWrapperRef.current === null) return;
            let w = ((3 / 4) * actualWidth) - 50;
            playerWrapperRef.current.style.width = w + 'px';
        }
        // console.log(actualWidth, actualHeight);
    };

    //#region Hooks
    useEffect(() => {
        document.body.onresize = () => {
            Resize();
        };
    }, []);
    useEffect(() => {
        if (contentID === null) return;
        setM3u8Url(`${baseurl}api/mpeg/M3u8info/${contentID}`);
        Resize();
    }, [show]);
    useEffect(() => {
        // const fireOnVideoStart = () => {
        //     // Do some stuff when the video starts/resumes playing
        // };
        // if (typeof playerWrapperRef.current === 'undefined') return;
        // playerRef.current.addEventListener('play', fireOnVideoStart);
        // return playerRef.current.removeEventListener('play', fireOnVideoStart);
    }, []);
    useEffect(() => {
        // const fireOnVideoEnd = () => {
        //     // Do some stuff when the video ends
        // };
        // if (typeof playerWrapperRef.current === 'undefined') return;
        // playerRef.current.addEventListener('ended', fireOnVideoEnd);
        // return playerRef.current.removeEventListener('ended', fireOnVideoEnd);
    }, []);
    //#endregion

    return (show && <Container fluid className="C_Player">
        <Col className="text-center py-3">
            <div className="player-wrapper" ref={playerWrapperRef}>
                <MDBContainer className="text-center">
                    <Row className="header">
                        <Col className="col-12 p-0">
                            <p className="m-0 h-100">{chapter}</p>
                            <MDBBtn className="exit" color="mdb-color" size="sm" onClick={onhide}>
                                <MDBIcon icon="times-circle" />&nbsp;&nbsp;Close
                            </MDBBtn>
                        </Col>
                    </Row>
                    <Row className="player-body">
                        {getM3u8Url.length > 0 ?
                            <ReactHlsPlayer
                                playerRef={playerRef}
                                srcoff="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
                                xsrc="http://localhost:50017/api/mpeg/M3u8info/20210417-020532-d829654b-bdaf-4c0c-bad6-dd7ce8326e31"
                                src={getM3u8Url}
                                autoPlay={false}
                                controls={true}
                                width="100%"
                                height="auto"
                            /> : null
                        }
                    </Row>
                </MDBContainer>
            </div>
        </Col>
    </Container>
    )
}