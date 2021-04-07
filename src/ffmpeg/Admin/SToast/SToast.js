import React, {useState} from 'react'
import { Col, Row, Toast, Button } from 'react-bootstrap';
import './SToast.scss';

export default function SToast(props) {
    const [show, setShow] = useState(false);
    return (
        <div className="C_SToast">
            Toast
        </div>
    )
}
