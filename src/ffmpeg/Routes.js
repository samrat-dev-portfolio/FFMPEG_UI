import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Book from "../containers/Book/Book";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ffmpeg.scss';
import Entry from "./Entry/Entry";
import Home from "./Home/Home";

export default function Routes(props) {
    return (
        <>
            <Route path="/" exact>
                <Entry />
            </Route>
            <Switch>
                <Route path="/home" exact component={Home} />
            </Switch>
        </>
    );
}