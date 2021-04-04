import React from 'react'
import './ProgressAlert.scss';

export default function ProgressAlert(props) {
    return (
        <span className="C_ProgressAlert progress-1" >
            {props.alert}
        </span>
    )
}
