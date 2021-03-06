import React, { Fragment } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Entry from "./Entry/Entry";
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import Upload from "./Admin/Upload/Upload";
import Conversion from "./Admin/Conversion/Conversion";
import AddCsub from "./Admin/AddCsub/AddCsub";
import AddChap from "./Admin/AddChap/AddChap";
import Settings from "./Admin/Settings/Settings";
import Activation from "./Admin/Activation/Activation";
import KeyGenerator from './Admin/Activation/KeyGenerator';
import Login from "./Admin/Activation/Login";
import './ffmpeg.scss';

export function Routes() {
    return (
        <Fragment>
            <Route path="/" exact>
                {
                    <Entry />
                    // <Admin />
                }
            </Route>
            <Route path="/admin" component={Admin} />
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/activation" exact component={Activation} />
                <Route path="/admin/upload" exact component={Upload} />
                <Route path="/admin/conversion" exact component={Conversion} />
                <Route path="/admin/addclsnsub" exact component={AddCsub} />
                <Route path="/admin/addchap" exact component={AddChap} />
                <Route path="/admin/settings" exact component={Settings} />
                <Route path="/admin/keygen" exact component={KeyGenerator} />
                <Route path="/test" exact render={() => { return <h3>Test</h3> }} />
            </Switch>
        </Fragment>
    );
}

export function RoutesUser() {
    return (
        <Fragment>
            <Route path="/" exact>
                {
                    <Entry />
                }
            </Route>
            <Route path="/home" exact component={Home} />
            <Route path="/admin" exact render={() => { return <h3>This is an user app</h3> }} />
        </Fragment>
    )
}
