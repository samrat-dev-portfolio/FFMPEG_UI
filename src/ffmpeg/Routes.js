import React from "react";
import { Route, Switch, Link } from "react-router-dom";
// import styled from "styled-components";
// import { useHistory } from "react-router-dom";
// import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ffmpeg.scss';
import Entry from "./Entry/Entry";
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import Upload from "./Admin/Upload/Upload";

export default function Routes(props) {
    return (
        <>
            <Route path="/" exact>
                {
                     <Entry />
                    // <Upload />
                }
            </Route>
            <Route path="/admin" component={Admin} />
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/admin/upload" exact component={Upload} />
                <Route path="/admin/conversion" exact render={() => { return <h3>Start Conversion</h3> }} />
                <Route path="/admin/playfiles" exact render={() => { return <h3>Play Conversion Files</h3> }} />
                <Route path="/admin/addcls" exact render={() => { return <h3>add Class</h3> }} />
                <Route path="/admin/addsub" exact render={() => { return <h3>add Subject</h3> }} />
                <Route path="/admin/addchap" exact render={() => { return <h3>add Chapter</h3> }} />
                <Route path="/admin/mapping" exact render={() => { return <h3>Mapping Chapter - Video</h3> }} />
            </Switch>
        </>
    );
}