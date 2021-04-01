import React from 'react'
import './ProgressAlert.scss';

export default function ProgressAlert(props) {
    return (
        <span className="progress-1" >
            {props.alert}
        </span>
    )
}
