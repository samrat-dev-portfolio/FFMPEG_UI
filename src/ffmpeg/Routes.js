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

export default function Routes(props) {
    return (
        <>
            <Route path="/" exact>
                <Entry />
            </Route>
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/admin" exact component={Admin} />
            </Switch>
        </>
    );
}