import React, { useState, useEffect } from 'react'
import './Admin.scss';
import BrandAnimation from './BrandAnimation/BrandAnimation';
import Menubar from './Menubar/Menubar';
import { Toast } from './Toast/Toast';

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
            <Toast />
            <div style={{ position: 'relative' }}>
                <BrandAnimation />
            </div>
        </div>
    )
}
