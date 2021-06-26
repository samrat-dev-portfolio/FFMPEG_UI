import React, { useState, useEffect } from 'react'
import './Admin.scss';
import BrandAnimation from './BrandAnimation/BrandAnimation';
import Menubar from './Menubar/Menubar';
import { Toast } from './Toast/Toast';

export default function Admin() {
    useEffect(() => {
    });

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
