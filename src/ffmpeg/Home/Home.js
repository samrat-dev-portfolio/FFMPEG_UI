import React from 'react'
import { Route, Switch, Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header';
import './Home.scss';
import Content from './Content/Content';

export default function Home() {
    return (
        <>
            <Header />
            <Content />           
        </>
    )
}
