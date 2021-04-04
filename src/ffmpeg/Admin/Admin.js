import React, { useState, useEffect } from 'react'
import './Admin.scss';
import Menubar from './Menubar/Menubar';

export default function Admin() {
    useEffect(() => {
        body_blue_reset();
    });

    const body_blue_reset = () => {
        document.body.classList.remove('body-blue');
        document.body.classList.add('body-white');
    };

    return (
        <div className="C_Admin">
            <Menubar />
        </div>
    )
}