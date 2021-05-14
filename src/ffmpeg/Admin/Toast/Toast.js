import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Toast() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    )
}

export function ToastAlert(_alert, type = '') {
    let toastRef = toast;
    if (type == 'info' || type == 'i') {
        toastRef = toast.info;
    }
    else if (type == 'success' || type == 's') {
        toastRef = toast.success;
    }
    else if (type == 'warn' || type == 'w') {
        toastRef = toast.warn;
    }
    else if (type == 'error' || type == 'e') {
        toastRef = toast.error;
    }
    toastRef(_alert, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}