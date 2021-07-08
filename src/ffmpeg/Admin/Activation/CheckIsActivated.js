import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { ToastAlert, Toast } from '../Toast/Toast';
import {
    IsActivated,
    LocalStorage_ActivationExpired,
    LocalStorage_IsActivated,
    ActivationExpiredDay,
    WillActivationExpired
} from './CommonMethods';

export default function CheckIsActivated() {
    const baseurl = window.ffmpeg_baseurl;
    const dispatch = useDispatch();
    const history = useHistory();
    const { activation } = useSelector(state => state);

    useEffect(() => {
        _checkIsActivated();       
    }, []);

    const _checkIsActivated = async () => {
        dispatch({
            type: 'SET_LOADING_CheckActivation',
            payload: true
        });
        const _IsActivated = await LocalStorage_IsActivated();
        let _ActivationExpired = await LocalStorage_ActivationExpired();
        _ActivationExpired = WillActivationExpired(_ActivationExpired);
        // console.log({ _ActivationExpired, _IsActivated });
        if (_IsActivated === true && _ActivationExpired === false) {
            // console.log('IsActivate fill');
            dispatch({
                type: 'SET_ACTIVATION',
                payload: _IsActivated
            });
        }
        else {
            // console.log('IsActivate empty');
            const res = await IsActivated(baseurl);
            // console.log(res.data);
            const activated = res.data.activated || false;
            const activated_alert = res.data.data || "";
            dispatch({
                type: 'SET_ACTIVATION',
                payload: activated
            });
            if (!activated) {
                ToastAlert(activated_alert, 'w');
                const { location: { pathname } } = history;
                if (pathname !== "/") {
                    history.push('/');
                }
            } else {
                await LocalStorage_IsActivated(activated);
                await LocalStorage_ActivationExpired(ActivationExpiredDay());
            }
        }
        dispatch({
            type: 'SET_LOADING_CheckActivation',
            payload: false
        });
    };

    return (
        <Toast />
    )
}
