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
import Conversion from "./Admin/Conversion/Conversion";
import AddCsub from "./Admin/AddCsub/AddCsub";
import AddChap from "./Admin/AddChap/AddChap";
import Settings from "./Admin/Settings/Settings";

export default function Routes(props) {
    return (
        <>
            <Route path="/" exact>
                {
                    <Entry />
                    // <Admin />
                }
            </Route>
            <Route path="/admin" component={Admin} />
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/admin/upload" exact component={Upload} />
                <Route path="/admin/conversion" exact component={Conversion} />
                <Route path="/admin/addclsnsub" exact component={AddCsub} />
                <Route path="/admin/addchap" exact component={AddChap} />
                <Route path="/admin/settings" exact component={Settings} />
                <Route path="/admin/test" exact render={() => { return <h3>Test</h3> }} />
            </Switch>
        </>
    );
}